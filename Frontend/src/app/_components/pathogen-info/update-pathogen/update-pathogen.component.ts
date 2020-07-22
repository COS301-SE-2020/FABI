/*
 * File Name: update-pathogen.component.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : Pathogen ID
 * Output                         : None
 * Related Requirements           : None
 * Classes in this file           : None
 * Related Documents              : SRS Document
 * 
 * Notes:
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Friday, July 17th 2020, 9:35:18 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : Functionality for admin users to update pathogen information
 * Constraints                    : User must be an admin user
 * Assumptions                    : Pathogen must exist
 */




import { Component, OnInit } from '@angular/core';
import { Affliction } from '@/_models/affliction';
import { ActivatedRoute, Router } from '@angular/router';
import { AfflictionService } from '@/_components/affliction.service';
import { AlertService } from "../../../_services/alert.service";
import { FormsModule } from '@angular/forms'
@Component({
  selector: 'app-update-pathogen',
  templateUrl: './update-pathogen.component.html',
  styleUrls: ['./update-pathogen.component.css']
})
export class UpdatePathogenComponent implements OnInit {
  pathogen: Affliction // Use this when connected to API to store affliction data
  id: number
  newUrl: string
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AfflictionService,
    private alert: AlertService) { }

  ngOnInit(): void {
    this.pathogen = new Affliction()
    this.id = this.route.snapshot.params['id']
    this.service.getAffliction(this.id)
    .subscribe(pathogenData => {
      this.pathogen.id = pathogenData["id"]
      this.pathogen.type = pathogenData["type"]
      this.pathogen.scienceName = pathogenData["scienceName"]
      this.pathogen.name = pathogenData["name"]
      this.pathogen.plant = pathogenData["plant"]
      this.pathogen.distribution = pathogenData["distribution"]
      this.pathogen.status = pathogenData["status"]
      this.pathogen.description = pathogenData["description"]
      this.pathogen.symptoms = pathogenData["symptoms"]
      this.pathogen.management = pathogenData["management"]
      this.pathogen.images.push(pathogenData["img1"])
      this.pathogen.images.push(pathogenData["img2"])
      this.pathogen.images.push(pathogenData["img3"])
      this.pathogen.images = this.pathogen.images.filter(img => img != 'undefined')
    })
  }

  updatePathogen() {
    this.service.updateAffliction(this.id, this.pathogen)
    .subscribe(data => {
      if (data == 201 || data == "201") {
        this.alert.success("Successfully Updated Pathogen", true)
      }
      console.log(data)
    })
    this.router.navigateByUrl(`/admin/pathogens`)
  }

  addImage() {
    this.alert.success("Added Image Successfully", false)
    this.pathogen.images.push(this.newUrl)
  }

  removeImage(img: string) {
    this.alert.success("Removed Image Successfully", false)
    var index = this.pathogen.images.indexOf(img)
    this.pathogen.images.splice(index, 1)
  }

}
