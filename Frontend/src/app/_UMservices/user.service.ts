/*
 * File Name: user.service.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : User model
 * Output                         : None
 * Related Requirements           : R1, R2
 * Classes in this file           : None
 * Related Documents              : None
 * 
 * Notes:
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Saturday, June 13th 2020, 10:21:27 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 2020-07-15-11-36-am	  SJ	Add coding standards
 * 
 * Functional Description         : Handles API calls relating to UM
 * Constraints                    : None
 * Assumptions                    : User has internet access
 */



// Angular specific imports
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// Model imports
import { User } from '@/_models/user';

// API imports
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
            if (user["data"]["registerUser"]["status"] == "201") {
                return user;
            } else {
                throw new Error(`Error status code ${user["data"]["registerUser"]["status"]}`);
            }

        }))
    }

}