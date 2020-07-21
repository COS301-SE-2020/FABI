/*
 * File Name: affliction.service.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : None
 * Output                         : None
 * Related Requirements           : None
 * Classes in this file           : None
 * Related Documents              : None
 * 
 * Notes:
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Wednesday, July 15th 2020, 4:17:58 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 2020-07-21-10-55-am	  SJ	Add delete affliction
 * 
 * Functional Description         : This service will retrieve data from the api relating to afflictions
 * Constraints                    : None
 * Assumptions                    : None
 */




import { Injectable } from '@angular/core';
import { Affliction } from '@/_models/affliction';
import { Observable } from 'rxjs';
import { AuthenticationService } from "../_services/authentication.service";
// API specific imports
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AfflictionService {

  constructor(private apollo: Apollo, private authentication: AuthenticationService) { }

  getAffliction(id: number) {
    return this.apollo.mutate({
      mutation: gql `mutation {
        get_Single_affliction( request: { id: ${id}, token: "${this.authentication.currentUserValue}" } )
        {
          id,
          type,
          scienceName,
          name,
          plant,
          distribution,
          status,
          description,
          symptoms,
          management,
          img1,
          img2,
          img3,
          statusCode,
        }
      }`
    }).pipe(map(data => {
      return data["data"]["get_Single_affliction"]
    }))
  }
  getPests() {
    return this.apollo.mutate({
      mutation: gql `mutation {
        get_afflictions( request: { affliction_type: "Pest", token: "${this.authentication.currentUserValue}" } )
        {
          id,
          type,
          scientificName,
          name,
          plant,
          status
        }
      }`
    }).pipe(map(data => {
      return data["data"]["get_afflictions"]
    }))
  }
  getPathogens() {
    return this.apollo.mutate({
      mutation: gql `mutation {
        get_afflictions( request: { affliction_type: "Pathogen", token: "${this.authentication.currentUserValue}" } )
        {
          id,
          type,
          scientificName,
          name,
          plant,
          status
        }
      }`
    }).pipe(map(data => {
      return data["data"]["get_afflictions"]
    }))
  }

  updateAffliction(id: number, affliction: Affliction) {
    let token = this.authentication.currentUserValue
    return this.apollo.mutate({
      mutation: gql `mutation {
        update_afflictions( request: { 
          id: ${id},
          token: "${token}",
          type: "${affliction.type}",
          scienceName: "${affliction.scienceName}",
          name: "${affliction.name}",
          plant: "${affliction.plant}",
          distribution: "${affliction.distribution}",
          status: "${affliction.status}",
          description: "${affliction.description}",
          symptoms: "${affliction.symptoms}",
          management: "${affliction.management}",
          img1: "${affliction.images[0]}",
          img1: "${affliction.images[1]}",
          img1: "${affliction.images[2]}"
         } )
        {
          status
        }
      }`
    }).pipe(map(data => {
      return data["data"]["update_afflictions"]["status"]
    }))
  }

  deleteAffliction(id: number) {
    // TODO: GraphQL connection goes here
  }
  // End of file
}
