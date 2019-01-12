(function(w){
	var damu={
		now:0
	};
	var ul =document.querySelector("#wrap .content > ul");
	var liNodes_C =document.querySelector("#wrap .content > ul > li");
	var liNodes =document.querySelectorAll("#wrap .header .headMain .btns ul li");
	var upNodes =document.querySelectorAll("#wrap .header .headMain .btns ul li  .up");
	var arrow = document.querySelector("#wrap .header .headMain .arrow ");
	var dotNodes = document.querySelectorAll("#wrap .content > .dot > span");
	damu.header=function(){
		liNodes[0].querySelector(".up").style.width="100%";
		arrow.style.left =liNodes[0].offsetLeft +  liNodes[0].offsetWidth/2 - arrow.offsetWidth/2 +"px";
		
		for(var i=0;i<liNodes.length;i++){
			//将变量i劫持给节点的属性
			liNodes[i].index  =i;
			liNodes[i].onclick=function(){
				damu.move(this.index);
			}
		}
	}
	
	damu.move=function(index){
		damu.now = index;
		//导航的切换
		for(var i=0;i<liNodes.length;i++){
			upNodes[i].style.width="";
		}
		upNodes[index].style.width="100%";
		
		//
		for(var i=0;i<dotNodes.length;i++){
			dotNodes[i].classList.remove("active");
		}
		dotNodes[index].classList.add("active");
		
		//小箭头位置的同步
		arrow.style.left =liNodes[index].offsetLeft +  liNodes[index].offsetWidth/2 - arrow.offsetWidth/2 +"px";
	
		//屏幕的切换
		ul.style.top = -index*liNodes_C.offsetHeight +"px";
		
	}
	w.damu = damu;
})(window)
