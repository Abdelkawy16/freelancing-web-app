import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoaded: boolean = false
  articles: any[] = []
  constructor(public _global: GlobalService) { }

  ngOnInit(): void {
    this.getNews()
  }

  getNews() {
    this._global.getNews().subscribe(data => {
      this.articles = data.articles
    },
      e => { },
      () => { this.isLoaded = true })
  }

}