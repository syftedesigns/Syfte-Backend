import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadProductsComponent } from '../../shared/upload-products/upload-products.component';

@Component({
  selector: 'app-alliance',
  templateUrl: './alliance.component.html',
  styles: []
})
export class AllianceComponent implements OnInit {
  ELEMENT_DATA: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource: any[];
  constructor(public dialog: MatDialog) {
    this.dataSource = this.ELEMENT_DATA;

  }

  ngOnInit() {
  }
  showFileUpload() {
    const modalProfile = this.dialog.open(UploadProductsComponent, {
      width: '400px',
      height: '220px',
    });

    // Para estar a la escucha de cuando cierre el modal
    modalProfile.afterClosed().subscribe(
      (result: any): void => {
        console.log('fue cerrado el modal');
      }
    );
  }
}
