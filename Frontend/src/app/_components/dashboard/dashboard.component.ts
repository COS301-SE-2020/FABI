import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cards = []
  cardPercentage = [75, 75, 75, 75]
  cardTotal = [14, 14, 14, 14]
  cardLabel = ["New Reports", "New Pests", "New Pathogens", "Undiagnosed Reports"]
  pieChart = []
  pageSizeOptions = []
  displayedColumns: string[] = ['scienceName', 'name', 'management', 'count'];
  dataSource

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.cards = this.dashboardService.cards()
    // this.pieChart = this.dashboardService.pieChart()
    // console.log(this.pieChart);
    
    // this.dashboardService.pieChart().subscribe(data => {
    //   data = data.filter(props => {
    //     delete props["__typename"]
    //     return true
    //   })
    //   this.pieChart = data
    //   console.log(data);
    // })

    this.dashboardService.adminTable().subscribe(data => {
      data = JSON.parse(data)
      this.dataSource = data
      this.dataSource.paginator = this.paginator;
    })
  }

}
