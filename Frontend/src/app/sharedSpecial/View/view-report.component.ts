import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { ReportDataService } from '@/_services/report-data.service'
import { AuthenticationService } from '@/_UMservices/authentication.service';

export interface currentReport {
  ID: string;
  Pname: string;
  Infliction: string;
  Accuracy: number;
  NeuralNet: number;
  form: string;
  Img1: string;
  Img2: string;
  Img3: string;
}

export interface DiagnosisReport {
  diagnosis: string;
  reason: string;
}

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})

export class ViewReportComponent implements OnInit {
  Reports: currentReport = {
    ID: "",
    Pname: "",
    Infliction: "",
    Accuracy: 0,
    NeuralNet: 0,
    form: "",
    Img1: "",
    Img2: "",
    Img3: "",
  }

  diagnosis: DiagnosisReport = {
    diagnosis: "",
    reason: ""
  }

  dataLoaded = false;
  hasDiagnosis = false;
  ID = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportDataService,
    private AuthServ: AuthenticationService
  ) {
    this.router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        if (this.route.snapshot.queryParamMap.get("ID") != null) {
        this.ID = this.route.snapshot.queryParamMap.get("ID");
        this.dataLoaded = false;
        this.reportService.getReportDetails(this.AuthServ.currentUserValue, this.ID).subscribe(data => {
          this.Reports = {
            ID: this.ID,
            Pname: data["Pname"],
            Infliction: data["Infliction"],
            Accuracy: data["Accuracy"],
            NeuralNet: data["NeuralNetRating"],
            form: data["form"],
            Img1: data["Img1"],
            Img2: data["Img2"],
            Img3: data["Img3"],
          }
          this.dataLoaded = true
        })
        this.reportService.getDiagnosis(this.AuthServ.currentUserValue, this.ID).subscribe(data => {
          this.hasDiagnosis = false;
          console.log(data["diagnosis"]);
          
          if (data["diagnosis"] != 'a') {
            this.diagnosis = {
              diagnosis: data["diagnosis"],
              reason: data["reason"]
            }
            this.hasDiagnosis = true;
          }

        })
      }
      
      }
      else {
        this.ID = null;
      }



    })
  }





  ngOnInit(): void {


  }

  Diagnose() {
    this.router.navigate(["/diagnose"], { state: { id: this.route.snapshot.queryParamMap.get("ID") } });
  }

  downloadReport(){
    this.downloadString(this.Reports.form);
  }

  downloadString(text) {
    var newData=this.getCurrentInfo(text);
    var Data="";
    for(var i=0;i<newData.length;i++){
      Data+=this.toString(newData[i].Question)+": "+newData[i].Answer+"\n\n";
      
    }
      
    
    
    
    var blob = new Blob([Data], { type: "text/plain" });
  
    var a = document.createElement('a');
    a.download = "ReportData";
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = ["text/plain", a.download, a.href].join(':');
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
  }

  toString(text){
    var size = 60;
    var space=size-text.length;

    for(var i=0;i<space;i++){
      text+=" ";
    }
    return text;
  }

  getCurrentInfo(Form:string){
    var report: Array<any>;
    report=(Form).split("x2C");
    

    return [
        {
            Question:report[0],
            Answer:report[1]
        },
        {
            Question:report[2],
            Answer:report[3]
        },
        {
            Question:report[4],
            Answer:report[5]                
        },
        {
          Question:report[6],
            Answer:report[7]                
        },
        {
            Question:report[8],
            Answer:report[9]                
        },
        {
            Question:report[10],
            Answer:report[11]                
        },
        {
            Question:report[12],
            Answer:report[13]                
        },
        {
            Question:report[14],
            Answer:report[15]                
        },
        {
            Question:report[16],
            Answer:report[17]                
        },
        {
            Question:report[18],
            Answer:report[19]                
        },
        {
            Question:report[20],
            Answer:report[21]                
        },
        {
            Question:report[22],
            Answer:report[23]                
        }
    ]

}

}
