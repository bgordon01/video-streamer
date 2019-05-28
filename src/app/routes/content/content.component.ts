import { map } from 'rxjs/internal/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from "../../services/video.service";
import { Video } from 'src/app/models/video';

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

	pageTitle: string;
	videos: Video[] | Error;
	error: boolean = false;
	
	constructor(private activatedRoute: ActivatedRoute,
		private videoService: VideoService) {}

	ngOnInit() {
		//
		this.activatedRoute.data.subscribe(values => {
			this.pageTitle = values['title'];
		});
		//
		this.videoService.getUniqueProgramTypes().subscribe(
			videos => this.videos = videos, 
			err => { this.error = true }
		);
	}

	toTitleCase(str: string): string {
		return str.replace(
			/\w\S*/g,
			function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}
		);
	}

	titleToUpperCase(type: string) {
		return this.getRouteByType(type).toUpperCase();
	}

	getRouteByType(type: string) {
		//
		switch (type) {
			case 'movie':
				return 'movies';
			default:
				return type;
		}
	}

	getTitle(type: string): string {
		return this.toTitleCase(`popular ${this.getRouteByType(type)}`)
	}

}
