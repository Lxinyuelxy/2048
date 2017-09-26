import java.util.*;

static final int MOVEUP = -4;
static final int MOVEDOWN = 4;
static final int MOVELEFT = -1;
static final int MOVERIGHT = 1;
static final int RightFirst[] = new int[]{3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12};
static final int LeftFirst[] = new int[]{0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15};

int gridSize = 120;
Grid grids[];
List<Integer> emptySpace;
int interval_x, interval_y;
PFont font;

void setup() {
  size(600, 600);
  font = loadFont("DejaVuSans-Bold-48.vlw");
  
  interval_x = (width - gridSize*4) / 5;
  interval_y = (height - gridSize*4) / 5;
  
  initGame();
}

void initGame() {
  grids = new Grid[16];
  emptySpace = new LinkedList<Integer>();
  
  for(int i = 0; i < 16; i++) 
    emptySpace.add(i);
    
  generateRandomGrid();
  generateRandomGrid(); 
}

void draw() {
  drawBackground();
  for(int i = 0; i<16; i++) {
    if(grids[i]!=null)
      grids[i].show();
  }
}

void keyPressed(){
  if(key == CODED) {
    if(keyCode == UP) {
      for(int i = 0; i <= 15; i++) {
        if(grids[i] != null)
          grids[i].moveUporDown(MOVEUP);
      }
      generateRandomGrid();
    }
    if(keyCode == DOWN) {
      for(int i = 15; i >= 0; i--) {
        if(grids[i]!= null)
          grids[i].moveUporDown(MOVEDOWN);
      }
      generateRandomGrid();
    }
    if(keyCode == LEFT) {
      for(int i = 0; i <= 15; i++) {
        if(grids[LeftFirst[i]] != null)
          grids[LeftFirst[i]].moveLeftorRight(MOVELEFT);
      }
      generateRandomGrid();
    }
    if(keyCode == RIGHT) {
      for(int i = 0; i <= 15; i++) {
        if(grids[RightFirst[i]] != null)
          grids[RightFirst[i]].moveLeftorRight(MOVERIGHT);
      }
      generateRandomGrid();
    }
  }
}

void generateRandomGrid() {
  int index = int(random(emptySpace.size()));
  int id = emptySpace.get(index);
  PVector position = calculatePosition(id);
  int number = random(1) > 0.4 ? 2 : 4;
  grids[id] = new Grid(gridSize, position, number, id);
  emptySpace.remove(index);
}

PVector calculatePosition(int id) {
  int row = id / 4;
  int col = id % 4;  
  int pos_x = interval_x * (col+1) + gridSize * col;
  int pos_y = interval_y * (row+1) + gridSize * row;
  return new PVector(pos_x, pos_y);
}

void drawBackground() {
  background(187, 173, 160);
  int pos_x, pos_y;
  for(int i = 1; i <= 4; i++) {
    for(int j = 1; j <= 4; j++) {
      pushStyle();
      noStroke();
      fill(204, 192, 179);
      pos_x = interval_x * j + gridSize * (j-1);
      pos_y = interval_y * i + gridSize * (i-1);
      rect(pos_x, pos_y, gridSize, gridSize, 10);
      popStyle();
    }
  }
}