(function(w){
	var xfz={};
	xfz.content=function(){
		var content = document.querySelector("#wrap .content");
		var liNodes = document.querySelectorAll("#wrap .content > ul > li");
		
		var head = document.querySelector("#wrap .header");
		content.style.height = document.documentElement.clientHeight - head.offsetHeight+"px";
		for(var i=0;i<liNodes.length;i++){
			liNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight+"px";
		}
	}
	
	
	xfz.home3D=function(){
		var oldIndex =0;
		var autoIndex =0;
		var timer =0;
		var home = document.querySelector("#wrap .content .home");  
		var home1lis = document.querySelectorAll("#wrap .content .home .home1 > ul >li");  
		var home2lis = document.querySelectorAll("#wrap .content .home .home2 > ul >li");  
		for(var i=0;i<home2lis.length;i++){
			home2lis[i].index=i;
			home2lis[i].onclick=function(){
				clearInterval(timer);
				for(var i=0;i<home2lis.length;i++){
					home2lis[i].classList.remove("active");
				}
				this.classList.add("active");
				
				//左边
				if(this.index < oldIndex){
					home1lis[this.index].classList.remove("leftHide");
					home1lis[this.index].classList.remove("rightHide");
					home1lis[this.index].classList.remove("rightShow");
					home1lis[this.index].classList.add("leftShow");
					
					home1lis[oldIndex].classList.remove("leftHide");
					home1lis[oldIndex].classList.remove("leftShow");
					home1lis[oldIndex].classList.remove("rightShow");
					home1lis[oldIndex].classList.add("rightHide");
					
				}
				//右边
				if(this.index > oldIndex){
					home1lis[this.index].classList.remove("leftHide");
					home1lis[this.index].classList.remove("rightHide");
					home1lis[this.index].classList.remove("leftShow");
					home1lis[this.index].classList.add("rightShow");
					
					home1lis[oldIndex].classList.remove("rightHide");
					home1lis[oldIndex].classList.remove("leftShow");
					home1lis[oldIndex].classList.remove("rightShow");
					home1lis[oldIndex].classList.add("leftHide");
					
				}
				
				
				oldIndex = this.index;
				autoIndex = this.index;
				
//				move();
			}
		}
		
		
		
		
		move();
		function move(){
			//避免循环定时器你的逻辑被多次调用
			clearInterval(timer);
			timer = setInterval(function(){
				autoIndex++;
				
				if(autoIndex === home2lis.length){
					autoIndex=0;
				}
				
				
				for(var i=0;i<home2lis.length;i++){
					home2lis[i].classList.remove("active");
				}
				home2lis[autoIndex].classList.add("active");
				
				home1lis[autoIndex].classList.remove("leftHide");
				home1lis[autoIndex].classList.remove("rightHide");
				home1lis[autoIndex].classList.remove("leftShow");
				home1lis[autoIndex].classList.add("rightShow");
				
				home1lis[oldIndex].classList.remove("rightHide");
				home1lis[oldIndex].classList.remove("leftShow");
				home1lis[oldIndex].classList.remove("rightShow");
				home1lis[oldIndex].classList.add("leftHide");
				
				oldIndex = autoIndex;
				
			},2000)
		}
		
		home.addEventListener("mouseenter",function(){
			clearInterval(timer);
		})
		home.addEventListener("mouseleave",function(){
			move();
		})
	}
	
	xfz.picBoom = function(){
		var ulNodes = document.querySelectorAll("#wrap .content > ul > li > div.about .about3 .item > ul");
		for(var i=0;i<ulNodes.length;i++){
			change(ulNodes[i]);
		}
		
		function change(ul){
			for(var i=0;i<4;i++){
				var liNode = document.createElement("li");
				var img = document.createElement("img");
				
				var w =  ul.offsetWidth/2;
				var h =  ul.offsetHeight/2; 
				
				liNode.style.width =  w+"px";
				liNode.style.height = h +"px";
				img.src = ul.dataset.src;
				
				img.onload=function(){
					var imgNodes = ul.querySelectorAll("li >img");
					boom(imgNodes);
				}
				/*
	             * 		0 : left:0 	top:0
	             * 		1 : left:-w	top:0
	             * 		2 : left:0	top:-h
	             * 		3 : left:-w	top:-h
	             * */
	            img.style.left = -(i%2) *w+"px"
	            img.style.top =  -Math.floor(i/2)*h+"px"
				
				liNode.appendChild(img);
				ul.appendChild(liNode);
			}
			
			
			/*
			 * 
			 * 	0: left 0   	top h
			 * 	1: left -2w  	top 0
			 * 	2: left w  		top -h
			 * 	3: left -w   	top -2h
			 * 
			 * */
			function boom(imgNodes){
				var arrLeft =[0,-2,1,-1];
				var arrTop =[1,0,-1,-2];
				
				ul.addEventListener("mouseenter",function(){
					for(var i=0;i<imgNodes.length;i++){
						imgNodes[i].style.left = arrLeft[i]*w+"px";
						imgNodes[i].style.top = arrTop[i]*h+"px";
					}
				})
				
				ul.addEventListener("mouseleave",function(){
					for(var i=0;i<imgNodes.length;i++){
						imgNodes[i].style.left = -(i%2) *w+"px"
	            		imgNodes[i].style.top =  -Math.floor(i/2)*h+"px"
					}
				})
			}
			
		}
	
		
	}
	
	xfz.canvasAn =function(){
		var oc = null;
		var team3 = document.querySelector("#wrap .content > ul > li > div.team .team3");
		var liNodes = document.querySelectorAll("#wrap .content > ul > li > div.team .team3 ul li");
		for(var i=0;i<liNodes.length;i++){
			liNodes[i].addEventListener("mouseenter",function(){
				for(var i=0;i<liNodes.length;i++){
					liNodes[i].style.opacity=.2;
				}
				this.style.opacity=1;
				
				addCanvas();
				oc.style.left = this.offsetLeft+"px";
				
			})
			
			
			team3.addEventListener("mouseleave",function(){
				
				
				oc.remove();
				oc =null;
				
				clearInterval(qipao.timer1);
				clearInterval(qipao.timer2);
			})
			
		}
		
		
		
		function addCanvas(){
			if(!oc){
				oc = document.createElement("canvas");
				oc.width = liNodes[0].offsetWidth;
				oc.height = liNodes[0].offsetHeight/2;
				team3.appendChild(oc);
				
				qipao.biubiu(oc);
			}
		}
	}
	
	xfz.sidebar=function(){
		var dotNodes = document.querySelectorAll("#wrap .content > .dot > span");
		for(var i=0;i<dotNodes.length;i++){
			dotNodes[i].index=i;
			dotNodes[i].onclick=function(){
				damu.move(this.index);
			}
		}
	}
	
	xfz.progress = function(){
		var flag = 0;
		var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
		var line = document.querySelector("#wrap .mask .line");
		var mask = document.querySelector("#wrap .mask");
		var up = document.querySelector("#wrap .mask .up");
		var down = document.querySelector("#wrap .mask .down");
		
		
		for(var i=0;i<arr.length;i++){
			var img = new Image();
			img.src="img/"+arr[i];
			img.onload=function(){
				flag++;
				line.style.width = (flag/arr.length)*100+"%";
			}
		}
		
		line.addEventListener("transitionend",function(){
			up.style.height = 0;
			down.style.height = 0;
			this.remove();
		});
		
		up.addEventListener("transitionend",function(){
			mask.remove();
		});
		
	}
	
	w.xfz=xfz;
})(window)
