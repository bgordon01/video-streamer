import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingService } from 'src/app/services/loading.service';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

	loading: boolean = true;
	loadingSubscription: Subscription;

	constructor(private loadingService: LoadingService) {
	}

	ngOnInit() {
		this.loadingSubscription = this.loadingService.loadingStatus.subscribe((value) => {
			this.loading = value;
		});
	}

	ngOnDestroy() {
		this.loadingSubscription.unsubscribe();
	}

}
