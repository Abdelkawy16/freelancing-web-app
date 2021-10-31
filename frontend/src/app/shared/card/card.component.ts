import { GlobalService } from './../../providers/services/global.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() dData: any
  constructor(public _global: GlobalService) { }

  ngOnInit(): void {
  }

}
