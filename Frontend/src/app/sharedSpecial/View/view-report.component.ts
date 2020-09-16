import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, RouterStateSnapshot,NavigationEnd } from '@angular/router';
import { ReportDataService } from '@/_services/report-data.service'
import { AuthenticationService } from '@/_UMservices/authentication.service';

export interface currentReport{
  ID: string;
  Pname: string;
  Infliction: string;
  Accuracy: number;
  NeuralNet: number;
  form: string;
  Img1:string;
  Img2:string;
  Img3:string;
}

export interface DiagnosisReport{
  diagnosis:string;
  reason:string;
}

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})

export class ViewReportComponent implements OnInit {
  Reports:currentReport={
    ID:"",
    Pname: "",
    Infliction: "",
    Accuracy: 0,
    NeuralNet: 0,
    form: "",
    Img1:"",
    Img2:"",
    Img3:"",
}

diagnosis:DiagnosisReport={
  diagnosis:"",
  reason:""
}

dataLoaded=false;
hasDiagnosis=false;
ID=null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService:ReportDataService,
    private AuthServ:AuthenticationService
    ) { 
      this.router.events.subscribe(data=>{   
        
        if(data instanceof NavigationEnd)if(this.route.snapshot.queryParamMap.get("ID")!=null){
          this.ID=this.route.snapshot.queryParamMap.get("ID");
          this.dataLoaded=false;
        this.reportService.getReportDetails(this.AuthServ.currentUserValue,this.ID).subscribe(data=>{
          this.Reports={
            ID:this.ID,
            Pname: data["Pname"],
            Infliction: data["Infliction"],
            Accuracy: data["Accuracy"],
            NeuralNet: data["NeuralNetRating"],
            form: data["form"],
            Img1:data["Img1"],
            Img2:data["Img2"],
            Img3:data["Img3"],
        }
        this.dataLoaded=true
        })
        this.reportService.getDiagnosis(this.AuthServ.currentUserValue,this.ID).subscribe(data=>{
          this.hasDiagnosis=false;
          if(data["diagnosis"]!='a'){
            this.diagnosis={
              diagnosis:data["diagnosis"],
              reason:data["reason"]
            }
            this.hasDiagnosis=true;
          }
          
        })
      }
      else {

      }
        
        
        
      })
    }

    
  
    
    
  ngOnInit(): void {

    
  }

  Diagnose(){
    this.router.navigate(["/diagnose"],{state:{id:this.route.snapshot.queryParamMap.get("ID")}});
  }

}
