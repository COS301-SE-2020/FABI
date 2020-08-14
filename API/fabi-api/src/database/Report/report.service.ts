import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Reports from './report.entity';
import { UploadRequest, PopTableRequest, Upload_Diagnosis_Reason, GetSingleReportRequest, GetDiagnosis_ReasonResponse } from '../../graphql.schema';
import { Storage } from '@google-cloud/storage';
import { join } from 'path';
import { writeFile, unlinkSync } from 'fs';
import { createHmac } from 'crypto';
import { UsersService } from '../Users/users.service';
import Users from '../Users/Users.entity';

//Classifications
const labelsAccepted =
  'Agave,azul,Aloe,Annual plant,Arecales,Banana,Banana family,Borassus,flabellifer,Botany,Cycad,Desert Palm,Fern,Flower,Flowering plant,Flowerpot,Garden,Georgia pine,Grass,Grass family,Groundcover,Herb,Houseplant,Ice plant family,Landscape,Leaf,Palm tree,Paurotis Palm,Paurotis Palm,Perennial plant,Pine,Pine family,Plant,Plant community,red pine,Sabal minor,Sabal palmetto,Saw palmetto,Sedge family,shortstraw pine,Shrub,Subshrub,Sweet grass,Taro,Terrestrial plant,Ti plant,Tree,Vascular plant,White pine,Woody plant,Xanthosoma,Yucca,Zingiberales';
let neuralNetTags:string[] = [];
//google cloud storage
const gc = new Storage({
  keyFilename: join(__dirname, '../../../fabi-surveillance-d9f5f1321793.json'),
  projectId: 'fabi-surveillance',
});

//google cloud Vision API
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vision = require('@google-cloud/vision');

//create storage bucket
const Imagebucket = gc.bucket('fabi-image-storage');

//create vision object
const client = new vision.ImageAnnotatorClient({
  keyFilename: join(__dirname, '../../../vision_boi.json'),
  projectId: 'fabi-surveillance',
});
@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Reports)
    private ReportsRepository: Repository<Reports>,
    private userService: UsersService,
  ) { }

  //Function To get Reports from DB based on location
  async getReports(lat: number, long: number): Promise<JSON> {

  //values for distance calculations (for 50km radius)
    //long +-0,5057
    //lat  +-0,453

    //Lat ranges
    let latRangePositive = (lat + 0.453);
    let latRangeNegative = (lat - 0.453);

    //Long ranges
    let longRangePositive = (long + 0.5057);
    let longRangeNegative = (long - 0.5057);



    var results = await this.ReportsRepository.query("SELECT \"reportID\",\"IMG1\",\"IMG2\",\"IMG3\",form,\"userType\",\"Long\",\"Lat\",\"Pname\",\"Infliction\",\"Accuracy\",\"Pscore\",\"date\" FROM public.reports,public.users WHERE \"Long\" BETWEEN " + longRangeNegative + " AND " + longRangePositive +
      " AND " + "\"Lat\" BETWEEN " + latRangeNegative + " AND " + latRangePositive + " AND " + "reports.email = users.\"Email\";");

    return results;
  }

  //Function To get Single report from the DB when given an ID
  async getSingleReport(ID:number): Promise<JSON>{

    var results = await this.ReportsRepository.query("SELECT \"reportID\",\"IMG1\",\"IMG2\",\"IMG3\",form,\"userType\",\"Long\",\"Lat\",\"Pname\",\"Infliction\",\"Accuracy\",\"Pscore\",\"tags\",\"verification\",\"diagnoser\" FROM public.reports,public.users WHERE reports.email = users.\"Email\" AND \"reportID\" = " + ID +";");

    return results;
  }

  //function to Insert a new report into the DB
  async InsertReport(obj: UploadRequest): Promise<boolean> {
    //Find image formats for uploaded images
    const img1Format = obj.Img1.slice(
      obj.Img1.indexOf('/') + 1,
      obj.Img1.indexOf(';'),
    );
    const img2Format = obj.Img2.slice(
      obj.Img2.indexOf('/') + 1,
      obj.Img2.indexOf(';'),
    );
    const img3Format = obj.Img3.slice(
      obj.Img3.indexOf('/') + 1,
      obj.Img3.indexOf(';'),
    );

    //slice out the base64
    const base64Img1 = obj.Img1.slice(
      obj.Img1.indexOf(',') + 1,
      obj.Img1.length,
    );
    const base64Img2 = obj.Img2.slice(
      obj.Img2.indexOf(',') + 1,
      obj.Img2.length,
    );
    const base64Img3 = obj.Img3.slice(
      obj.Img3.indexOf(',') + 1,
      obj.Img3.length,
    );
      console.log("bonfire1");
    //create unique name for each image
    const img1Name = createHmac('sha256', obj.token + this.makeid())
      .digest('hex')
      .substr(0, 15);
    const img2Name = createHmac('sha256', obj.token + this.makeid())
      .digest('hex')
      .substr(0, 15);
    const img3Name = createHmac('sha256', obj.token + this.makeid())
      .digest('hex')
      .substr(0, 15);

    //convert base64 to images
    writeFile(img1Name + '.' + img1Format, base64Img1, 'base64', function (err) {
      //console.log(err);
      return false;
    });

    writeFile(img2Name + '.' + img2Format, base64Img2, 'base64', function (err) {
      //console.log(err);
      return false;
    });

    writeFile(img3Name + '.' + img3Format, base64Img3, 'base64', function (err) {
      //console.log(err);
      return false;
    });

    console.log("bonfire2");

    //Upload images to storage bucket
    await Imagebucket.upload(img1Name + '.' + img1Format);
    await Imagebucket.upload(img2Name + '.' + img2Format);
    await Imagebucket.upload(img3Name + '.' + img3Format);

    //Url's for database
    const url1 =
      'https://storage.cloud.google.com/fabi-image-storage/' +
      img1Name +
      '.' +
      img1Format;
    const url2 =
      'https://storage.cloud.google.com/fabi-image-storage/' +
      img2Name +
      '.' +
      img2Format;
    const url3 =
      'https://storage.cloud.google.com/fabi-image-storage/' +
      img3Name +
      '.' +
      img3Format;

      console.log("bonfire3");
    //vision api
    const classNum1 = this.classify(img1Name + '.' + img1Format);
    const classNum2 = this.classify(img2Name + '.' + img2Format);
    const classNum3 = this.classify(img3Name + '.' + img3Format);

    


    //value that determines if the images are correct
    let certainty = 0;

    if ((await classNum1) >= 5) {
      certainty += 5;
    } else {
      certainty = (await classNum1) + certainty;
    }

    if ((await classNum2) >= 5) {
      certainty += 5;
    } else {
      certainty = (await classNum2) + certainty;
    }

    if ((await classNum3) >= 5) {
      certainty += 5;
    } else {
      certainty = (await classNum3) + certainty;
    }

    //certainty value /100
    certainty = Math.round((certainty / 15) * 100);

    try {
      unlinkSync(img1Name + '.' + img1Format);
      unlinkSync(img2Name + '.' + img2Format);
      unlinkSync(img3Name + '.' + img3Format);
      //file removed
    } catch (err) {
      console.error(err);
      return false;
    }

    //fetch email using token
    let email = await this.userService.getEmail(obj.token);

    //parse string into JSON
    //let reportJson = JSON.parse(obj.report);

    //get date 
    var today = new Date();

    //todays date 
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var year = today.getFullYear();

    //create Int for today's date
    let todayInt: number = parseInt(year + mm + dd);
    console.log("bonfire1");

    //set variables
    var tags = neuralNetTags.join(",");
    var diagnoser = "/";// default values for now
    var verification = "/";// default values for now
    var report = obj.report;
    var long = obj.Longitude;
    var lat = obj.Latitude;
    var pname = obj.Pname;
    var infliction = obj.Infliction;
    var accuracy = obj.Accuracy;


    //Add to database
    try {
      this.ReportsRepository.insert({
        email: email,
        form: report,
        IMG1: url1,
        IMG2: url2,
        IMG3: url3,
        Long: long, //must get from obj.report
        Lat: lat, //must get from obj.report
        Pscore: certainty,
        Accuracy: accuracy,
        Pname: pname, //must get from obj.report
        Infliction: infliction, //must get from obj.report
        date:todayInt,
        diagnosis:-1,
        urgency:10,
        tags:tags,
        verification:verification,
        diagnoser:diagnoser
      });
      return true;
      
    } catch (error) {
      return false;
      
    }
    

   
  }
  //this function will add diagnosis and reason to report in db
  async update_diagnosis_reason(obj: Upload_Diagnosis_Reason):Promise<boolean>{

    try{
      //Ouery
      this.ReportsRepository.query("update reports set diagnosis = (select id from \"Afflictions\" where \"SciName\" like \'"+obj.diagnosis+"\' or \"CommName\" like \'"+obj.diagnosis+"\'), reason = \'"+obj.reason+"\', diagnoser = (select \"Email\" from users where token = \'"+obj.token+"\') where \"reportID\" = "+obj.reportID+" ;");
      return true;
    } catch(error){
      return false;
      }

    
  }

  async getDiagnosisAndReason(obj: GetSingleReportRequest): Promise<JSON>{

    var res = "{}";

    try {
      //Query
     var result = await this.ReportsRepository.query("select \"CommName\", reason , comment from reports, \"Afflictions\" where id = diagnosis and \"reportID\" = "+obj.reportID+";");  
     return result;
    } catch (error) {
      return JSON.parse(res);
    }
  }

 


  //Helper function to generate random salt for token
  makeid(): string {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  

  //fucntion that Requests google vision API
  async classify(imageName: string): Promise<number> {
    let matchValue = 0;
    const values: string[] = [];
    const [result] = await client.labelDetection(imageName);
    const labels = result.labelAnnotations;
    labels.forEach((label: { description: string; score: string }) =>
      values.push(label.description)
    );

    
    

    for (let i = 0; i < values.length; i++) {
      if (labelsAccepted.indexOf(values[i]) != -1) {
        matchValue++;
      }
      //ensure no duplicate tags
      if(neuralNetTags.indexOf(values[i]) == -1){
        neuralNetTags.push(values[i]);
      }
      
    }

    return matchValue;
  }
}
