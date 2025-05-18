import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonItem, IonLabel, IonList, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { AlertService } from '../services/alert.service';
import { AddTaskModalComponent } from '../components/add-task-modal/add-task-modal.component';
import { TimerModalComponent } from '../components/timer-modal/timer-modal.component';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonItem, IonLabel, IonList, CommonModule, FormsModule],
})
export class TasksPage {
  taskList: any[] = [];

  constructor(private storage: StorageService, private alert: AlertService, private modalCtrl: ModalController, public common: CommonService) {
    addIcons({ addOutline });
    this.getTasks();
  }

  private async getTasks() {
    await this.storage.init();
    this.taskList = await this.storage.get('tasks') || [];
  }

  async openAddTaskModal() {
    const modal = await this.modalCtrl.create({
      component: AddTaskModalComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.taskList.push({ ...data });
      this.storage.set('tasks', this.taskList);
    }
  }

  async openTimerModal(task: any) {
    const modal = await this.modalCtrl.create({
      component: TimerModalComponent,
      componentProps: {
        selectedTask: task
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.alert.presentAlert('Task ' + data.name + ' has been completed. Congratulations!!.', 'Success');
      this.taskList = this.taskList.filter(t => t !== data);
      this.storage.set('tasks', this.taskList);
    }
  }
}