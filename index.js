let cf = document.getElementById("cf");
let compteur = 0;
let snake = [25, 24, 23];
let instruction = "";
let pomme = getRandom();
let time = 1000;

for (let i=0; i<10; i++){
    let maRow = document.createElement("div");
    maRow.classList.add("row");
    cf.appendChild(maRow);

    for (let y=0; y<10; y++){
        compteur++;
        let maCol = document.createElement("div");
        maCol.classList.add("col", "cellule");
        maRow.appendChild(maCol);
        //maCol.textContent = compteur;
        maCol.id = compteur;
    } 
}

function colorie(){
    for (let i=1; i<=100; i++){
        let maCel = document.getElementById(i);

        if(snake.includes(i) == true){
            if(snake[0] == i){
                maCel.classList.add('tete');
                maCel.classList.remove("blanc");
                maCel.classList.remove("green");
                maCel.classList.remove('pomme');
            }else{
                maCel.classList.add("green");
                maCel.classList.remove("blanc");
                maCel.classList.remove('tete');
                maCel.classList.remove('pomme');
            }    
        }else{
            if(pomme == i){
                maCel.classList.add('pomme');
                maCel.classList.remove("green");
                maCel.classList.remove("blanc");
                maCel.classList.remove('tete');
            }else{
                 maCel.classList.add("blanc");
                maCel.classList.remove("green");
                maCel.classList.remove('tete');
                maCel.classList.remove('pomme');
            }
           
        }
    }
}

function recupLastInstruction(e){
        e = e || window.event;
    
        if (e.keyCode == '38') {
            instruction = "haut";
            // up arrow
        }
        else if (e.keyCode == '40') {
            instruction = "bas";
            // down arrow
        }
        else if (e.keyCode == '37') {
            instruction = "gauche";
           // left arrow
        }
        else if (e.keyCode == '39') {
            instruction = "droite";
           // right arrow
        }
    }

function calculDeplacement(){
    let nextPosition = 0;
    switch(instruction){
        case "droite":
            if (snake[0]%10 == 0){
            nextPosition = snake[0]-9;
        }else{
            nextPosition = snake[0]+1;
        }
        if (nextPosition == snake[1]){
            break;
        }
        gestion(nextPosition);
        break;

        case "bas":
            if (snake[0]>90){
            nextPosition = snake[0]-90;
        }else{
            nextPosition = snake[0]+10;
        }
        if (nextPosition == snake[1]){
            break;
        }
        gestion(nextPosition);
        break;

        case "gauche":
            if (snake[0]%10 == 1){
            nextPosition = snake[0]+9;
        }else{
            nextPosition = snake[0]-1;
        }
        if (nextPosition == snake[1]){
            break;
        }
        gestion(nextPosition);
        break;

        case "haut":
            if (snake[0]<=10){
            nextPosition = snake[0]+90;
        }else{
            nextPosition = snake[0]-10;
        }
        if (nextPosition == snake[1]){
            break;
        }
        gestion(nextPosition);
        break;
    }
    colorie();

    time = 1000 / snake.length-2;
    setTimeout(calculDeplacement, time);
    console.log(snake);
};

function gestion(nextPosition){
    if(snake.includes(nextPosition) == true){
        let divScore = document.getElementById('divScore');
        let score = document.createElement('p');
        score.classList.add('score');
        score.textContent = "Bravo ! Votre score \n est de : " + snake.length;
        divScore.appendChild(score);

        let retry = document.createElement('button');
        retry.classList.add('retry');
        retry.textContent = 'Retry'
        divScore.appendChild(retry);
        retry.addEventListener('click', function(){
            score.classList.remove('score');
            retry.classList.remove('retry');
            snake= [25,24,23];
            return;
        });
        snake= [];
        return;
    }
    if(nextPosition == pomme){
        snake.unshift(pomme);
        pomme = getRandom();
    }
    if(nextPosition == snake[1]){
        return;
    }

    snake.unshift(nextPosition);
    snake.pop();
    return true;
}

function getRandom(){
    let number = randomIntFromInterval(1,100);
    while(snake.includes(number) == true){
        number = randomIntFromInterval(1,100);
    }
    return number;
}
 
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

colorie()

setTimeout(calculDeplacement, time);


    
    
