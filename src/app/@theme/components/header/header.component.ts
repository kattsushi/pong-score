import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Dark',
    },
    {
      value: 'light',
      name: 'Light',
    },
  ];
  languages = [{
    value: 'en',
    name: 'English',
  }, {
    value: 'es',
    name: 'Spanish',
  }];
  currentTheme = 'default';
  currentLang = 'en';

  userMenu = [ { title: 'Profile' }, { title: 'Log out', data: { id: 'logout' } } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private translate: TranslateService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.menuService.onItemClick()
      .pipe(filter(({ tag }) => tag === 'my-context-menu'))
      .subscribe(({item}) => {
        if (item.data.id === 'logout') {
          this.authService.signOut();
        }
    });
    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);
    this.user = this.authService.getCurrentUser();

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme() {
    this.themeService.changeTheme(this.currentTheme);
  }

  toggleLang() {
    this.translate.setDefaultLang(this.currentLang);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    // this.menuService.navigateHome();
    return false;
  }
}
