class Grid {
  int gridSize;
  PVector position;
  int number;
  int id;
   
  Grid(int gridSize, PVector position, int number, int id) {
    this.gridSize = gridSize;
    this.position = position;
    this.number = number;
    this.id = id;
  }
  
  void moveUporDown(int direction) {
    int tempId = this.id;

    while(emptySpace.indexOf(this.id + direction) != -1) { //<>//
      this.id += direction; //<>//
    }
     this.position = calculatePosition(this.id);  
     
     emptySpace.add(new Integer(tempId));
     emptySpace.remove(new Integer(this.id));
     if(this.id != tempId) {
      grids[this.id] = new Grid(gridSize, this.position, this.number, this.id);
      grids[tempId] = null;
    }
    int row = this.id / 4;
    if((direction == MOVEUP && row > 0) || (direction == MOVEDOWN && row < 3)) 
      mergeGrid(direction);
  }
     
  void moveLeftorRight(int direction) {
    int tempId = this.id;
    int col = this.id % 4;
    while(emptySpace.indexOf(this.id + direction) != -1 && (col+direction) >= 0 && (col+direction) <= 3) {
      this.id += direction;
      col += direction;
    }
    this.position = calculatePosition(this.id);
    
    emptySpace.add(new Integer(tempId));
    emptySpace.remove(new Integer(this.id));    
    if(this.id != tempId) {
      grids[this.id] = new Grid(gridSize, this.position, this.number, this.id);
      grids[tempId] = null;
    } 
    col = this.id % 4;
    if((direction == MOVELEFT && col > 0) || (direction == MOVERIGHT && col < 3)) mergeGrid(direction);
  }
  
  void mergeGrid(int direction) {
    if(grids[int(this.id+direction)] !=  null && grids[this.id].number == grids[int(this.id+direction)].number) {
      grids[this.id + direction].number = grids[this.id + direction].number * 2;
      grids[this.id] = null;
      emptySpace.add(new Integer(this.id));
    }
  }
  
  void show() {
    pushStyle();
    noStroke();
    fill(getGridColor(this.number));
    rect(position.x, position.y, gridSize, gridSize, 10);
    if(this.number <= 4)
      fill(#776e65);
    else
      fill(255, 255, 255);
    textFont(font, 48);
    textAlign(CENTER, CENTER);
    text(this.number, this.position.x+this.gridSize/2, this.position.y+this.gridSize/2);
    popStyle();
  } 
}

color getGridColor(int number) {
  switch(number) {
    case 2: 
      return color(#eee4da);
    case 4: 
      return color(#ede0c8);
    case 8:
      return color(#f2b179);
    case 16: 
      return color(#f59563);
    case 32: 
      return color(#f67c5f);
    case 64: 
      return color(#f65e3b);
    case 128:
      return color(#edcf72);
    case 256:
      return color(#edcc61);
    case 512:
      return color(#99cc00);
    case 1024:
      return color(#F48024);
    case 2048:
      return color(#FF0000);
  }
  return color(#000000);
}