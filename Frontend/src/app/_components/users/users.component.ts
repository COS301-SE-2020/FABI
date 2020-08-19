import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'apollo-link';
import { Affliction } from '@/_models/affliction';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '@/_services/user.service';
import { User } from '@/_models/user';
import { UsersService } from './users.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ["email", "name", "surname", "actions"]
  sDataSource
  bDataSource
  special
  
  constructor(private userService: UsersService) { }
  
  @ViewChild(MatPaginator, {static: true}) spaginator: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) bpaginator: MatPaginator;

  ngOnInit(): void {
    this.userService.getBasic().subscribe(data => {
      this.sDataSource = new MatTableDataSource(data);
      this.sDataSource.paginator = this.spaginator;
    })
    this.userService.getSpecial().subscribe(data =>{
      this.bDataSource = new MatTableDataSource(data);
      this.bDataSource.paginator = this.bpaginator;
    })
    
  }

  updateRole(email, role) {
    this.userService.updateRole(email, role).subscribe(data => {
      console.log(data);
      this.userService.getBasic().subscribe(data => {
        this.sDataSource = new MatTableDataSource(data);
      })
      this.userService.getSpecial().subscribe(data =>{
        this.bDataSource = new MatTableDataSource(data);
      })
    });
  }

}
