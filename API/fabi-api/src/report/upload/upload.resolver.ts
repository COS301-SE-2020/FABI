import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import {  UploadResponse,UploadRequest }  from '../../graphql.schema';

@Resolver('Upload')
export class UploadResolver {
    constructor(
        private uploadService:UploadService,
    ){}

@Mutation('upload')
async upload(@Args('upload') reqObj: UploadRequest ): Promise<UploadResponse>{

    return this.uploadService.upload(reqObj);
}
}