import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() { }

  formatDuration(hours: number | string, minutes: number | string, seconds: number | string): string {
    const h = hours !== '' ? +hours : 0;
    const m = minutes !== '' ? +minutes : 0;
    const s = seconds !== '' ? +seconds : 0;
    const formattedHours = h < 10 ? `0${h}` : `${h}`;
    const formattedMinutes = m < 10 ? `0${m}` : `${m}`;
    const formattedSeconds = s < 10 ? `0${s}` : `${s}`;
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}