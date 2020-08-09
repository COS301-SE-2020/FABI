import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@/_models/user';
import { UserService } from '@/_services/user.service';
import { AuthenticationService } from '@/_services/authentication.service';
import { LocationService } from '@/_services/location.service';

import { Report } from '@/_models/report'
import { ReportDataService } from '@/_services/report-data.service'

import { DeviceDetectorService } from 'ngx-device-detector';
import { ButtonListenerService } from "@/_services/buttonListener.service";
import { Subscription } from 'rxjs';

import * as Styles from '@/MapStyles.json';
import {PageEvent} from '@angular/material/paginator';

// Material Imports

// Purely for example

export interface nearbyReport {
    ID: number;
    Pname: string;
    distance: number;
    date: string;
}

export interface Questions{
    Question: string;
    Answer: string;
}




@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

    // Table
    displayedColumns: string[] = ['ID', 'Pname', 'distance', 'date'];
    dataSource;

    @ViewChild('mapContainer') gmap: ElementRef;
    displayReady: Boolean = false;
    pageEvent: PageEvent;
    dataLength=100;

    markerDetails:Array<Questions>;

    DeviceType: String;
    overlaySwitch="none";

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
    currentMark;
    markIDs: Array<number> = [];
    Active;
    DarkMode = true;
    curmapStyle = "Night mode";
    currentStyle = "Dark";
    showMap = true;
    styleSub: Subscription;
    deviceSub: Subscription;
    DmapHeight=(innerHeight*0.7)+"px";
    MmapHeight=(innerHeight)+"px";

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private location: LocationService,
        private router: Router,
        private currentMarkServ: ReportDataService,
        private deviceService: DeviceDetectorService,
        private styleSwitch: ButtonListenerService
    ) {
        
        this.currentUser = this.authenticationService.currentUserValue;
        this.styleSub = this.styleSwitch.getStyle().subscribe(data => {
            this.currentStyle = data.text;
        });
        this.deviceSub = this.styleSwitch.getDevice().subscribe(data => {
            this.DeviceType=data.text;
        });
    }

    toggleMap(){
        this.overlaySwitch="block";
    }

    closeMap(){
        this.overlaySwitch="none";
    }

    ngOnInit(): void {
        this.Active = 0;
        this.DeviceType = sessionStorage.getItem("DeviceType");
    }

    loadMap() {
        this.location.getLocation().subscribe(rep => {

            this.lat = rep.coords.latitude;
            this.lng = rep.coords.longitude;

            var DarkMap = new google.maps.StyledMapType(
                this.mapStyle.Dark, { name: "Dark Map" });
            var LightMap = new google.maps.StyledMapType(
                this.mapStyle.Light, { name: "Light Map" });


            // Create Map
            this.coordinates = new google.maps.LatLng(this.lat, this.lng); // Current Location
            this.mapOptions = {
                center: this.coordinates,
                zoom: 15,
                mapTypeControlOptions: {
                    mapTypeIds: ['LightMap',
                        'DarkMap']
                },
                disableDefaultUI: true,
                mapTypeControl: true,
                zoomControl: true
            };

            this.map = new google.maps.Map(this.gmap.nativeElement,
                this.mapOptions);

            this.map.mapTypes.set('DarkMap', DarkMap);
            this.map.mapTypes.set('LightMap', LightMap);
            this.map.setMapTypeId('DarkMap');



            // Generate markers
            this.populateMarkers(this);

            // Legend
            var legend = document.getElementById('legend');
            for (var key in this.icons) {
                var type = this.icons[key];
                var name = type.name;
                var icon = type.icon;
                var div = document.createElement('div');
                div.innerHTML = '<img src="' + icon + '"> ' + name + "<br><br>";
                legend.appendChild(div);
            }
            this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
            if(this.DeviceType=="Mobile"){
                var closeButtton=document.getElementById("closeMap");
                this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(closeButtton);
            }

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

                google.maps.event.addListener(Object.marker[i], 'click', (function (object, i, token) {
                    return function () {
                        // infowindow.setContent(Object.getInfoTemplate(data[i]));
                        // infowindow.open(Object.map, marker);
                        object.openDisplay();
                        object.setDisplay(i);
                        if(object.DeviceType=="Mobile")object.overlaySwitch="none";
                        object.currentMID=i;
                        object.paginatorInit();                        

                    }
                })(this, this.markIDs[i],this.currentUser.token));

            }
        });

        // var infowindow = new google.maps.InfoWindow();


        // google.maps.event.addListener(infowindow, 'content_changed', () => {
        //     var string = infowindow.getContent() + "";
        //     this.setDisplay();

        // });
    }

    getNearbyReports(event){
            this.dataSource=(this.currentMarkServ.getNearbyReports(event.pageIndex));
    }

    paginatorInit(){
        this.currentMarkServ.requestNearbyReports(this.currentMID,JSON.parse(localStorage.getItem("currentUser"))).subscribe(rep=>{
            this.dataSource=(this.currentMarkServ.getNearbyReports(0));
            this.dataLength=this.currentMarkServ.reportsLength;
        });
    }

    getCurrentInfo(){
        var report: Array<any>=(this.currentMark.form).split(",");

        this.markerDetails=[
            {
                Question:report[0],
                Answer:report[1]
            },
            {
                Question:report[2],
                Answer:report[3]
            },
            {
                Question:report[4],
                Answer:report[5]                
            },
            {
              Question:report[6],
                Answer:report[7]                
            },
            {
                Question:report[8],
                Answer:report[9]                
            },
            {
                Question:report[10],
                Answer:report[11]                
            },
            {
                Question:report[12],
                Answer:report[13]                
            },
            {
                Question:report[14],
                Answer:report[15]                
            },
            {
                Question:report[16],
                Answer:report[17]                
            },
            {
                Question:report[18],
                Answer:report[19]                
            },
            {
                Question:report[20],
                Answer:report[21]                
            },
            {
                Question:report[22],
                Answer:report[23]                
            }
        ]

    }
    
    getReportByID(ID){
        console.log(ID);
    }

    openMap() {
        sessionStorage.removeItem("currentMarker");
        this.showMap = true;
        this.loadMap();
    }
    openDisplay() {
        this.showMap = false;
    }




    centreLoc() {
        this.map.setCenter(this.coordinates);
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
                sessionStorage.setItem(key, JSON.stringify(this.currentMark));
                this.getCurrentInfo();
                this.displayReady = true;
            }
        });

    }

    toggleMapStyle() {
        if (sessionStorage.getItem("StyleMode") == "Light") {
            this.map.setOptions({
                styles: (this.mapStyle.Dark)
            });
        } else {
            this.map.setOptions({
                styles: (this.mapStyle.Light)
            });
        }
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

