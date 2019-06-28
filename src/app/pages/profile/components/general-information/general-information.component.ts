import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'ngx-general-information',
  template: `
  <nb-card>
    <nb-card-header>{{'profile.general-information' | translate }}</nb-card-header>
    <nb-card-body>
      <form class="form-horizontal">
        <div class="form-group row">
          <div class="col-sm-6">
            <div
              (mouseenter)="imageHover()"
              (mouseleave) ="imageLeave()"
              (click)="file.click()" *ngIf="originalProfilePic; else getNewPic" class="user"
              [style.background-image]="'url(' + user.picture + ')'">
            </div>
            <ng-template #getNewPic>
              <div class ="get-new-pic-div" (click)="file.click()">
                <img class="user" (mouseenter)="imageHover()" (mouseleave)="imageLeave()" [src]="filePreview" />
              </div>
            </ng-template>
            <div>
              <div>
                <input #file type="file" [hidden]="true" accept="image/*" (change)="getFilePath($event)">
              </div>
            </div>
            <div (mouseenter)="imageHover()" (mouseleave)="imageLeave()">
              <p>{{ 'profile.change-profile-picture' | translate }}</p>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-6">
            <label for="inputEmail3">{{'profile.first-name' | translate}}</label>
            <input type="text" class="form-control" id="inputEmail3">
          </div>
          <div class="col-sm-6">
            <label for="inputEmail3">{{ 'profile.departament' | translate }}</label>
            <select class="form-control">
              <option>Engineering</option>
              <option>IT</option>
              <option>Production</option>
              <option>Human Resources</option>
            </select> </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-6">
            <label for="inputPassword3">{{ 'profile.last-name' | translate }}</label>
            <input type="text" class="form-control" id="inputPassword3" placeholder="Enter your last name here...">
          </div>
          <div class="col-sm-6">
            <label for="inputEmail3">{{ 'profile.occupation' | translate }}</label>
            <select class="form-control">
              <option>Production Manager</option>
              <option>Shop Floor Assistant</option>
              <option>Engineer</option>
              <option>IT Technician</option>
            </select>
          </div>
        </div>
      </form>
    </nb-card-body>
  </nb-card>
  `,
  styles: ['./general-information.component.scss'],
})
export class GeneralInformationComponent implements OnInit {

  @Input() user: any;
  file: File;
  originalProfilePic = true;
  class = 'hide-text';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getFilePath(e: any) {
    this.originalProfilePic = false;
    this.file = e.target.files[0];
  }

  get filePreview(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl((
      window.URL.createObjectURL(this.file)));
  }

  imageHover() {
    this.class = 'show-text';
  }

  imageLeave() {
    this.class = 'hide-text';
  }
}
