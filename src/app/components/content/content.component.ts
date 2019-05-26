import { map } from 'rxjs/internal/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from "../../services/video.service";

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

	pageTitle: string;
	programTypes: {}[];
	
	constructor(private activatedRoute: ActivatedRoute,
		private videoService: VideoService) {}

	ngOnInit() {
		//
		this.activatedRoute.data.subscribe(values => {
			this.pageTitle = values['title'];
		});
		//
		this.programTypes = this.videoService.getUniqueProgramTypes();
	}

}
