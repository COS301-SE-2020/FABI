import { Injectable } from '@angular/core';
import { AuthenticationService } from "../_services/authentication.service";
// API specific imports
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apollo: Apollo, private authentication: AuthenticationService) { }

  bigChart() {
    return this.apollo.mutate({
      mutation: gql `mutation {
        get_GraphInfo( request: { token: "${this.authentication.currentUserValue}" } )
        {
          data,
          status
        }
      }`
    }).pipe(map(data => {
      return data["data"]["get_GraphInfo"]["data"]
    }))
  }

  cards() {
    return [71, 78, 39, 66]
  }

  pieChart() {
    return [{
      name: 'Aphids',
      y: 61.41,
      sliced: true,
      selected: true
    }, {
      name: 'Cicadas',
      y: 11.84
    }, {
      name: 'Corn Earworms',
      y: 10.85
    }, {
      name: 'Cabbage Worms',
      y: 4.67
    }, {
      name: 'Sclerotinia',
      y: 4.18
    }, {
      name: 'Soybean Cyst',
      y: 1.64
    }, {
      name: 'Bean Pod Mottle',
      y: 1.6
    }, {
      name: 'Bacterial Blight',
      y: 1.2
    }, {
      name: 'Other',
      y: 2.61
    }]
  }
}
