import { Injectable } from '@nestjs/common';
import { Admin_Dashboard_request, Admin_Dashboard_response, Admin_Cards_request } from '../../graphql.schema';
import { InjectRepository } from '@nestjs/typeorm';
import Reports from '../Report/report.entity';
import { Repository } from 'typeorm';
import { ReportService } from '../Report/report.service';
import { object } from '@hapi/joi';

@Injectable()
export class GetAdminDashService {

  constructor(
    @InjectRepository(Reports)
    private ReportsRepository: Repository<Reports>,
  ) { }

  async getLineGraphInfo(reqObj: Admin_Dashboard_request): Promise<Admin_Dashboard_response> {

    //response
    const res: Admin_Dashboard_response = { data: "", status: 0 };

    //two date variables that have today's date
    var today = new Date();
    var otherDay = new Date();

    //todays date 
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var year = today.getFullYear();

    //create Int for today's date
    let todayInt: number = parseInt(year + mm + dd);

    // minus 7 days from current date
    otherDay.setDate(otherDay.getDate() - 7); // this is today -7

    //  today - 7
    var ddo = String(otherDay.getDate()).padStart(2, '0');
    var mmo = String(otherDay.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yearo = today.getFullYear();

    let otherDayInt: number = parseInt(yearo + mmo + ddo);

    const result = await this.ReportsRepository.query("Select date, count(date) from users,reports where company_id=(select company_id from users where token=" + "\'" + reqObj.token + "\'" + ")" +
      " and \"Email\" = email and date between " + otherDayInt + " and " + todayInt + " group by date order by date ; ");


    var days: string[] = [];
    var daysCount: number[] = [];

    for (var i = 0; i < Object.keys(result).length; i++) {
      var currDate = result[i].date;
      var currCount = result[i].count;
      var a = currDate.toString().slice(0, 4) + "-" + currDate.toString().slice(4, 6) + "-" + currDate.toString().slice(6, 8);
      var d = new Date(a);

      days.push(d.getDay().toString());
      daysCount.push(result[i].count);
    }

    var createdObj = "{";
    for (var i = 0; i < days.length; i++) {
      if (days[i] == "0")
        days[i] = "Sunday";

      if (days[i] == "1")
        days[i] = "Monday";

      if (days[i] == "2")
        days[i] = "Tuesday";

      if (days[i] == "3")
        days[i] = "Wednesday";

      if (days[i] == "4")
        days[i] = "Thursday";

      if (days[i] == "5")
        days[i] = "Friday"

      if (days[i] == "6")
        days[i] = "Saturday"

      if (i != days.length - 1)
        createdObj = createdObj + "\"" + days[i] + "\"" + ":" + daysCount[i].toString() + ",";
      else
        createdObj = createdObj + "\"" + days[i] + "\"" + ":" + daysCount[i].toString() + "}";

    }

    res.data = createdObj;
    res.status = 201;

    return res;
  }
  
  //function that will fetch data to populate the admin table
  async getTableInfo(reqObj: Admin_Dashboard_request): Promise<Admin_Dashboard_response> {

    //create response object
    const res: Admin_Dashboard_response = { data: "howdy", status: 201 };
    //query db
    const result = await this.ReportsRepository.query("select \"CommName\", \"SciName\", management, count(*) from \"Afflictions\", reports, users where company_id=" + 1 + "and \"Email\"=email and diagnosis=\"Afflictions\".id group by \"CommName\", \"SciName\", management order by count DESC;");

    //stringify datat
    res.data = JSON.stringify(result);

    console.log(result);
    //return data
    return res;
  }

  //function that will fetch data to populate the admin piechart
  async getPieChartInfo(reqObj: Admin_Dashboard_request): Promise<JSON>{
    //query db
    const result = await this.ReportsRepository.query("select \"CommName\", count(\"CommName\") from reports, \"Afflictions\", \"Companies\", users where \"Afflictions\".id = diagnosis and email = \"Email\" and \"Companies\".id = (select company_id from users where token = \'" + reqObj.token +"\') group by \"CommName\";");
    return result;
  }

  //function that will fetch data to populate the admin cards
  async get_CardsInfo(reqObj: Admin_Cards_request): Promise<JSON>{

    //function to handel the first card
    if(reqObj.cardNum == 1){
     return this.get_Card1(reqObj);
    }

    //function to handel the second card
    if(reqObj.cardNum == 2){
      return this.get_Card2(reqObj);
    }

    //fucntion to handel the third card
    if(reqObj.cardNum == 3){
      return this.get_Card3(reqObj);
    }
    
  }

  //get number of pathogens over past 3 weeks
  async get_Card3(reqObj: Admin_Cards_request): Promise<JSON>{
    //calculate one week ago
    //---------------------------------------------------------------------------------------------------------------------------------
    //two date variables that have today's date
    var today = new Date();
    var otherDay = new Date();

    //todays date 
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var year = today.getFullYear();

    //create Int for today's date
    let todayInt: number = parseInt(year + mm + dd);

    // minus 7 days from current date
    otherDay.setDate(otherDay.getDate() - 7); // this is today -7

    //  today - 7
    var ddo = String(otherDay.getDate()).padStart(2, '0');
    var mmo = String(otherDay.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yearo = today.getFullYear();

    let otherDayInt: number = parseInt(yearo + mmo + ddo);
    //get one weekago
    var result = await this.ReportsRepository.query("select count(*) from reports, \"Companies\", \"Afflictions\" where date between "+ otherDayInt +" and "+todayInt+" and \"Afflictions\".id = diagnosis and type = \'Pathogen\' and \"Companies\".id = (select company_id from users where token = \'"+reqObj.token+"\');");

    //---------------------------------------------------------------------------------------------------------------------------------

        //calculate 2 weeks ago
    //---------------------------------------------------------------------------------------------------------------------------------
    //move day to 14 days ago
    otherDay.setDate(otherDay.getDate() - 7);

    //move today to 7 days ago
    today.setDate(today.getDate() - 7);

    //todays date -7
     dd = String(today.getDate()).padStart(2, '0');
     mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
     year = today.getFullYear();

    //create Int for today's date
     todayInt = parseInt(year + mm + dd);

    //otherday - 7
     ddo = String(otherDay.getDate()).padStart(2, '0');
     mmo = String(otherDay.getMonth() + 1).padStart(2, '0'); //January is 0!
     yearo = today.getFullYear();

     //create Int
     otherDayInt = parseInt(yearo + mmo + ddo);

     var result2 = await this.ReportsRepository.query("select count(*) from reports, \"Companies\", \"Afflictions\" where date between "+ otherDayInt +" and "+todayInt+" and \"Afflictions\".id = diagnosis and type = \'Pathogen\' and \"Companies\".id = (select company_id from users where token = \'"+reqObj.token+"\');");

     //concat new object
     result = result.concat(result2);
    //------------------------------------------------------------------------------------------------------------------------------------

     //calculate 3 weeks ago
    //---------------------------------------------------------------------------------------------------------------------------------
    //move day to 21 days ago
    otherDay.setDate(otherDay.getDate() - 7);

    //move today to 14 days ago
    today.setDate(today.getDate() - 7);

    //todays date -14
     dd = String(today.getDate()).padStart(2, '0');
     mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
     year = today.getFullYear();

    //create Int for today's date
     todayInt = parseInt(year + mm + dd);

    //otherday - 14
     ddo = String(otherDay.getDate()).padStart(2, '0');
     mmo = String(otherDay.getMonth() + 1).padStart(2, '0'); //January is 0!
     yearo = today.getFullYear();

     //create Int
     otherDayInt = parseInt(yearo + mmo + ddo);

     var result3 = await this.ReportsRepository.query("select count(*) from reports, \"Companies\", \"Afflictions\" where date between "+ otherDayInt +" and "+todayInt+" and \"Afflictions\".id = diagnosis and type = \'Pathogen\' and \"Companies\".id = (select company_id from users where token = \'"+reqObj.token+"\');");

     //concat new object
     result = result.concat(result3);
    //------------------------------------------------------------------------------------------------------------------------------------

    return result;

  }

  //get number of pest over past 3 weeks
  async get_Card2(reqObj: Admin_Cards_request): Promise<JSON>{
     //calculate one week ago
    //---------------------------------------------------------------------------------------------------------------------------------
    //two date variables that have today's date
    var today = new Date();
    var otherDay = new Date();

    //todays date 
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var year = today.getFullYear();

    //create Int for today's date
    let todayInt: number = parseInt(year + mm + dd);

    // minus 7 days from current date
    otherDay.setDate(otherDay.getDate() - 7); // this is today -7

    //  today - 7
    var ddo = String(otherDay.getDate()).padStart(2, '0');
    var mmo = String(otherDay.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yearo = today.getFullYear();

    let otherDayInt: number = parseInt(yearo + mmo + ddo);
    //get one weekago
    var result = await this.ReportsRepository.query("select count(*) from reports, \"Companies\", \"Afflictions\" where date between "+ otherDayInt +" and "+ todayInt +" and \"Afflictions\".id = diagnosis and type = \'Pest\' and \"Companies\".id = (select company_id from users where token = \'"+reqObj.token+"\');");

    //---------------------------------------------------------------------------------------------------------------------------------

        //calculate 2 weeks ago
    //---------------------------------------------------------------------------------------------------------------------------------
    //move day to 14 days ago
    otherDay.setDate(otherDay.getDate() - 7);

    //move today to 7 days ago
    today.setDate(today.getDate() - 7);

    //todays date -7
     dd = String(today.getDate()).padStart(2, '0');
     mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
     year = today.getFullYear();

    //create Int for today's date
     todayInt = parseInt(year + mm + dd);

    //otherday - 7
     ddo = String(otherDay.getDate()).padStart(2, '0');
     mmo = String(otherDay.getMonth() + 1).padStart(2, '0'); //January is 0!
     yearo = today.getFullYear();

     //create Int
     otherDayInt = parseInt(yearo + mmo + ddo);

     var result2 = await this.ReportsRepository.query("select count(*) from reports, \"Companies\", \"Afflictions\" where date between "+ otherDayInt +" and "+ todayInt +" and \"Afflictions\".id = diagnosis and type = \'Pest\' and \"Companies\".id = (select company_id from users where token = \'"+reqObj.token+"\');");

     //concat new object
     result = result.concat(result2);
    //------------------------------------------------------------------------------------------------------------------------------------

     //calculate 3 weeks ago
    //---------------------------------------------------------------------------------------------------------------------------------
    //move day to 21 days ago
    otherDay.setDate(otherDay.getDate() - 7);

    //move today to 14 days ago
    today.setDate(today.getDate() - 7);

    //todays date -14
     dd = String(today.getDate()).padStart(2, '0');
     mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
     year = today.getFullYear();

    //create Int for today's date
     todayInt = parseInt(year + mm + dd);

    //otherday - 14
     ddo = String(otherDay.getDate()).padStart(2, '0');
     mmo = String(otherDay.getMonth() + 1).padStart(2, '0'); //January is 0!
     yearo = today.getFullYear();

     //create Int
     otherDayInt = parseInt(yearo + mmo + ddo);

     var result3 = await this.ReportsRepository.query("select count(*) from reports, \"Companies\", \"Afflictions\" where date between "+ otherDayInt +" and "+ todayInt +" and \"Afflictions\".id = diagnosis and type = \'Pest\' and \"Companies\".id = (select company_id from users where token = \'"+reqObj.token+"\');");

     //concat new object
     result = result.concat(result3);
    //------------------------------------------------------------------------------------------------------------------------------------

    return result;

  }

//get number of Reports of last 3 weeks
  async get_Card1(reqObj): Promise<JSON>{

        //calculate one week ago
    //---------------------------------------------------------------------------------------------------------------------------------
    //two date variables that have today's date
    var today = new Date();
    var otherDay = new Date();

    //todays date 
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var year = today.getFullYear();

    //create Int for today's date
    let todayInt: number = parseInt(year + mm + dd);

    // minus 7 days from current date
    otherDay.setDate(otherDay.getDate() - 7); // this is today -7

    //  today - 7
    var ddo = String(otherDay.getDate()).padStart(2, '0');
    var mmo = String(otherDay.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yearo = today.getFullYear();

    let otherDayInt: number = parseInt(yearo + mmo + ddo);
    //get one weekago
    var result = await this.ReportsRepository.query("select count(*) from reports, \"Companies\" where date between "+otherDayInt+" and "+ todayInt +" and \"Companies\".id = (select company_id from users where token = \'"+reqObj.token+"\');");

    //---------------------------------------------------------------------------------------------------------------------------------

        //calculate 2 weeks ago
    //---------------------------------------------------------------------------------------------------------------------------------
    //move day to 14 days ago
    otherDay.setDate(otherDay.getDate() - 7);

    //move today to 7 days ago
    today.setDate(today.getDate() - 7);

    //todays date -7
     dd = String(today.getDate()).padStart(2, '0');
     mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
     year = today.getFullYear();

    //create Int for today's date
     todayInt = parseInt(year + mm + dd);

    //otherday - 7
     ddo = String(otherDay.getDate()).padStart(2, '0');
     mmo = String(otherDay.getMonth() + 1).padStart(2, '0'); //January is 0!
     yearo = today.getFullYear();

     //create Int
     otherDayInt = parseInt(yearo + mmo + ddo);

     var result2 = await this.ReportsRepository.query("select count(*) from reports, \"Companies\" where date between "+otherDayInt+" and "+ todayInt +" and \"Companies\".id = (select company_id from users where token = \'"+reqObj.token+"\');");

     //concat new object
     result = result.concat(result2);
    //------------------------------------------------------------------------------------------------------------------------------------

     //calculate 3 weeks ago
    //---------------------------------------------------------------------------------------------------------------------------------
    //move day to 21 days ago
    otherDay.setDate(otherDay.getDate() - 7);

    //move today to 14 days ago
    today.setDate(today.getDate() - 7);

    //todays date -14
     dd = String(today.getDate()).padStart(2, '0');
     mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
     year = today.getFullYear();

    //create Int for today's date
     todayInt = parseInt(year + mm + dd);

    //otherday - 14
     ddo = String(otherDay.getDate()).padStart(2, '0');
     mmo = String(otherDay.getMonth() + 1).padStart(2, '0'); //January is 0!
     yearo = today.getFullYear();

     //create Int
     otherDayInt = parseInt(yearo + mmo + ddo);

     var result3 = await this.ReportsRepository.query("select count(*) from reports, \"Companies\" where date between "+otherDayInt+" and "+ todayInt +" and \"Companies\".id = (select company_id from users where token = \'"+reqObj.token+"\');");

     //concat new object
     result = result.concat(result3);
    //------------------------------------------------------------------------------------------------------------------------------------

    return result;
  }

}
