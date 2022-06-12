import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GiphyService } from './giphy.service';

interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public images: any = [];
    private subscription!: Subscription;
    public filterForm = new FormGroup({
        filter: new FormControl('dog')
    });

    public pagination: Pagination = {
        currentPage: 1,
        itemsPerPage: 0,
        totalItems: 0
    };

    constructor(private giphyService: GiphyService) {}

    ngOnInit(): void {
        const offset = 0;
        const filter = this.filterForm.value.filter;
        this.giphyService.updateImages(filter as string, offset);
        this.subscription = this.giphyService.getImages().subscribe((result) => {
            this.images = result.data;
            this.pagination = {
                currentPage: result.pagination.offset + 1,
                itemsPerPage: result.pagination.count,
                totalItems: result.pagination.total_count
            };
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public filter(): void {
        if (this.filterForm.valid) {
            const filter = this.filterForm.value.filter;
            this.giphyService.updateImages(filter as string);
        }
    }

    public onPageChange(): void {
        const filter = this.filterForm.value.filter;
        this.giphyService.updateImages(filter as string, this.pagination.currentPage - 1, this.pagination.itemsPerPage);
    }
}
