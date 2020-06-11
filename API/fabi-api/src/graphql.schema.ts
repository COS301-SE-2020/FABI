
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
    email: string;
    userType: string;
    password: string;
}

export class LoginResponse {
    id: number;
    token: string;
}

export abstract class IMutation {
    abstract login(request?: LoginRequest): LoginResponse | Promise<LoginResponse>;

    abstract registerUser(request?: Request): Response | Promise<Response>;
}

export abstract class IQuery {
    abstract dummy(): string | Promise<string>;
}

export class Response {
    id: number;
    status: number;
    token: string;
}
