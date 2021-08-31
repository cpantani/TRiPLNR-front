import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent implements OnInit {

  
  
  username?: String;
  password?: String;
  first?: String;
  last?: String;
  streetAddress ?: String ;
  city ?: String ;
  state ?: String ;
  zip ?: String ;
  address? : String;

  constructor(private userService : UserServiceService) { 
        // this.username = "username";
        // this.password = "password";
        // this.first = "firstName";
        // this.last = "lastName";
        // this.address = "address";
    this.userService.getCurrentUser().subscribe(
      response => {
        this.username = response.username;
        this.password = response.password;
        this.first = response.firstName;
        this.last = response.lastName;
        this.address = response.address;
        var splitted = response.address?.split(",",3); 
        var temp = splitted?.pop()?.split(" ");
        this.zip = temp?.pop();
        this.state = temp?.pop();
        this.city = splitted?.pop();
        this.streetAddress = splitted?.pop();
        
      }
    )
  }

  @Output() newAddressEvent = new EventEmitter<String>();
  @Input() toEmit = false;


  fullAddress : String = this.streetAddress + ", " + this.city + ", " + this.state + " " + this.zip;


  emitAddress(){
    this.fullAddress = this.streetAddress + ", " + this.city + ", " + this.state + " " + this.zip;
    this.newAddressEvent.emit(this.fullAddress);
  }

  
  ngOnInit(): void {
    
  }

  user?:User;
  response?: String;
  update(): void {
    this.user = {
      username: this.username,
      password: this.password,
      firstName: this.first,
      lastName: this.last,
      address: this.address
    }
    this.userService.update(this.user).subscribe(
      response => {

        this.response = response;
      }    
    )
    }
  }
