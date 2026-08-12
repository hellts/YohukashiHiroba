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

const stars =
document.getElementById("stars");

if(stars){

    for(let i=0;i<120;i++){

        const star =
        document.createElement("div");

        star.className="star";

        star.style.left =
        Math.random()*100+"%";

        star.style.top =
        Math.random()*100+"%";

        star.style.animationDuration =
        4+Math.random()*6+"s";

        star.style.animationDelay =
        Math.random()*5+"s";

        stars.appendChild(star);

    }

}

// スクショ拡大

document.querySelectorAll(".gallery-grid img")

.forEach(img=>{

img.onclick=()=>{

window.open(img.src);

}

});

// =================================
// Ver.2.0 カルーセル
// PCボタン + スマホスワイプ対応
// =================================

const track =
document.querySelector(".carousel-track");

const rightButton =
document.querySelector(".arrow.right");

const leftButton =
document.querySelector(".arrow.left");


if(track){

    /* ========================= */
    /* PC：右ボタン */
    /* ========================= */

    if(rightButton){

        rightButton.addEventListener(
            "click",
            () => {

                track.scrollBy({

                    left:
                    track.clientWidth + 20,

                    behavior:"smooth"

                });

            }
        );

    }


    /* ========================= */
    /* PC：左ボタン */
    /* ========================= */

    if(leftButton){

        leftButton.addEventListener(
            "click",
            () => {

                track.scrollBy({

                    left:
                    -(track.clientWidth + 20),

                    behavior:"smooth"

                });

            }
        );

    }


    /* ========================= */
    /* スマホ：スワイプ */
    /* ========================= */

    let startX = 0;

    let startY = 0;


    track.addEventListener(
        "touchstart",
        (event) => {

            startX =
            event.touches[0].clientX;

            startY =
            event.touches[0].clientY;

        },
        {passive:true}
    );


    track.addEventListener(
        "touchend",
        (event) => {

            const endX =
            event.changedTouches[0].clientX;

            const endY =
            event.changedTouches[0].clientY;


            const diffX =
            endX - startX;

            const diffY =
            endY - startY;


            /* 縦スクロールなら無視 */

            if(
                Math.abs(diffY) >
                Math.abs(diffX)
            ){

                return;

            }


            /* 小さい動きは無視 */

            if(Math.abs(diffX) < 40){

                return;

            }


            /* 左スワイプ */

            if(diffX < 0){

                track.scrollBy({

                    left:
                    track.clientWidth + 20,

                    behavior:"smooth"

                });

            }


            /* 右スワイプ */

            else{

                track.scrollBy({

                    left:
                    -(track.clientWidth + 20),

                    behavior:"smooth"

                });

            }

        },
        {passive:true}
    );

}
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

/* ================================= */
/* Ver.2.0 流れ星 */
/* ================================= */

function createShootingStar(){

    const container =
        document.getElementById(
            "shooting-stars"
        );

    if(!container) return;


    const star =
        document.createElement("div");

    star.classList.add(
        "shooting-star"
    );


    /* ランダムな位置 */

    const startX =
        Math.random() *
        window.innerWidth;

    const startY =
        Math.random() *
        window.innerHeight *
        0.5;


    star.style.left =
        startX + "px";

    star.style.top =
        startY + "px";


    container.appendChild(star);


    /* アニメーション終了後に削除 */

    setTimeout(() => {

        star.remove();

    }, 1500);

}


/* ================================= */
/* ランダムな間隔で流れ星を出す */
/* ================================= */

function scheduleShootingStar(){

    const delay =
        Math.random() * 8000 + 4000;

    setTimeout(() => {

        createShootingStar();

        scheduleShootingStar();

    }, delay);

}


/* 開始 */

scheduleShootingStar();

/* ================================= */
/* Ver.2.0 BGM ON / OFF + 音量 */
/* ================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const bgm =
            document.getElementById("bgm");

        const bgmToggle =
            document.getElementById(
                "bgm-toggle"
            );

        const volumeSlider =
            document.getElementById(
                "bgm-volume"
            );

        const volumeText =
            document.getElementById(
                "bgm-volume-text"
            );


        if(
            !bgm ||
            !bgmToggle ||
            !volumeSlider ||
            !volumeText
        ){

            console.log(
                "BGMの要素が見つかりません"
            );

            return;

        }


        /* ---------- */
        /* 初期音量 */
        /* ---------- */

        bgm.volume = 0.1;


        /* ---------- */
        /* ON / OFF */
        /* ---------- */

        bgmToggle.addEventListener(
            "click",
            async () => {

                try{

                    if(bgm.paused){

                        await bgm.play();

                        bgmToggle.textContent =
                            "🎵 BGM ON";

                    }else{

                        bgm.pause();

                        bgmToggle.textContent =
                            "🔇 BGM OFF";

                    }

                }catch(error){

                    console.error(
                        "BGMを再生できませんでした:",
                        error
                    );

                }

            }
        );


        /* ---------- */
        /* 音量変更 */
        /* ---------- */

        volumeSlider.addEventListener(
            "input",
            () => {

                const volume =
                    Number(
                        volumeSlider.value
                    );

                bgm.volume = volume;


                const percent =
                    Math.round(
                        volume * 100
                    );


                volumeText.textContent =
                    percent + "%";

            }
        );

    }
);

/* ================================= */
/* Ver.2.0 時間帯判定 */
/* ================================= */

function updateTimeTheme(){

    const hour =
        new Date().getHours();


    let theme;


    /* ------------------------- */
    /* 朝 */
    /* ------------------------- */

    if(hour >= 5 && hour < 9){

        theme = "time-morning";

    }


    /* ------------------------- */
    /* 昼 */
    /* ------------------------- */

    else if(hour >= 9 && hour < 17){

        theme = "time-day";

    }


    /* ------------------------- */
    /* 夕方 */
    /* ------------------------- */

    else if(hour >= 17 && hour < 20){

        theme = "time-evening";

    }


    /* ------------------------- */
    /* 夜 */
    /* ------------------------- */

    else{

        theme = "time-night";

    }


    /* ------------------------- */
    /* 古いクラスを削除 */
    /* ------------------------- */

    document.body.classList.remove(

        "time-morning",
        "time-day",
        "time-evening",
        "time-night"

    );


    /* ------------------------- */
    /* 現在の時間帯を追加 */
    /* ------------------------- */

    document.body.classList.add(theme);

}


/* 最初に実行 */

updateTimeTheme();


/* 1分ごとに確認 */

setInterval(

    updateTimeTheme,

    60000

);

/* ================================= */
/* Ver.2.0 スマホメニュー */
/* ================================= */

const mobileMenuButton =
document.getElementById(
    "mobile-menu-button"
);

const mobileMenuClose =
document.getElementById(
    "mobile-menu-close"
);

const mobileMenuOverlay =
document.getElementById(
    "mobile-menu-overlay"
);


/* メニューを開く */

if(
    mobileMenuButton &&
    mobileMenuOverlay
){

    mobileMenuButton.addEventListener(
        "click",
        () => {

            mobileMenuOverlay.style.display =
            "block";

            document.body.style.overflow =
            "hidden";

        }
    );

}


/* メニューを閉じる */

if(
    mobileMenuClose &&
    mobileMenuOverlay
){

    mobileMenuClose.addEventListener(
        "click",
        () => {

            mobileMenuOverlay.style.display =
            "none";

            document.body.style.overflow =
            "";

        }
    );

}


/* 背景をタップして閉じる */

if(mobileMenuOverlay){

    mobileMenuOverlay.addEventListener(
        "click",
        (event) => {

            if(
                event.target ===
                mobileMenuOverlay
            ){

                mobileMenuOverlay.style.display =
                "none";

                document.body.style.overflow =
                "";

            }

        }
    );

}


/* メニューリンクを押したら閉じる */

document
.querySelectorAll(
    ".mobile-menu-links a"
)
.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                if(mobileMenuOverlay){

                    mobileMenuOverlay.style.display =
                    "none";

                }

                document.body.style.overflow =
                "";

            }
        );

    }
);