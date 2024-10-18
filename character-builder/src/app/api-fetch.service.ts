import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Character} from "./build/build.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ApiFetchService {
  private httpClient = inject(HttpClient);

  getCharacterSrc(char: Character): Observable<object> {
    return this.httpClient.post<object>("http://localhost:5110/build-image-url", char);
  }

  getRandomCharacter(): Observable<Character> {
    return this.httpClient.get<Character>("http://localhost:5110/get-random-image-options");
  }

  constructor() { }
}
