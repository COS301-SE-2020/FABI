import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Subject, Observable} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@/_models/user';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

import { AuthenticationService } from '@/_services/authentication.service';
import { ReportDataService } from '@/_services/report-data.service'

import {Report_Questions} from "@/_models/Questions"
import { LocationService } from '@/_services/location.service';
import { DeviceDetectorService } from 'ngx-device-detector';



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
  public Images:Array<any>=[];
  public ImageDataCount:number=0;
  public device=sessionStorage.getItem("DeviceType");

  public selectedValue: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    public deviceService: DeviceDetectorService,
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
      Question:"What percentage of this plant type is affected?",
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
      this.Answers["Img"+(this.Images.length)]=this.Images[this.Images.length-1].src;
      this.enterImage=false;
      this.ImageData.reset();
      this.ImageDataCount++;
   }

   clearImages(){
     this.ImageDataCount=0;
     this.Answers.Img1="";
     this.Answers.Img2="";
     this.Answers.Img3="";
     this.Images=[];
   }
   

   
   PorD_Selected:Boolean;
   PorD_Options: Array<string> = ["Pest","Disease"];
   YNOptions: any=["Yes","No"];
   MultiOptions: any=["One","More than one"];
   PlantOptions= ["Common name","Scientific name"];

    

    Questionnaire = this.formBuilder.group({
      knownNames:[''],
      Question1: ['Unknown',Validators.required],
      Question2: ['Unknown',Validators.required],
      Question3: ['Unknown'],
      PestOrDiseases:['',Validators.required],
      Question4: ['',Validators.required],
      Question5: ['',Validators.required],
      Question6: ['Unknown',Validators.required],
      Question7: ['Unknown',Validators.required],
      Question8: ['Unknown',Validators.required],
      Question9: ['',Validators.required],
      Question10: ['',Validators.required],
      Question11: ['',Validators.required],
      Question12: ['Unknown'],
    });
    

    Question4_Options: any = ["Root","Stem","Branch","Leaf / Leaves","Flowers"];
    Question5_Options: any={
      Pests:[
        "Deodar weevil",
        "Bronze bug",
        "Eucalyptus weevil/snout beetle",
        "Wattle bagworm",
        "Sirex woodwasp",
        "Bluegum chalcid",
        "Wattle mirid",
        "Cossid moth/Quince borer",
        "Shell lerp psyllid",
        "Eucalyptus gall wasp",
        "Red gum lerp psyllid",
        "Other"
      ],
      Diseases:[
        "Eucalyptus/guava/myrtle rust pathogen",
        "Chrysoporthe canker",
        "Kirramyces stem canker ",
        "Leaf blotch",
        "Pitch canker",
        "Wattle rust",
        "Ceratocystis wattle wilt",
        "Botryosphaeriaceae canker",
        "Armillaria root rot",
        "Phytophthora root rot",
        "Other"
      ]
    }

  getErrorMessage(Question){
    switch (Question) {
      case "Question1":
        return "Unselect 'Common name' if you don\'t know this."
      case "Question2":
        return "Unselect 'Scientific name' if you don\'t know this."
      case "Question3":
        return "."
    }
  }

  getSelected(options,option){
    for(var i=0;i<options.length;i++){
      if(options[i].value==option)return true;
    }
    return false;
  }

  isSelected(Qnumber,option){
    let response = this.Questionnaire.controls["Question"+Qnumber].value;
    if(response==option)return true;
    return false;
  }

 
  onSubmit(){
    // Add error checking on bootstrap (Empty fields etc)
    var i=1;
    this.responses.forEach(element=>{
      element.Answer=this.Questionnaire.controls["Question"+(i++)].value
    });
    this.Answers.infliction=this.Questionnaire.controls["PestOrDiseases"].value;
    if(this.Questionnaire.controls["Question1"].value!="Unknown"){
      this.Answers.plant=this.Questionnaire.controls["Question1"].value;
    }
    else {
      this.Answers.plant=this.Questionnaire.controls["Question2"].value;
    }
    this.Answers.report=this.createJSONstring(this.responses);
    this.Report.sendReport(
      this.currentUser,
      this.Answers.report,
      this.Answers.Img1,
      this.Answers.Img2,
      this.Answers.Img3,
      this.Answers.long,
      this.Answers.lat,
      this.Answers.acc,
      this.Answers.plant,
      this.Answers.infliction).subscribe(data => {
        console.log(data);
      });
      console.log(this.currentUser,
        this.Answers.report,
        this.Answers.long,
        this.Answers.lat,
        this.Answers.acc,
        this.Answers.plant,
        this.Answers.infliction);

    this.submitted = true;
    this.router.navigate(["/basic"]);
  }

  createJSONstring(arr:Array<Questions>){
    var string="";
    arr.forEach(element => {
      string+=element.Question+"x2C"+element.Answer+"x2C";
    });
    string.substring(0,string.length-3);
    return string;
  }


  onCancel(){
    this.submitted = false;
    this.router.navigate(["/basic"]);
  }

  // toggle webcam on/off
  public toggleImageData=false;
  public showWebcam = true;
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
    window.onbeforeunload = function() {
      return "Dude, are you sure you want to leave? Think of the kittens!";
    }

    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
    this.location.getLocation().subscribe(rep=>{
      this.Answers.lat=rep.coords.latitude;
      this.Answers.long=rep.coords.longitude;
      this.Answers.acc=rep.coords.accuracy;
    });
}

setImage(ev){
  var reader = new FileReader();
   reader.readAsDataURL(ev.target.files[ev.target.files.length-1]);
    this.Images.push(reader.result);
}




public triggerSnapshot(): void {
  this.trigger.next();
  
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
