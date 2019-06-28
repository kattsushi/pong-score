import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-change-password',
  template: `
    <nb-card>
      <nb-card-header>{{ 'profile.change-password' | translate }}</nb-card-header>
      <nb-card-body>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="inputPassword">{{ 'profile.password' | translate }}</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword"
                placeholder="{{ 'profile.password' | translate }}">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label for="inputConfirmPassword">{{ 'profile.confirm-password' | translate }}</label>
              <input
                type="password"
                class="form-control"
                id="inputConfirmPassword"
                placeholder="{{ 'profile.confirm-password' | translate }}">
            </div>
          </div>
        </div>
      </nb-card-body>
    </nb-card>
    `,
  styles: [``],
})
export class ChangePasswordComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
