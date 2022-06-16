import { environment } from 'src/environments/environment';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
    let instance: EnvironmentService;

    beforeEach(() => {
        instance = new EnvironmentService();
    });

    describe('', () => {
        it('should return environment values', () => {
            expect(instance.getEnvironment()).toEqual(environment);
        });
    });
});
