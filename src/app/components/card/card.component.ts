import {Component, OnInit, Input} from '@angular/core';

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


  ProjectName = ["Hand Draw Ideas", "Fuck"];
  UserName = ["Partical", "Fuck"];
  progress = [35, 75];
  addsub = 10;  //add or substract number
  image = ["https://picsum.photos/300/200?random", "https://picsum.photos/300/200?random"];
  Descripe = ["The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.", "Hi, there!"];
}