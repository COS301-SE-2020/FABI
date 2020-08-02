import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@/_models/user';
import { UserService } from '@/_services/user.service';
import { AuthenticationService } from '@/_services/authentication.service';
import { LocationService } from '@/_services/location.service';

import { Report } from '@/_models/report'
import { ReportDataService } from '@/_services/report-data.service'

import { DeviceDetectorService } from 'ngx-device-detector';

import * as Styles from '@/MapStyles.json';

// Material Imports

import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// Purely for example

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'}
  ];

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

    // Purely for example


    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;

    @ViewChild('mapContainer') gmap: ElementRef;
    displayReady: Boolean = false;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    lat;
    lng;
    map: google.maps.Map;
    coordinates;
    infowindow;
    mapOptions: google.maps.MapOptions;
    mapStyle: any = (Styles as any).default;
    legView = false;
    icons = {
        General: {
            name: 'General',
            icon: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_greenG.png"
        },
        Specialist: {
            name: 'Specialist',
            icon: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellowS.png"
        },
        Company: {
            name: 'Company',
            icon: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_redC.png"
        },
        You: {
            name: 'You',
            icon: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png"
        }
    };


    marker = [];

    currentUser: User;
    users = [];
    currentMID = null;
    currentMark: Report;
    markIDs: Array<number> = [];
    Active;
    DarkMode = true;
    curmapStyle = "Night mode";
    showMap = true;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private location: LocationService,
        private router: Router,
        private currentMarkServ: ReportDataService,
        private deviceService: DeviceDetectorService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.Active = 0;
        this.isDesktop = this.deviceService.isDesktop();
        this.isMobile = this.deviceService.isMobile();
        this.isTablet = this.deviceService.isTablet();
    }

    loadMap() {
        this.location.getLocation().subscribe(rep => {

            this.lat = rep.coords.latitude;
            this.lng = rep.coords.longitude;



            // Create Map
            this.coordinates = new google.maps.LatLng(this.lat, this.lng); // Current Location
            this.mapOptions = {
                center: this.coordinates,
                zoom: 15,
                styles: (this.DarkMode ? this.mapStyle.NightMode : this.mapStyle.Normal),
                disableDefaultUI: true,
                zoomControl: true
            };
            this.map = new google.maps.Map(this.gmap.nativeElement,
                this.mapOptions);

            // Generate markers
            this.populateMarkers(this);

            // Legend
            var legend = document.getElementById('legend');
            for (var key in this.icons) {
                var type = this.icons[key];
                var name = type.name;
                var icon = type.icon;
                var div = document.createElement('div');
                div.innerHTML = '<img src="' + icon + '"> ' + name;
                legend.appendChild(div);
            }
            var showLegend = document.getElementById('showLegend');
            legend.style.display = "none";
            this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(showLegend);
            this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(legend);

            var centreImage = document.getElementById("centering");
            this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centreImage);



            var yourLoc = new google.maps.Marker({
                position: this.coordinates,
                map: this.map,
                icon: this.icons.You.icon

            });
            var infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(yourLoc, 'click', (function (marker) {
                return function () {
                    infowindow.setContent("You are here");
                    infowindow.open(this.map, yourLoc);
                }
            })(yourLoc));



        });
    }

    ngAfterViewInit(): void {
        this.loadMap();
    }


    diagreport() {
        this.router.navigate(["./basic/DiagReport"]);
    }

    navReport() {
        this.router.navigate(["./basic/MapReport"]);
    }

    populateMarkers(Object) {

        this.currentMarkServ.getMarkers(this.currentUser, this.lat, this.lng).subscribe(data => {

            for (var i = 0; i < data.length; i++) {

                Object.lat = data[i]["Lat"];
                Object.lng = data[i]["Long"];

                this.markIDs[i] = data[i]["reportID"];

                var userIcon = "";

                switch (data[i]["userType"]) {
                    case "basic":
                        userIcon = "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_greenG.png";
                        break;
                    case "special":
                        userIcon = "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellowS.png";
                        break;
                    case "advanced":
                        userIcon = "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_redC.png";
                        break;
                }

                Object.marker[i] = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i]["Lat"], data[i]["Long"]),
                    map: Object.map,
                    icon: userIcon

                });

                google.maps.event.addListener(Object.marker[i], 'click', (function (object, i) {
                    return function () {
                        // infowindow.setContent(Object.getInfoTemplate(data[i]));
                        // infowindow.open(Object.map, marker);
                        object.openDisplay();
                        object.setDisplay(i);

                    }
                })(this, this.markIDs[i]));

            }
        });

        // var infowindow = new google.maps.InfoWindow();


        // google.maps.event.addListener(infowindow, 'content_changed', () => {
        //     var string = infowindow.getContent() + "";
        //     this.setDisplay();

        // });
    }

    openMap() {
        this.showMap=true;
        this.loadMap();
    }
    openDisplay(){
        this.showMap=false;
    }

    
    

    centreLoc() {
        this.map.setCenter(this.coordinates);
    }

    legendPopup() {
        var legend = document.getElementById('legend');
        if (this.legView) {
            legend.style.display = "none";
            this.legView = false;
        }
        else {
            this.legView = true;
            legend.style.display = "block";

        }
    }

    setDisplay(markerID) {
        this.displayReady = false;
        var loc = null;
        this.currentMarkServ.getMarkers(this.currentUser, this.lat, this.lng).subscribe(data => {
            for (var i = 0; i < data.length; i++) {
                if (data[i]["reportID"] == markerID) {
                    loc = i;
                }
            }


            if (loc != null) {
                this.currentMark = data[loc];

                this.Active = 0; // Button set to 1, disabled due to dummy data

                let key = "currentMarker";
                localStorage.setItem(key, JSON.stringify(this.currentMark));

                this.displayReady = true;
            }
        });

    }

    toggleMapStyle() {
        this.DarkMode = !this.DarkMode;
        (this.DarkMode ? this.curmapStyle = "Dark mode" : this.curmapStyle = "Light mode");
        this.map.setOptions({
            styles: (this.DarkMode ? this.mapStyle.NightMode : this.mapStyle.Normal)
        })
    }

    getInfoTemplate(Object) {
        var Maincolor = "";
        var approved = false;
        var usertype = "Unknown";
        switch (Object["userType"]) {
            case "basic":
                usertype = "General";
                Maincolor = "color:lightgreen;text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000;";
                break;
            case "special":
                usertype = "Specialist";
                Maincolor = "color:yellow;text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000;";
                break;
            case "advanced":
                usertype = "Company";
                Maincolor = "color:red;text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000;";
                break;

        }


        this.currentMID = Object["reportID"];


        var footer = (approved ? '<br><br><i><b>Specialist Approved</b></i>' : '');
        return '<div id="content" style="width=200px;height=auto;">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h3 id="firstHeading" class="firstHeading" style="' + Maincolor + '">' + usertype + " User" + '</h3>' +
            '<div id="bodyContent">' +
            'Accuracy: ' + Object["Accuracy"] + 'm' +
            footer +
            '</div>' +
            '</div>';

    }

}

