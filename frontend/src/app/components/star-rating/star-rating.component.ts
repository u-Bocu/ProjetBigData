import { Component } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  public rating: number = 0;

  constructor() {
  }

  public onClick(rating: string): void {
    console.log(rating);
    this.rating = parseInt(rating);
  }

  public showIcon(index: string): string {
    if (this.rating >= parseInt(index)) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
