import {Injectable} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import * as moment from 'moment';
import {Observable, Subject} from 'rxjs';

interface RecordedAudioOutput {
  blob: Blob;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {
  private stream: MediaStream | null | undefined;
  private recorder: { record: () => void; stop: (arg0: (blob: any) => void, arg1: () => void) => void; } | null | undefined;
  private interval: string | number | undefined;
  private startTime: moment.Moment | null | undefined;
  private _recorded = new Subject<RecordedAudioOutput>();
  private _recordingTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();


  getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this._recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }


  startRecording() {
    if (this.recorder) {
      return;
    }

    this._recordingTime.next('00:00');
    navigator.mediaDevices.getUserMedia({audio: true}).then(s => {
      this.stream = s;
      this.record();
    });

  }

  abortRecording() {
    this.stopMedia();
  }

  private record() {
    if (this.stream) {
      this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
        type: 'audio',
        mimeType: 'audio/webm'
      });
    }

    this.recorder?.record();
    this.startTime = moment();
    this.interval = setInterval(
      () => {
        const currentTime = moment();
        const diffTime = moment.duration(currentTime.diff(this.startTime));
        const time = this.toString(diffTime.minutes()) + ':' + this.toString(diffTime.seconds());
        this._recordingTime.next(time);
      },
      1000
    );
  }

  private toString(value: number) {
    let val = value.toString();
    if (!value) {
      val = '00';
    }
    if (value < 10) {
      val = '0' + value;
    }
    return val;
  }

  stopRecording() {
    if (this.recorder) {
      this.recorder.stop((blob: any) => {
        if (this.startTime) {
          const mp3Name = encodeURIComponent('audio_' + new Date().getTime() + '.mp3');
          this.stopMedia();
          this._recorded.next({blob: blob, title: mp3Name});
        }
      }, () => {
        this.stopMedia();
      });
    }
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      if (typeof this.interval === "string") {
        clearInterval(parseInt(this.interval));
      }
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach((track: { stop: () => any; }) => track.stop());
        this.stream = null;
      }
    }
  }

}
