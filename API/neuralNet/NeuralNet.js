const { prependOnceListener } = require('process');

async function start(){
 // console.log("abc");

const Pool = require('pg').Pool
const poolConfig = {
    user: '/',
    host: '/',
    database: '/',
    password: '/',
    port: '/'
}
const pool = new Pool(poolConfig)
var rawData;
var Afflictions;
pool.query('SELECT form, "Long", "Lat", "Pname", "Infliction", diagnosis FROM reports where diagnosis<>-1', (error, results) => { 

        if (error) {
            throw error;
        }else{
            rawData = results;
            //prepData()
        }

        pool.query('SELECT id, "CommName" FROM public."Afflictions"', (error, results) => { 

          if (error) {
              throw error;
          }else{
              Afflictions= results;
              res = prepData(rawData,Afflictions);
              
          }
      })
    })

  }

async function prepData(rawData,Afflictions){

   var data = await rawData;
   //here we have the relevant questions
   var questions = ["Where do you see the Pest/Disease on the plant?",
   "Are you experiencing a drought?",
   "How many plants are affected?",
   "Do you know what Pest/Disease is affecting the plant?",
   "Have you experienced above average precipitation?"];
//=========clean data===================================
    var formAnswers = [];
    var lat = [];
    var long = [];
    var diagnosis = [];
    var NumObjects = Object.keys(rawData.rows).length;
    var diagnosisName = [];
    //this for loop should populate above 3 variables
    for(var i=0; i<Object.keys(rawData.rows).length; i++){

        //get lat/long
        lat.push(rawData.rows[i].Lat);
        long.push(rawData.rows[i].Long);

        //get diagnosis
        diagnosis.push(rawData.rows[i].diagnosis);
        
        //extract answers from form 
        var form = await rawData.rows[i].form;
        //var form = form.replace(/ /g, "");
        var form = form.replace(/x2C/g, ",");
        var answers = [];

            for(var j = 0; j<questions.length;j++){
                var temp = "";
                var check = 0;
                var index = 0;
                var start = form.search(questions[j]) + questions[j].length;
                while(check<2){
                    if(form[start+index] == ','){
                        check++;
                    }
                    else{
                        temp = temp + form[start+index];
                    }

                    index++;
                }
                //add each answer to a temp array
                answers.push(temp);
            }
            //add temp array to actual array
            formAnswers.push(answers);
            

    }

    let input = [{
        "q1":0,
        "q2":0,
        "q3":0,
        "q4":0,
        "q5":0,
        "lat":0,
        "long":0
    }]

    let output =[]

    

    

    for(var i=0; i<NumObjects;i++){
        var inputLat;
        var inputLong;
        var inputQ1;
        var inputQ2;
        var inputQ3;
        var inputQ4;
        var inputQ5;

        //loop to make form questions numbers    formAnswers[j][k]
            for(var k=0;k<5;k++)
            {
                if(k==0){
                    switch(formAnswers[i][k]) {
                        case "Root":
                          inputQ1 = 1;
                          break;
                        case "Stem":
                          inputQ1 = 2;
                          break;
                        case "Leaf / Leaves":
                          inputQ1 = 3;
                          break;
                          case "Flowers":
                          inputQ1 = 4;
                          break;
                        default:
                          inputQ1 = 0;
                      }

                }
                if(k==1){
                    switch(formAnswers[i][k]) {
                        case "Yes":
                          inputQ2 = 1;
                          break;
                        case "No":
                          inputQ2 = 2;
                          break;
                        default:
                          inputQ2 = 0;
                      }                    
                }
                if(k==2){

                    if(formAnswers[i][k] == "Unknown"){
                        inputQ3 = 0;
                    }
                    else{
                        inputQ3 = parseInt(formAnswers[i][k]);
                    }
                          
                }
                if(k==3){
                    switch(formAnswers[i][k]) {
                        case "Yes":
                          inputQ4 = 1;
                          break;
                        case "No":
                          inputQ4 = 2;
                          break;
                        default:
                          inputQ4 = 0;
                      }         
                    
                }
                if(k==4){
                    switch(formAnswers[i][k]) {
                        case "Yes":
                          inputQ5 = 1;
                          break;
                        case "No":
                          inputQ5 = 2;
                          break;
                        default:
                          inputQ5 = 0;
                      }         
                    
                }

            }
        

            inputLat = lat[i];
            inputLong = long[i];
            input.push({q1:inputQ1,q2:inputQ2,q3:inputQ3,q4:inputQ4,q5:inputQ5,lat:inputLat,long:inputLong});

            

            
            for(var z=0;z<Object.keys(Afflictions.rows).length;z++){
              if(diagnosis[i]==parseInt(Afflictions.rows[z].id))
              {
                diagnosisName.push(Afflictions.rows[z].CommName);
              }

            }

            var temp = {
              [diagnosisName[i]] : 1//diagnosis[i]
            }
          output.push(temp);
            
    }

    //console.log(formAnswers);

    //i need to construct input objects, with a respective output object
    //this code block populated formAnswers,lat,long
//======================================================

//=========convert form answers to integers=============
    


//======================================================
return await NeuralNet(input,output);

}

async function NeuralNet(input,output){
    var trainingData=[]
    for(var i =1;i<Object.keys(input).length;i++){
      var temp = {
        "input": input[i],
        "output": output[i-1],
      }
      trainingData.push(temp);
    }

    const brain = require('brain.js');

    const net = new brain.NeuralNetwork();
net.train(trainingData,{
  // Defaults values --> expected validation
  iterations: 20000, // the maximum times to iterate the training data --> number greater than 0
  errorThresh: 0.005, // the acceptable error percentage from training data --> number between 0 and 1
  log: false, // true to use console.log, when a function is supplied it is used --> Either true or a function
  logPeriod: 10, // iterations between logging out --> number greater than 0
  learningRate: 0.3, // scales with delta to effect training rate --> number between 0 and 1
  momentum: 0.1, // scales with next layer's change value --> number between 0 and 1
  callback: null, // a periodic call back that can be triggered while training --> null or function
  callbackPeriod: 10, // the number of iterations through the training data between callback calls --> number greater than 0
  timeout: Infinity, // the max number of milliseconds to train for --> number greater than 0
});



var obj = net.toJSON();
return obj;

}

async function predict(req){

  

  //here we have the relevant questions
  var questions = ["Where do you see the Pest/Disease on the plant?",
  "Are you experiencing a drought?",
  "How many plants are affected?",
  "Do you know what Pest/Disease is affecting the plant?",
  "Have you experienced above average precipitation?"];
//=========clean data===================================
   var formAnswers = [];
   var lat;
   var long;
  //console.log(req.body);
  var form = req.body.form;
  form = form.replace(/x2C/g, ",");
  //console.log(form);

   var answers = [];

           for(var j = 0; j<questions.length;j++){
                var temp = "";
                var check = 0;
                var index = 0;
                var start = form.search(questions[j]) + questions[j].length;
                while(check<2){
                    if(form[start+index] == ','){
                        check++;
                    }
                    else{
                        temp = temp + form[start+index];
                    }

                    index++;
                }
                //add each answer to a temp array
                answers.push(temp);
            }

            formAnswers.push(answers);

            let input = [{
              "q1":0,
              "q2":0,
              "q3":0,
              "q4":0,
              "q5":0,
              "lat":0,
              "long":0
          }]

          var inputLat;
        var inputLong;
        var inputQ1;
        var inputQ2;
        var inputQ3;
        var inputQ4;
        var inputQ5;
        lat = req.body.lat;
        long = req.body.long;

        //loop to make form questions numbers    formAnswers[j][k]
            for(var k=0;k<5;k++)
            {
                if(k==0){
                    switch(formAnswers[0][k]) {
                        case "Root":
                          inputQ1 = 1;
                          break;
                        case "Stem":
                          inputQ1 = 2;
                          break;
                        case "Leaf / Leaves":
                          inputQ1 = 3;
                          break;
                          case "Flowers":
                          inputQ1 = 4;
                          break;
                        default:
                          inputQ1 = 0;
                      }

                }
                if(k==1){
                    switch(formAnswers[0][k]) {
                        case "Yes":
                          inputQ2 = 1;
                          break;
                        case "No":
                          inputQ2 = 2;
                          break;
                        default:
                          inputQ2 = 0;
                      }                    
                }
                if(k==2){

                    if(formAnswers[0][k] == "Unknown"){
                        inputQ3 = 0;
                    }
                    else{
                        inputQ3 = parseInt(formAnswers[0][k]);
                    }
                          
                }
                if(k==3){
                    switch(formAnswers[0][k]) {
                        case "Yes":
                          inputQ4 = 1;
                          break;
                        case "No":
                          inputQ4 = 2;
                          break;
                        default:
                          inputQ4 = 0;
                      }         
                    
                }
                if(k==4){
                    switch(formAnswers[0][k]) {
                        case "Yes":
                          inputQ5 = 1;
                          break;
                        case "No":
                          inputQ5 = 2;
                          break;
                        default:
                          inputQ5 = 0;
                      }         
                    
                }

            }

            inputLat = lat;
            inputLong = long;
            input.push({q1:inputQ1,q2:inputQ2,q3:inputQ3,q4:inputQ4,q5:inputQ5,lat:inputLat,long:inputLong});
            //console.log(input);
   //========================================================================================================================
  
 // var i = await res; //this is the neural net
 // console.log(i);
  const brain = require('brain.js');

  var NeuralNet = {"sizes":[7,3,7],"layers":[{"q1":{},"q2":{},"q3":{},"q4":{},"q5":{},"lat":{},"long":{}},{"0":{"bias":0.061779625713825226,"weights":{"q1":-0.0938829705119133,"q2":-0.08102307468652725,"q3":0.19404275715351105,"q4":0.031166696920990944,"q5":-0.03999556973576546,"lat":-0.08524882048368454,"long":0.4263472557067871}},"1":{"bias":0.11571833491325378,"weights":{"q1":-0.8774126172065735,"q2":0.1403900533914566,"q3":3.144761323928833,"q4":-0.41192370653152466,"q5":-0.317070335149765,"lat":-0.2927870750427246,"long":0.5361372232437134}},"2":{"bias":-0.08213359117507935,"weights":{"q1":-0.11187947541475296,"q2":-0.10737530887126923,"q3":1.2224913835525513,"q4":-0.008419601246714592,"q5":0.19071975350379944,"lat":-0.38766422867774963,"long":0.6163818836212158}}},{"Army Ant":{"bias":-1.5273323059082031,"weights":{"0":-1.6222901344299316,"1":1.2773581743240356,"2":0.6981223225593567}},"Eucalyptus gall wasp":{"bias":-0.4401548504829407,"weights":{"0":-0.23178286850452423,"1":-1.6618294715881348,"2":0.2978087067604065}},"Leaf blotch":{"bias":-2.280000925064087,"weights":{"0":-2.511578321456909,"1":3.355895757675171,"2":-0.5845001935958862}},"Wattle rust":{"bias":-0.3534579277038574,"weights":{"0":-0.3740323781967163,"1":-1.6303815841674805,"2":0.35389024019241333}},"Chrysoporthe canker":{"bias":-0.6343781352043152,"weights":{"0":-0.8768157958984375,"1":-0.4503641724586487,"2":-0.02577938884496689}},"glow-Worm":{"bias":-0.37201961874961853,"weights":{"0":-0.12681488692760468,"1":-1.6702388525009155,"2":0.1987607181072235}},"Armillaria root rot":{"bias":-0.15983445942401886,"weights":{"0":-0.13170269131660461,"1":-1.8535431623458862,"2":0.1914069801568985}}}],"outputLookup":true,"inputLookup":true,"activation":"sigmoid","trainOpts":{"iterations":20000,"errorThresh":0.005,"log":false,"logPeriod":10,"learningRate":0.3,"momentum":0.1,"callbackPeriod":10,"beta1":0.9,"beta2":0.999,"epsilon":1e-8}};
  const net = new brain.NeuralNetwork();
  net.fromJSON(NeuralNet);
  var result = net.run(input);
  return result;
  
}



module.exports = {
    start,
    predict
}
