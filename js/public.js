function $id(id){//给我一个id名，返回一个这个id的元素
	return document.getElementById(id);
}
//求随机数
function rand(min,max){
	return Math.round(Math.random()*(max - min) + min);
}

//随机的16进制颜色
function getColor(){
	var str = "0123456789ABCDEF";//十六进制字符串
	var color = "#";
	for(var i = 0; i <= 5; i++){//取6个数
		color += str.charAt(rand(0,15));
		//rand(0,15)随机0-15之间的数，作为charAt()的下标，取出下标对应的字符
	}
	return color;
}
function zero(val){
	return val < 10 ? "0" + val : val;
}
//时间差
function diff(start,end){//2000-2018  2018 - 2000
	//console.log(start.getTime());
	return Math.abs(start.getTime() - end.getTime())/1000;
}