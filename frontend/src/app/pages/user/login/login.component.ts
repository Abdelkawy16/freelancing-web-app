import { GlobalService } from 'src/app/providers/services/global.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errLogin = ""
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  constructor(private _global: GlobalService, private router: Router, private toastr: ToastrService) {}
  ngOnInit(): void {
  }
  get email() { return this.loginForm.get("email") }
  get password() { return this.loginForm.get("password") }
  login() {
    if (this.loginForm.valid) {
      this._global.loginUser(this.loginForm.value).subscribe(
        (data) => {
          localStorage.setItem('Token', data.data.token)
          this._global.userData = data.data.user
        },
        (e) => {  this.errLogin = e.error.data },
        () => {
          this.errLogin = ""
          this._global.isAuthed = true
          if (this._global.userData.userType == 'client') this._global.isClient = true
          else if (this._global.userData.userType == 'freelancer') this._global.isFreelancer = true
          else if (this._global.userData.userType == 'admin') this._global.isAdmin = true
          this.toastr.success('Success!', 'logged in!')
          this.router.navigate(["/user"])
        }
      )
    }
  }
}