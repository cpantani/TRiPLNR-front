import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }


  username: String = '';
  showUsername: String = '';
  password: String = '';
  showPassword: String = '';
  first: String = '';
  showFirst: String = '';
  last: String = '';
  showLast: String = '';
  address : String = '';
  showAddress : String = '';

  getAddress(fullAddress : String){
    this.address = fullAddress;
  }

  login(): void {
    this.showUsername = this.username;
    this.showPassword = this.password;
    this.showFirst = this.first;
    this.showLast = this.last;
    this.showAddress = this.address;
  }

  ngOnInit(): void {
  }

}
