import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import {  UploadResponse,UploadRequest, Upload_Diagnosis_Reason, UpdateVerificationStatus }  from '../../graphql.schema';

@Resolver('Upload')
export class UploadResolver {
    constructor(
        private uploadService:UploadService,
    ){}

@Mutation('upload')
async upload(@Args('upload') reqObj: UploadRequest ): Promise<UploadResponse>{

    return this.uploadService.upload(reqObj);
}

@Mutation('uploadDiagnosis_Reason')
async uploadDiagnosis_Reason(@Args('upload') reqObj: Upload_Diagnosis_Reason): Promise<UploadResponse>{

    return this.uploadService.upload_Diagnosis_Reason(reqObj);
}

@Mutation('updateVerificationStatus')
async updateVerificationStatus(@Args('upload') reqObj: UpdateVerificationStatus): Promise<UploadResponse>{
    return this.uploadService.updateVerificationStatusService(reqObj);
}

}
