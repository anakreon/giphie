import { lastValueFrom, of, take } from 'rxjs';
import { GiphyApiService } from './giphy-api.service';
import { GiphyDataService } from './giphy-data.service';

describe('GiphyDataService', () => {
    let giphyApiService: jasmine.SpyObj<GiphyApiService>;
    let instance: GiphyDataService;

    beforeEach(() => {
        giphyApiService = jasmine.createSpyObj<GiphyApiService>('GiphyApiService', ['search']);

        instance = new GiphyDataService(giphyApiService);
    });

    describe('getData', () => {
        it('should get most recent data', (done) => {
            const newData = {
                images: [],
                pagination: {
                    currentPage: 1,
                    itemsPerPage: 10,
                    totalItems: 100
                }
            };
            (<any>instance).data.next(newData);

            instance
                .getData()
                .pipe(take(1))
                .subscribe((result) => {
                    expect(result).toEqual(newData);
                    done();
                });
        });
    });
    describe('updateData', () => {
        it('should update data', async () => {
            const tag = 'some tag';
            const pagination = {
                currentPage: 1,
                itemsPerPage: 10,
                totalItems: 100
            };
            const mockSearchResult = {
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
            giphyApiService.search.and.returnValue(of(mockSearchResult));

            await instance.updateData(tag, pagination);

            expect(giphyApiService.search).toHaveBeenCalledWith('some tag', pagination);
            const data = await lastValueFrom(instance.getData().pipe(take(1)));
            expect(data).toEqual(mockSearchResult);
        });
        it('should update with default value', async () => {
            const tag = undefined;
            const pagination = {
                currentPage: 1,
                itemsPerPage: 10,
                totalItems: 100
            };
            const mockSearchResult = {
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
            giphyApiService.search.and.returnValue(of(mockSearchResult));

            await instance.updateData(tag, pagination);

            expect(giphyApiService.search).toHaveBeenCalledWith('cat', pagination);
        });
    });
});
