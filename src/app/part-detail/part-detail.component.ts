import { Component, OnInit, Input } from '@angular/core';
import { Part } from '../part';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PartService }  from '../part.service';

@Component({
  selector: 'app-part-detail',
  templateUrl: './part-detail.component.html',
  styleUrls: ['./part-detail.component.css']
})
export class PartDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private partService: PartService,
    private location: Location
  ) { }
  @Input() part: Part;

  ngOnInit(): void {
    this.getPart();
  }
  
  getPart(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.partService.getPart(id)
      .subscribe(part => this.part = part);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.partService.updatePart(this.part)
      .subscribe(() => this.goBack());
  }
}
