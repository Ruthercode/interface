import { Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';

import { DatabaseService } from '../services/database.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-dbform',
  templateUrl: './dbform.component.html',
  styleUrls: ['./dbform.component.css']
})
export class DBFormComponent{

  checkoutForm = this.formBuilder.group({
    user: '',
    host: '',
    password: '',
    database: '',
    port: ''
  });

  constructor(private router: Router,
              private formBuilder: FormBuilder, 
              private DBServise: DatabaseService) { }


  onSubmit(): void {
    this.DBServise.user = this.checkoutForm.value['user'];
    this.DBServise.host = this.checkoutForm.value['host'];
    this.DBServise.password = this.checkoutForm.value['password'];
    this.DBServise.database = this.checkoutForm.value['database'];
    this.DBServise.port = this.checkoutForm.value['port'];

    this.router.navigate(['/tables'])
  }
}
