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
      if (data.data.userType == 'client') this._global.isClient = true
      else if (data.data.userType == 'freelancer') this._global.isFreelancer = true
      else if (data.data.userType == 'admin') this._global.isAdmin = true
      this._global.userData = data.data
      // this._global.userData.name = this._global.userData.name.slice(0, 7) + '.'
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
        this._global.isAuthed = false
        this._global.isClient = false
        this._global.isFreelancer = false
        this._global.isAdmin = false
        this._global.userData = null
        this._router.navigateByUrl('/')
      })
  }
}