import { Component, OnInit, ViewChild } from '@angular/core';
import { AfflictionService } from '../affliction.service'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'apollo-link';
import { Affliction } from '@/_models/affliction';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-pest-info',
  templateUrl: './pest-info.component.html',
  styleUrls: ['./pest-info.component.css']
})
export class PestInfoComponent implements OnInit {

  displayedColumns: string[] = ["Scientific Name", "Common Name", "Affected Plant", "Actions"]
  pests
  dataSource
  constructor(private afflictionService: AfflictionService, private router: Router) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort

  ngOnInit(): void {
    this.pests = this.afflictionService.getPests()
    this.dataSource = new MatTableDataSource(this.pests)
    this.dataSource.sort = this.sort
  }

  updatePest(id : number) {
    this.router.navigateByUrl(`admin/updatePest/${id}`)
  }
}
