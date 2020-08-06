import { Injectable } from '@angular/core';
import { Report } from '@/_models/report'

// Get
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { BehaviorSubject, Observable,Subject, Subscription } from 'rxjs';

export interface nearbyReport {
  ID: number;
  Pname: string;
  distance: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportDataService {
  private nearbyReports:  nearbyReport[];
  private currentMarker: BehaviorSubject<Report>;
  public currentMark: Observable<Report>;
  public nearbyReport:Observable<nearbyReport>;
  private reportLenth;
  

  constructor(private apollo: Apollo) {
  }
  public get currentRepValue(): Report {
    return this.currentMarker.value;
  }
  public get getNearbyReports() {
    return this.nearbyReports;
  }
  public get reportsLength() {
    return this.reportLenth;
  }

  getMarkers(token, latitude, longitude) {
    return this.apollo.mutate({
      mutation: gql`mutation {
                  getReports( getReportsRequest: {token: "${token}", latitude: ${latitude},longitude:${longitude}})
                  {
                      status,
                      reports
                  }
              }`
    }).pipe(map(data => {
      if (data["data"]["getReports"]["status"] == "201") {

        return JSON.parse(data["data"]["getReports"]["reports"]);
      } else {
        throw new Error(`Error status code ${data["data"]["getReports"]["status"]}`);
      }

    }))
  }

  sendReport(token, report, Img1, Img2, Img3, long, lat, acc, plant, infliction) {
    return this.apollo.mutate({
      mutation: gql`mutation {
                  upload( upload: {token: "${token}", report: "${report}",Img1:"${Img1}",Img2:"${Img2}",Img3:"${Img3}",Longitude:${long},Latitude:${lat},Accuracy:${acc},Pname:"${plant}",Infliction:"${infliction}"})
                  {
                      status
                  }
              }`
    }).pipe(map(data => {
      return data["data"];

    }))
  }

  requestNearbyReports(page, reportID, token){
    var pageSize=5;
    var startIndex=pageSize*(page);
    return this.apollo.mutate({
      mutation: gql`mutation {
                  popTableBasicUser( request: {reportID: ${reportID}, token: "${token}"})
                  {
                      date,
                      distance,
                      Pname,
                      ID
                  }
              }`
    }).pipe(map(data => {
      var list:Array<nearbyReport> = data["data"]["popTableBasicUser"];
      this.reportLenth=list.length;
      this.nearbyReports=list.slice(startIndex,startIndex+pageSize);
      return this.nearbyReports;

    }))
  }



}
