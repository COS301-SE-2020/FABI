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

  adminTable() {
    console.log(this.authentication.currentUserValue)
    return this.apollo.mutate({
      mutation: gql`mutation {
        get_TableInfo( request: { token: "${this.authentication.currentUserValue}" } ) {
          data,
          status
        }
      }`
    }).pipe(map(data => {
      return data["data"]["get_TableInfo"]["data"]
    }))
  }

  bigChart() {
    return this.apollo.mutate({
      mutation: gql`mutation {
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
    return this.apollo.mutate({
      mutation: gql`mutation {
        get_CardsInfo(request: { token: "${this.authentication.currentUserValue}" })
        {
          name,
          thisWeek,
          lastWeek,
          twoWeeksAgo
        }
      }`
    }).pipe(map(data => {
      return data["data"]["get_CardsInfo"]
    }))
  }

  pieChart() {

    return this.apollo.mutate({
      mutation: gql`mutation {
        get_PieChartInfo( request: { token: "${this.authentication.currentUserValue}" } )
        {
          name,
          y
        }
      }`
    }).pipe(map(data => {

      return data["data"]["get_PieChartInfo"]
    }))
  }
}