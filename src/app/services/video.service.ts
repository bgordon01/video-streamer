import { Injectable } from '@angular/core';
import { Video, SearchOptions, SearchFilter, SearchSort } from '../models/video';

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

	filterByOperator(operator: string, video: Video, filter: SearchFilter) {
		if (operator === 'greaterEqualTo') {
			return video[filter.field] >= filter.value;
		} else {
			return video[filter.field] === filter.value;
		}
	}

	filterSearch(filteredList: Video[], filter: SearchFilter): Video[] {
		return filteredList.filter((video: Video) => {			
			return this.filterByOperator(filter.operator, video, filter);
		});
	}

	search(options: SearchOptions): Video[] {
		let filteredList: Video[] = this.getAllVideos();
		// Filter by fields
		if (options.filters) {
			if (options.filters.length > 1) {
				for (let ind = 0; ind < options.filters.length; ind++) {					
					filteredList = this.filterSearch(filteredList, options.filters[ind]);					 
				}
			} else {
				if (options.filters) {
					filteredList = this.filterSearch(filteredList, options.filters[0]);
				}
			}
		}
		// Sort by fields
		if (options.sort) {
			// Add sorting logic here
		} else {
			return filteredList;
		}
		// Limit result set to 21 videos
		if (options.limitTo) {
			return filteredList.slice(0, options.limitTo);
		} else {
			return filteredList;
		}
	}	

}
