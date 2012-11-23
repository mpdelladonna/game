function randRange(from, to)
{
	return Math.floor((Math.random()*(to-from))+from);
}

window.onload = function () {
    //start crafty
    Crafty.init(400, 336);
    Crafty.canvas.init();
	
	//turn the sprite map into usable components
	Crafty.sprite(16, "bananabomber-sprites.png", {
		grass1: [0, 0],
		grass2: [1, 0],
		grass3: [2, 0],
		grass4: [3, 0],
		flower: [0, 1],
		bush1: [0, 2],
		bush2: [1, 2],
		player: [0, 3],
		enemy: [0, 3],
		banana: [4, 0],
		empty: [4, 0]
	});
	
	//method to randomy generate the map
	function generateWorld() 
	{
		//generate the grass along the x-axis
		for(var i = 0; i < 25; i++) {
			//generate the grass along the y-axis
			for(var j = 0; j < 20; j++) {
				grassType = randRange(1, 4);
				Crafty.e("2D, Canvas, grass"+grassType)
					.attr({x: i * 16, y: j * 16});
			}
		}
		
		//create the bushes along the x-axis which will form the boundaries
		for(var i = 0; i < 25; i++) {
			Crafty.e("2D, Canvas, solid, bush"+randRange(1,2))
				.attr({x: i * 16, y: 0, z: 2});
			Crafty.e("2D, Canvas, solid, bush"+randRange(1,2))
				.attr({x: i * 16, y: 304, z: 2});
		}
		
		//create the bushes along the y-axis
		//we need to start one more and one less to not overlap the previous bushes
		for(var i = 1; i < 19; i++) {
			Crafty.e("2D, Canvas, solid, bush"+randRange(1,2))
				.attr({x: 0, y: i * 16, z: 2});
			Crafty.e("2D, Canvas, solid, bush"+randRange(1,2))
				.attr({x: 384, y: i * 16, z: 2});
		}
	}
	
	//the loading screen that will display while our assets load
	Crafty.scene("loading", function() {
		//load takes an array of assets and a callback when complete
		Crafty.load(["bananabomber-sprites.png"], function() 
		{
			Crafty.scene("main"); //when everything is loaded, run the main scene
		});
		
		Crafty.c("LeftControls", 
		{
			init: function()
			{	this.requires('Multiway');},
			
			leftControls: function(speed) 
			{	this.multiway(speed, {W: -90, S: 90, D: 0, A: 180})
				return this;}
		});
	
		Crafty.c('Ape', 
		{
		
			init: function()
			{
				this.requires("SpriteAnimation, Collision, Grid");
			},
			Ape: function() 
			{
				//setup animations
				this
				.animate("walk_left", 6, 3, 8)
				.animate("walk_right", 9, 3, 11)
				.animate("walk_up", 3, 3, 5)
				.animate("walk_down", 0, 3, 2)
				//change direction when a direction change event is received
				.bind("NewDirection",
					function (direction) 
					{
						if (direction.x < 0) {
							if (!this.isPlaying("walk_left"))
								this.stop().animate("walk_left", 10, -1);
						}
						if (direction.x > 0) {
							if (!this.isPlaying("walk_right"))
								this.stop().animate("walk_right", 10, -1);
						}
						if (direction.y < 0) {
							if (!this.isPlaying("walk_up"))
								this.stop().animate("walk_up", 10, -1);
						}
						if (direction.y > 0) {
							if (!this.isPlaying("walk_down"))
								this.stop().animate("walk_down", 10, -1);
						}
						if(!direction.x && !direction.y) {
							this.stop();
						}
					}
					)
					.bind('Moved', function(from) {
						if(this.hit('solid')){
							this.attr({x: from.x, y:from.y});
						}
					})
				return this;
			}
		});
		
		//black background with some loading text
		Crafty.background("#000");
		Crafty.e("2D, DOM, Text").attr({w: 100, h: 20, x: 150, y: 120})
			.text("Loading")
			.css({"text-align": "center"});
	});
	
	Crafty.scene("main", function() {
		generateWorld();
		
		var player1 = Crafty.e("2D, Canvas, player, Ape, LeftControls")
        .attr({ h: 16, x: 16, y: 288, z: 1 })
        .leftControls(3)
        .Ape();
			
	});
	
	//automatically play the loading scene
	Crafty.scene("loading");
			
};
