import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort'
import { AfflictionService } from '../affliction.service'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pest-info',
  templateUrl: './pest-info.component.html',
  styleUrls: ['./pest-info.component.css']
})
export class PestInfoComponent implements OnInit {

  displayedColumns: string[] = ["Scientific Name", "Common Name", "Affected Plant"]
  pests
  dataSource
  constructor(private afflictionService: AfflictionService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort

  ngOnInit(): void {
    this.pests = this.afflictionService.getPests()
    this.dataSource = new MatTableDataSource(this.pests)
    this.dataSource.sort = this.sort
  }

}
