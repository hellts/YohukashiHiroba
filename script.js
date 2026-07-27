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