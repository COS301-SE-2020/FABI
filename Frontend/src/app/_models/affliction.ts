/*
 * File Name: affliction.ts
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
 * Classes in this file           : Affliction (Pest or Pathogen)
 * Related Documents              : None
 * 
 * Notes:
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Wednesday, July 15th 2020, 4:01:42 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : This is a model for storing affliction data
 * Constraints                    : None
 * Assumptions                    : None
 */




export class Affliction {
    type: string                    // Type of affliction ( Pest or Pathogen )
    sciName: string                 // Scientific Name
    name: string                    // Common Name
    plant: string                   // Plants commonly affected
    distribution: string            // Where it is distributed
    status: string                  // Status of the affliction currently
    description: string             // General description of the affliction
    symptoms: string                // Symptoms of the plant
    management: string              // How to deal with the affliction
    images: []                      // Links to images of the plants
}