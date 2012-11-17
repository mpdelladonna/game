var context;
var size;
var gridsize = 50;

var steve;

function loc(x,y)
{
	this.x = x;
	this.y = y;
}

function man(imgSrc, loc)
{
	this.img = new Image();
	this.img.src = imgSrc;
	this.pos = loc;
	this.drawMan = drawMan;
	this.moveManX = moveManX;
	this.moveManY = moveManY;
	
function drawMan()
{
	 context.drawImage(this.img, this.pos.x, this.pos.y);
}

function moveManX(deltaX)
{
	 this.pos.x += deltaX;
}

function moveManY(deltaY)
{
	this.pos.y += deltaY;
}

}


function example(border)
{
	size = border;
	var can = document.getElementById('example');
	context = can.getContext('2d');

	steve = new man( 'man.gif' ,new loc(0,0));
	
	document.addEventListener("click", function(event){steve.moveManX(gridsize)}, false);
	document.addEventListener("keypress", function(event){steve.moveManX(0 - gridsize)}, false);
	
	setInterval(update,100);
}

function drawGrid()
{
	for(var i = 0; i < size / 50; i++)
	{
		context.moveTo(i*gridsize,0);
		context.lineTo(i*gridsize,size);
		context.stroke();
	}
	
	for(var i = 0; i < size / 50; i++)
	{
		context.moveTo(0,i*gridsize);
		context.lineTo(size,i*gridsize);
		context.stroke();
	}
	
}

function update()
{
	context.clearRect(0,0,size,size);
	drawGrid();
	steve.drawMan();
}