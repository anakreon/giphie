import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Environment } from 'src/environments/environment.types';

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {
    // using DI allows for easier testing
    public getEnvironment(): Environment {
        return environment;
    }
}
