import { Injectable } from '@angular/core';
import { Video, SearchOptions, SearchFilter, SearchSort } from '../models/video';

var data = require('../data/sample.json');

@Injectable({
	providedIn: 'root'
})
export class VideoService {

	constructor() { }

	/**
	 *
	 *
	 * @returns {Video[]}
	 * @memberof VideoService
	 */
	getAllVideos(): Video[] {
		return data.entries; 
	}
	
	/**
	 *
	 *
	 * @returns {Video[]}
	 * @memberof VideoService
	 */
	getUniqueProgramTypes(): Video[]  {
		return [...new Set(data.entries.map((video: Video) => {
				return video.programType
			})
		)] as Video[];
	}	

	/**
	 *
	 *
	 * @param {SearchFilter[]} filters
	 * @param {Video[]} videos
	 * @returns {Video[]}
	 * @memberof VideoService
	 */
	filterList(filters: SearchFilter[], videos: Video[]): Video[] {
		if (filters.length > 1) {
			for (let ind = 0; ind < filters.length; ind++) {					
				return this.filterSearch(videos, filters[ind]);					 
			}
		} else {
			return this.filterSearch(videos, filters[0]);
		}
	}	

	/**
	 *
	 *
	 * @param {string} operator
	 * @param {Video} video
	 * @param {SearchFilter} filter
	 * @returns
	 * @memberof VideoService
	 */
	filterByOperator(operator: string, video: Video, filter: SearchFilter) {
		if (operator === '>=') {
			return video[filter.field] >= filter.value;
		} else if (operator === '<=') {
			return video[filter.field] <= filter.value;		
		} else if (operator === '>') {
			return video[filter.field] > filter.value;		
		} else if (operator === '<') {
			return video[filter.field] < filter.value;		
		} else if (operator === '!=') {
			return video[filter.field] !== filter.value;		
		} else {
			return video[filter.field] === filter.value;
		}
	}

	/**
	 *
	 *
	 * @param {Video[]} filteredList
	 * @param {SearchFilter} filter
	 * @returns {Video[]}
	 * @memberof VideoService
	 */
	filterSearch(filteredList: Video[], filter: SearchFilter): Video[] {
		return filteredList.filter((video: Video) => {			
			return this.filterByOperator(filter.operator, video, filter);
		});
	}

	/**
	 *
	 *
	 * @param {SearchSort[]} sortOptions
	 * @param {Video} a
	 * @param {Video} b
	 * @returns {number}
	 * @memberof VideoService
	 */
	sortList(sortOptions: SearchSort[], a: Video, b: Video): number {
		if (sortOptions.length > 1) {
			for (let ind = 0; ind < sortOptions.length; ind++) {					
				return this.sortByField(a, b, sortOptions[ind]);		 
			}
		} else {
			return this.sortByField(a, b, sortOptions[0]);
		}
	}

	/**
	 *
	 *
	 * @param {Video} a
	 * @param {Video} b
	 * @param {SearchSort} sort
	 * @returns
	 * @memberof VideoService
	 */
	sortByField(a: Video, b: Video, sort: SearchSort) {
		var titleA = a[sort.field].toUpperCase();
		var titleB = b[sort.field].toUpperCase(); 
		if (titleA < titleB) {
			return -1;
		}
		if (titleA > titleB) {
			return 1;
		}
		if (sort.order) {
			if (sort.order === 'asc') {
				return 0;
			} else {
				return -1;
			}
		} else {
			return 0;
		}		
		
	}

	/**
	 *
	 *
	 * @param {SearchOptions} options
	 * @returns {Video[]}
	 * @memberof VideoService
	 */
	search(options: SearchOptions): Video[] {
		let videos: Video[] = this.getAllVideos();
		let filteredList: Video[] = [];
		// Filter by fields
		if (options.filters) {
			filteredList = this.filterList(options.filters, videos);
		}
		// Sort by fields
		let sortedList: Video[] = []; 
		if (options.sort) {
			// Add sorting logic here
			sortedList = filteredList.sort((a: Video, b: Video) => {				
				return this.sortList(options.sort, a, b);
			});
		} else {
			return filteredList;
		}
		// Limit result set to 21 videos
		let limitedList: Video[] = []; 
		if (sortedList.sort) {
			limitedList = sortedList
		}
		if (options.limitTo) {
			return filteredList.slice(0, options.limitTo);
		} else {
			return filteredList;
		}
	}	

}
