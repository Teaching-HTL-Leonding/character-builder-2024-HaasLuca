import {Routes} from '@angular/router';
import {BuildComponent} from './build/build.component';
import {RandomComponent} from "./random/random.component";

export const routes: Routes = [
  {path: 'build', component: BuildComponent},
  {path: 'randomizer', component: RandomComponent},
  {path: '', redirectTo: 'build', pathMatch: 'full'}
];
