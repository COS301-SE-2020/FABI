
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Request {
    name: string;
    email: string;
    userType: string;
    password: string;
}

export class Details {
    name: string;
    surname: string;
}

export abstract class IQuery {
    abstract getnames(): Details[] | Promise<Details[]>;
}

export class Response {
    id: number;
    status: number;
    token: string;
}

export abstract class IMutation {
    abstract registerUser(request?: Request): Response | Promise<Response>;
}
