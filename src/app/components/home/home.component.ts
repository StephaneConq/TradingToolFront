import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {FtxService} from '../../services/ftx.service';
import {Stock} from '../../models/stock';
import {LoadingService} from '../../services/loading.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stocks: Stock[] = [];

  constructor(
    private userService: UserService,
    private ftxService: FtxService,
    private loadingService: LoadingService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.userService.q;
    if (!this.user) {
      this.loadingService.loading = false;
      return;
    }
    const qTab = [];
    this.user.watchlist.forEach(s => {
      this.loadingService.loading = true;
      qTab.push(new Promise(resolve => {
        this.ftxService.getMarket(s.symbol).subscribe((stock: Stock) => {
          this.stocks.push(stock);
          resolve(null);
        });
      }));
    });
    Promise.all(qTab).then(() => {
      this.loadingService.loading = false;
    });
  }

  get user(): User {
    return this.userService.user ? this.userService.user : null;
  }

  getStockPrice(stockName: string): number | string {
    const stock = this.stocks.find(s => s.name === stockName);
    return stock ? stock.price : '?';
  }

  moveToStock(stock): void {
    this.router.navigate(['/stock/' + stock.symbol.replace('/', '---')]);
  }

}
