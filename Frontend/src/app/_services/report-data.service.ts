import { Injectable } from '@angular/core';
import { Report } from '@/_models/report'

// Get
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportDataService {
  private currentMarker: BehaviorSubject<Report>;
  public currentMark: Observable<Report>;

  constructor(private apollo: Apollo) {
  }
  public get currentRepValue(): Report {
    return this.currentMarker.value;
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




}
