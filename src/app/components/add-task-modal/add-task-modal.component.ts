import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController, IonHeader, IonToolbar, IonButtons, IonContent, IonButton, IonItem, IonInput } from '@ionic/angular/standalone';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
  imports: [FormsModule, IonHeader, IonToolbar, IonButtons, IonContent, IonButton, IonItem, IonInput]
})
export class AddTaskModalComponent {
  task = {
    name: '' as string,
    hours: '' as number | string,
    minutes: '' as number | string,
    seconds: '' as number | string,
    image: '' as string,
    status: false as boolean
  };

  constructor(private modalCtrl: ModalController, private alert: AlertService) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    if (!this.task.name) {
      this.alert.presentAlert('Name is required.', 'Error');
    } else if (!this.task.hours && !this.task.minutes && !this.task.seconds) {
      this.alert.presentAlert('Duration is required.', 'Error');
    } else {
      this.modalCtrl.dismiss(this.task, 'confirm');
      this.task = { name: '', hours: '', minutes: '', seconds: '', image: '', status: false };
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
}