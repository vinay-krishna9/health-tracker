import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../service/api-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private _api = inject(ApiService);

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._api.users().subscribe((res) => {
      console.log(res);
    });
  }
}
