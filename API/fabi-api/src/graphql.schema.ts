
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class All_afflictions_request {
    affliction_type: string;
    token: string;
}

export class GetReportsRequest {
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

export class Update_afflictions_request {
    id: number;
    token: string;
    type?: string;
    scienceName?: string;
    name?: string;
    plant?: string;
    distribution?: string;
    status?: string;
    description?: string;
    symptoms?: string;
    management?: string;
    img1?: string;
    img2?: string;
    img3?: string;
}

export class UploadRequest {
    token: string;
    report: string;
    Img1: string;
    Img2: string;
    Img3: string;
}

export class All_afflictions {
    id?: number;
    type?: string;
    scientificName?: string;
    name?: string;
    plant?: string;
    status?: number;
}

export class GetReportsResponse {
    reports: string;
    status: number;
}

export class LoginResponse {
    email: string;
    token: string;
    status: number;
    Usertype: string;
}

export abstract class IMutation {
    abstract get_afflictions(request?: All_afflictions_request): All_afflictions[] | Promise<All_afflictions[]>;

    abstract update_afflictions(request?: Update_afflictions_request): Update_afflictions_response | Promise<Update_afflictions_response>;

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

export class Update_afflictions_response {
    status?: number;
}

export class UploadResponse {
    status: number;
}
