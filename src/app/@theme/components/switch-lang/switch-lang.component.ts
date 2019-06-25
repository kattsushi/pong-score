import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-switch-lang',
  template: `
  <nb-select [(selected)]="currentLang" (selectedChange)="toggleLang()" status="primary">
    <nb-option *ngFor="let lang of languages" [value]="lang.value"> {{ lang.name }}</nb-option>
  </nb-select>
  `,
  styleUrls: ['./switch-lang.component.scss'],
})
export class SwitchLangComponent implements OnInit {

  languages = [{
    value: 'en',
    name: 'English',
  }, {
    value: 'es',
    name: 'Spanish',
  }];

  currentLang = 'en';
  constructor(
    private translate: TranslateService,
  ) { }

  ngOnInit() {
  }

  toggleLang() {
    this.translate.setDefaultLang(this.currentLang);
  }

}
