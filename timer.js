(function(win, doc, undefined){
	win.timer = function(options){
		return new timer.fn.init(options);
	};

	timer.fn = timer.prototype = {
		init: function(options){
		
			options || (options = {});
		
			this.onUpdate =	 typeof options.onUpdate == 'function'?	 options.onUpdate 	: false;
			this.onStart =	 typeof options.onStart == 'function'?	 options.onStart 	: false;
			this.onStop	=	 typeof options.onStop == 'function'?	 options.onStop 	: false;
		},
	
		start_time: 0,
		elapsed: 0,
		delay: 100,
	
		start: function(){
			this.halt = 0;
			this.count();
			return this.elapsed;
		},
	
		stop: function(){
			this.halt = 1;
			
			return this.elapsed;
		},
	
		reset: function(){
			this.stop();
			return this.elapsed = 0;
		},
		
		update: function(){
			
		},
		
		count: function(){
			var start = new Date().getTime(),
				delta = 0,
				delay = this.delay,
				elapsed = 0;

			function loop(){
				delta += delay;
				elapsed = new Date().getTime() - start;
				diff = elapsed - delta;
				if(this.onUpdate){
					this.onUpdate(elapsed);
				}
				this.halt || window.setTimeout(loop, (delay - diff));
			}
			loop();
		}
	};

	timer.fn.init.prototype = timer.prototype;
})(window, window.document);


/*
var counter = function(options){

	var start = new Date().getTime(),
		delta = 0,
		delay = 50,
		elapsed = 0,
		onUpdate = options && options.onUpdate || function(elapsed){
			console.log(elapsed);
			return 1;
		},
		onStart = options && options.onStart || false,
		onStop = options && options.onStop || false;

	function loop(){
		delta += delay;
		elapsed = new Date().getTime() - start;
		diff = elapsed - delta;
		onUpdate(elapsed) && window.setTimeout(loop, (delay - diff)) || onStop(elapsed);
	}
	
	if(onStart){
		onStart(elapsed);
	}
	
	loop();
};
//*/

/*
var timer = {
	start_time: 0,
	elapsed: {},
	start: function(){
		this.start_time = new Date().getTime();
		return this;
	},
	stop: function(){
		this.elapsed = (new Date().getTime() - this.start_time) / 1000;
		return this.elapsed;
	},
	countdown: function(stop_at, callback, on_update){
		this.start();
		
		var delta = 0,
			delay = 100,
			elapsed = 0,
			halt = stop_at * 1000,
			start = this.start_time,
			update = typeof on_update == 'function' ? on_update : false;
		

	}
};
//*/
/*
var start = new Date().getTime(),
    time = 0,
    elapsed = '0.0';
function instance()
{
    time += 100;
    elapsed = Math.floor(time / 100) / 10;
    if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }
    document.title = elapsed;
    var diff = (new Date().getTime() - start) - time;
    window.setTimeout(instance, (100 - diff));
}
window.setTimeout(instance, 100);
//*/