import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-video',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

	@Input() type: string;

	constructor() { }

	ngOnInit() {
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

}
