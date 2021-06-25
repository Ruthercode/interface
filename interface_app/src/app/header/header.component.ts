import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private location: Location, public router: Router) { }

  ngOnInit(): void {
  }

  getLastRoute(): void {
    this.location.back();
  }
}
