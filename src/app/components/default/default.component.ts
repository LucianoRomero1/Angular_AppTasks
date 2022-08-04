import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  public title: string;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.title = 'Homepage'
  }

  ngOnInit(): void {
  }

}
