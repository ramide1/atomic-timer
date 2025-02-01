import { Component, Input } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonButton, ModalController } from '@ionic/angular/standalone';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-timer-modal',
  templateUrl: './timer-modal.component.html',
  styleUrls: ['./timer-modal.component.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent]
})
export class TimerModalComponent {
  @Input() selectedTask: any;
  timerHours: number = 0;
  timerMinutes: number = 0;
  timerSeconds: number = 0;
  isTimerRunning: boolean = false;
  timerInterval: any = null;

  constructor(private modalCtrl: ModalController, public common: CommonService) {
    setTimeout(() => {
      this.resetTimer();
    }, 200)
  }

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
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
      this.modalCtrl.dismiss(this.selectedTask, 'confirm');
    }
  }

  resetTimer() {
    this.timerHours = this.selectedTask.hours || 0;
    this.timerMinutes = this.selectedTask.minutes || 0;
    this.timerSeconds = this.selectedTask.seconds || 0;
  }
}