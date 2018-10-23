(function(){
	var winH = window.innerHeight;//window的高
	var val = winH - $id("head").offsetHeight - $id("foot").offsetHeight - (0.4 * 2) * htmlFontSize;
	$id("main").style.height = val + "px";
})()


var music = (function(){
	//获取数据绑定数据
	var audio = $id("audio");
	var play = $id("play");
	var pause = $id("pause");
	var totalTime = $id("totalTime");
	var currentTime = $id("currentTime");
	var progressBar = $id("progressBar");
	var lyric = $id("lyric");
	function getData(){
		var xhr = new XMLHttpRequest();
		xhr.open("get","lyric1.json",true);
		xhr.send();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				var data = JSON.parse(xhr.responseText);
				console.log(data)
				var arr = data.lyric;
				var str = "";
				for(var i = 0; i < arr.length; i++ ){
					var cur = arr[i];
					str += `<p id="${cur.id}" min="${cur.minute}" sec = "${cur.second}" >${cur.content}</p>`;
				}
				$id("lyric").innerHTML = str;
			}
		}
	}
	
	function autoPlay(){
		audio.play();   //音乐自动播放
		audio.oncanplay = function(){  //如果音乐播放就触发oncanplay事件
			play.style.display = "none";
			pause.style.display = "block";
			//console.log(audio.duration)    //duration代表歌词的时长
			totalTime.innerHTML = formartTime(audio.duration);
		}
		
	}
	function formartTime(s){
		var min = Math.floor(s / 60);
		var sec = Math.floor(s - min * 60);
		min = min < 10 ? "0" + min : min;
		sec = sec < 10 ? "0" + sec : sec;
		return min+ ':' + sec;
	}

	function bindEvent(){
		play.onclick = pause.onclick = function(){
			if(audio.paused){//目前代表音乐暂停状态 返回true
				audio.play();//让音乐播放
				play.style.display = "none";
				pause.style.display = "block";
			}else{
				audio.pause();//让音乐暂停
				play.style.display = "block";
				pause.style.display = "none";
			}
		}
	}
	
	function musicStatus(){
		if(audio.currentTime == audio.duration){//音乐的当前时间  == 音乐的总时间
			clearInterval(timer);
			return
			
		}
		var timer = setInterval(function(){ //
			currentTime.innerHTML = formartTime(audio.currentTime);
			progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
			var min = formartTime(audio.currentTime).split(":")[0];   //02:30  [02,30]
			var sec = formartTime(audio.currentTime).split(":")[1]; //当前时间的分和秒
			var allP = lyric.children; 
			for(var i = 0; i < allP.length; i++){
				var curP = allP[i];
				if(curP.getAttribute("min") == min && curP.getAttribute("sec") == sec){
					for(var i = 0; i < allP.length;i++){//利用排他思想
						allP[i].className = "";
					}
					curP.className = "bg";
					
					var curId = curP.getAttribute("id");
					if( curId >= 4){
						lyric.style.top = - (curId - 3) * 0.84 + "rem";
					}
				}
			
			}
			
		},1000)
	}
	
	return {
		init : function(){
			getData();//获取歌词绑定歌词
			autoPlay();//音乐自动播放, 总的时长显示出来, 如果是能播放,播放按钮隐藏,暂停按钮显示 
			bindEvent();//给暂停和播放加的事件,如果是播放,我就暂停,播放按钮显示,暂停按钮隐藏;反之...			
			musicStatus();//显示当前的音乐播放的时间,改变进度条,让当前歌词高亮;歌词的id>=4,改变歌词的top
		}
	}
})()
music.init();




