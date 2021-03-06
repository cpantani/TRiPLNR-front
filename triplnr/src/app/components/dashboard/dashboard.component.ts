import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { TripServiceService } from 'src/app/services/trip-service.service';
import { Router } from '@angular/router';
import { WeatherServiceService } from 'src/app/services/weather-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private listenForTrip: Subscription;

  title:string= "Dashboard";
  trips : Trip[]= [];
  token?:string;
  //list of trips sorted by time
  currentTrips : Trip[] = [];
  futureTrips : Trip[] = [];
  pastTrips : Trip[] = [];
  currentWeather:any;
  destinationWeather:any;
  txt = "";
  day:number = 0;
  IconName:string = '';
  imageSrc:string = '';

  constructor(private tripService: TripServiceService, 
    private router:Router, 
    private weather:WeatherServiceService,
    private commonService: CommonService, 
    private modalService: NgbModal,
    private auth0: Auth0ServiceService,
    private userService: UserServiceService) { 
      this.listenForTrip= this.commonService.getTrip().subscribe( message => { //message contains the data sent from service
        const token = sessionStorage.getItem('token')?.toString();
        this.tripsRetrieval(token!);
      });
    }

    ngOnInit(): void {

    this.auth0.getUser().subscribe(res => {
      if (res) {
        this.userService.getUserBySub(res.sub).subscribe(result => {
          if (result) {

            sessionStorage.setItem('token', result.sub?.valueOf()!);

            this.tripsRetrieval(result.sub!.toString())

            // //Athorization token containing `[userId]:[username]` of current user
            // this.token= sessionStorage.getItem("token") || '';
            //calls getTrips method in trip-sevice.sevice
            // this.tripService.getTrips(result.sub!.toString()).subscribe(
            //   async response => {this.trips = response;
            //   //loops through all trips and sorts into futre current and past trips list by startTime
            //   for(let i = 0; i< this.trips.length; i++){
            //     let startTime = new Date(this.trips[i].startTime!).getTime();
            //     let endTime = new Date(this.trips[i].endTime!).getTime();
            //     let timeNow = Date.now();
            //     if(startTime > timeNow) {
            //       this.futureTrips.push(this.trips[i]);
            //     }
            //     else if(startTime < timeNow && endTime > timeNow){
            //       this.currentTrips.push(this.trips[i]);
            //     }
            //     else if(endTime < timeNow){
            //       this.pastTrips.push(this.trips[i]);
            //     }
            //   }
            // })

          } else {
            this.router.navigate(['/register'])
          }
        })
      }
    })
  }

  openTrip(trip:Trip){
    sessionStorage.setItem('tripId', trip.tripId?.toString() || '');
    this.router.navigate(['/trip-dashboard']);
  }
  callWeather(address:any){
      this.weather.getDestinationWeather(address,this.day).subscribe(response => {
        this.destinationWeather = response;
        this.txt = "";
        this.txt +="<td>" + address +"</td>";
        this.txt += "<td>" + this.destinationWeather['datetime'] +"</td>";
        this.txt +="<td>" + this.destinationWeather['temp'] +"</td>";
        this.txt +="<td>" + this.destinationWeather['windspeed'] +"</td>";
        this.txt +="<td>" + this.destinationWeather['visibility'] +"</td>";
        this.txt += "<td>" + this.destinationWeather['humidity'] +"</td>";
        this.txt += "<td>" + this.destinationWeather['conditions'] +"</td>";
        this.txt += "</tr>"; 
        this.IconName = this.destinationWeather['icon']+'.png';
        this.imageSrc = "assets/Weather_Icon/" + this.IconName;
        const myElement = document.getElementById('table1')!;
        myElement.innerHTML = this.txt;
        })
  }
  open(content: any,address:any,start:any) {
    let startTime = new Date(start);
    let currTime = Date.now();
    this.day = Math.round((startTime.valueOf() - currTime.valueOf())/86400000);
    if (this.day >= 15){
      this.modalService.open("Cannot Predict More than 15 Days Weather.", {centered:true, ariaLabelledBy: 'modal-basic-title'});
    }
    else if(this.day < 0){
      this.modalService.open("Cannnot show past weather.", {centered:true, ariaLabelledBy: 'modal-basic-title'});
    }
    else{
      this.modalService.open(content,  {size:'xl',centered: true, ariaLabelledBy: 'modal-basic-title'});
      this.callWeather(address);
    }
  }
  open2(content: any,address:any,end:any) {
        let endTime = new Date(end);
        let currTime = Date.now();
        this.day = Math.round((endTime.valueOf() - currTime.valueOf())/86400000);
        if (this.day >= 15){
          this.modalService.open("Cannot Predict More than 15 Days Weather.", {centered:true, ariaLabelledBy: 'modal-basic-title'});
        }
        else{
          this.modalService.open(content,  {size:'xl',centered: true, ariaLabelledBy: 'modal-basic-title'});
          this.callWeather(address);
        }
  }

  tripsRetrieval(token:string) {
  
  /*Whenever user accepts a trip invite this method is called again, so the arrays need to be cleaned out
  so that we dont get doubles, triples, etc.*/
  this.pastTrips = [];
  this.currentTrips = [];
  this.futureTrips = [];

   //Athorization token containing `[userId]:[username]` of current user
   this.token= sessionStorage.getItem("token") || '';
   //calls getTrips method in trip-sevice.sevice
   this.tripService.getTrips(token).subscribe(
     async response => {this.trips = response;
     //loops through all trips and sorts into futre current and past trips list by startTime
     for(let i = 0; i< this.trips.length; i++){
       let startTime = new Date(this.trips[i].startTime!).getTime();
       let endTime = new Date(this.trips[i].endTime!).getTime();
       let timeNow = Date.now();
       if(startTime > timeNow) {
         this.futureTrips.push(this.trips[i]);
       }
       else if(startTime < timeNow && endTime > timeNow){
         this.currentTrips.push(this.trips[i]);
       }
       else if(endTime < timeNow){
         this.pastTrips.push(this.trips[i]);
       }
   }
 })
  }
}