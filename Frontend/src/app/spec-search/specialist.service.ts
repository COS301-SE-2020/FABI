// Angular specific imports
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// API imports
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  constructor(private apollo: Apollo, private authentication: AuthenticationService) { }

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
}
