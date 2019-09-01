import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   tile:String="Authentication";
   mode:number=0;
  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit() {
  }

  onLogin(user) {
    this.auth.onLongin(user)
      .subscribe(resp => {
        console.log(resp);
        let jwt = resp.headers.get('Authorization');
        console.log(jwt);
        this.auth.saveToken(jwt);
        this.route.navigateByUrl('/chat')
      }, err => {
        console.log(err);
        this.mode = 1;
      })
  }

}
