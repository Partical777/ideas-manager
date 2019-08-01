export class MasonryService{
  heightArr = [0, 0, 0];

  getHeight(){
    let min = this.heightArr[0];
    let minIndex = 0;
    this.heightArr.forEach(function(v, index){
      if(v < min){
        min = v;
        minIndex = index;
      }
    });
    return minIndex;
  }
  
  setNewHeight(index, height){
    this.heightArr[index] += height;
    console.log(this.heightArr);
  }
}