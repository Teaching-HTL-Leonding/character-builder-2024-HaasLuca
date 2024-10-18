import {Component, inject, signal} from '@angular/core';
import {Character} from "../build/build.component";
import {ApiFetchService} from "../api-fetch.service";

@Component({
  selector: 'app-random',
  standalone: true,
  imports: [],
  templateUrl: './random.component.html',
  styleUrl: './random.component.css'
})
export class RandomComponent {
  apiFetchService = inject(ApiFetchService);

  imageSrc = signal('');
  originalSrc = signal('');
  scale = signal(1);

  getRandomImage() {
    this.apiFetchService.getRandomCharacter().subscribe((res: Character) => {
      this.apiFetchService.getCharacterSrc(res).subscribe((res: any) => {
        if (res.url === undefined) {
          console.error('Error fetching character image');
          return;
        }
        this.imageSrc.set(res.url);
        this.originalSrc.set(res.url);
      });
    });
  }

  makeBigger() {
    this.scale.update(curScale => curScale + 0.1);
    this.changeScale();
  }

  makeSmaller() {
    this.scale.update(curScale => curScale - 0.1);
    this.changeScale();
  }

  changeScale() {
    this.imageSrc.set(this.originalSrc() + '?scale=' + this.scale());
  }
}
