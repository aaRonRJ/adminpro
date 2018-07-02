import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, private _ss: SettingsService) {}

  ngOnInit() {
    this.setCheck();
  }

  changeThemeColor(color: string) {
    this.applyCheck(color);
    this._ss.applyTheme(color);
  }

  applyCheck(color: string) {
    if (document.getElementsByClassName('working') && document.getElementsByClassName('working').length > 0) {
      document.getElementsByClassName('working')[0].classList.remove('working');
    }

    document.getElementsByClassName(`${color}-theme`)[0].classList.add('working');
  }

  setCheck() {
    const theme = JSON.parse(localStorage.getItem('settings'));
    this._document.getElementsByClassName(`${theme.theme}-theme`)[0].classList.add('working');
  }
}
