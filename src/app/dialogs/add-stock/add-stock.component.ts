import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  model = 0;

  constructor(
    public dialogRef: MatDialogRef<AddStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
  ) { }

  ngOnInit(): void {
  }

  add(): void {
    this.dialogRef.close({
      symbol: this.data.name,
      limit: parseFloat(this.model.toString(10))
    });
  }

}
