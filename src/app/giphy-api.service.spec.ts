import { HttpClient } from '@angular/common/http';
import { of, take } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { GiphyApiService } from './giphy-api.service';

describe('GiphyApiService', () => {
    let httpClient: jasmine.SpyObj<HttpClient>;
    let environmentService: jasmine.SpyObj<EnvironmentService>;
    let instance: GiphyApiService;

    beforeEach(() => {
        httpClient = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
        environmentService = jasmine.createSpyObj<EnvironmentService>('EnvironmentService', ['getEnvironment']);

        instance = new GiphyApiService(httpClient, environmentService);
    });

    describe('search', () => {
        it('should call api and return result', (done) => {
            const query = 'im query';
            const pagination = {
                currentPage: 1,
                itemsPerPage: 10,
                totalItems: 100
            };
            const mockEnvironment = {
                production: true,
                giphy: {
                    searchApiUrl: 'https://giphyUrl',
                    apiKey: '123456'
                }
            };
            environmentService.getEnvironment.and.returnValue(mockEnvironment);
            const giphyApiMockResponse = {
                data: [
                    {
                        title: 'Image one',
                        type: 'png',
                        source_tld: 'http://mocksourceurl',
                        url: 'http://mockurl',
                        images: {
                            original: {
                                url: 'http://imageurl'
                            }
                        }
                    },
                    {
                        title: 'Image two',
                        type: 'gif',
                        source_tld: 'http://mocksourceurl2',
                        url: 'http://mockurl2',
                        images: {
                            original: {
                                url: 'http://imageurl2'
                            }
                        }
                    }
                ],
                pagination: {
                    total_count: 200,
                    count: 20,
                    offset: 2
                },
                meta: {
                    status: 200
                }
            };
            httpClient.get.and.returnValue(of(giphyApiMockResponse));
            const expectedResult = {
                images: [
                    {
                        title: 'Image one',
                        url: 'http://imageurl',
                        sourceUrl: 'http://mockurl',
                        description: 'http://mocksourceurl'
                    },
                    {
                        title: 'Image two',
                        url: 'http://imageurl2',
                        sourceUrl: 'http://mockurl2',
                        description: 'http://mocksourceurl2'
                    }
                ],
                pagination: {
                    currentPage: 3,
                    itemsPerPage: 20,
                    totalItems: 200
                }
            };

            instance
                .search(query, pagination)
                .pipe(take(1))
                .subscribe((result) => {
                    expect(result).toEqual(expectedResult);
                    expect(httpClient.get).toHaveBeenCalledWith(
                        'https://giphyUrl?api_key=123456&q=im+query&limit=10&offset=0'
                    );
                    done();
                });
        });
    });
});
