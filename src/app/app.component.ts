import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GiphyService } from './giphy.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public images: any = [];
    private subscription!: Subscription;
    public filterForm = new FormGroup({
        filter: new FormControl('')
    });

    public page = 1;
    public pageSize = 20;
    public collectionSize = 100;

    constructor(private giphyService: GiphyService) {}

    ngOnInit() {
        const tag = 'dog';
        const offset = 0;
        this.giphyService.search(tag, offset);
        this.subscription = this.giphyService.getImages().subscribe((result) => {
            this.images = result.data.slice(0, 9);
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public filter() {
        if (this.filterForm.valid) {
            const filter = this.filterForm.value.filter;
            this.giphyService.search(filter as string);
            this.filterForm.reset();
        }
    }

    public onPageChange() {
        console.log('changed');
        console.log(this.page, this.pageSize, this.collectionSize);
    }
}
