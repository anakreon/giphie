import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import mockresponse from './mockresponse';
import { Image, Pagination } from './types';

// Simplified response type with only the values we may be interested in
interface RawGiphySearchResponse {
    data: [
        {
            title: string;
            type: string;
            source_tld: string;
            url: string;
            images: {
                original: {
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

export interface GiphyResponse {
    images: Image[];
    pagination: Pagination;
}

@Injectable({
    providedIn: 'root'
})
export class GiphyApiService {
    constructor(private http: HttpClient, private environmentService: EnvironmentService) {}

    public search(query: string, pagination: Pagination): Observable<GiphyResponse> {
        const offset = this.convertCurrentPageToOffset(pagination.currentPage, pagination.itemsPerPage);
        const limit = pagination.itemsPerPage;
        return this.queryGiphySearchAPI(query, offset, limit).pipe(
            map((rawResponse: RawGiphySearchResponse) => this.processResponse(rawResponse))
        );
    }

    private queryGiphySearchAPI(query: string, offset: number, limit: number): Observable<RawGiphySearchResponse> {
        const environment = this.environmentService.getEnvironment();
        const params = new URLSearchParams({
            api_key: environment.giphy.apiKey,
            q: query,
            limit: limit.toString(),
            offset: offset.toString()
        });
        //return of(mockresponse as any); // to return the mocked API value
        return this.http.get<RawGiphySearchResponse>(environment.giphy.searchApiUrl + '?' + params.toString());
    }

    // this step is not strictly necessary, but
    // a) front end components should not directly depend on fields or data structures as defined by an external API outside of our control (less coupling)
    // b) front end components are only interested in some, not all of the API fields (encapsulation)
    private processResponse(rawResponse: RawGiphySearchResponse): GiphyResponse {
        const images = rawResponse.data.map((data) => ({
            title: data.title,
            url: data.images.original.url,
            sourceUrl: data.url,
            description: data.source_tld
        }));
        const { count: itemsPerPage, total_count: totalItems } = rawResponse.pagination;
        return {
            images,
            pagination: {
                currentPage: this.convertOffsetToCurrentPage(rawResponse.pagination.offset, itemsPerPage),
                itemsPerPage,
                totalItems
            }
        };
    }

    private convertOffsetToCurrentPage(offset: number, itemsPerPage: number): number {
        return offset / itemsPerPage + 1;
    }

    private convertCurrentPageToOffset(currentPage: number, itemsPerPage: number): number {
        return (currentPage - 1) * itemsPerPage;
    }
}
