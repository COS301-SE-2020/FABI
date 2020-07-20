/*
 * File Name: user.ts
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
 * Classes in this file           : User
 * Related Documents              : None
 * 
 * Notes:
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Tuesday, June 9th 2020, 12:54:18 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 2020-07-15-11-22-am	  SJ	Added coding standards
 * 
 * Functional Description         : User class for managing users
 * Constraints                    : User must be registered
 * Assumptions                    : User is logged in when object is created
 */




export class User {
    id: number              // DB identifier
    username: string        // Email address
    password: string        // Password ( Hashed )
    firstName: string       // First name
    lastName: string        // Last name
    company: string         // Company they work for
    role: string            // User role ( basic, special, admin )
    token: string           // Token to simulate session handling
}