import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GiphyResponse } from './giphy-api.service';
import { GiphyDataService } from './giphy-data.service';
import { Image, Pagination } from './types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private subscription!: Subscription;
    public pagination!: Pagination;
    public filter: string = 'cat';
    public images: Image[] = [];

    constructor(private giphyDataService: GiphyDataService) {}

    ngOnInit(): void {
        this.resetPagination();
        this.updateData();
        this.subscription = this.giphyDataService.getData().subscribe((data: GiphyResponse) => {
            this.images = data.images;
            this.pagination = data.pagination;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public updateWithFilter(filter: string): void {
        this.filter = filter; // not very nice but the value is needed for pagination
        this.resetPagination();
        this.updateData();
    }

    public updateData() {
        this.giphyDataService.updateData(this.filter as string, this.pagination);
    }

    private resetPagination() {
        this.pagination = {
            currentPage: 1,
            itemsPerPage: 9,
            totalItems: 0
        };
    }
}
