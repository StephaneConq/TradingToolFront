import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FtxService} from '../../services/ftx.service';
import {Stock} from '../../models/stock';
import {LoadingService} from '../../services/loading.service';
import {UserService} from '../../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {AddStockComponent} from '../../dialogs/add-stock/add-stock.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmComponent} from '../../dialogs/confirm/confirm.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  stock: Stock = null;

  constructor(
    private route: ActivatedRoute,
    private ftxService: FtxService,
    private loadingService: LoadingService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit(): Promise<void> {
    await this.userService.q;
    setTimeout(() => {
      this.loadingService.loading = true;
    }, 100);
    this.route.params.subscribe(params => {
      this.ftxService.getMarket(params['stock']).subscribe((stock: Stock) => {
        this.stock = stock;
        console.log('stock', stock);
        this.loadingService.loading = false;
      });
    });
  }

  addRemoveFavorite(stock: Stock): void {
    const idx = this.userService.user.watchlist.findIndex(s => s.symbol === stock.name);
    if (idx === -1) {
      this.dialog.open(AddStockComponent, {
        data: {
          name: stock.name
        }
      }).afterClosed().subscribe((data: {symbol: string; limit: number}) => {
        this.userService.user.watchlist.push(data);
        this.userService.setUser(this.userService.user).subscribe(() => {
          this.snackBar.open('Stock added', 'Dismiss', {duration: 3000});
        });
      });
    } else {
      this.dialog.open(ConfirmComponent, {
        data: {
          message: `Are you sure you want to delete this stock: ${stock.name}?`
        }
      }).afterClosed().subscribe(confirm => {
        if (confirm) {
          this.userService.user.watchlist.splice(idx, 1);
          this.userService.setUser(this.userService.user).subscribe(() => {
            this.snackBar.open('Stock deleted', 'Dismiss', {duration: 2000});
          });
        }
      });
    }
  }

  isFavorite(stock: Stock): boolean {
    return this.userService.user.watchlist.findIndex(s => s.symbol === stock.name) > -1;
  }

}
