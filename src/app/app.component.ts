import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {FirstTimeComponent} from './dialogs/first-time/first-time.component';
import {LoadingService} from './services/loading.service';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService,
              public loadingService: LoadingService,
              private dialog: MatDialog) {
  }

  async ngOnInit(): Promise<void> {
    this.loadingService.loading = true;
    await this.userService.loadUser().toPromise();
    this.loadingService.loading = false;
    console.log('user', this.userService.user);
    if (!this.userService.user) {
      this.dialog.open(FirstTimeComponent).afterClosed().subscribe(telegramUsername => {
        this.userService.setUser({
          telegram: telegramUsername,
          watchlist: []
        }).subscribe((user: User) => {
          this.userService.user = user;
          this.loadingService.loading = false;
        });
      });
    }
  }

}
