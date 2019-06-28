import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-contact-information',
  template: `
    <nb-card>
      <nb-card-header>{{ 'profile.contact-information' | translate }}</nb-card-header>
      <nb-card-body>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="inputEmail">{{ 'profile.email' | translate }}</label>
              <input type="email" class="form-control" id="inputEmail" placeholder="Email">
            </div>
          </div>
          <div class="col-sm-6">
              <div class="form-group">
                  <label>{{ 'profile.location' | translate }}</label>
                  <select class="form-control">
                    <option>Lonndon</option>
                    <option>New York</option>
                    <option>China</option>
                    <option>Australia</option>
                  </select>
                </div>
      </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                  <label for="inputPhone">{{ 'profile.phone' | translate }}</label>
                  <input type="text" class="form-control" value="+1 (23) 456 7890" id="inputPhone" placeholder="Phone">
                </div>
              </div>
              <div class="col-sm-6">
                  <div class="form-group">
                    <label for="inputRoom">{{ 'profile.room' | translate }}</label>
                    <input type="text" class="form-control" value="301" id="inputRoom" placeholder="Room">
                  </div>
                </div>
        </div>
      </nb-card-body>
    </nb-card>
  `,
  styles: [``],
})
export class ContactInformationComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
