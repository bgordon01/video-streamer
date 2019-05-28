import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { SearchOptions, Video } from '../../models/video';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

	pageTitle: string;
	movies: {} | Video[];
	error: boolean = false;
	
	constructor(
		private activatedRoute: ActivatedRoute,
		private videosService: VideoService
	) {}

	ngOnInit() {
		this.activatedRoute.data.subscribe(values => {
			this.pageTitle = values['title'];
		});
		this.getMovies();
	}

	getMovies(): void {
		this.videosService.search({
			filters: [{
				field: 'programType',
				operator: '=',
				value: 'movie'
			},{
				field: 'releaseYear',
				operator: '>=',
				value: '2010'
			}],
			sort: [{
				field: 'title',
				order: 'asc'
			}],
			limitTo: 21
		} as SearchOptions).subscribe(
			movies => this.movies = movies, 
			err => this.error = true
		);
	}

	getThumbnail(movie: Video) {
		return movie.images['Poster Art'].url;
	}

}
