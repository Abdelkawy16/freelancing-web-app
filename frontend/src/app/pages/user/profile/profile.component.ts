import { GlobalService } from 'src/app/providers/services/global.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any = {}
  file: any
  constructor(private _global: GlobalService, private toastr: ToastrService, private _router:Router) {
    console.log();
  }

  ngOnInit(): void {
    this._global.profile().subscribe(
      (data) => {
        this.userData = data.data
      }
    )
  }
  onChangeFile(event: any) { this.file = event.target.files[0] }
  upimg() {
    const myData = new FormData()
    myData.append("img", this.file, this.file.name)
    this._global.addImg(myData).subscribe(
      data => { console.log(data); this.userData.image = data.data.image },
      e => { this.toastr.error('failed!', e.error.message) },
      () => { }
    )
  }
  delMyAccount() {
    if (confirm("Are you sure to delete your account")) {
      this._global.delMyAccount().subscribe(data => { }, 
        e => this.toastr.error('failed!', e.error.message),
        () => {
          localStorage.removeItem('Token')
          this._global.isAuthed = false
          this._global.isClient = false
          this._global.isFreelancer = false
          this._global.isAdmin = false
          this._global.userData = null
          this.toastr.success('success!', 'deleted successfully')
          this._router.navigateByUrl('/')
        })
    }
  }
}