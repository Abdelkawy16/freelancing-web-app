import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/providers/services/global.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-profile',
  templateUrl: './get-profile.component.html',
  styleUrls: ['./get-profile.component.css']
})
export class GetProfileComponent implements OnInit {
  id:any
  userData: any
  constructor(private _global:GlobalService, private _route: ActivatedRoute, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.id =  this._route.snapshot.paramMap.get('id')
    this._global.getUser(this.id).subscribe(
      data => { this.userData = data.data },
      e => { this.toastr.error('failed!', 'unable to find user'); console.log(e)},
      () => {  }
    )
  }

}
