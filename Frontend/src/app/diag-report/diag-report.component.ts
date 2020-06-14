import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';

import { LocationService } from '@/_services/location.service';

@Component({
  selector: 'app-diag-report',
  templateUrl: './diag-report.component.html',
  styleUrls: ['./diag-report.component.css']
})
export class DiagReportComponent implements OnInit {
  diagForm: FormGroup;
  today : number = Date.now();
  lat;long;acc;
  Q1=[];
  Q4=[];
  Q6=[];
  Q7=[];

  selectedValue: string = '';

  constructor(private formBuilder: FormBuilder, private location : LocationService) {
    
   }
  // toggle webcam on/off
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
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
    this.location.getLocation().subscribe(rep=>{
      this.lat=rep.coords.latitude;
      this.long=rep.coords.longitude;
      this.acc=rep.coords.accuracy;
    });
    this.diagForm = this.formBuilder.group({
      Date: ['', Validators.required],
      location:[''],
      CN: ['', Validators.required],
      SN: [''],
      Cu: [''],
      Q1: ['', Validators.required],
      Q2: ['', Validators.required],
      Q3: ['', Validators.required],
      Q4: ['', Validators.required],
      Q5: ['', Validators.required],
      Q6: ['', Validators.required],
      Q7: ['', Validators.required],
  });
  this.Q1 = this.getPlantParts();
  this.Q4 = this.getnumPlants();
  this.Q6 = this.getYNConditional();
  this.Q7 = this.getYNConditional();
  


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
  console.info('received webcam image', webcamImage);
  this.webcamImage = webcamImage;
}

public cameraWasSwitched(deviceId: string): void {
  console.log('active device: ' + deviceId);
  this.deviceId = deviceId;
}

public get triggerObservable(): Observable<void> {
  return this.trigger.asObservable();
}

public get nextWebcamObservable(): Observable<boolean|string> {
  return this.nextWebcam.asObservable();
}

getnumPlants() {
  return [
    { id: 'np1', name: 'One' },
    { id: 'np2', name: 'More than one' }
  ];
}
getPlantParts(){
  return [
    {id: 'pp1', name: 'Root'},
    {id: 'pp2', name: 'Stem'},
    {id: 'pp3', name: 'Branch'},
    {id: 'pp4', name: 'Leaf / Leaves'},
    {id: 'pp5', name: 'Flowers'}
  ];
}
getYNConditional(){
  return [
    {id:"1", name:"Yes"},
    {id:"2", name:"No"}
  ];
}

}
