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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { environment } from './environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { AppComponent } from './app.component';
import { MenuPosition, DialogOverviewExampleDialog } from './components/menu/menu-position.component';
import { CardComponent } from './components/card/card.component';
import { SideNav } from './components/sidenav/sidenav.component';


import { FirebaseService } from './services/firebase.service';
import { AuthService } from './services/auth.service';
import { MasonryService } from './services/masonry.service';

import { MasonryDirective } from './directives/masonry.directive';


@NgModule({
  imports:      [ BrowserModule, FormsModule, MatMenuModule, BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatCardModule, MatProgressBarModule, MatSidenavModule, MatInputModule, MatFormFieldModule, MatDividerModule, MatListModule, MatGridListModule, MatDialogModule, MatSelectModule, DragDropModule, FlexLayoutModule, AngularFireModule.initializeApp(environment.firebase, 'HandIdeasManager'), AngularFirestoreModule, AngularFireDatabaseModule, AngularFireAuthModule  ],
  declarations: [ AppComponent, MenuPosition, CardComponent, SideNav, DialogOverviewExampleDialog, MasonryDirective ],
  entryComponents: [DialogOverviewExampleDialog],
  providers: [FirebaseService, AuthService, MasonryService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
