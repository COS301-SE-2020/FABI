import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@/_models/user';

import { AuthenticationService } from '@/_services/authentication.service';
import { ReportDataService } from '@/_services/report-data.service'

import {Report_Questions} from "@/_models/Questions"

import { LocationService } from '@/_services/location.service';

@Component({
  selector: 'app-diag-report',
  templateUrl: './diag-report.component.html',
  styleUrls: ['./diag-report.component.css']
})
export class DiagReportComponent implements OnInit {

  // Model

  Answers=new Report_Questions;
  

  // TODO: Cleanup
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
   // new 01/07/2020

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

  Plant = new FormGroup({
    Question1: new FormControl(''),
    Question2: new FormControl(''),
    Question3: new FormControl(''),
  });

  PorD_Questions = new FormGroup({
    Question4: new FormControl(''),
    Question5: new FormControl(''),
    Question6: new FormControl(''),
    Question7: new FormControl(''),
    Question8: new FormControl(''),
  });
  Question4_Options: any = ["Root","Stem","Branch","Leaf / Leaves","Flowers"];

  Climate_Questions = new FormGroup({
    Question9: new FormControl(''),
    Question10: new FormControl(''),
    Question11_a: new FormControl(''),
    Question11_b: new FormControl(''),
  });

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
    this.Answers.UserToken=this.currentUser;
    if(this.Plant.get("Question1").value!="")this.Answers.Questions["Common name"]=this.Plant.get("Question1").value;
    if(this.Plant.get("Question2").value!="")this.Answers.Questions["Scientific Name"]=this.Plant.get("Question2").value;
    if(this.Plant.get("Question3").value!="")this.Answers.Questions["Cultivar"]=this.Plant.get("Question3").value;
    if(this.Answers.Questions["Do you know what Pest/Disease is affecting the plant?"]=="Yes"){
      this.Answers.Questions["What is its scientific or common name?"]=this.PorD_Questions.get("Question6").value;
    }
    if(this.Answers.Questions["How many plants are affected?"]=="Yes"){
      this.Answers.Questions["What percentage of plants are affected?"]=this.PorD_Questions.get("Question8").value;
    }
    if(this.Answers.Questions["Any other climatic conditions worth specifying?"]=="Yes"){
      this.Answers.Questions["Other climatic conditions"]=this.Climate_Questions.get("Question11_b").value;
    }

    this.Answers.Questions["UserToken"]=this.Answers.UserToken;
    console.log(this.toStr(this.Answers.Questions));
    this.Report.sendReport(this.Answers.UserToken,this.toStr(this.Answers.Questions),this.Answers.Images["Image1"],this.Answers.Images["Image2"],this.Answers.Images["Image3"],this.Answers.Questions["Longitude"],
    this.Answers.Questions["Latitude"],this.Answers.Questions["Accuracy"],this.Answers.Questions["Common name"],this.Answers.Questions["Pest Or Disease"],).subscribe(data=>{
      console.log(data);
    });



    // Debug - Download the JSON file
    //this.download(this.toJSON(this.Answers));

    this.submitted = true;
    this.router.navigate(["/basic"]);
  }

  

  toJSON(object){
      return {
        "Location":object.Location,
        "UserToken":object.UserToken,
        "Questions":object.Questions,
        "Images":object.Images
      };
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
