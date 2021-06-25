import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import { DatabaseService } from '../services/database.service';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @ViewChild(MatTable)tab!: MatTable<any>;

  table : string = "";
  private querySubscription: Subscription;
  
  displayedColumns: string[] = [];
  dataSource: {}[] = [];
  savedDataSource = [];
  dataSchema = {};

  constructor(private route: ActivatedRoute, private DBService: DatabaseService) { 
    
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
          this.table = queryParam['table'];
      }
   );
    
    this.DBService.getTable(this.table)
    .subscribe(res => {
      this.displayedColumns = res["columns"];
      this.displayedColumns.push("Actions");

      this.dataSource = res["data"];
      this.savedDataSource = cloneDeep(this.dataSource);
      this.dataSchema = res["type"];

    });

  }

  onSave() : void
  {
    console.log(this.dataSource);
    this.DBService.updateTable(this.table, this.dataSource, this.savedDataSource)
    .subscribe(
    );
  }

  onDelete(row) : void {
    this.dataSource = this.dataSource.filter(x => x !== row);
    this.tab.renderRows();
  }

  add() : void {
    let realColumns = cloneDeep(this.displayedColumns);
    realColumns.pop();
    console.log(realColumns);

    let emptyToPush = {};
    realColumns.forEach(element => {
      emptyToPush[element] = "";
    });
    this.dataSource.push(emptyToPush);
    console.log(this.dataSource);
    this.tab.renderRows();
  }
}
