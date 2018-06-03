import { Component, OnInit } from '@angular/core';
import { Part } from '../part';
import { PartService } from '../part.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  parts: Part[] = [];
 
  constructor(private partService: PartService) { }
 
  ngOnInit() {
    this.getParts();
  }
 
  getParts(): void {
    this.partService.getParts()
      .subscribe(s => this.parts = s.slice(0, 4));
  }
}