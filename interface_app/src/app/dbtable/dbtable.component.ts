import { Component, OnInit} from '@angular/core';

import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-dbtable',
  templateUrl: './dbtable.component.html',
  styleUrls: ['./dbtable.component.css']
})
export class DBTableComponent {
  tables: string[] = [];

  constructor(private DBService: DatabaseService)
  {
    this.DBService.getTableNames()
    .subscribe(res => {
      this.tables = res["tables"];
    });

    
  }

}
