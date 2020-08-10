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

  cards = [[1,2,3], [3,7,9], [4,8,13], [3,6,4]]
  cardPercentage = []
  cardTotal = []
  cardLabel = []
  pieChart = []
  pageSizeOptions = []
  displayedColumns: string[] = ['scienceName', 'name', 'management', 'count'];
  dataSource

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.cards().subscribe(data => {
      for (let obj in data) {
          this.cardLabel.push(data[obj]["name"])
          this.cardTotal.push(data[obj]["thisWeek"])
          // this.cards.push(
          //   [ data[obj]["twoWeeksAgo"], data[obj]["lastWeek"], data[obj]["thisWeek"] ]
          // )
          let divisor = data[obj]["lastWeek"] + data[obj]["twoWeeksAgo"]
          this.cardPercentage.push(
            (divisor > 0) ? (data[obj]["thisWeek"] / divisor) : 0
          )
      }
    })

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
