/*
 * File Name: authentication.service.ts
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
 * Related Requirements           : R1, R2
 * Classes in this file           : None
 * Related Documents              : None
 * 
 * Notes:
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Sunday, June 28th 2020, 1:42:00 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 2020-07-15-11-45-am	  SJ	Add coding standards
 * 
 * Functional Description         : Used for communicating with the API to log users in and out
 * Constraints                    : None
 * Assumptions                    : None
 */




// Angular specific imports
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { User } from '@/_models/user';

// API specific imports
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

// encoding
import { sha256 } from 'js-sha256';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    private currentUserTypeSubject: BehaviorSubject<any>;
    public currentUser: Observable<User>;
    public currentUserType: Observable<any>;

    constructor(private apollo: Apollo) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentUserTypeSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('0')));
        this.currentUser = this.currentUserTypeSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    
    public get currentUserTypeValue(): String {
        return this.currentUserTypeSubject.value;
    }

    login(username, password) {
        return this.apollo.mutate({
            mutation: gql`mutation {
                    login( request: {email: "${username}", password: "${password}"})
                    {
                        token,
                        status
                    }
                }`
        }).pipe(map(user => {
            if (user["data"]["login"]["status"] == "201") {
                localStorage.setItem('currentUser', JSON.stringify(user["data"]["login"]["token"]));

                this.currentUserSubject.next(user["data"]["login"]["token"]);
                return user["data"]["login"]["token"];
            } else {
                throw new Error(`Error status code ${user["data"]["login"]["status"]}`);
            }

        }))
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    getUserType(token){
        return this.apollo.mutate({
            mutation: gql`mutation {
                    getUserType(request:{
                    token:"${token}"
                    }){
                    UserType
                    }
              }`
        }).pipe(map(data => {
            return (data["data"]["getUserType"]["UserType"]);
        }));
    }

    isLoggedIn(){
        if(this.currentUserValue)return true;
        else return false;
    }
}