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
}
