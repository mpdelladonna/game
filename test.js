var context;
var size;
var gridsize = 50;

function example(border)
{
	size = border;
	var can = document.getElementById('example');
	context = can.getContext('2d');
	context.fillStyle = 'green';
	context.fillRect(0,0,size,size);
	
	drawGrid();
	drawMan();
	document.addEventListener("click", drawMan, false);
	document.addEventListener("keypress", moveMan, false);
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

function drawMan()
{
	 var man = new Image();
	 man.src = 'man.gif';
	 context.drawImage(man, 0, 0);
}

function moveMan()
{
	 var man = new Image();
	 man.src = 'man.gif';
	 context.drawImage(man, gridsize, 0);
}