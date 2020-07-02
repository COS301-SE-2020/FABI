
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class GetReportsRequest {
    email: string;
    token: string;
    latitude: number;
    longitude: number;
}

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

export class UploadRequest {
    email: string;
    token: string;
    report: string;
    Img1: string;
    Img2: string;
    Img3: string;
}

export class GetReportsResponse {
    reports: string;
    status: number;
}

export class LoginResponse {
    email: string;
    token: string;
    status: number;
}

export abstract class IMutation {
    abstract login(request?: LoginRequest): LoginResponse | Promise<LoginResponse>;

    abstract registerUser(request?: Request): Response | Promise<Response>;

    abstract getReports(getReportsRequest?: GetReportsRequest): GetReportsResponse | Promise<GetReportsResponse>;

    abstract upload(upload?: UploadRequest): UploadResponse | Promise<UploadResponse>;
}

export abstract class IQuery {
    abstract dummy(): string | Promise<string>;
}

export class Response {
    status: number;
    token: string;
}

export class UploadResponse {
    email: string;
    status: number;
}
