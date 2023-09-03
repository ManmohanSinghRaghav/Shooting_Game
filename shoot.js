var j = 1
var team = 1;
var ban = 0;
var tune = 0;
var score = 0;
var ammo = -1;
var hscore = 0;
var reload = false;
var play_back = tuneAllow = true;
var running;
var sound;
var ctsf = ctse = ctsre = 1;



var gameSound = (function (song) {
    return {
        firing: function (fi) {
            if (tuneAllow == true) {        
                if (fi == 1) {
                    document.getElementById('bair1').currentTime = 0;
                    document.getElementById('bair1').play();
                }else if (fi == 2) {
                    document.getElementById('bair2').currentTime = 0;
                    document.getElementById('bair2').play();
                }else if (fi == 3) {
                    document.getElementById('bair3').currentTime = 0;
                    document.getElementById('bair3').play();
                }else{
                    document.getElementById('bair1').currentTime = 0;
                    document.getElementById('bair1').play();
                }
                if (ctsf < 3) {
                    ctsf++;
                } else {
                    ctsf = 1;
                }
            }
        },
        cocking: function (em) {
            if (tuneAllow == true) { 
                em = ctse;
                if (em == 1) {
                    document.getElementById('cair1').currentTime = 0;
                    document.getElementById('cair1').play();
                }else if (em == 2) {
                    document.getElementById('cair2').currentTime = 0;
                    document.getElementById('cair2').play();
                }else if (em == 3) {
                    document.getElementById('cair3').currentTime = 0;
                    document.getElementById('cair3').play();
                }else{
                    document.getElementById('cair1').currentTime = 0;
                    document.getElementById('cair1').play();
                }
                if (ctse < 3) {
                    ctse++;
                } else {
                    ctse = 1;
                }
            }
        },
        reloading: function (re) {
            if (tuneAllow == true) { 
                if (re == 1) {
                    document.getElementById('c2air1').currentTime = 0;
                    document.getElementById('c2air1').play();
                }else if (re == 2) {
                    document.getElementById('c2air2').currentTime = 0;
                    document.getElementById('c2air2').play();
                }else if (re == 3) {
                    document.getElementById('c2air3').currentTime = 0;
                    document.getElementById('c2air3').play();
                }else{
                    document.getElementById('c2air1').currentTime = 0;
                    document.getElementById('c2air1').play();
                }
                if (ctsre < 3) {
                    ctsre++;
                } else {
                    ctsre = 1;
                }
            }   
        },
    };
}());

function G_play() {
    if ((play_back == true)) {
        document.getElementById('backg').play();
        document.getElementById('backg').volume = 1;
        document.getElementById('bgplay').style.display = "inline";
        document.getElementById('bgmute').style.display = "none";
        document.getElementById('playbtn').style.opacity = 1;
        play_back = false;
        
    }else{
        play_back = true;
        document.getElementById('backg').pause();
        document.getElementById('bgplay').style.display = "none";
        document.getElementById('bgmute').style.display = "inline";
        document.getElementById('playbtn').style.opacity = 0.5;
    }
}
function G_tune() {
    if (tune%2 == 0) {
        tuneAllow = true
            document.getElementById('tune').style.opacity = 1;
        } else {
        tuneAllow = false 
        document.getElementById('tune').style.opacity = 0.5;
    }
}


function show1() {
    j = 1
    running = setInterval(show, 100);
    document.getElementById('banner').style.opacity = 1;
}

function show() {
    document.getElementById('banner').style.opacity = j;
    if (j >= 0.1) {
        j -= 0.1;
    } else {
        clearInterval(running);
    }
}

document.addEventListener('keypress', event => {
    if (event.key === ' ') {
        reit();
    }
});

function reit() {
    ammo = -1;
    score = 0;
    k = -1;
    reload = false;
    gameSound.reloading(ctsre);
    document.getElementById('hit').innerHTML = 'Score: ' + score;
    document.getElementById('reload').style.display = "none";
    document.getElementById('maga').style.animation = "load 0.5s linear infinite";
    let img = document.querySelectorAll('.bullet');
    img.forEach(items => {
        items.style.display = 'inline';
    });
}

function done() {
    document.getElementById("rule").style.display = "none";
    if (reload == false) {
        ammo += 1;
        if (ammo < 10) {
            for (let bull = 0; bull <= ammo;) {
                let img = document.querySelectorAll('.bullet');
                img[bull].style.display = 'none';
                bull++
            }
            setTimeout(() => {
                
                document.getElementById('extra').style.display =
                    document.getElementById('fire').style.display = "none";
                    document.getElementById('fire').style.animation =
                    document.getElementById('extra').style.animation =
                    document.getElementById('maga').style.animation = "none";
                }, 50);
                // gameSound.cocking(1);
            gameSound.firing(ctsf);
            document.getElementById('fire').style.display =
            document.getElementById('extra').style.display = "block";
            document.getElementById('fire').style.animation = "fire 0.05s linear infinite";
            document.getElementById('maga').style.animation = "load 0.05s linear infinite";
            document.getElementById('extra').style.animation = "jump 0.1s linear infinite";
        } else {
            reload = false;
            gameSound.cocking();
            document.getElementById('rehigh').innerHTML = "High Score: " + hscore;
            document.getElementById('rehit').innerHTML = "Your Score: " + score;
            document.getElementById('reload').style.display = "flex";
        }
    }
}

function Score(p) {
    ban = p;
    if ((reload == false)) {
        score += p;
        document.getElementById('banner').innerHTML = "+" + p;
        document.getElementById('hit').innerHTML = 'Score: ' + score;
    }
    if (score > hscore) {
        hscore = score;
        document.getElementById('high').innerHTML = 'High Score: ' + score;
    }
    if (p == 25) {
        ammo = -2;
        reload = false;
        document.getElementById('banner').innerHTML = "+" + p + "<br>" + "Bonus";
        document.getElementById('maga').style.animation = "load 0.5s linear infinite";
        let img = document.querySelectorAll('.bullet');
        img.forEach(items => {
            items.style.display = 'inline';
        });
    }
}
var followCursor = (function () {
    var g = document.createElement('img');
    g.setAttribute('class', 'lis');
    g.setAttribute('src', 'wimage/gun.png');

    var bu = document.createElement('img');
    bu.setAttribute('class', 'fire');
    bu.setAttribute('id', 'fire');
    bu.setAttribute('src', 'wimage/fire1.png');

    var sc = document.createElement('div');
    sc.setAttribute('class', 'banner');
    sc.setAttribute('id', 'banner');

    return {
        init: function () {
            document.body.appendChild(g);
            document.body.appendChild(bu);
            document.body.appendChild(sc);
        },

        run: function (e) {
            var e = e || window.event;
            g.style.left = (e.clientX + 1) + 'px';
            g.style.top = (e.clientY - 20) + 'px';
            bu.style.left = (e.clientX + 1) + 'px';
            bu.style.top = (e.clientY - 20) + 'px';
            sc.style.left = (e.clientX + 100) + 'px';
            sc.style.top = (e.clientY - 100) + 'px';
        }
    };
}());
 
window.onload = function () {
    followCursor.init();
    document.body.onmousemove = followCursor.run;
    document.getElementById('playbtn').style.opacity = 0.5;
}