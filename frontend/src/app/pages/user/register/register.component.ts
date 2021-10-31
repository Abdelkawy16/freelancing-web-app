import { GlobalService } from 'src/app/providers/services/global.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  emailError = ''
  user = {
    name: '',
    email: '',
    phone: '',
    age: '',
    password: '',
    userType: '',
    gender: ''
  }

  constructor(private _global: GlobalService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onRegister(userData: NgForm) {
    if (userData.valid) {
      this._global.registerUser(this.user).subscribe(
        data => { },
        e => {
          if (e.error.data.includes('email')) this.emailError = 'email used before!'
          else if(e.error.data.includes('phone')) this.emailError = 'invalid phone number!'
          this.toastr.error('failed!', e.error.message);
        },
        () => {
          this.emailError = ""
          userData.resetForm()
          this.toastr.success('Success!', 'registered!');
          setTimeout(() => {
            this.router.navigateByUrl('/user/login')
          }, 500)
        }
      )
    }
  }
}
