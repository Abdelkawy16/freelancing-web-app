import { GlobalService } from 'src/app/providers/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications:any[]=[]
  constructor(private _global:GlobalService) { }

  ngOnInit(): void {
    this.notifications = this._global.userData.notifications
    console.log(this.notifications)
  }

}
