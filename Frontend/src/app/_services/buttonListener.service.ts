import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonListenerService {
  private Style = new Subject<any>();
  private Device = new Subject<any>();

  constructor() {
  }

  switchStyle(style: string) {
    this.Style.next({ text: style });
  }

  getStyle(): Observable<any> {
    return this.Style.asObservable();
  }

  switchDevice(device: string){
    this.Device.next({ text: device });
  }

  getDevice(){
    return this.Device.asObservable();
  }

}
