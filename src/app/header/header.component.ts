import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuItems = ['صفحه اصلی', 'لیست ها', 'تماس با من'];
  routePaths = ['', 'list-manager', 'contact'];
}
