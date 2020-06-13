import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {environment} from '@/environment';
import { User } from '@/_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor() { }

    register(user: User) {
        
    }

}