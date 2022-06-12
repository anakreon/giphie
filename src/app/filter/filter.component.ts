import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    @Input() value: string = '';
    @Output() updateFilterValue = new EventEmitter<string>();
    public filterForm!: FormGroup;

    public ngOnInit(): void {
        this.filterForm = new FormGroup({
            filter: new FormControl(this.value)
        });
    }

    public submit(): void {
        if (this.filterForm.valid) {
            const filterFormValue = this.filterForm.value.filter;
            this.updateFilterValue.emit(filterFormValue as string);
        }
    }
}
