/*
 * File Name: pathogen-info.component.ts
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
 *            Creation Date:      : Friday, July 17th 2020, 9:34:29 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 2020-07-21-09-51-am	  SJ	Add coding standards
 * 
 * Functional Description         : Functionality for admin user to view pathogens
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
  selector: 'app-pathogen-info',
  templateUrl: './pathogen-info.component.html',
  styleUrls: ['./pathogen-info.component.css']
})
export class PathogenInfoComponent implements OnInit {
  displayedColumns: string[] = ["Scientific Name", "Common Name", "Affected Plant", "Actions"]
  pathogens
  dataSource
  constructor(private afflictionService: AfflictionService, private router: Router) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort

  ngOnInit(): void {
    this.pathogens = this.afflictionService.getPathogens()
    this.dataSource = new MatTableDataSource(this.pathogens)
    this.dataSource.sort = this.sort
  }

  updatePathogen(id: number) {
    this.router.navigateByUrl(`admin/updatePathogen/${id}`)
  }

}
