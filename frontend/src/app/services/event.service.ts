import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private navigationEvent = new EventEmitter<any>();
  private quizEvent = new EventEmitter<any>();

  emitRefreshNavigationEvent() {
    this.navigationEvent.emit();
  }
  emitRefreshQuizEvent() {
    this.quizEvent.emit();
  }

  getRefreshNavigationEvent() {
    return this.navigationEvent;
  }
  getRefreshQuizEvent() {
    return this.quizEvent;
  }
}
