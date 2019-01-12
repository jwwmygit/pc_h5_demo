(function(w){
	w.qipao={
		biubiu:function(oc){
			if(oc.getContext){
				var ctx = oc.getContext("2d");
				var arr=[];
				
				//将数组中的圆绘制到画布上
				w.qipao.timer1 = setInterval(function(){
					ctx.clearRect(0,0,oc.width,oc.height);
					//动画
					for(var i=0;i<arr.length;i++){
						arr[i].deg+=5;
						arr[i].x = arr[i].startX +  Math.sin( arr[i].deg*Math.PI/180 )*arr[i].step*2;
						arr[i].y = arr[i].startY - (arr[i].deg*Math.PI/180)*arr[i].step ;
						
						if(arr[i].y <=50){
							arr.splice(i,1)
						}
					}
					
					
					//绘制
					for(var i=0;i<arr.length;i++){
						ctx.save();
						ctx.fillStyle="rgba("+arr[i].red+","+arr[i].green+","+arr[i].blue+","+arr[i].alp+")";
						ctx.beginPath();
						ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI);
						ctx.fill();
						ctx.restore();
					}
				},1000/60)
				
				//往arr中注入随机圆的信息
				w.qipao.timer2 =setInterval(function(){
					var r =Math.random()*6+2;
					var x = Math.random()*oc.width;
					var y = oc.height - r;
					var red =   Math.round(Math.random()*255);
					var green = Math.round(Math.random()*255);
					var blue =  Math.round(Math.random()*255);
					var alp = 1;
					
					
					var deg =0;
					var startX = x;
					var startY = y;
					//曲线的运动形式
					var step =Math.random()*20+10;
					arr.push({
						x:x,
						y:y,
						r:r,
						red:red,
						green:green,
						blue:blue,
						alp:alp,
						deg:deg,
						startX:startX,
						startY:startY,
						step:step
					})
				},50)
			}
		}
	};
})(window)
