import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {environment} from '@/environment';
import { User } from '@/_models/user';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private apollo: Apollo) { }

    register(user: User) {
        return this.apollo.mutate({
            mutation: gql`mutation {
                registerUser( request: {
                    name: "${user.firstName}", surname: "${user.lastName}", email: "${user.username}", password: "${user.password}", userType: "basic"
                })
                {
                    token,
                    status
                }
            }`
        }).pipe(map(user => {
            if (user["data"]["registerUser"]["status"] == "201"){
                return user;
            } else {
                throw new Error(`Error status code ${user["data"]["registerUser"]["status"]}`);
            }

        }))
    }

}