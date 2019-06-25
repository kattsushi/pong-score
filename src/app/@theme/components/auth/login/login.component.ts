import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { NB_AUTH_OPTIONS } from '@nebular/auth';
// import { getDeepFromObject } from '@nebular/auth/helpers';
import { AuthService } from '../../../../auth.service';
// import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-login',
  template: `
    <ngx-auth-block>
      <ngx-switch-lang></ngx-switch-lang>
      <h2 class="title"><strong>Pong-Score</strong> {{'login.title' | translate }}</h2>
      <small class="form-text sub-title">{{'login.subtitle' | translate}}</small>
      <form (ngSubmit)="login()" #form="ngForm" autocomplete="off">
        <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted"
             class="alert alert-danger" role="alert">
          <div><strong>¡Ups!</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </div>
        <div class="form-group">
          <label for="input-email" class="sr-only">{{'login.form.email' | translate}}</label>
          <input name="email" [(ngModel)]="user.email" id="input-email" pattern=".+@.+\..+"
                 autocomplete="username email"
                 class="form-control" placeholder="{{'login.form.email' | translate}}" #email="ngModel"
                 [class.form-control-danger]="email.invalid && email.touched" autofocus
                 [required]="getConfigValue('forms.validation.email.required')">
          <small class="form-text error" *ngIf="email.invalid && email.touched && email.hasError('required')">
            ¡E-mail requerido!
          </small>
          <small class="form-text error"
                 *ngIf="email.invalid && email.touched && email.hasError('pattern')">
            ¡E-mail inválido!
          </small>
        </div>
        <div class="form-group">
          <label for="input-password" class="sr-only">Password</label>
          <input name="password" [(ngModel)]="user.password" type="password" id="input-password"
                 autocomplete="current-password"
                 class="form-control" placeholder="Password" #password="ngModel"
                 [class.form-control-danger]="password.invalid && password.touched"
                 [required]="getConfigValue('forms.validation.password.required')"
                 [minlength]="getConfigValue('forms.validation.password.minLength')"
                 [maxlength]="getConfigValue('forms.validation.password.maxLength')">
          <small class="form-text error" *ngIf="password.invalid && password.touched && password.hasError('required')">
            ¡Contraseña requerida!
          </small>
          <small
            class="form-text error"
            *ngIf="password.invalid && password.touched && (password.hasError('minlength') ||
                   password.hasError('maxlength'))">
            La contraseña debe contener
            entre {{ getConfigValue('forms.validation.password.minLength') }}
            y {{ getConfigValue('forms.validation.password.maxLength') }}
            caracteres.
          </small>
        </div>
        <div class="form-group accept-group col-sm-12">
          <!--<nb-checkbox name="rememberMe" [(ngModel)]="user.rememberMe">Recordar contraseña</nb-checkbox>-->
          <a class="forgot-password" routerLink="/auth/request-password">¿Has olvidado tu contraseña?</a>
        </div>
        <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
                [class.btn-pulse]="submitted">
          Enviar
        </button>
      </form>
    </ngx-auth-block>
  `,
})
export class NgxLoginComponent {

  showMessages: any = {};
  environment = environment;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router,
              protected auth: AuthService,
              translate: TranslateService,
              /*private db: AngularFireDatabase,*/
  ) {1
    this.showMessages = this.getConfigValue('forms.login.showMessages');
  }

  login(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.auth.emailLogin(this.user.email, this.user.password).then((credentials) => {
      if (!!credentials && !!credentials.user && !credentials.user.isAnonymous) {
        this.messages = ['Usuario válido. Accediendo...'];
        setTimeout(() => {
          return this.router.navigate(['/pages/dashboard']);
        });
      }
      throw new Error('Usuario no válido.');
    }).catch(err => {
      this.errors = [err.message];
    }).then(() => {
      this.submitted = false;
    });
  }

  getConfigValue(key: string): any {
    return false;
    // return getDeepFromObject(this.options, key, null);
  }
}
