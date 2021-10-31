import { GlobalService } from 'src/app/providers/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  isLoaded:boolean = false
  notifications:any[]=[]
  constructor(private _global:GlobalService) { }

  ngOnInit(): void {
    this._global.profile().subscribe(
      data=>{console.log(data);this.notifications = data.data.notifications},
      e=>{},
      ()=> this.isLoaded = true
    )
  }
}
