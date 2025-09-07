import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-java-api';
  activeTab = 0;

  tabs = [
    { label: 'Lost Items', icon: '📦' },
    { label: 'Claims', icon: '📋' },
    { label: 'Users', icon: '👥' },
    { label: 'Upload PDF', icon: '📄' }
  ];
}
