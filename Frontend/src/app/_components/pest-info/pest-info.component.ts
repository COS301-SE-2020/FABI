import { Component, OnInit, ViewChild } from '@angular/core';
import { AfflictionService } from '../affliction.service'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pest-info',
  templateUrl: './pest-info.component.html',
  styleUrls: ['./pest-info.component.css']
})
export class PestInfoComponent implements OnInit {

  displayedColumns: string[] = ["Scientific Name", "Common Name", "Affected Plant", "Actions"]
  pests = this.afflictionService.getPests()
  dataSource = new MatTableDataSource(this.pests)
  constructor(private afflictionService: AfflictionService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort

  ngOnInit(): void {
    this.dataSource.sort = this.sort
  }

}
