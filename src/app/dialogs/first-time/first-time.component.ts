import {Component, OnInit} from '@angular/core';
import {TelegramService} from '../../services/telegram.service';
import {FormBuilder} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-first-time',
  templateUrl: './first-time.component.html',
  styleUrls: ['./first-time.component.scss']
})
export class FirstTimeComponent implements OnInit {

  control = this.fb.control('MyUserName');
  loading = false;
  error = false;

  constructor(
    private telegramService: TelegramService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FirstTimeComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  verifyUsername(): void {
    this.loading = true;
    this.telegramService.checkUser(this.control.value).subscribe((exists: { exists: boolean }) => {
      console.log('exists', exists);
      if (!exists.exists) {
        this.control.setErrors({incorrect: true});
      } else {
        this.dialogRef.close(this.control.value);
        this.control.setErrors({});
      }
      this.loading = false;
    });
  }

}
