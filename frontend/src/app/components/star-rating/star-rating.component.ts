import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  public rating: number = 0;
  @Output() ratingEvent = new EventEmitter<number>();

  constructor() {
  }

  public onClick(rating: string): void {
    this.rating = parseInt(rating);
    this.ratingEvent.emit(this.rating);
  }

  public showIcon(index: string): string {
    return this.rating >= parseInt(index) ? 'star' : 'star_border';
  }
}
