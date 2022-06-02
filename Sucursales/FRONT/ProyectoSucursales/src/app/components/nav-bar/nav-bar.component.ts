import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarLoginRestService } from 'src/app/services/nav-bar-login-rest.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  role: any = "";

  constructor(
    public router: Router,
    public navBarRest: NavBarLoginRestService
  ) { }

  ngOnInit(): void {
    this.role = this.navBarRest.getUser().role;
  }

  closeSession(){
    this.router.navigateByUrl("");
    localStorage.clear();
  }

  profile(){
    this.router.navigateByUrl("/profile");
  }

}
