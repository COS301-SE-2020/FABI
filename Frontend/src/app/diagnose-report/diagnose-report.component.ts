import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diagnose-report',
  templateUrl: './diagnose-report.component.html',
  styleUrls: ['./diagnose-report.component.css']
})
export class DiagnoseReportComponent implements OnInit {
  reportID=null;

  constructor(
    private router:Router
  ) { 
    this.reportID=this.router.getCurrentNavigation().extras.state;
    this.reportID=this.reportID!=undefined?this.reportID.id:null;
    if(this.reportID==null){      
      this.router.navigate(['/special']);
    }
  }

  ngOnInit(): void {
        
  }

}
