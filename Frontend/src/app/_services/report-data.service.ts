import { Injectable } from '@angular/core';
import {Report} from '@/_models/report'
import * as Markers from '@/Markers.json';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportDataService {
  markers:  any=(Markers as any).default;
  private currentMarker: BehaviorSubject<Report>;
  public currentMark: Observable<Report>;

    constructor() { 
      this.currentMarker = new BehaviorSubject<Report>(JSON.parse(localStorage.getItem("currentMarker")));
      this.currentMark = this.currentMarker.asObservable();
    }
    public get currentRepValue(): Report {
      return this.currentMarker.value;
    }

    setMID(mid){
      this.currentMarker = new BehaviorSubject<Report>((this.markers[mid]));
    }

    
}
