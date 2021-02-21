import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Stock} from '../../models/stock';
import {FtxService} from '../../services/ftx.service';
import {LoadingService} from '../../services/loading.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchControl = this.fb.control('');
  options: Stock[] = [];
  allStocks: Stock[] = [];

  constructor(private fb: FormBuilder,
              private ftxService: FtxService,
              private userService: UserService,
              private router: Router,
              private loadingService: LoadingService) { }

  async ngOnInit(): Promise<any> {
    await this.userService.q;
    this.loadingService.loading = true;
    this.ftxService.getAllMarket().subscribe((stocks: Stock[]) => {
      this.allStocks = stocks;
      console.log('stocks', stocks);
      this.loadingService.loading = false;

      this.searchControl.valueChanges.subscribe(value => {
        if (typeof value !== 'string') {
          return this.router.navigate(['/stock/' + value['name'].replace('/', '---')]);
        }
        if (value.length === 0) {
          this.options = [];
        }
        this.options = this.allStocks.filter(s => s.name.toLowerCase().includes(value.toLowerCase()));
      });
    });

  }

  navigate(stock: Stock): void {
    this.router.navigate(['/stock/' + stock.name.replace('/', '---') ]);
  }

}
