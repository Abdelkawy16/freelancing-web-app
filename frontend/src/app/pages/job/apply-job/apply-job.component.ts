import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/providers/services/global.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit {
  id: any
  applyForm = new FormGroup({
    cost: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    freelancer: new FormControl(this._global.userData._id)
  })
  constructor(private _route: ActivatedRoute, private _global: GlobalService, private toastr: ToastrService, private _router:Router) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id')
  }
  apply() {
    if (this.applyForm.valid) {
      this._global.applyJob(this.id, this.applyForm.value).subscribe(
        data => {  },
        e => { 
          this.toastr.error('failed!', e.error.message)
         },
        () => {
          this._router.navigate(["/job"])
          this.toastr.success('Success!', 'applied successfully!')
        }
      )
    }
  }
}
