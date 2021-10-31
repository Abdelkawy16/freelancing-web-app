import { GlobalService } from 'src/app/providers/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showall',
  templateUrl: './showall.component.html',
  styleUrls: ['./showall.component.css']
})
export class ShowallComponent implements OnInit {
  item: any = ''
  jobs: any[] = []
  data: any[] = []
  searchedJob: any[] = []
  errorMessage: any = ''
  userData: any
  constructor(private _global: GlobalService) { this.userData = _global.userData }

  ngOnInit(): void {
    this._global.getAllJobs().subscribe(
      data => { this.data = data.data },
      e => this.errorMessage = e.message,
      () => {
        this.jobs = this.data.filter(job => job.done == false)
        this.searchedJob = this.jobs
      }
    )
  }
  search() {
    this.searchedJob = this.jobs.filter(job => {
      return (job.title.toLowerCase().includes(this.item.toLowerCase())
        || job.location.city.toLowerCase().includes(this.item.toLowerCase())
        || job.location.street.toLowerCase().includes(this.item.toLowerCase())
        || job._id.toLowerCase().includes(this.item.toLowerCase().replace('#', '')))
    })
  }
}
