import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalService } from './../../../providers/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm = new FormGroup({
    name: new FormControl(this._global.userData?.name, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    email: new FormControl(this._global.userData?.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]),
    age: new FormControl(this._global.userData?.age),
    location: new FormGroup({
      street: new FormControl(this._global.userData?.location?.street),
      city: new FormControl(this._global.userData?.location?.city)
    }),
    phone: new FormControl(this._global.userData?.phone)
  })
  constructor(private _global:GlobalService, private _router:Router, private toastr:ToastrService) { 
  }
  
  ngOnInit(): void {
  }

  editProfile(){
    if (this.editForm.valid) {
      this._global.editProfile(this.editForm.value).subscribe(
        data=>{},
        e=>{this.toastr.error('failed', e.error.data)},
        ()=>{this.toastr.success('success', 'updated successfully'); this._router.navigate(["/user"])}
      )
    }
  }

}
