import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/providers/services/global.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-myjobs',
  templateUrl: './myjobs.component.html',
  styleUrls: ['./myjobs.component.css']
})
export class MyjobsComponent implements OnInit {

  // searchForm = new FormGroup({
  //   title: new FormControl('')
  // })
  item: any = ''
  jobs: any[] = []
  searchedJob: any[] = []
  errorMessage: any = ''
  constructor(private _global: GlobalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this._global.getMyJobs().subscribe(
      data => { this.jobs = data.data },
      e => this.errorMessage = e.message,
      () => { this.searchedJob = this.jobs }
    )
  }
  search() {
    this.searchedJob = this.jobs.filter(job => {
      return (job.title.toLowerCase().includes(this.item.toLowerCase()) 
      || job.location.city.toLowerCase().includes(this.item.toLowerCase()) 
      || job.location.street.toLowerCase().includes(this.item.toLowerCase()))
    })
  }
  delJob(id: any, i: any) {
    this._global.delJob(id).subscribe(data => { },
      e => { },
      () => {
        this.searchedJob.splice(i, 1)
        this.jobs = this.jobs.filter(job => job._id != id)
        this.toastr.success('Success!', 'deleted!')
      }
    )
  }
}
