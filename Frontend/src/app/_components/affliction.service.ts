/*
 * File Name: affliction.service.ts
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
 * Related Documents              : None
 * 
 * Notes:
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Wednesday, July 15th 2020, 4:17:58 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 2020-07-21-10-55-am	  SJ	Add delete affliction
 * 
 * Functional Description         : This service will retrieve data from the api relating to afflictions
 * Constraints                    : None
 * Assumptions                    : None
 */




import { Injectable } from '@angular/core';
import { Affliction } from '@/_models/affliction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AfflictionService {

  // afflictions: Affliction[]
  affliction: Affliction
  constructor() { }

  getAffliction(id: number): Affliction {
    this.affliction = {
      id: 1,
      type: "Pest",
      scienceName: "Pissodes nemorensis",
      name: "Deodar weevil",
      plant: "Pinus species",
      distribution: "Throughout South Africa",
      status: "Pest populations are high, but don’t always cause serious damage. The exception is in stands of P. radiata where feeding on the tips can result in tip die-back.",
      description: "Adults have long, curved snouts and are reddish brown in colour with two patches of light grey scales on their backs. The body length of the adults ranges from 6-8mm. The larvae are yellowish white, cylindrical and legless, with light brown heads, and they are about 6mm long when fully grown.",
      symptoms: "Dying or dead pine shoots, often resulting in forking or branching of trees. Circular emergence holes on the bark of the main stem, which DO NOT penetrate the wood. These exit holes lead from the pupal chambers or ‘chip cocoons’ between the bark and the wood.",
      management: "Remove dying and dead trees, as these provide host material for the population of the beetle to increase. A native parasitoid has been detected parasitising the larvae.",
      images: [
        "https://extension.msstate.edu/sites/default/files/publication-images/P3057/DEOD2.png",
        "https://extension.msstate.edu/sites/default/files/publication-images/P3057/DEOD2.png",
        "https://extension.msstate.edu/sites/default/files/publication-images/P3057/DEOD2.png"
      ]
    } //End of object
    return this.affliction
  }
  // TODO: Make this return Observable
  getPests() {
    return [
      {
        "id": "1",
        "ScienceName": "Pissodes nemorensis",
        "Name": "Deodar weevil",
        "Plant": "Pinus species",
        "Type": "Pest",
        "Distribution": "Throughout South Africa",
        "Status": "Pest populations are high, but don’t always cause serious damage. The exception is in stands of P. radiata where feeding on the tips can result in tip die-back.",
        "Description": "Adults have long, curved snouts and are reddish brown in colour with two patches of light grey scales on their backs. The body length of the adults ranges from 6-8mm. The larvae are yellowish white, cylindrical and legless, with light brown heads, and they are about 6mm long when fully grown.",
        "Symptoms": "Dying or dead pine shoots, often resulting in forking or branching of trees. Circular emergence holes on the bark of the main stem, which DO NOT penetrate the wood. These exit holes lead from the pupal chambers or ‘chip cocoons’ between the bark and the wood.",
        "Management": "Remove dying and dead trees, as these provide host material for the population of the beetle to increase. A native parasitoid has been detected parasitising the larvae.",
        "Images": [
          "https://extension.msstate.edu/sites/default/files/publication-images/P3057/DEOD2.png",
          "https://extension.msstate.edu/sites/default/files/publication-images/P3057/DEOD2.png",
          "https://extension.msstate.edu/sites/default/files/publication-images/P3057/DEOD2.png"
        ]

      },
      {
        "id": "2",
        "ScienceName": "Thaumastocoris peregrinus",
        "Name": "Bronze bug",
        "Plant": "Eucalyptus species and hybrids",
        "Type": "Pest",
        "Distribution": "Throughout South Africa",
        "Status": "Populations vary through the year",
        "Description": "Adults are small (2-4mm), light-brown sapsucking insects. Eggs are small, oval and black, and can be laid singly or in clusters.",
        "Symptoms": "Initial reddening of the canopy leaves which become reddish-yellow or yellow-brown, coupled with some leaf loss and the visible abundance of adults, nymphs and black egg capsules in clusters. During severe infestations, loss of leaves leads to canopy thinning and branch dieback.",
        "Management": "An egg parasitoid wasp, Cleruchoides noackae (Mymaridae) has been released as a biological control agent, with the first releases taking place in 2013.",
        "Images": [
          "https://extension.msstate.edu/sites/default/files/publication-images/P3057/DEOD2.png",
          "https://bicep.net.au/wp-content/uploads/2019/03/T.-peregrinus.jpg"
        ]

      }
    ]
  }
  // TODO: Make this return Observable
  getPathogens() {
    return [
      {
        "id": "3",
        "ScienceName": "Puccinia psidii",
        "Name": "rust pathogen",
        "Plant": "Affects Eucalypts and native Myrtaceae",
        "Type": "Disease",
        "Distribution": "Currently known from KZN south coast, Gauteng and Limpopo (New Agatha, Wolkberg) on native Myrtaceae",
        "Status": "",
        "Description": "",
        "Symptoms": "Leaf spots and death of young new shoots. These are often covered by bright yellow spore masses. Biology: Requires high humidity and periods of low light for germination and infection. Mostly a problem in sub-tropical areas of the world.",
        "Management": "Report immediately to TPCP and destroy plants once disease has been confirmed. Selection breeding is possible to manage the disease. Do not move infected plants",
        "Images": [
          "https://extension.msstate.edu/sites/default/files/publication-images/P3057/DEOD2.png",
          "https://extension.msstate.edu/sites/default/files/publication-images/P3057/DEOD2.png",
          "https://extension.msstate.edu/sites/default/files/publication-images/P3057/DEOD2.png"
        ]

      }
    ]
  }

  updateAffliction(id: number, affliction: Affliction) {
    // TODO: GraphQL connection goes here
  }

  deleteAffliction(id: number) {
    // TODO: GraphQL connection goes here
  }
  // End of file
}
