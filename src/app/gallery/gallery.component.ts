import { Component, Input } from '@angular/core';
import { Image } from '../types';

type Images = Image[];

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
    @Input() public images: Images = [];
}
