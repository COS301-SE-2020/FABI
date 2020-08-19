import { Injectable } from '@angular/core';

// API specific imports
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '@/_UMservices/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apollo: Apollo, private authentication: AuthenticationService) { }

  updateRole(userID, role) {
    return this.apollo.mutate({
      mutation: gql `mutation {
        updateUserType(request: {
          token: "${this.authentication.currentUserValue}",
          email: "${userID}",
          newUserType: "${role}"
        }) {status}
      }`
    }).pipe(map(data => {
      return data["data"]["updateUserType"];
    }))
  }

  getBasic() {
    return this.apollo.mutate({
      mutation: gql `mutation {
        getBasicUsers(request: {token: "${this.authentication.currentUserValue}"})
        {
          name,
          surname,
          email
        }
      }`
    }).pipe(map(data => {
      return data["data"]["getBasicUsers"];
    }))
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
