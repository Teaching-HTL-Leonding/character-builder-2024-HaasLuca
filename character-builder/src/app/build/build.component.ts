import {Component, inject, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ApiFetchService} from "../api-fetch.service";
import {NgOptimizedImage} from "@angular/common";

export interface Character {
  "eye": string,
  "hasHammer": boolean,
  "mouth": string,
  "rightHand": string,
  "hasTail": boolean,
}

@Component({
  selector: 'app-build',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './build.component.html',
  styleUrl: './build.component.css'
})
export class BuildComponent {
  apiFetchService = inject(ApiFetchService);

  eye = signal('NoEye');
  hammer = signal(false);
  mouth = signal('Normal');
  rightHand = signal('Normal');
  tail = signal(false);

  charSrc = signal('');

  buildCharacter() {
    this.apiFetchService.getCharacterSrc(this.getChar()).subscribe((res: any) => {
      if (res.url === undefined) {
        console.error('Error fetching character image');
        return;
      }
      this.charSrc.set(res.url);
    });
  }

  getRandomCharacter() {
    this.apiFetchService.getRandomCharacter().subscribe((res: Character) => {
      this.eye.set(res.eye);
      this.hammer.set(res.hasHammer);
      this.mouth.set(res.mouth);
      this.rightHand.set(res.rightHand);
      this.tail.set(res.hasTail);
      this.buildCharacter();
      console.log('Mouth:', this.mouth());
    });
  }

  getChar(): Character {
    return {
      "eye": this.eye(),
      "hasHammer": this.hammer(),
      "mouth": this.mouth(),
      "rightHand": this.rightHand(),
      "hasTail": this.tail()
    }
  }
}
