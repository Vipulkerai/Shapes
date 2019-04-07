var canvas = document.getElementById('c1');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var colorArray = [
	'rgb(40,166,207)',
	'rgb(212,99,18)',
];

var r_width = 10;
var r_height = 10;

var rectArray = [];
var circleArray = [];

window.addEventListener('resize',
	function()
	{
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		init();
	});

function init()
{
	circleArray = [];
	rectArray = [];

	for(var i = 0;i < 500;i++)
	{
		var x = Math.random() * innerWidth;
		var y = Math.random() * innerHeight;

		var dx = Math.random() * 5;
		var dy = Math.random() * 5;

		if(x < innerWidth-r_width && y < innerHeight-r_height)
		{
			rectArray.push(new Rect(x,y,dx,dy));
		}
		else
		{
			i -= 1;
		}

	}
	
	for(var i = 0;i < 500;i++)
	{
		var x = Math.random() * innerWidth;
		var y = Math.random() * innerHeight;
		var radius = 5;
		var dx = Math.random() * 5;
		var dy = Math.random() * 5;

		if(x < innerWidth - radius && y < innerHeight - radius && x - radius > 0 && y - radius > 0)
		{
			circleArray.push(new Circle(x,y,dx,dy,radius));
		}
		else
		{
			i -= 1;
		}

	}
}


function Rect(x,y,dx,dy)
{
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.color = colorArray[Math.floor(Math.random() * 2)];
	
	this.draw = function()
	{
		c.beginPath();
		c.rect(this.x,this.y,r_width,r_height);
		c.fillStyle = 'rgb(40,166,207)';
		//c.stroke();
		c.fill();
	}
	
	this.update = function()
	{
		this.draw();
		
		if(this.x+r_width > innerWidth || this.x < 0)
		{
			this.dx = -this.dx;
			
		}
		
		if(this.y+r_height > innerHeight || this.y < 0)
		{
			this.dy = -this.dy;
		}
		
		//this.x += this.dx;
		this.y += this.dy;
	}
}


function Circle(x,y,dx,dy,radius)
{
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = colorArray[Math.floor(Math.random() * 2)];
	
	this.draw = function()
	{
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		c.fillStyle = 'rgb(212,99,18)';
		//c.stroke();
		c.fill();
	}
	
	this.update = function()
	{
		this.draw();
		
		if(this.x+this.radius > innerWidth || this.x-this.radius < 0)
		{
			this.dx = -this.dx;
			
		}
		
		if(this.y+this.radius > innerHeight || this.y-this.radius < 0)
		{
			this.dy = -this.dy;
		}
		
		this.x += this.dx;
		//this.y += this.dy;
	}
}


function animation()
{
	window.requestAnimationFrame(animation);
	
	c.clearRect(0,0,window.innerWidth,window.innerHeight);
	
	for(var i = 0;i < rectArray.length;i++)
	{
		rectArray[i].update();
	}
	for(var i = 0;i < circleArray.length;i++)
	{
		circleArray[i].update();
	}
}

animation();
init();