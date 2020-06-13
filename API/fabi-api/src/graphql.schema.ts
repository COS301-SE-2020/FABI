
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class LoginRequest {
    email: string;
    password: string;
}

export class Request {
    name: string;
    surname: string;
    email: string;
    userType: string;
    password: string;
}

export class LoginResponse {
    id: number;
    token: string;
    status: number;
}

export abstract class IMutation {
    abstract login(request?: LoginRequest): LoginResponse | Promise<LoginResponse>;

    abstract registerUser(request?: Request): Response | Promise<Response>;
}

export abstract class IQuery {
    abstract dummy(): string | Promise<string>;
}

export class Response {
    status: number;
    token: string;
}
