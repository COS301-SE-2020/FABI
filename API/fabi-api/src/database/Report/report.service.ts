import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Reports from './report.entity';
import { UploadRequest } from 'src/graphql.schema';
import { Storage } from '@google-cloud/storage';
import { join } from 'path';
import { writeFile, unlinkSync } from 'fs';
import { createHmac } from 'crypto';

//Classifications
const labelsAccepted =
  'Agave,azul,Aloe,Annual plant,Arecales,Banana,Banana family,Borassus,flabellifer,Botany,Cycad,Desert Palm,Fern,Flower,Flowering plant,Flowerpot,Garden,Georgia pine,Grass,Grass family,Groundcover,Herb,Houseplant,Ice plant family,Landscape,Leaf,Palm tree,Paurotis Palm,Paurotis Palm,Perennial plant,Pine,Pine family,Plant,Plant community,red pine,Sabal minor,Sabal palmetto,Saw palmetto,Sedge family,shortstraw pine,Shrub,Subshrub,Sweet grass,Taro,Terrestrial plant,Ti plant,Tree,Vascular plant,White pine,Woody plant,Xanthosoma,Yucca,Zingiberales';
//bool to tell if images are correct
var flagImages = false;
//google cloud storage
const gc = new Storage({
  keyFilename: join(__dirname, '../../../fabi-surveillance-d9f5f1321793.json'),
  projectId: 'fabi-surveillance',
});

//google cloud Vision API
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
  ) {}

  async getReportbyID(id: number): Promise<Reports> {
    const report = await this.ReportsRepository.findOne({ reportID: id });
    return report;
  }

  async InsertReport(obj: UploadRequest): Promise<boolean> {
    //if we got here the token matched

    //Find image formats for uploaded images
    var img1Format = obj.Img1.slice(
      obj.Img1.indexOf('/') + 1,
      obj.Img1.indexOf(';'),
    );
    var img2Format = obj.Img2.slice(
      obj.Img2.indexOf('/') + 1,
      obj.Img2.indexOf(';'),
    );
    var img3Format = obj.Img3.slice(
      obj.Img3.indexOf('/') + 1,
      obj.Img3.indexOf(';'),
    );

    //slice out the base64
    var base64Img1 = obj.Img1.slice(obj.Img1.indexOf(',') + 1, obj.Img1.length);
    var base64Img2 = obj.Img2.slice(obj.Img2.indexOf(',') + 1, obj.Img2.length);
    var base64Img3 = obj.Img3.slice(obj.Img3.indexOf(',') + 1, obj.Img3.length);

    //create unique name for each image
    var img1Name = createHmac('sha256', obj.email + this.makeid())
      .digest('hex')
      .substr(0, 15);
    var img2Name = createHmac('sha256', obj.email + this.makeid())
      .digest('hex')
      .substr(0, 15);
    var img3Name = createHmac('sha256', obj.email + this.makeid())
      .digest('hex')
      .substr(0, 15);

    //convert base64 to images
    writeFile(img1Name + '.' + img1Format, base64Img1, 'base64', function(err) {
      console.log(err);
      return false;
    });

    writeFile(img2Name + '.' + img2Format, base64Img2, 'base64', function(err) {
      console.log(err);
      return false;
    });

    writeFile(img3Name + '.' + img3Format, base64Img3, 'base64', function(err) {
      console.log(err);
      return false;
    });

    //Upload images to storage bucket
    await Imagebucket.upload(img1Name + '.' + img1Format);
    await Imagebucket.upload(img2Name + '.' + img2Format);
    await Imagebucket.upload(img3Name + '.' + img3Format);

    //Url's for database
    var url1 =
      'https://storage.cloud.google.com/fabi-image-storage/' +
      img1Name +
      '.' +
      img1Format;
    var url2 =
      'https://storage.cloud.google.com/fabi-image-storage/' +
      img2Name +
      '.' +
      img2Format;
    var url3 =
      'https://storage.cloud.google.com/fabi-image-storage/' +
      img3Name +
      '.' +
      img3Format;

    //vision api
    var classNum1 = this.classify(img1Name + '.' + img1Format);
    var classNum2 = this.classify(img2Name + '.' + img2Format);
    var classNum3 = this.classify(img3Name + '.' + img3Format);

    //value that determines if the images are correct
    var certainty = 0;

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

    //Add to database
    /*await this.ReportsRepository.insert({
      email: obj.email,
      form: obj.report,
      IMG1: url1,
      IMG2: url2,
      IMG3: url3,
    });*/

    return true;
  }

  //Helper function to generate random salt for token
  makeid() {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  //fucntion that Requests google vision API
  async classify(imageName: string) {
    var matchValue = 0;
    let values: string[] = [];
    const [result] = await client.labelDetection(imageName);
    var labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach((label: { description: string; score: string }) =>
      values.push(label.description),
    );

    for (var i = 0; i < values.length; i++) {
      if (labelsAccepted.indexOf(values[i]) != -1) {
        matchValue++;
      }
    }

    console.log(matchValue);
    return matchValue;
  }
}
