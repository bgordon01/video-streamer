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
	series: Video[];
	
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
		this.series = this.videosService.search({
			filters: [{
				field: 'programType',
				operator: 'equalTo',
				value: 'series'
			},{
				field: 'releaseYear',
				operator: 'greaterEqualTo',
				value: '2010'
			}],
			sort: [{
				field: 'title',
				order: 'asc'
			}],
			limitTo: 21
		} as SearchOptions);
	}

	getThumbnail(movie: Video) {
		return movie.images['Poster Art'].url;
	}

}
