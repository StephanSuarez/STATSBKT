import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private http: HttpClient, private router: Router) {}

  dataLogin: adminInterface = {
    user: '',
    password: '',
  }

  logIn() {
    console.log('admin data: ', this.dataLogin)
    this.http.post<adminInterface>("http://localhost:3000/admins/auth", this.dataLogin)
      .subscribe(data => {
        localStorage.setItem('isAdminLoggedIn', 'true');
        if(data){
          this.router.navigate(['admin-panel']).then(()=>{
            window.location.reload();
          })
        }
      }, (error)=>{
        console.error("ERRRRRRRRRRRRROR", error)
      })
  }
}

type adminInterface = {
  user: string
  password: string
}