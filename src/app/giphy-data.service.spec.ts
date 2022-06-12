import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { GiphyDataService } from './giphy-data.service';

describe('GiphyDataService', () => {
    let service: GiphyDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });
        service = TestBed.inject(GiphyDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
