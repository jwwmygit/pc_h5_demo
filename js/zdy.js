(function(w){
	var zdy ={};
	var timer=0;
	zdy.mouseS=function(){
		var content = document.querySelector("#wrap .content");
		var liNodes_Cs =document.querySelectorAll("#wrap .content > ul > li");
		/*目的:
		 *	 在整个MouseScroll操作中，只让最后一个回调函数产生作用。
		 * 		 MouseScroll的队列
		 * 			鼠标滚轮事件触发过程当中，MouseScroll队列中一直在新增新的回调函数
		 * 		  定时器的队列
		 * 			当MouseScroll的队列中的回调函数一个个在被执行时，会告诉一个定时器分线程
		 * 	隔200ms之后将这个setTimeout回调函数放入异步队列中。杀死前一个setTimeout回调函数。
		 * 整个过程当中只有MouseScroll队列中最后一个回调函数所生成的setTimeout回调函数会起作用。
		 * 
		 * */
		
		
		if(content.addEventListener){
			content.addEventListener("DOMMouseScroll",function(ev){
				ev = ev||event;
				clearTimeout(timer);
				timer = setTimeout(function(){
					fn(ev);
				},200)
			});
		}
		content.onmousewheel=function(ev){
				ev = ev||event;
				clearTimeout(timer);
				timer =setTimeout(function(){
					fn(ev);
				},200);
		}
		
		function fn(ev){
			ev=ev||event;
			var dir="";
			if(ev.wheelDelta){
				dir = ev.wheelDelta>0?"up":"down";
			}
			if(ev.detail){
				dir = ev.detail<0?"up":"down";
			}
			
			switch (dir){
				case "up":
					if(damu.now>0){
						damu.now--;
						damu.move(damu.now);
					}
					break;
				case "down":
					if(damu.now<liNodes_Cs.length-1){
						damu.now++;
						damu.move(damu.now);
					}
					break;
			}
			
			if(ev.preventDefault){
				ev.preventDefault();
			}
			
			return false;
		}
	}
	w.zdy = zdy;
})(window)
