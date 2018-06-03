import { Component, OnInit } from '@angular/core';
import { Part } from '../part';
import { PartService } from '../part.service';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.css']
})
export class PartsComponent implements OnInit {
  parts: Part[];

  constructor(private partService: PartService) { }

  ngOnInit() {
    this.getParts();
  }

  getParts(): void {
    this.partService.getParts()
    .subscribe(h => this.parts = h);
  }

  add(name: string, price: string): void {
    let part = {name:name, price: +price};
    if (!name || !price) { return; }
    this.partService.addPart( part as Part)
      .subscribe(p => {
        this.parts.push(p);
      });
  }
  delete(part: Part): void {
    this.parts = this.parts.filter(h => h !== part);
    this.partService.deletePart(part).subscribe();
  }
}