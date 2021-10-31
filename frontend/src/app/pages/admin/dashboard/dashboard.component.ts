import { ToastrService } from 'ngx-toastr';
import { GlobalService } from './../../../providers/services/global.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  jobsLoaded:boolean=false
  usersLoaded:boolean=false
  userData: any
  jobs: any[] = []
  searchedJobs: any[] = []
  users: any[] = []
  searchedUsers: any[] = []

  job: any; user: any
  constructor(private _global: GlobalService, private toastr: ToastrService, private _router: Router) {  }

  ngOnInit(): void {
    this._global.getUsers().subscribe(
      data => { this.users = data.data },
      e => this.toastr.error('failed', e.error.data),
      () => { this.searchedUsers = this.users; this.userData = this._global.userData; this.usersLoaded=true }
    )
    this._global.getAllJobs().subscribe(
      data => { this.jobs = data.data },
      e => this.toastr.error('failed', e.error.data),
      () => { this.searchedJobs = this.jobs; this.jobsLoaded=true}
    )
  }
  searchJob() {
    this.searchedJobs = this.jobs.filter(job => {
      return (job.title.toLowerCase().includes(this.job.toLowerCase())
        // || job.location.city.toLowerCase().includes(this.job.toLowerCase()) 
        // || job.location.street.toLowerCase().includes(this.job.toLowerCase())
        || job._id.toLowerCase().includes(this.job.toLowerCase().replace('#', '')))
    })
  }
  searchUser() {
    this.searchedUsers = this.users.filter(user => {
      return (user.name.toLowerCase().includes(this.user.toLowerCase())
        // || user.location.city.toLowerCase().includes(this.user.toLowerCase()) 
        // || user.location.street.toLowerCase().includes(this.user.toLowerCase())
        || user._id.toLowerCase().includes(this.user.toLowerCase().replace('#', '')))
    })
  }
  delUser(id: any, i: any) {
    if (confirm("Are you sure to delete this user?")) {
      this._global.delUserByAdmin(id).subscribe(
        data => { console.log(data) },
        e => this.toastr.error('failed', e.error.data),
        () => {
          this.searchedUsers.splice(i, 1) 
          this.toastr.success('success', 'deleted successfully!') 
        }
      )
    }
  }
  delJob(id: any, i: any) {
    if (confirm("Are you sure to delete this job?")) {
      this._global.delJobByAdmin(id).subscribe(
        data => { console.log(data) },
        e => this.toastr.error('failed', e.error.data),
        () => {
          this.searchedJobs.splice(i, 1) 
          this.toastr.success('success', 'deleted successfully!') 
        }
      )
    }
  }
}
