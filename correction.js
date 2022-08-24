// je fait le lien avec le container écris dans html
let cf = document.getElementById("cf");
// on déclare le tableau du snake
let snake = [25, 24, 23];
// la derniere instruction faite par l'utilisateur (par défaut droire)
let instruction = "droite";
// permet de fabriquer une pomme qui n'est pas sur un position du snake
let pomme = getRandom();
// le temps par défaut pour relancer la fonction permttant au snake d'avancer
let time = 1000;

/**
 * permet de générer la grille
 */
function generate(){
    // va servir à mettre des ID à nos colonnes
    let compteur = 0;
    // on fabrique 10 lignes
    for(let i=1; i<=10; i++){
        // on creer une div 
        let maRow = document.createElement("div");
        // on lui ajoute la classe row
        maRow.classList.add('row');
        // on fait apparaitre la div class row dans le container
        cf.appendChild(maRow);
        // on fabrique 10 colonne par ligne
        for(let y=1; y<=10; y++){
            // on incrémente le compteur de un
            compteur++;
            // on fabrique un div
            let maCol = document.createElement("div");
            // on lui ajoute les classes css col et cellule --> cellule c'est un classe custom
            maCol.classList.add("col", "cellule");
            // on écris le numéro de la cellule dans la grille
           // maCol.textContent = compteur;
            // on ajoute un id unique à chaque cellule
            maCol.id = compteur;
            // on fait appraitre la colonne dans la ligne
            maRow.appendChild(maCol);
        } 
    }
}


/**
 * fonction qui colorie en gris ou en blanc en fonction de la position du snake
 */
function colorie(){
    // on parcours toutes nos cellules --> car on leurs a préalablement données comme id un nombre de 1 à 100
    for(let i=1; i<=100; i++){
        // on récupère ici l'element html correspondant au numéro de cellule
        let maCel = document.getElementById(i);
        // on vérifie si dans le tableau snake il y a la valeur i
        if(snake.includes(i) == true){
            // Si la valeur i est la même que le premier element du tableau (il réprésente la tête du serpent)
            if(snake[0] == i){
                maCel.classList.add("tete");
                maCel.classList.remove("green");
                maCel.classList.remove("blanc");
                maCel.classList.remove("pomme");
            }else{
                // si c'est le cas, on attributs la classe css gris
                maCel.classList.add("green");
                // on supprime la classe css blanc de la cellule
                maCel.classList.remove("blanc");
                maCel.classList.remove("tete");
                maCel.classList.remove("pomme");
            }
        }else{
            if(pomme == i){
                maCel.classList.add("pomme");
                maCel.classList.remove("green");
                maCel.classList.remove("blanc");
                maCel.classList.remove("tete");
            }else{
                // si le tableau ne contient pas la valeur i
                // on ajoute la classe blanc
                maCel.classList.add("blanc");
                // on supprime la classe gris
                maCel.classList.remove("green");
                maCel.classList.remove("tete");
                maCel.classList.remove("pomme");
            }
        }
    }
}

//
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
    // on stocke la future position de la tete du serpent
    let nextPosition=0;
    // en  fonction de la variable instruction
    switch(instruction){
        case "droite":
            // on fait un modulo 10 pour savoir si la position de la tête est un multiple de 10
            if(snake[0]%10 == 0){
                nextPosition = snake[0]-9;
            }else{
                nextPosition = snake[0]+1;
            }
            // fonction permmettant de gerer les game over et la gestion des pommes
            gestion(nextPosition);
            break;
        case "bas":
            // 
            if(snake[0] > 90){
                nextPosition = snake[0]-90;
            }else{
                nextPosition = snake[0]+10;
            }
           // fonction permmettant de gerer les game over et la gestion des pommes
           gestion(nextPosition);
            break;
        case "gauche":
            // on récup la 1ère valeur du tableu, on la convertie en string, puis on récupère le dernier caractère
            // et on le compare à "1"
            if(snake[0].toString().slice(-1) == "1"){
                nextPosition = snake[0]+9;
            }else{
                nextPosition = snake[0]-1;
            }
            // fonction permmettant de gerer les game over et la gestion des pommes
            gestion(nextPosition);
            break;
        case "haut":
            if(snake[0]<=10){
                nextPosition = snake[0]+90;
            }else{
                nextPosition = snake[0]-10;
            }
            // fonction permmettant de gerer les game over et la gestion des pommes
            gestion(nextPosition);
            break;
    }
    colorie();
    // on calcule le temps avant le prochain déplacement
    // (il possible d'améliorer la formule)
    time = 1000 / snake.length-2;
    // set time out permet de relance la fonction dans "time" milliseconde
    setTimeout(calculDeplacement, time);
}

function gestion(nextPosition){
    // si dans notre tableau snake on trouve la position suivante de la tête
    if(snake.includes(nextPosition) == true){
        // alors game over
        alert("game over score :  " + snake.length);
        // on réécrit le tableau par défaut pour faire une nouvelle partie
        snake= [25,24,23];
        // on met fin à la fonction
        return;
    }
    // permet de faire grandir le serpent
    if(nextPosition == pomme){
        snake.unshift(pomme);
        // quand je mange une pomme j'en genre une nouvelle
        pomme = getRandom();
    }
    // si je tente de faire demi-tour : j'interdit le mouvement
    if(nextPosition == snake[1]){
        return;
    }
    
    // unshifht ajoute au début du tableau
    snake.unshift(nextPosition);
    snake.pop();
    return true;
}

// Fonction servant à générer un nombre aléatoire entre 1 et 100 qui n'est pas dans le tableau snake
function getRandom(){
    // On générer 1 nombre aléatoire entre 1 et 100
    let number = randomIntFromInterval(1,100);
    // Tant que le nombre généré et dans le tableau snake
    while(snake.includes(number) == true){
        // on génére un autre nombre
        number = randomIntFromInterval(1,100);
    }
    // On retourne le nombre généré
    return number;
}

// fonction permettant de faire un nombre aléatoire entre 1 et 100
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// on appel les fonctions
generate();
colorie();

setTimeout(calculDeplacement, time);