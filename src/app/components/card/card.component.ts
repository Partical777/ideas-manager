import {Component, OnInit, Input} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Item { name: string; }
/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css'],
})


export class CardComponent {
  @Input('index') index:number;

  items = [];

  constructor(private db: AngularFirestore) {
    console.log(this.db);
  }

  ngOnOnInit(){
    this.db.collection('item').snapshotChanges.subscribe(serverItems => {
      this.items = [];
      serverItems.forEach (a => {
        let item = a.payload.doc.data();
        item.id = a.payload.doc.id;
        this.items.push(item);
      });
    });
    
  }

  add(){
    this.db.collection('item').add({
      timestamp: "12345",
    });
  }

  ProjectName = ["Hand Draw Ideas", "Fuck", "Number 2"];
  UserName = ["Partical", "Fuck", "Mia"];
  progress = [35, 75, 60];
  addsub = 10;  //add or substract number
  image = ["https://picsum.photos/300/200?random", "https://picsum.photos/300/200?random", "https://picsum.photos/300/200?random"];
  Descripe = ["The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.", "Hi, there!", "How are you!"];
}