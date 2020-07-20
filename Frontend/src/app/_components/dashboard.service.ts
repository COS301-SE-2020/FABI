import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  bigChart() {
    return [{
      name: 'Free State',
      data: [12, 14, 11, 9, 3, 1, 4]
    }, {
      name: 'Mpumalanga',
      data: [24, 26, 24, 23, 11, 23, 17]
    }, {
      name: 'Gauteng',
      data: [9, 4, 6, 8, 12, 15, 17]
    }, {
      name: 'Kwazulu-Natal',
      data: [25, 28, 26, 24, 26, 16, 19]
    }, {
      name: 'Western Cape',
      data: [2, 2, 2, 6, 13, 30, 46]
    }]
  }

  cards() {
    return [71, 78, 39, 66]
  }

  pieChart() {
    return [{
      name: 'Aphids',
      y: 61.41,
      sliced: true,
      selected: true
    }, {
      name: 'Cicadas',
      y: 11.84
    }, {
      name: 'Corn Earworms',
      y: 10.85
    }, {
      name: 'Cabbage Worms',
      y: 4.67
    }, {
      name: 'Sclerotinia',
      y: 4.18
    }, {
      name: 'Soybean Cyst',
      y: 1.64
    }, {
      name: 'Bean Pod Mottle',
      y: 1.6
    }, {
      name: 'Bacterial Blight',
      y: 1.2
    }, {
      name: 'Other',
      y: 2.61
    }]
  }
}
