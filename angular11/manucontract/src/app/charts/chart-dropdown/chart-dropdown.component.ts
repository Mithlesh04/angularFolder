import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { chartTypesMap, SelectedChartFilterItem, FilterChartList } from '../utils/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-chart-dropdown',
  templateUrl: './chart-dropdown.component.html',
  styleUrls: ['./chart-dropdown.component.scss']
})

export class ChartDropdownComponent implements OnInit {

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'name',
    textField: 'title',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true,
    enableCheckAll: true,
    searchPlaceholderText: "Search chart...",
    defaultOpen: false
  }

  dropDownForm:FormGroup;

  @Input() chartTypesMap: Array<chartTypesMap.TypeChart | chartTypesMap.TypeKPI>

  @Output() onFilterChartList = new EventEmitter<SelectedChartFilterItem[] | []>()


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.dropDownForm = this.fb.group({
      selectedItems: [this.chartTypesMap.map(({ name, title, isVisible })=> isVisible ? { name, title } : null).filter(e=>e)],
    });

    this.dropDownForm.get("selectedItems").valueChanges.subscribe((val: SelectedChartFilterItem[] | [])=>{
      this.onFilterChartList.emit(val)
    })
  }

}
