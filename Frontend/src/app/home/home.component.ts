import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {Subject, Observable} from 'rxjs';
import { User } from '@/_models/user';
import { UserService } from '@/_services/user.service';
import { AuthenticationService } from '@/_services/authentication.service';
import { LocationService } from '@/_services/location.service';

import * as Markers from '@/Markers.json';
import * as Styles from '@/MapStyles.json';

@Component({ templateUrl: 'home.component.html',
             styleUrls: ['./home.component.css'] })
export class HomeComponent implements AfterViewInit {
    
    @ViewChild('mapContainer') gmap: ElementRef;
    lat;
    lng;
    map: google.maps.Map;
    coordinates;
    infowindow;
    mapOptions : google.maps.MapOptions;
    markers:  any=(Markers as any).default;
    mapStyle: any=(Styles as any).default;
    legView=false;
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
    

    marker=[];

    currentUser: User;
    users = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private location : LocationService,
        private router: Router,
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }
    

    ngAfterViewInit(): void {
        this.location.getLocation().subscribe(rep=>{

            this.lat=rep.coords.latitude;
            this.lng=rep.coords.longitude;

            

            // Create Map
            this.coordinates = new google.maps.LatLng(this.lat, this.lng); // Current Location
            this.mapOptions = {
                center: this.coordinates,
                zoom: 15,
                styles:this.mapStyle.Normal,
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
            legend.style.display="none";
            this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(showLegend);
            this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(legend);

            var centreImage= document.getElementById("centering");
            this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centreImage);

            

            var yourLoc=new google.maps.Marker({
                position: this.coordinates,
                map: this.map,
                icon:this.icons.You.icon
            
            });
            var infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(yourLoc, 'click', (function(marker) {
                return function() {
                    infowindow.setContent("You are here");
                    infowindow.open(this.map, yourLoc);
                }
              })(yourLoc));

            
            
        });
    }


    diagreport(){
        this.router.navigate(["./DiagReport"]);
    }

    populateMarkers(Object){

        
        var infowindow = new google.maps.InfoWindow();

        for(var i=0;i<Object.markers.length;i++){
            Object.lat=Object.markers[i].Latitude;
            Object.lng=Object.markers[i].Longitude;

            var userIcon="";

            switch(Object.markers[i].UserType){
                case "General":
                    userIcon="https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_greenG.png";
                    break;
                case "Specialist":
                    userIcon="https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellowS.png";
                    break;
            }

            Object.marker[i]= new google.maps.Marker({
                position: new google.maps.LatLng(Object.markers[i].Latitude, Object.markers[i].Longitude),
                map: Object.map,
                icon:userIcon
                
                });

            
                google.maps.event.addListener(Object.marker[i], 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent(Object.getInfoTemplate(Object.markers[i]));
                        infowindow.open(Object.map, Object.marker[i]);
                    }
                  })(Object.marker[i],i));
        }
    }

    centreLoc(){
        this.map.setCenter(this.coordinates);
    }

    legendPopup(){
        var legend = document.getElementById('legend');
        if(this.legView){
            legend.style.display="none";
            this.legView=false;
        }
        else{
            this.legView=true;
            legend.style.display="block";
            
        }
    }

    getInfoTemplate(Object){
        var Maincolor="";
        var approved=false;
        switch(Object.UserType){
            case "General":
                Maincolor="color:lightgreen;text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000;";
                break;
            case "Specialist":
                Maincolor="color:yellow;text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000;"

        }




        var footer = (approved?'<br><br><i><b>Specialist Approved</b></i>':'');
        return '<div id="content" style="width=100;height=auto;">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h3 id="firstHeading" class="firstHeading" style="'+Maincolor+'">'+Object.InflictionName+'</h3>'+
            '<div id="bodyContent">'+
            'Location accuracy: '+Object.Accuracy+'m'+
            '<br><br>'+
            'Plant affected: '+Object.PlantName+
            '<br>'+
            'Type of infliction: '+Object.InflictionType+
            '<br><br>'+
            '<img id="plantImg" src="'+Object.imageUrl+'" style="width:auto;height:100px;" alt="Plant"> '+footer+
            '<br><a>More info</a><br>'+
            '</div>'+
            '</div>';

    }

    
    
}