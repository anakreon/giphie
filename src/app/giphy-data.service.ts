import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, ReplaySubject } from 'rxjs';
import { GiphyApiService, GiphyResponse } from './giphy-api.service';
import { Pagination } from './types';

@Injectable({
    providedIn: 'root'
})
export class GiphyDataService {
    private data: ReplaySubject<GiphyResponse> = new ReplaySubject<GiphyResponse>();

    constructor(private giphyApiService: GiphyApiService) {}

    public getData(): Observable<GiphyResponse> {
        return this.data.asObservable();
    }

    public async updateData(tag: string = 'cat', pagination: Pagination): Promise<void> {
        const data = await lastValueFrom(this.giphyApiService.search(tag, pagination));
        this.data.next(data);
    }
}
