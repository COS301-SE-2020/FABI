
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Add_Affliction_Request {
    type: string;
    commName: string;
    scienceName: string;
    plant: string;
    distribution: string;
    status: string;
    description: string;
    symptoms: string;
    management: string;
    img1: string;
    img2: string;
    img3: string;
    token: string;
}

export class Admin_Cards_request {
    token: string;
}

export class Admin_Dashboard_request {
    token: string;
}

export class All_afflictions_request {
    affliction_type: string;
    token: string;
}

export class AuthUserRequest {
    token: string;
}

export class Delete_Affliction_Request {
    token: string;
    ID: number;
}

export class GetFilteredReportsRequest {
    token: string;
    latitude: number;
    longitude: number;
    verification: string;
    diagnosis: string;
    distance: number;
    formSearch: string;
}

export class GetReportsRequest {
    token: string;
    latitude: number;
    longitude: number;
}

export class GetSingleReportRequest {
    token: string;
    reportID: number;
}

export class LoginRequest {
    email: string;
    password: string;
}

export class PopTableRequest {
    reportID: number;
    token: string;
}

export class Request {
    name: string;
    surname: string;
    email: string;
    userType: string;
    password: string;
}

export class Single_affliction_request {
    id: number;
    token: string;
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

export class UpdateUserRequest {
    token: string;
    email: string;
    newUserType: string;
}

export class UpdateVerificationStatus {
    token: string;
    reportID: number;
    verification: string;
    comment: string;
}

export class Upload_Diagnosis_Reason {
    token: string;
    reportID: number;
    diagnosis: string;
    reason: string;
}

export class UploadRequest {
    token: string;
    Urgency?: number;
    report?: string;
    Latitude?: number;
    Longitude?: number;
    Accuracy?: number;
    Pname?: string;
    Infliction?: string;
    Img1?: string;
    Img2?: string;
    Img3?: string;
}

export class Add_Affliction_Response {
    status?: number;
}

export class Admin_Cards_response {
    status: number;
    thisWeek: number;
    lastWeek: number;
    twoWeeksAgo: number;
    name: string;
}

export class Admin_Dashboard_response {
    data: string;
    status: number;
}

export class Admin_Piechart_response {
    y: number;
    name: string;
    status: number;
}

export class All_afflictions {
    id?: number;
    type?: string;
    scientificName?: string;
    name?: string;
    plant?: string;
    status?: number;
}

export class AuthUserResponse {
    status: number;
    UserType: string;
}

export class Delete_Affliction_Response {
    status?: number;
}

export class GetDiagnosis_ReasonResponse {
    diagnosis?: string;
    status: number;
    reason?: string;
    comment?: string;
}

export class GetReportsResponse {
    reports: string;
    status: number;
}

export class GetSingleReportResponse {
    userType?: string;
    Long?: number;
    Lat?: number;
    Pname?: string;
    Infliction?: string;
    Accuracy?: number;
    NeuralNetRating?: number;
    form?: string;
    Img1?: string;
    Img2?: string;
    Img3?: string;
    ID?: string;
    tags?: string;
    verification?: string;
    diagnoser?: string;
    status: number;
    date?: string;
    preDiagnosisNames?: string;
    preDiagnosisProbabilities?: string;
}

export class LoginResponse {
    token: string;
    status: number;
}

export abstract class IMutation {
    abstract addAffliction(request?: Add_Affliction_Request): Add_Affliction_Response | Promise<Add_Affliction_Response>;

    abstract deleteAffliction(request?: Delete_Affliction_Request): Delete_Affliction_Response | Promise<Delete_Affliction_Response>;

    abstract get_afflictions(request?: All_afflictions_request): All_afflictions[] | Promise<All_afflictions[]>;

    abstract get_Single_affliction(request?: Single_affliction_request): Single_affliction_response | Promise<Single_affliction_response>;

    abstract update_afflictions(request?: Update_afflictions_request): Update_afflictions_response | Promise<Update_afflictions_response>;

    abstract getUserType(request?: AuthUserRequest): AuthUserResponse | Promise<AuthUserResponse>;

    abstract getSpecialUsers(request?: AuthUserRequest): UsersResponse[] | Promise<UsersResponse[]>;

    abstract getBasicUsers(request?: AuthUserRequest): UsersResponse[] | Promise<UsersResponse[]>;

    abstract updateUserType(request?: UpdateUserRequest): UpdateUserResponse | Promise<UpdateUserResponse>;

    abstract get_GraphInfo(request?: Admin_Dashboard_request): Admin_Dashboard_response | Promise<Admin_Dashboard_response>;

    abstract get_TableInfo(request?: Admin_Dashboard_request): Admin_Dashboard_response | Promise<Admin_Dashboard_response>;

    abstract get_PieChartInfo(request?: Admin_Dashboard_request): Admin_Piechart_response[] | Promise<Admin_Piechart_response[]>;

    abstract get_CardsInfo(request?: Admin_Cards_request): Admin_Cards_response[] | Promise<Admin_Cards_response[]>;

    abstract login(request?: LoginRequest): LoginResponse | Promise<LoginResponse>;

    abstract registerUser(request?: Request): Response | Promise<Response>;

    abstract getReports(getReportsRequest?: GetReportsRequest): GetSingleReportResponse[] | Promise<GetSingleReportResponse[]>;

    abstract getSingleReport(getSingleReportRequest?: GetSingleReportRequest): GetSingleReportResponse | Promise<GetSingleReportResponse>;

    abstract getDiagnosis_Reason(getSingleReportRequest?: GetSingleReportRequest): GetDiagnosis_ReasonResponse | Promise<GetDiagnosis_ReasonResponse>;

    abstract getReportsMobile(getReportsRequest?: GetReportsRequest): PopTableMobileResponse[] | Promise<PopTableMobileResponse[]>;

    abstract getFilteredReports(getReportsRequest?: GetFilteredReportsRequest): GetSingleReportResponse[] | Promise<GetSingleReportResponse[]>;

    abstract popTableBasicUser(request?: PopTableRequest): PopTableResponse[] | Promise<PopTableResponse[]>;

    abstract upload(upload?: UploadRequest): UploadResponse | Promise<UploadResponse>;

    abstract uploadDiagnosis_Reason(upload?: Upload_Diagnosis_Reason): UploadResponse | Promise<UploadResponse>;

    abstract updateVerificationStatus(upload?: UpdateVerificationStatus): UploadResponse | Promise<UploadResponse>;
}

export class PopTableMobileResponse {
    status: number;
    date: string;
    distance: number;
    Pname: string;
    ID: number;
}

export class PopTableResponse {
    status: number;
    date: string;
    distance: number;
    Pname: string;
    ID: number;
}

export abstract class IQuery {
    abstract dummy(): string | Promise<string>;
}

export class Response {
    status: number;
    token: string;
}

export class Single_affliction_response {
    id: number;
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
    statusCode: number;
}

export class Update_afflictions_response {
    status?: number;
}

export class UpdateUserResponse {
    status: number;
}

export class UploadResponse {
    status: number;
}

export class UsersResponse {
    status: number;
    name: string;
    surname: string;
    email: string;
    userType: string;
}
