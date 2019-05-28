import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './routes/content/content.component';
import { SeriesComponent } from './routes/series/series.component';
import { MoviesComponent } from './routes/movies/movies.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
	{
		path: '', 
		redirectTo: '/home', 
		pathMatch: 'full'
	},
	{
		path: 'home',
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
