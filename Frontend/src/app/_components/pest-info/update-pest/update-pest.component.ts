/*
 * File Name: update-pest.component.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : Pest ID
 * Output                         : None
 * Related Requirements           : None
 * Classes in this file           : None
 * Related Documents              : None
 * 
 * Notes:
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Friday, July 17th 2020, 3:15:29 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : Allows admin users to update the pest information
 * Constraints                    : Pest must exist in the system
 * Assumptions                    : User is an admin
 */




import { Component, OnInit } from '@angular/core';
import { Affliction } from '@/_models/affliction';
import { ActivatedRoute, Router } from '@angular/router';
import { AfflictionService } from '@/_components/affliction.service';
import { AlertService } from "../../../_services/alert.service";
@Component({
  selector: 'app-update-pest',
  templateUrl: './update-pest.component.html',
  styleUrls: ['./update-pest.component.css']
})
export class UpdatePestComponent implements OnInit {

  pest: Affliction // Use this when connected to API to store affliction data
  id: number
  newUrl: string
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AfflictionService,
    private alert: AlertService) { }

  ngOnInit(): void {
    this.pest = new Affliction()
    this.id = this.route.snapshot.params['id']
    this.service.getAffliction(this.id)
    .subscribe(pestData => {
      this.pest.id = pestData["id"]
      this.pest.type = pestData["type"]
      this.pest.scienceName = pestData["scienceName"]
      this.pest.name = pestData["name"]
      this.pest.plant = pestData["plant"]
      this.pest.distribution = pestData["distribution"]
      this.pest.status = pestData["status"]
      this.pest.description = pestData["description"]
      this.pest.symptoms = pestData["symptoms"]
      this.pest.management = pestData["management"]
      this.pest.images.push(pestData["img1"])
      this.pest.images.push(pestData["img2"])
      this.pest.images.push(pestData["img3"])
    })
  }

  updatePest() {
    this.service.updateAffliction(this.id, this.pest)
    .subscribe(data => {
      console.log(data)
    })
    this.router.navigateByUrl(`/admin/pests`)
  }

  addImage() {
    this.alert.success("Added Image Successfully", false)
    this.pest.images.push(this.newUrl)
  }

  removeImage(img: string) {
    this.alert.success("Removed Image Successfully", false)
    var index = this.pest.images.indexOf(img)
    this.pest.images.splice(index, 1)
  }

}
