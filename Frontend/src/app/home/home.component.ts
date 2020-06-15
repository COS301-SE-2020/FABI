import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {Subject, Observable} from 'rxjs';
import { User } from '@/_models/user';
import { UserService } from '@/_services/user.service';
import { AuthenticationService } from '@/_services/authentication.service';
import { LocationService } from '@/_services/location.service';

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

            var contentString = '<div id="content" style="width=100;height=auto;">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h3 id="firstHeading" class="firstHeading">Angular Leaf Spot</h3>'+
            '<div id="bodyContent">'+
            'Location accuracy: '+rep.coords.accuracy+'<br><br>'+
            '<img src="https://extension.umn.edu/sites/extension.umn.edu/files/styles/caption_medium/public/angular-leaf-spot-1.JPG?itok=F3lIx_q2" style="width:auto;height:100px;" alt="Plant"> '+'<br><br><i><b>Specialist Approved<b><i>'+
            '</div>'+
            '</div>';
            this.infowindow = new google.maps.InfoWindow({
                content : contentString
            });
            

            this.coordinates = new google.maps.LatLng(this.lat, this.lng);
            this.mapOptions = {
                center: this.coordinates,
                zoom: 15,
                };

                var iconBase =
            'https://developers.google.com/maps/documentation/javascript/examples/full/images/';

            this.marker[0]= new google.maps.Marker({
                position: this.coordinates,
                map: this.map,
                icon:"https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_greenD.png"
                
                });

            this.map = new google.maps.Map(this.gmap.nativeElement, 
            this.mapOptions);
            this.marker[0].setMap(this.map);
            google.maps.event.addListener(this.marker[0], 'click', () => {
                this.infowindow.open(this.map, this.marker[0]);
              });

            
            
        });
    }


    diagreport(){
        this.router.navigate(["./DiagReport"]);
    }
}