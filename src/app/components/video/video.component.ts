import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-video',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

	@Input() type: string;
	@Input() title: string;
	@Input() url: string;

	constructor() { }

	ngOnInit() {
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

}
