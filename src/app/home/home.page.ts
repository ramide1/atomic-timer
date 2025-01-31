import { Component, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonModal, IonButton, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/core/components';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonModal, IonButton, IonItem, IonLabel, IonList, CommonModule, FormsModule],
})
export class HomePage {
  @ViewChild('addTaskModal') addTaskModal!: IonModal;
  @ViewChild('timerModal') timerModal!: IonModal;

  taskList: any[] = [];

  task = {
    name: '' as string,
    hours: '' as number | string,
    minutes: '' as number | string,
    seconds: '' as number | string,
    image: '' as string,
  };

  selectedTask: any = null;
  timerHours: number = 0;
  timerMinutes: number = 0;
  timerSeconds: number = 0;
  isTimerRunning: boolean = false;
  timerInterval: any = null;

  constructor(private storage: StorageService, private alert: AlertService) {
    addIcons({ addOutline });
    this.getTasks();
  }

  cancel() {
    this.addTaskModal.dismiss(null, 'cancel');
  }

  async confirm() {
    if (!this.task.name) {
      this.alert.presentAlert('Name is required.', 'Error');
    } else if (!this.task.hours && !this.task.minutes && !this.task.seconds) {
      this.alert.presentAlert('Duration is required.', 'Error');
    } else {
      this.addTaskModal.dismiss(this.task, 'confirm');
      this.taskList.push({ ...this.task });
      await this.storage.set('tasks', this.taskList);
      this.task = { name: '', hours: '', minutes: '', seconds: '', image: '' };
    }
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.task = event.detail.data;
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.task.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  openAddTaskModal() {
    this.addTaskModal.present();
  }

  private async getTasks() {
    await this.storage.init();
    this.taskList = await this.storage.get('tasks') || [];
  }

  openTimerModal(task: any) {
    this.selectedTask = task;
    this.timerHours = task.hours || 0;
    this.timerMinutes = task.minutes || 0;
    this.timerSeconds = task.seconds || 0;
    this.timerModal.present();
  }

  closeTimerModal(manual: boolean) {
    if (manual) {
      this.timerModal.dismiss();
    } else {
      if (this.isTimerRunning) {
        this.startStopTimer()
      }
    }
    if (this.selectedTask) {
      this.selectedTask.hours = this.timerHours;
      this.selectedTask.minutes = this.timerMinutes;
      this.selectedTask.seconds = this.timerSeconds;
      this.storage.set('tasks', this.taskList);
    }
  }

  startStopTimer() {
    if (this.isTimerRunning) {
      clearInterval(this.timerInterval);
    } else {
      this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }
    this.isTimerRunning = !this.isTimerRunning;
  }

  updateTimer() {
    if (this.timerSeconds > 0) {
      this.timerSeconds--;
    } else if (this.timerMinutes > 0) {
      this.timerMinutes--;
      this.timerSeconds = 59;
    } else if (this.timerHours > 0) {
      this.timerHours--;
      this.timerMinutes = 59;
      this.timerSeconds = 59;
    } else {
      clearInterval(this.timerInterval);
      this.isTimerRunning = false;
      this.timerModal.dismiss();
      this.alert.presentAlert('Task ' + this.selectedTask.name + ' has been completed. Congratulations!!.', 'Success');
      this.deleteTask(this.selectedTask);
    }
  }

  resetTimer() {
    this.timerHours = this.selectedTask.hours || 0;
    this.timerMinutes = this.selectedTask.minutes || 0;
    this.timerSeconds = this.selectedTask.seconds || 0;
  }

  deleteTask(task: any) {
    this.taskList = this.taskList.filter(t => t !== task);
    this.storage.set('tasks', this.taskList);
  }

  formatDuration(hours: number | string, minutes: number | string, seconds: number | string): string {
    const h = hours !== '' ? +hours : 0;
    const m = minutes !== '' ? +minutes : 0;
    const s = seconds !== '' ? +seconds : 0;
    const formattedHours = this.padWithZero(h);
    const formattedMinutes = this.padWithZero(m);
    const formattedSeconds = this.padWithZero(s);
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  private padWithZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}