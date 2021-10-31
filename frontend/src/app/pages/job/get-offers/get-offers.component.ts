import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/providers/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-offers',
  templateUrl: './get-offers.component.html',
  styleUrls: ['./get-offers.component.css']
})
export class GetOffersComponent implements OnInit {
  id: any
  job: any
  offers: any[] = []
  constructor(private _global: GlobalService, private toastr: ToastrService, private _route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id')
    this._global.getJobById(this.id).subscribe(
      data => { this.job = data.data },
      e => { this.toastr.error('failed!', e.error.message) },
      () => { this.offers = this.job.offers }
    )
  }
  acceptOffer(offerId: any) {
    console.log(this.job._id, offerId)
    this._global.acceptOffer(this.job._id, offerId).subscribe(
      data => { console.log(data); },
      e => { this.toastr.error('failed!', 'unable to accept offer')},
      () => { this.toastr.success('success!', 'accepted successfully');  this.router.navigate(['/job/myjobs']) }

    )
  }
}
