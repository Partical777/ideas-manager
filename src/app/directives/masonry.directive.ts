import { Directive, ElementRef } from '@angular/core';
import { MasonryService } from '../services/masonry.service'

@Directive({
  selector: '[masonry]'
})
export class MasonryDirective {
  i = 1;
  constructor(private el: ElementRef, private masonryArr: MasonryService) {}

  ngOnInit(){
    // console.log(this.el.nativeElement);
    
    let minIndex = this.masonryArr.getHeight();
    document.getElementById('grid-col--' + minIndex).appendChild(this.el.nativeElement);
    
    this.masonryArr.setNewHeight(minIndex, this.el.nativeElement.offsetHeight);
  }
}