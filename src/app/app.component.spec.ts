import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from './filter/filter.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AppComponent } from './app.component';

const mockResponse = {
    data: [],
    pagination: {
        total_count: 100,
        count: 9,
        offset: 0
    },
    meta: {}
};

describe('AppComponent', () => {
    let httpTestingController: HttpTestingController;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, NgbPaginationModule],
            declarations: [AppComponent, FilterComponent, GalleryComponent]
        }).compileComponents();
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should fetch images from API on init', () => {
        const fixture = TestBed.createComponent(AppComponent);

        fixture.detectChanges();

        const req = httpTestingController.expectOne(
            'https://api.giphy.com/v1/gifs/search?api_key=RrwgHQq4CEW1Cylv7WDXxQPdL0mQKbuC&q=cat&limit=9&offset=0'
        );
        expect(req.request.method).toEqual('GET');

        req.flush(mockResponse);
    });
    it('should fetch images with different filter', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);

        fixture.detectChanges();

        const { nativeElement } = fixture.debugElement;
        const filter = nativeElement.querySelector('input');
        filter.value = 'dog';
        filter.dispatchEvent(new Event('input'));

        const button = nativeElement.querySelector('button');
        button.click();

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const req = httpTestingController.expectOne(
                'https://api.giphy.com/v1/gifs/search?api_key=RrwgHQq4CEW1Cylv7WDXxQPdL0mQKbuC&q=dog&limit=9&offset=0'
            );
            expect(req.request.method).toEqual('GET');
            req.flush(mockResponse);
        });
    }));
    it('should fetch images with different pagination', fakeAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);

        /* needs to load the pagination data first */
        fixture.detectChanges();
        const req = httpTestingController.expectOne(
            'https://api.giphy.com/v1/gifs/search?api_key=RrwgHQq4CEW1Cylv7WDXxQPdL0mQKbuC&q=cat&limit=9&offset=0'
        );
        req.flush(mockResponse);
        tick(2);
        fixture.detectChanges();
        /* ---- */

        const nativeElement = fixture.debugElement.nativeElement;
        const pages = nativeElement.querySelectorAll('.pagination > li');

        pages[3].children[0].click();

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const req = httpTestingController.expectOne(
                'https://api.giphy.com/v1/gifs/search?api_key=RrwgHQq4CEW1Cylv7WDXxQPdL0mQKbuC&q=cat&limit=9&offset=2'
            );
            expect(req.request.method).toEqual('GET');
            req.flush(mockResponse);
        });
        flush();
    }));
});
