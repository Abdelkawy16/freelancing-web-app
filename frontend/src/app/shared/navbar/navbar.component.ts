import { GlobalService } from 'src/app/providers/services/global.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoaded = false
  constructor(public _global: GlobalService, private _router: Router) { }

  ngOnInit(): void {
    this._global.profile().subscribe(data => {
      this._global.isAuthed = true
      if (data.data.userType == 'client') {this._global.isClient = true; localStorage.setItem("userType","client")}
      else if (data.data.userType == 'freelancer') {this._global.isFreelancer = true; localStorage.setItem("userType","freelancer")}
      else if (data.data.userType == 'admin') {this._global.isAdmin = true; localStorage.setItem("userType","admin")}
      this._global.userData = data.data

    },
      (e) => { this._global.isAuthed = false, this.isLoaded = true },
      () => this.isLoaded = true
    )
  }
  logout() {
    this._global.logout().subscribe(
      (data) => { },
      (e) => { },
      () => {
        localStorage.removeItem('Token')
        localStorage.removeItem('userType')
        this._global.isAuthed = false
        this._global.isClient = false
        this._global.isFreelancer = false
        this._global.isAdmin = false
        this._global.userData = null
        this._router.navigateByUrl('/')
      })
  }
}