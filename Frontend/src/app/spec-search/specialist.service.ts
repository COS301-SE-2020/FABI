/*
 * File Name: specialist.service.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : <Inputs if any, otherwise state None>
 * Output                         : <Outputs if any, otherwise state None>
 * Related Requirements           : <Requirements supported (R1. Register)>
 * Classes in this file           : <List any classes contained>
 * Related Documents              : <Name of documents, URL if possible>
 * 
 * Notes:
 *            Version:            : 0.2.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Monday, August 17th 2020, 8:48:20 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : <Provide a brief explanation of the file's purpose>
 * Constraints                    : <Explain constraints if any, otherwise state None>
 * Assumptions                    : <Explain assumptions if any, otherwise state None>
 */




// Angular specific imports
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// API imports
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AuthenticationService } from '../_UMservices/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  constructor(private apollo: Apollo, private authentication: AuthenticationService) { }
  /**
   * Filters reports
   * @param latitude 
   * @param longitude 
   * @param verification 
   * @param diagnosis 
   * @param distance 
   * @param formSearch 
   * @returns data
   */
  filterReports(latitude, longitude, verification, diagnosis, distance, formSearch) {
    return this.apollo.mutate({
      mutation: gql `mutation {
        getFilteredReports(getReportsRequest: {
          token: "${this.authentication.currentUserValue}",
          latitude: ${latitude},
          longitude: ${longitude},
          verification: "${verification}",
          diagnosis: "${diagnosis}",
          distance: ${distance},
          formSearch: "${formSearch}"
        })
        {
          form,
          Pname,
          status,
          date,
          ID
        }
      }`
    }).pipe(map(data => {
      return data["data"]["getFilteredReports"];
    }))
  }
/**
 * Diagnoses specialist service
 * @param reportID 
 * @param diagnosis 
 * @param reason 
 * @returns status 
 */
diagnose(reportID, diagnosis, reason) {
    return this.apollo.mutate({
      mutation: gql `mutation {
        uploadDiagnosis_Reason(upload: {
          token: "${this.authentication.currentUserValue}",
          reportID: ${reportID},
          diagnosis: ${diagnosis},
          reason: ${reason}
        })
        {
          status
        }
      }`
    }).pipe(map(data => {
      return data["data"]["uploadDiagnosis_Reason"]
    }))
  }
/**
 * Verifys specialist service
 * @param reportID 
 * @param verification 
 * @param comment 
 * @returns  status
 */
verify(reportID, verification, comment) {
    return this.apollo.mutate({
      mutation: gql `mutation {
        updateVerificationStatus(upload: {
          token: "${this.authentication.currentUserValue}",
          reportID: ${reportID},
          verification: ${verification},
          comment: ${comment}
        })
        {
          status
        }
      }`
    })
  }
  /**
   * Gets diagnosis
   * @param reportID 
   * @returns  diagnosis, status, reason, comment
   */
  getDiagnosis(reportID) {
    return this.apollo.mutate({
      mutation: gql `mutation {
        getDiagnosis_Reason(getSingleReportRequest: {
          token: "${this.authentication.currentUserValue}",
          reportID: ${reportID}
        })
        {
          diagnosis,
          status,
          reason,
          comment
        }
      }`
    })
  } 
}
