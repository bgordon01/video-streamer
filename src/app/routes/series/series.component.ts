import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { SearchOptions, Video } from '../../models/video';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

	pageTitle: string;
	series: Video[] | Error;
	error: boolean = false;
	
	constructor(
		private activatedRoute: ActivatedRoute,
		private videosService: VideoService
	) {}

	ngOnInit() {
		this.activatedRoute.data.subscribe(values => {
			this.pageTitle = values['title'];
		});
		this.getSeries();
	}

	getSeries(): void {
		this.videosService.search({
			filters: [{
				field: 'programType',
				operator: '=',
				value: 'series'
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
			series => this.series = series, 
			err => this.error = true
		);
	}

	getThumbnail(movie: Video) {
		return movie.images['Poster Art'].url;
	}

}
