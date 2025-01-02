import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {SigninModel} from "../../models/SignInModel.model";
import {SignUpModel} from "../../models/SignUpModel.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {

  signIn: SigninModel  = new SigninModel();

  constructor(private router: Router){}
  onSignIn() {
    const localUsers = localStorage.getItem('CelerDB');
    if (localUsers) {
      const users: SignUpModel[] = JSON.parse(localUsers);
      const isUser = users.find((user: SignUpModel) => user.email === this.signIn.email && user.password === this.signIn.password);

      if (isUser) {
        alert('Welcome!');
        localStorage.setItem('loggedUser', JSON.stringify(isUser));
        this.router.navigateByUrl('/home')
          .catch(error => console.error('Navigation error:', error));
      } else {
        alert('Wrong login info, try again or make an account (:');
      }
    } else {
      alert('Sorry, please make an account before logging in (:');
    }
  }
}
