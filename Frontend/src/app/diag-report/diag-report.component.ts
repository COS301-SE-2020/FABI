import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Subject, Observable} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@/_models/user';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

import { AuthenticationService } from '@/_services/authentication.service';
import { ReportDataService } from '@/_services/report-data.service'

import {Report_Questions} from "@/_models/Questions"
import { LocationService } from '@/_services/location.service';



export interface Questions{
  Question: string;
  Answer: string;
}

@Component({
  selector: 'app-diag-report',
  templateUrl: './diag-report.component.html',
  styleUrls: ['./diag-report.component.css']
})
export class DiagReportComponent implements OnInit {

  // Model

  Answers=new Report_Questions;
  
  public enterImage:Boolean=false;
  public currentUser: User;
  public submitted = false;
  public today : number = Date.now();
  public Lat:any;
  public Long:any;
  public Acc:any;
  public Images:Array<any>=[];
  public ImageDataCount:number=0;

  public selectedValue: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder, 
    private location : LocationService, 
    private router: Router,
    private Report: ReportDataService) {
      this.currentUser = this.authenticationService.currentUserValue;
    
   }
   
  //  Answers
  responses : Array<Questions>=[
    {
      Question:"Common name",
      Answer:""
    },
    {
      Question:"Scientific Name",
      Answer:""
    },
    {
      Question:"Cultivar",
      Answer:""
    },
    {
      Question:"Where do you see the Pest/Disease on the plant?",
      Answer:""
    },
    {
      Question:"Do you know what Pest/Disease is affecting the plant?",
      Answer:""
    },
    {
      Question:"What is its scientific or common name?",
      Answer:""
    },
    {
      Question:"How many plants are affected?",
      Answer:""
    },
    {
      Question:"What percentage of plants are affected?",
      Answer:""
    },
    {
      Question:"Are you experiencing a drought?",
      Answer:""
    },
    {
      Question:"Have you experienced above average precipitation?",
      Answer:""
    },
    {
      Question:"Any other climatic conditions worth specifying?",
      Answer:""
    },
    {
      Question:"Other climatic conditions",
      Answer:""
    },
  ];

   ImageData = new FormGroup({
        Description:new FormControl('')
   });

   setImageData(){
      this.Answers.Images["Image"+this.Images.length]=this.Images[this.Images.length-1].src;
      this.enterImage=false;
      this.ImageData.reset();
      this.ImageDataCount++;
   }

   clearImages(){
     this.ImageDataCount=0;
     this.Answers.Images={};
     this.Images=[];
   }
   

   
   PorD_Selected:Boolean;
   PorD_Options: Array<string> = ["Pest","Disease"];
   YNOptions: any=["Yes","No"];
   MultiOptions: any=["One","More than one"];
    PestOrDiseases = new FormGroup({
      PorD : new FormControl('')
    });

    Questionnaire = this.formBuilder.group({
      Question1: ['',Validators.required],
      Question2: ['',Validators.required],
      Question3: ['',Validators.required],
      Question4: ['',Validators.required],
      Question5: ['',Validators.required],
      Question6: ['',Validators.required],
      Question7: ['',Validators.required],
      Question8: ['',Validators.required],
      Question9: ['',Validators.required],
      Question10: ['',Validators.required],
      Question11: ['',Validators.required],
      Question12: ['',Validators.required],
    });
    

    Question4_Options: any = ["Root","Stem","Branch","Leaf / Leaves","Flowers"];

  getErrorMessage(){
    return 'Enter \"Unknown\" if you don\'t know the answer.';
  }

  QuestionDesc : Array<string> = [
    "Common name",
    "Scientific Name",
    "Cultivar",
    "Where do you see the Pest/Disease on the plant?",
    "Do you know what Pest/Disease is affecting the plant?",
    "What is its scientific or common name?",
    "How many plants are affected?",
    "What percentage of plants are affected?",
    "Are you experiencing a drought?",
    "Have you experienced above average precipitation?",
    "Any other climatic conditions worth specifying?",
    "Other climatic conditions",
    ];

  changeType(){
    this.PorD_Selected=true;
    this.Answers.Questions["Pest Or Disease"]=this.PestOrDiseases.value["PorD"];
  }
  change(question,e){
    this.Answers.Questions[this.QuestionDesc[question-1]]=e.target.value;
  }
  toStr(object){
    var string:String="";
    this.QuestionDesc.forEach(element => {
      string+=element+","+object[element]+",";
    });
    return string;
  }
  
  onSubmit(){
    // Add error checking on bootstrap (Empty fields etc)
    this.responses;
    console.log(this.responses);
    return;
    // 07/08/2020
    
    // this.Answers.UserToken=this.currentUser;
    // if(this.Plant.get("Question1").value!="")this.Answers.Questions["Common name"]=this.Plant.get("Question1").value;
    // if(this.Plant.get("Question2").value!="")this.Answers.Questions["Scientific Name"]=this.Plant.get("Question2").value;
    // if(this.Plant.get("Question3").value!="")this.Answers.Questions["Cultivar"]=this.Plant.get("Question3").value;
    // if(this.Answers.Questions["Do you know what Pest/Disease is affecting the plant?"]=="Yes"){
    //   this.Answers.Questions["What is its scientific or common name?"]=this.PorD_Questions.get("Question6").value;
    // }
    // if(this.Answers.Questions["How many plants are affected?"]=="Yes"){
    //   this.Answers.Questions["What percentage of plants are affected?"]=this.PorD_Questions.get("Question8").value;
    // }
    // if(this.Answers.Questions["Any other climatic conditions worth specifying?"]=="Yes"){
    //   this.Answers.Questions["Other climatic conditions"]=this.Climate_Questions.get("Question11_b").value;
    // }

    // this.Answers.Questions["UserToken"]=this.Answers.UserToken;
    // this.Report.sendReport(this.Answers.UserToken,this.toStr(this.Answers.Questions),this.Answers.Images["Image1"],this.Answers.Images["Image2"],this.Answers.Images["Image3"],this.Answers.Questions["Longitude"],
    // this.Answers.Questions["Latitude"],this.Answers.Questions["Accuracy"],this.Answers.Questions["Common name"],this.Answers.Questions["Pest Or Disease"],).subscribe(data=>{
    //   console.log(data);
    // });



    // Debug - Download the JSON file
    //this.download(this.toJSON(this.Answers));

    this.submitted = true;
    this.router.navigate(["/basic"]);
  }


  onCancel(){
    this.submitted = false;
    this.router.navigate(["/basic"]);
  }

  // toggle webcam on/off
  public toggleImageData=false;
  public showWebcam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];


  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
    this.location.getLocation().subscribe(rep=>{
      this.Answers.Questions["Latitude"]=rep.coords.latitude;
      this.Answers.Questions["Longitude"]=rep.coords.longitude;
      this.Answers.Questions["Accuracy"]=rep.coords.accuracy;

      this.Lat=(rep.coords.latitude).toPrecision(4);
      this.Long=(rep.coords.longitude).toPrecision(4);
      this.Lat=(this.Lat<0?0-this.Lat+" S":this.Lat+" N")
      this.Long=(this.Long<0?0-this.Long+" E":this.Long+" W")
    });
}


public triggerSnapshot(): void {
  this.trigger.next();
}

public toggleWebcam(): void {
  this.showWebcam = !this.showWebcam;
}

public handleInitError(error: WebcamInitError): void {
  this.errors.push(error);
}

public showNextWebcam(directionOrDeviceId: boolean|string): void {
  // true => move forward through devices
  // false => move backwards through devices
  // string => move to device with given deviceId
  this.nextWebcam.next(directionOrDeviceId);
}

public handleImage(webcamImage: WebcamImage): void {
  var image = new Image();
  image.src = webcamImage.imageAsDataUrl;
  this.Images.push(image);

  this.webcamImage = webcamImage;
}

public cameraWasSwitched(deviceId: string): void {
  this.deviceId = deviceId;
}

public get triggerObservable(): Observable<void> {
  return this.trigger.asObservable();
}

public get nextWebcamObservable(): Observable<boolean|string> {
  return this.nextWebcam.asObservable();
}

}
