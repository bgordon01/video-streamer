class Image {
	"Poster Art": {
		url: string;
		width: number;
		height: number;
	}
}

export class Video {
	title: string;
	description: string;
	programType: string;
	images: Image;
	releaseYear: number;
}

export class SearchFilter {
	field: string;
	operator: string;
	value: string;
}

export class SearchSort {
	field: string;
	order: string;
}

export class SearchOptions {
	filters: SearchFilter[];
	sort?: SearchSort[];
	limitTo?: number;
}
