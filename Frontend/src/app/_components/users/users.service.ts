import { Injectable } from '@angular/core';

// API specific imports
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '@/_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apollo: Apollo, private authentication: AuthenticationService) { }

  updateRole(userID, role) {
    return this.apollo.mutate({
      mutation: gql `mutation {
        
      }`
    })
  }

  getSpecial() {
    return this.apollo.mutate({
      mutation: gql `mutation {
        getSpecialUsers( request: { token: "${this.authentication.currentUserValue}" })
        {
          status,
          name,
          surname,
          email,
          userType
        }
      }`
    }).pipe(map(data => {
      return data["data"]["getSpecialUsers"];
    }))
  }
}
