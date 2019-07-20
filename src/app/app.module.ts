import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { environment } from './environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';


import { AppComponent } from './app.component';
import { MenuPosition } from './components/menu/menu-position.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, MatMenuModule, BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatCardModule, MatProgressBarModule, FlexLayoutModule, AngularFireModule.initializeApp(environment.firebase, 'HandIdeasManager'), AngularFirestoreModule, AngularFireDatabaseModule  ],
  declarations: [ AppComponent, MenuPosition, CardComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
