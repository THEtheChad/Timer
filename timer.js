function noop(){}

Timer = function(options){
	if(!(this instanceof Timer))
		return new Timer(options);

	this.elapsed = 0;

	for(var k in options)
		this[k] = options[k];
};

Timer.prototype = {
	onStop  : noop,
	onTick  : noop,
	onStart : noop,
	onReset : noop,

	start: function(){
		this.tick();
		return this.elapsed;
	},
	stop: function(){
		clearTimeout(this.timer);
		this.onStop(this.elapsed);
		return this.elapsed;
	},
	tick: function(){
		var timer = this
		  , start = +new Date
		  , delta = 0
		  , delay = this.delay
		  , prev  = this.elapsed
		  , diff
		  , elapsed
		;//var

		this.onStart();
		function loop(){
			delta += delay;
			elapsed = +new Date - start;
			diff = elapsed - delta;
			timer.onTick(timer.elapsed = prev + elapsed);
			timer.timer = setTimeout(loop, (delay - diff));
		}
		loop();
	},
	reset: function(){
		var elapsed = this.elapsed;
		this.elapsed = 0;
		this.onReset(elapsed);
		return elapsed;
	}
};