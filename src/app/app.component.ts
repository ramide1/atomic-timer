import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { paperPlaneOutline, paperPlaneSharp, gameControllerSharp, gameControllerOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public user: string = 'User';
  public appPages = [
    { title: 'Tasks', url: '/tasks', icon: 'paper-plane' },
    { title: 'Free Time Tasks', url: '/free-time-tasks', icon: 'game-controller' }
  ];
  constructor() {
    addIcons({ paperPlaneOutline, paperPlaneSharp, gameControllerSharp, gameControllerOutline });
  }
}