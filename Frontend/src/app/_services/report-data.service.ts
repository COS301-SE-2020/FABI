import { Injectable } from '@angular/core';
import { Report } from '@/_models/report'

// Get
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

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
  private nearbyReports: nearbyReport[];
  private currentMarker: BehaviorSubject<Report>;
  public currentMark: Observable<Report>;
  public nearbyReport: Observable<nearbyReport>;
  private reportLenth;


  constructor(private apollo: Apollo) {
  }
  public get currentRepValue(): Report {
    return this.currentMarker.value;
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
                      userType,
                      Lat,
                      Long,
                      ID
                  }
              }`
    }).pipe(map(data => {
      return (data["data"]["getReports"]);

    }))
  }

  getReportDetails(token, ID) {
    return this.apollo.mutate({
      mutation: gql`mutation {
                  getSingleReport( getSingleReportRequest: {token: "${token}", reportID: ${ID}})
                  {
                      Pname,
                      Infliction,
                      Accuracy,
                      Img1,
                      Img2,
                      Img3,
                      NeuralNetRating,
                      form
                  }
              }`
    }).pipe(map(data => {
      return data["data"]["getSingleReport"];

    }))
  }

  sendReport(token, report, Img1, Img2, Img3, long, lat, acc, plant, infliction) {
    return this.apollo.mutate({
      mutation: gql`mutation {
                  upload( upload: {token: "${token}", report: "${report}",Urgency:1,Latitude:${lat},Longitude:${long},Accuracy:${acc},Pname:"${plant}",Infliction:"${infliction}",Img1:"${Img1}",Img2:"${Img2}",Img3:"${Img3}"})
                  {
                      status
                  }
              }`
    }).pipe(map(data => {
      return data["data"];

    }))
  }

  // For tests
  getMarkerNames(token, latitude, longitude){
    return this.apollo.mutate({
      mutation: gql`mutation {
                  getReports( getReportsRequest: {token: "${token}", latitude: ${latitude},longitude:${longitude}})
                  {
                      status,
                      Pname,
                      Lat,
                      Long,
                      ID
                  }
              }`
    }).pipe(map(data => {
      return (data["data"]["getReports"]);

    }))
  }


  requestNearbyReports(reportID, token) {
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
      localStorage.setItem("nearbyReports", JSON.stringify(data["data"]["popTableBasicUser"]))

    }))
  }

  getNearbyReports(page) {
    var pageSize = 5;
    var startIndex = pageSize * (page);
    var list: Array<nearbyReport> = JSON.parse(localStorage.getItem("nearbyReports"));
    this.reportLenth = list.length;
    this.nearbyReports = list.slice(startIndex, startIndex + pageSize);
    return this.nearbyReports;

  }

  requestNearbyReportsMobile(token,latitude,longitude) {
    return this.apollo.mutate({
      mutation: gql`mutation{
                  getReportsMobile(getReportsRequest:{token:"${token}",latitude:${latitude},longitude:${longitude}}){
                        date,
                        distance,
                        Pname,
                        ID,
                        status
                      }
                  }`
    }).pipe(map(data => {
      localStorage.setItem("nearbyReportsMobile", JSON.stringify(data["data"]["getReportsMobile"]))

    }))
  }

  getNearbyReportsMobile(page) {
    var pageSize = 8;
    var startIndex = pageSize * (page);
    var list: Array<nearbyReport> = JSON.parse(localStorage.getItem("nearbyReportsMobile"));
    this.reportLenth = list.length;
    this.nearbyReports = list.slice(startIndex, startIndex + pageSize);
    return this.nearbyReports;

  }

  


}
