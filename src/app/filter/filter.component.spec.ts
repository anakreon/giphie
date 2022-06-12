import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [FilterComponent]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(FilterComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
