var board = new Array();
var score = 0;
var has_conflicted = new Array();//������������ı��


var success_string = 'Success';
var gameover_string = 'GameOver';

$(document).ready(function() {
	prepare_for_mobile();
	new_game();
});

function new_game() {
	//��ʼ������
	init();
	//���������������������
	generate_one_number();
	generate_one_number();
}

function init() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var grid_cell = $('#grid_cell_' + i + '_' + j);
			grid_cell.css('top', get_pos_top(i, j));
			grid_cell.css('left', get_pos_left(i, j));
		}
	}
	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		has_conflicted[i] = new Array();
		for (var j =0; j < 4; j++) {
			board[i][j] = 0;
			has_conflicted[i][j] = false;
		}
	}
	update_board_view();
	score = 0;
	update_score(score);
}

function update_board_view() {
	$('.number_cell').remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$('#grid_container').append('<div class="number_cell" id="number_cell_' + i + '_' + j + '"></div>');
			var number_cell = $('#number_cell_' + i + '_' + j);
			if (board[i][j] == 0) {
				number_cell.css('width', '0px');
				number_cell.css('height', '0px');
				number_cell.css('top', get_pos_top(i, j) + cell_side_length / 2);
				number_cell.css('left', get_pos_left(i, j) + cell_side_length / 2);
			} else {
				number_cell.css('width', cell_side_length);
				number_cell.css('height', cell_side_length);
				number_cell.css('top', get_pos_top(i, j));
				number_cell.css('left', get_pos_left(i, j));
				number_cell.css('background-color', get_number_background_color(board[i][j]));
				number_cell.css('color', get_number_color(board[i][j]));
				number_cell.text(board[i][j]);
			}
			has_conflicted[i][j] = false;
		}
	}
	$('.number_cell').css('line-height', cell_side_length + 'px');
	$('.number_cell').css('font-size', 0.6 * cell_side_length + 'px');
}

function generate_one_number() {
	if (nospace(board)) {
		return false;
	}
	//���һ��λ��
	var randx = Math.floor(Math.random() * 4);
	var randy = Math.floor(Math.random() * 4);
	var time = 0;
	while (time < 50) {
		if (board[randx][randy] == 0) {
			break;
		}
		randx = Math.floor(Math.random() * 4);
		randy = Math.floor(Math.random() * 4);
		time++;
	}
	if (time == 50) {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (board[i][j] == 0) {
					randx = i;
					randy = j;
				}
			}
		}
	}
	//���һ������
	var rand_number = Math.random() < 0.5 ? 2 : 4;
	//�����λ����ʾ�������
	board[randx][randy] = rand_number;
	animated_number(randx, randy, rand_number);
	return true;
}
$(document).ready(function(){
  $("#new_game").click(function(){
	new_game();
  });
});


$(document).keydown(function(event){
	if($('#score').text()==success_string){
		alert("YOU WIN!");
		new_game();
		return;
	}

	switch(event.keyCode){
		case 37://left
			event.preventDefault();
			if(move_left()){
				setTimeout('generate_one_number()',200);
				setTimeout('is_gameover()',300);
			}
			break;
		case 38://up
			event.preventDefault();
			if(move_up()){
				setTimeout('generate_one_number()',200);
				setTimeout('is_gameover()',300);
			}
			break;
		case 39://right
			event.preventDefault();
			if(move_right()){
				setTimeout('generate_one_number()',200);
				setTimeout('is_gameover()',300);
			}
			break;
		case 40://down
			event.preventDefault();
			if(move_down()){
				setTimeout('generate_one_number()',200);
				setTimeout('is_gameover()',300);
			}
			break;
		default:
			break;	
	}
});

function move_left(){
	if(!can_move_left(board)){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&no_block_horizontal(i,k,j,board)){
						show_move_animation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						break;
					}
					else if(board[i][k]==board[i][j]&&no_block_horizontal(i,k,j,board)&&!has_conflicted[i][k]){
						show_move_animation(i,j,i,k);
						board[i][k]=board[i][k]+board[i][j];
						board[i][j]=0;
						score += board[i][k];
						update_score(score);
						has_conflicted[i][k]=true;
						break;
					}
				}
				
			}
		}
	}
				
	/*for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var t=0;t<j;t++){
					if(board[i][t]==0&&no_block_horizontal(i,k,j,board)){
						show_move_animation(i,j,i,k);
						board[i][t]=board[i][j];
						board[i][j]=0;
						break;
					}
					else if(){
						
					}
				}
				for(var t=0;t<j;t++){
					if(board[i][t]==0){
						board[i][t]=board[i][t+1];
						board[i][t+1]=0;
					}
				}
					for(var t=j;t>0;t--){
						while()
						if(board[i][t-1]==0){
							board[i][t-1]=board[i][t];
							board[i][t]=0;
						}
						if(board[i][t-1]==board[i][t]&&board[i][t-1]!=0){
							board[i][t-1]=board[i][t-1]+board[i][t];
							board[i][t]=0;
							
							score=board[i][t-1];
						}
						if(board[i][t-1]!=board[i][t]&&board[i][t-1]!=0){
							if(t>1&&board[i][t-2]==0){
								board[i][t-2]=board[i][t-1];
								board[i][t-1]=board[i][t];
								board[i][t]=0;
							}
						}
					}
			    show_move_animation()
				update_score(score);
			}
		}
	}
	*/
	setTimeout('update_board_view()',200);
	return true;
}

function move_right(){
	if(!can_move_right(board)){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				for (var k = 3; k > j; k--) {
					if(board[i][k]==0&&no_block_horizontal(i,j,k,board)){
						show_move_animation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						break;
					}
					else if(board[i][k]==board[i][j]&&no_block_horizontal(i,j,k,board)&&!has_conflicted[i][k]){
						show_move_animation(i,j,i,k);
						board[i][k]=board[i][k]+board[i][j];
						board[i][j]=0;
						score += board[i][k];
						update_score(score);
						has_conflicted[i][k]=true;
						break;
					}
				}
			}
		}
	}
	setTimeout('update_board_view()',200);
	return true;
}


function move_up(){
	if(!can_move_up(board)){
		return false;
	}
	for(var j=0;j<4;j++){
		//for(i=3;i>=0;i++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&no_block_vertical(j,k,i,board)){
						show_move_animation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						break;
					}
					else if(board[k][j]==board[i][j]&&no_block_vertical(j,k,i,board)&&!has_conflicted[k][j]){
						show_move_animation(i,j,k,j);
						board[k][j]=board[k][j]+board[i][j];
						board[i][j]=0;
						score=score+board[k][j];
						update_score(score);
						has_conflicted[k][j]==true;
						break;
					}
				}
			}
		}
	}	
	setTimeout('update_board_view()',200);
	return true;
}




function move_down(){
	if(!can_move_down(board)){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0&&no_block_vertical(j,i,k,board)){
						show_move_animation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						break;
					}
					else if(board[k][j]==board[i][j]&&no_block_vertical(j,i,k,board)&&!has_conflicted[k][j]){
						show_move_animation(i,j,k,j);
						board[k][j]=board[k][j]+board[i][j];
						board[i][j]=0;						
						score=score+board[k][j];
						update_score(score);
						has_conflicted[k][j]=true;
						break;
					}
				}
			}
		}
	}
	
	setTimeout('update_board_view()',200);
	return true;
}

//�ж���Ϸ�Ƿ�ʧ��
function is_gameover(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==2048){
				update_score(success_string);
				return;
			}
		}
	}
	if(nospace(board)&&cannotmove(board)){
		gameover();
	}
}

function gameover(){
	update_score(gameover_string);
}

function prepare_for_mobile() {
	if (document_width > 500) {
		grid_container_width = 500;
		cell_side_length = 100;
		cell_space = 20;
	}
	$('#grid_container').css('width', grid_container_width - 2 * cell_space);
	$('#grid_container').css('height', grid_container_width - 2 * cell_space);
	$('#grid_container').css('padding', cell_space);
	$('#grid_container').css('border-radius', 0.02 * grid_container_width);
	$('.grid_cell').css('width', cell_side_length);
	$('.grid_cell').css('height', cell_side_length);
	$('.grid_cell').css('border-radius', 0.02 * grid_container_width);
}