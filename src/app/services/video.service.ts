import { Injectable } from '@angular/core';
import { Video, SearchOptions } from '../models/video';

var data = require('../data/sample.json');

@Injectable({
	providedIn: 'root'
})
export class VideoService {

	constructor() { }

	getUniqueProgramTypes(): Video[]  {
		return [...new Set(data.entries.map((video: Video) => {
				return video.programType
			})
		)] as Video[];
	}

	getAllVideos(): Video[] {
		return data.entries; 
	}

	search(options: SearchOptions): Video[] {
		let videos: Video[] = this.getAllVideos();
		// Filter by field
		if (options.filter) {
			return videos.filter((video: Video) => {
				return video[options.filter.field] === options.filter.value;
			});
		}
		return videos;
	}	

}
