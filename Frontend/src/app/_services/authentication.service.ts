import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@/environment';
import { User } from '@/_models/user';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private apollo: Apollo) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
        //     .pipe(map(user => {
        //         // store user details and jwt token in local storage to keep user logged in between page refreshes
        //         localStorage.setItem('currentUser', JSON.stringify(user));
        //         this.currentUserSubject.next(user);
        //         return user;
        //     }));
            return this.apollo.mutate({
                mutation: gql`mutation {
                    login( request: {email: "${username}", password: "${password}"})
                    {
                        token,
                        status
                    }
                }`
            }).pipe(map(user => {
                if (user["data"]["login"]["status"] == "201"){
                    localStorage.setItem('currentUser', JSON.stringify(user["data"]["login"]));
                
                    console.log(user["data"]["login"]);
                    this.currentUserSubject.next(user["data"]["login"]);
                    return user;
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
}