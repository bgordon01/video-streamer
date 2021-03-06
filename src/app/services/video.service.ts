import { Injectable } from '@angular/core';
import { Video, SearchOptions, SearchFilter, SearchSort } from '../models/video';

import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class VideoService {

	private baseURL = 'api/videos';

	constructor(
		private http: HttpClient
	) { }

	/**
	 *
	 *
	 * @returns {Video[]}
	 * @memberof VideoService
	 */
	getAllVideos(): Observable<Video[] | Error> {
		return this.http.get<Video[]>(this.baseURL)
		.pipe(
			catchError(err => of(this.handleError(err)))
		); 
	}
	
	/**
	 *
	 *
	 * @returns {Video[]}
	 * @memberof VideoService
	 */
	getUniqueProgramTypes(): Observable<Video[] | Error>  {
		return this.http.get<Video[]>(this.baseURL)
			.pipe(
				// Filter the data
				map((data) => {
					return data.filter((obj, pos, arr) => {
						return arr.map(mapObj => mapObj['programType']).indexOf(obj['programType']) === pos;
					});
				}),
				catchError(err => of(this.handleError(err)))
		);
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
	search(options: SearchOptions): Observable<Video[] | Error> {
		return this.http.get<Video[]>(this.baseURL)
			.pipe(
				// Filter the data
				map(data => 
					(options.filters) ? this.filterList(options.filters, data) : data
				),
				// Sort the data
				map(data => 
					(options.sort) ? data.sort((a: Video, b: Video) => { 
						return this.sortList(options.sort, a, b) 
					}) : data
				),
				// Limit the data
				map(data => 
					(options.limitTo) ? data.slice(0, options.limitTo) : data
				),
				catchError(err => of(this.handleError(err)))
		); 
	}	

	/**
	 * Handle Http operation that failed.
	 *
	 * @private
	 * @param {*} error
	 * @returns {Error}
	 * @memberof VideoService
	 */
	private handleError (error: any): Error {
		console.error(error);
		throw new Error(error);
	}

}
