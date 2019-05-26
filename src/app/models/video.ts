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

export class SearchOptions {
	filter: {
		field: string;
		value: string;
	}
}
