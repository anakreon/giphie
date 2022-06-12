import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, of, ReplaySubject, tap } from 'rxjs';
import mockresponse from './mockresponse';

// Simplified response type with only the values we may be interested in
interface GiphySearchResponse {
    data: [
        {
            id: string;
            type: string;
            images: {
                original: {
                    height: number;
                    width: number;
                    url: string;
                };
            };
        }
    ];
    pagination: {
        total_count: number;
        count: number;
        offset: number;
    };
    meta: {
        status: number;
    };
}

@Injectable({
    providedIn: 'root'
})
export class GiphyService {
    private readonly searchUrl = 'https://api.giphy.com/v1/gifs/search';
    private readonly apiKey = 'RrwgHQq4CEW1Cylv7WDXxQPdL0mQKbuC';

    private images: ReplaySubject<GiphySearchResponse> = new ReplaySubject<GiphySearchResponse>();

    constructor(private http: HttpClient) {}

    public getImages(): Observable<GiphySearchResponse> {
        return this.images.asObservable();
    }

    public async updateImages(tag: string = 'cat', offset: number = 0, limit: number = 9): Promise<void> {
        const params = new URLSearchParams({
            api_key: this.apiKey,
            q: tag,
            limit: limit.toString(),
            offset: offset.toString()
        });
        const data = await lastValueFrom(this.http.get<GiphySearchResponse>(this.searchUrl + '?' + params.toString()));
        this.images.next(data);
    }
}
