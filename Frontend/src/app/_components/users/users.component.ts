import { Component, OnInit, ViewChild } from '@angular/core';
import { AfflictionService } from '../affliction.service'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'apollo-link';
import { Affliction } from '@/_models/affliction';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '@/_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ["email", "name", "surname", "actions"]
  special
  basic
  
  constructor(private userService: UserService) { }
  
  @ViewChild(MatSort, {static: true}) sort: MatSort

  ngOnInit(): void {

  }

  updateRole(role) {
    
  }

}
