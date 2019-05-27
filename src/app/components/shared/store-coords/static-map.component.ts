import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-static-map',
  templateUrl: './static-map.component.html',
  styles: []
})
export class StaticMapComponent implements OnInit {
   public MapURL: string = '';
  constructor(private ref: MatDialogRef<StaticMapComponent>,
    @Inject(MAT_DIALOG_DATA) public mapStatic: string) { }

  ngOnInit() {
    this.MapURL = this.mapStatic;
  }

}
