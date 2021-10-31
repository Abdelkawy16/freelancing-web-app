import { Router } from '@angular/router';
import { ProfileComponent } from './../profile/profile.component';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/providers/services/global.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css']
})
export class AddInfoComponent implements OnInit {
  err = ''
  addForm = new FormGroup({
    info: new FormControl(this._global.userData?.info, [Validators.required, Validators.maxLength(500)])
  })
  constructor(private _global:GlobalService, private toastr:ToastrService, private _router:Router) { }

  ngOnInit(): void {
  }
  addInfo(){
    this._global.addInfo(this.addForm.value).subscribe(
      data => {
       this._global.userData.info = data.data.info
      },
      (e) => { this.toastr.error('failed!', e.error.message) },
      () => {
        this.toastr.success('Success!', 'info updated successfully!')
        this.addForm.reset()
        this._router.navigate(["/user"])
      }
    )
  }

}
