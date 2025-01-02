import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {SignUpModel} from "../../models/SignUpModel.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signuppage',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './signuppage.component.html',
  styleUrl: './signuppage.component.css'
})
export class SignuppageComponent {

  signUp: SignUpModel = new SignUpModel();

  constructor(private router: Router) {
  }

  onRegister() {
    const localUser = localStorage.getItem('CelerDB');
    let users: SignUpModel[];
    if (localUser !== null) {
      users = JSON.parse(localUser);
    } else {
      users = [];
    }
    users.push(this.signUp);
    localStorage.setItem('CelerDB', JSON.stringify(users));
    alert('Registration Successful!');
    this.router.navigateByUrl('/home')
      .catch(e => console.error('Navigation error:', e));
  }
}
