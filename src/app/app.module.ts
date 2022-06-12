import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from './filter/filter.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, NgbPaginationModule],
    declarations: [AppComponent, FilterComponent, GalleryComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
