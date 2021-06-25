import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DBTableComponent } from './dbtable/dbtable.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MatListModule } from '@angular/material/list';
import { DBFormComponent } from './dbform/dbform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { EditorComponent } from './editor/editor.component'
import { MatTableModule } from '@angular/material/table' 
import {MatFormFieldModule} from '@angular/material/form-field'
import { DatabaseService } from './services/database.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
let routes: Routes = [
  { path: '', component: DBFormComponent },
  { path: 'tables', component: DBTableComponent},
  { path: 'editor', component: EditorComponent}
];


@NgModule({
  declarations: [
    DBTableComponent,
    DBFormComponent,
    HeaderComponent,
    EditorComponent,
  ],
  imports: [
    BrowserModule,
    NgbPaginationModule,
    NgbAlertModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true
    },
    DatabaseService
  ],
  bootstrap: [HeaderComponent]  
})
export class AppModule {}
