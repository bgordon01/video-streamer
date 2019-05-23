import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './components/content/content.component';
import { SeriesComponent } from './components/series/series.component';
import { MoviesComponent } from './components/movies/movies.component';

const routes: Routes = [
	{
		path: '',
		component: ContentComponent,
		data: { title: 'Popular Titles' }
	},
	{
		path: 'series',
		component: SeriesComponent,
		data: { title: 'Popular Series' }
	},
	{
		path: 'movies',
		component: MoviesComponent,
		data: { title: 'Popular Movies' }
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
