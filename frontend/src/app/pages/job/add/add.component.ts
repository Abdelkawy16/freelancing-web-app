import { GlobalService } from 'src/app/providers/services/global.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  errLogin = ''
  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    location: new FormGroup({
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required])
    }),
    cost: new FormControl('', [Validators.required])
  })
  constructor(private _global: GlobalService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  addJob() {
    this._global.addJob(this.addForm.value).subscribe(
      data => console.log(data),
      (e) => { this.toastr.error('failed!', e.error.message) },
      () => {
        this.toastr.success('Success!', 'job added successfully!')
        this.addForm.reset()
      }
    )
  }
}
