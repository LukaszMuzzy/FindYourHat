const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let locX = 0;
let locY = 0;



class Field {
    constructor(field) {
       this._field = field;
    }

    get field(){
        return this._field;
    }
     
    print(){
        for (let arr of this._field) {
            console.log(arr.join(''));
            }
        }
    
        // game
    startGame(){

        
        let gameOver = false;

    
        // function checks is player can move in disired direction.

        let isClearToGo = () =>{
            if (this._field[locY][locX] === pathCharacter || this._field[locY][locX] === fieldCharacter){
                return true;
            } else {
                return false;
            }
        }
        // prints messsage if player wins or loses.

        let isWinLost = () =>{
            if (this._field[locY][locX] === hat){
                console.log('You WIN!');
                return  gameOver = true;
            } else if (this._field[locY][locX] === hole){
                console.log('YouLost');
                gameOver = true;
            }
        }

        // handles player being out of map
        let outOfField = () =>{
            console.log('You are out of field!\nYou LOST');
            return gameOver = true;
        }

        // actual game
        while (!gameOver){
            console.clear();
            this.print();      //prints current map

            console.log('Where do you want do go? u - up, d - down, l - left, r - right. \n');
            let direction = prompt('> ');
            
            if (direction.toLowerCase() === 'd'){
                if (locY < (this._field.length - 1)){
                    locY += 1;
                    if (isClearToGo()){
                        this._field[locY][locX] = pathCharacter;
                    } else {
                        isWinLost();
                    }
                } else {
                    outOfField();
                } 
            } else if (direction.toLowerCase() === 'u'){
                if (locY > 0){
                    locY -=1;
                        if (isClearToGo()){
                            this._field[locY][locX] = pathCharacter;
                        } else {
                            isWinLost();
                    }
                } else {
                    outOfField();
                } 
            } else if (direction.toLowerCase() === 'l') {
                if (locX > 0){
                    locX -=1;
                    if (isClearToGo()){
                        this._field[locY][locX] = pathCharacter;
                    } else {
                        isWinLost();
                    }
                } else {
                    outOfField();
                }
            } else if (direction.toLowerCase() === 'r') {
                if (locX < (this._field[locY].length - 1)){
                    locX +=1;
                    if (isClearToGo()){
                        this._field[locY][locX] = pathCharacter;
                    } else {
                        isWinLost();
                    }
                } else {
                    outOfField();
                }
            } else {
                console.log('Something went wrong!');
            }   
        }
    }
    // generates a random field/map takes with/heigth/percentage covered by holes.
    static generatefield(width, heigth, percentage){

        let newField =[];
        let randXCoordinates = () => {
            let randNumX = Math.floor(Math.random()*width);
           return randNumX;
            
        }
        let randYCoordinates = () => {
            let randNumY = Math.floor(Math.random()*heigth);
            return randNumY;
        }

        for (let i = 0; i <heigth; ++i){
            newField.push([]);
            for (let j = 0; j < width; ++j){
                newField[i].push(fieldCharacter);
            }
        }
        locX = randXCoordinates();
        locY = randYCoordinates();
        newField[locY][locX] = pathCharacter;
        newField[randYCoordinates()][randXCoordinates()] = hat;

        let holes = Math.round((width * heigth)*(percentage/100));

        for (let h = holes; h > 0; --h){
            let randX = Math.floor(Math.random()*width);
            let randY = Math.floor(Math.random()*heigth);
            if (newField[randY][randX] === fieldCharacter){
                newField[randY][randX] = hole;
            }
        }

        return newField;

    }
}



const myField = new Field(Field.generatefield(10,10,50));


myField.startGame();
