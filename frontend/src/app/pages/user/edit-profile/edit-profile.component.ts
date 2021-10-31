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
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]),
    age: new FormControl(''),
    location: new FormGroup({
      street: new FormControl(''),
      city: new FormControl('')
    }),
    phone: new FormControl('', [Validators.required])
  })
  constructor(private _global:GlobalService, private _router:Router, private toastr:ToastrService) { 
    console.log(this._global.userData)
  }
  
  ngOnInit(): void {
    this._global.profile().subscribe(data=>{
      this.editForm.patchValue(data.data)
    })
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
