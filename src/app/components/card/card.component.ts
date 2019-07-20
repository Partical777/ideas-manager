import {Component, OnInit, Input} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Idea { 
  ProjectName : string;
  UserName : string;
  progress : number;
  image : string;
  Descripe : string;
}
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

  addsub = 10;  //add or substract number
  items = [];

  constructor(private db: AngularFirestore) {}

  ngOnInit(){
    this.db.collection('item').valueChanges().subscribe(val => {
      this.items = [];
      val.forEach (a => {
        // console.log(a.timestamp);
        this.items.push(a);
        console.log(a);
      });
    });
    
  }

  add(){
    this.db.collection('item').add({
      timestamp: "12345",
    });
  }

  // ProjectName = ["Hand Draw Ideas", "Fuck", "Number 2"];
  // UserName = ["Partical", "Fuck", "Mia"];
  // progress = [35, 75, 60];
  // image = ["https://picsum.photos/300/200?random", "https://picsum.photos/300/200?random", "https://picsum.photos/300/200?random"];
  // Descripe = ["The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.", "Hi, there!", "How are you!"];
}