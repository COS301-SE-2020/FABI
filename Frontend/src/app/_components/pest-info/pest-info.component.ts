/*
 * File Name: pest-info.component.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : None
 * Output                         : None
 * Related Requirements           : None
 * Classes in this file           : None
 * Related Documents              : SRS Document
 * 
 * Notes:
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Thursday, July 16th 2020, 6:25:12 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 2020-07-21-10-55-am	  SJ	Add delete affliction
 * 2020-07-21-09-36-am	  SJ	Add coding standards
 * 
 * Functional Description         : Handles the functionality for updating information about stored pests
 * Constraints                    : User must be an admin
 * Assumptions                    : None
 */




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
    this.afflictionService.getPests().subscribe(data => {
      this.pests = data
    })
    this.dataSource = new MatTableDataSource(this.pests)
    this.dataSource.sort = this.sort
  }

  updatePest(id: number) {
    this.router.navigateByUrl(`admin/updatePest/${id}`)
  }

  deletePest(id: number) {
    this.afflictionService.deleteAffliction(id)
  }
}
