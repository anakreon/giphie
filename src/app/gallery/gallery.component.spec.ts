import { TestBed } from '@angular/core/testing';
import { GalleryComponent } from './gallery.component';

describe('GalleryComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GalleryComponent]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(GalleryComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
