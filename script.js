// スクロール表示

const reveals=document.querySelectorAll(".reveal");

function reveal(){

reveals.forEach(el=>{

const top=el.getBoundingClientRect().top;

if(top<window.innerHeight-100){

el.classList.add("active");

}

});

}

window.addEventListener("scroll",reveal);

reveal();


// 星空

const stars=document.getElementById("stars");

for(let i=0;i<120;i++){

const star=document.createElement("div");

star.className="star";

star.style.left=Math.random()*100+"%";

star.style.top=Math.random()*100+"%";

star.style.animationDuration=

4+Math.random()*6+"s";

star.style.animationDelay=

Math.random()*5+"s";

stars.appendChild(star);

}

// スクショ拡大

document.querySelectorAll(".gallery-grid img")

.forEach(img=>{

img.onclick=()=>{

window.open(img.src);

}

});

// ----------------

const track=document.querySelector(".carousel-track");

document.querySelector(".right").onclick=()=>{

track.scrollBy({

left:track.clientWidth,

behavior:"smooth"

});

};

document.querySelector(".left").onclick=()=>{

track.scrollBy({

left:-track.clientWidth,

behavior:"smooth"

});

};

// ----------------

const modal=document.createElement("div");

modal.className="modal";

modal.innerHTML="<img>";

document.body.appendChild(modal);

const modalImg=modal.querySelector("img");

document.querySelectorAll(".carousel-track img")

.forEach(img=>{

img.onclick=()=>{

modal.classList.add("active");

modalImg.src=img.src;

};

});

modal.onclick=()=>{

modal.classList.remove("active");

};

// ----------------

const topButton=document.getElementById("topButton");

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topButton.style.display="block";

}else{

topButton.style.display="none";

}

});

topButton.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// ----------------

document.querySelectorAll("a[href^='#']")

.forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(

this.getAttribute("href")

).scrollIntoView({

behavior:"smooth"

});

});

});