
var loops = {};	


//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//рандом
console.log("Animate by gt99");
function clear_anim(name){
	clearInterval(loops[name]);
}

function rnd(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
 }

//Грузим объект
function loadImage(img_now, img_count, convas, path, width, height, count, first_height = 0, size = 1){
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//
/*------------- Дебаг -------------*/
	if(path === undefined || width === undefined || height === undefined || count === undefined) 
		return false;
//\\//\\//\\//\\//\\//\\//\\//\\//\\
//\\//\\//\\//\\//\\//\\//\\//\\//\\
	
	var image = document.createElement('img');
	var result ={
		dom: image,
		path: path,
		w: width,
		h: height,
		count: count,
		size: size,
		f_h: first_height,
		loaded: false,
		num: 0,
		cnv: convas,
		img_now:img_now,
		img_count:img_count
	};
	
	image.onload = function(){
		result.loaded = true;
	};
	image.src = path;
	return result;
}

//Отрисовываем
function drawImage(img, x, y,clear_w = 100,clear_h = 100){
	if(!img.loaded) return;
		
	if(img.num >= img.count)
		img.num = 1;
	else
		img.num ++;
	
	img.cnv.clearRect(0, 0, clear_w, clear_h);	//Чистим

	img.cnv.drawImage(
		img.dom,
		img.w*(img.num-1), 
		img.f_h, 
		img.w, 
		img.h, 
		x, 
		y, 
		img.w*img.size, 
		img.h*img.size
	);
}

//циклим или выводим единыжды
function animation(name,img, speed = 100, loop = true, animation_next = false, x = 0, y = 0, clear_w = 100, clear_h = 100){
var i=1;
	
	if(typeof(loop) == "boolean" && loop == true){
	
		var timer = setInterval(function(){
			drawImage(img, x, y, clear_w, clear_h);
		},speed);
		
		loops[name] = timer;

	}
	
	if(typeof(loop) == "number"){
			
		function interval(){
			
			if(img.num < img.count){
				drawImage(img, x, y, clear_w, clear_h);
			}else{
				
				img.num = 0;
				
				if(i <= loop)
					i++;
				else{
					clearInterval(intervalID);
					recurs(name,animation_next, img.cnv, img.img_count, img.img_now+1);
				}
					
			}
			
		}var intervalID=setInterval(interval,speed);
			
	}
	if(typeof(loop) == "boolean" && loop == false){
		function interval(){
			

			if(img.num < img.count)
				drawImage(img, x, y, clear_w, clear_h);
			else{
				clearInterval(intervalID);
				recurs(name,animation_next, img.cnv, img.img_count, img.img_now+=1);
			}
		}var intervalID=setInterval(interval,speed);
		
		loops[name] = intervalID;
	}
}

//Рекурсивная функция вызова анимации
function recurs(name,animation_next, convas, img_count = 1, img_now = 0){
	
	if(img_now <= img_count && animation_next){		
		var element = Object.keys(animation_next)[img_now];//Берем название нового эл
		var el = animation_next[element]; //берем параметры нового эл
		if (img_now == img_count){ 
			img_now = 0;
			return;
		}
		img = loadImage(img_now, img_count, convas, el.path, el.width, el.height, el.count, el.first_height, el.size);
		animation(name, img, el.anim_speed, el.anim_loop, animation_next, el.anim_x, el.anim_y, el.anim_cl_w, el.anim_cl_h,);	
		
		//animState = animation_next.now; 
	}	
}
