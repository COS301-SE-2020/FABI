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
}
