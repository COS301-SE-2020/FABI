import { Injectable } from '@nestjs/common';
import { Admin_Dashboard_request, Admin_Dashboard_response } from '../../graphql.schema';
import { InjectRepository } from '@nestjs/typeorm';
import Reports from '../Report/report.entity';
import { Repository } from 'typeorm';
import { ReportService } from '../Report/report.service';

@Injectable()
export class GetAdminDashService {

  constructor(
    @InjectRepository(Reports)
    private ReportsRepository: Repository<Reports>,
  ) { }

  async getLineGraphInfo(reqObj: Admin_Dashboard_request): Promise<Admin_Dashboard_response> {

    //response
    const res: Admin_Dashboard_response = { data: "", status:0 };

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


}
