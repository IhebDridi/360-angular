import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrevisualiseComponent } from './body/previsualise/previsualise.component';
import { ModelMComponent } from './body/model-m/model-m.component';
import { ProjectsNavigationComponent } from './body/projects-navigation/projects-navigation.component';
import { CarouselComponent } from './body/carousel/carousel.component';

const routes: Routes = [
  {path: "previsualise",component: PrevisualiseComponent},
  {path: "",component: CarouselComponent},
  {path: "modify",component: ModelMComponent},
  {path: "PageNav",component: ProjectsNavigationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
