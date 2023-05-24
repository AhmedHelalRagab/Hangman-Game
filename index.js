

let letters="qwertyuiopasdfghjklzxcvbnm";

let lettersContainer=document.querySelector('.letters');

let arrayOfletters=Array.from(letters);

arrayOfletters.forEach(letter =>{
    
    let span=document.createElement('span');

    let theLetter=document.createTextNode(letter);

    span.appendChild(theLetter);

    span.className = 'letter-box';

    lettersContainer.appendChild(span);
})


// get a random category and word

let category={
    books:['deep work','the four work hour week','the obstacle is the way'],
    famousChars:['mohamed','abobakr','omar','othman','ali'],
    programming:['c#','c++','c','r','js','java','python'],
    anythig:['ahmed helal','helel']
};
// for keys

let keys=Object.keys(category);

let randomNumOfKeys=Math.floor(Math.random()*keys.length);

let randomKey=keys[randomNumOfKeys];
// for values
let randomNumOfValues=Math.floor(Math.random()*category[randomKey].length);

let arrayOfValues=category[randomKey];

let randomValueOfValues=arrayOfValues[randomNumOfValues];
// append the category 
document.querySelector('.game-info .category span').innerHTML=randomKey;

// select letters-guess element
let letterGuess=document.querySelector('.letters-guess');

let charOfChosenWord=Array.from(randomValueOfValues);

charOfChosenWord.forEach(char =>{

    let span=document.createElement('span');

    if(char===' '){
        span.className='with-space';
    }

    letterGuess.appendChild(span);

});

let allSpans=document.querySelectorAll('.letters-guess span');


let hangman=document.querySelector('.hangman-draw');

let attemps=0;

let numOfspaces=0;
let finalWord=[];
function calSpaces(string){
    arr=string.split('');
    for (let index = 0; index < arr.length; index++) {
        if(arr[index]===' ')
        {
            numOfspaces++;
        }
    }
    return numOfspaces;
}
document.addEventListener('click',(e)=>{
    let thestatus=false;

    if(e.target.className==='letter-box'){

       e.target.classList.add('clicked');

       let clickedWord=e.target.innerHTML;

       let chosenWord=Array.from(randomValueOfValues);

       chosenWord.forEach((word,choseIndex)=>{

        if(clickedWord==word){
            finalWord[choseIndex]=word;
            thestatus=true;
            allSpans.forEach((span,spanIndex)=>{
                if(spanIndex===choseIndex){
                    span.innerHTML=clickedWord; 
                }
            })
        }
       })

       if(thestatus!==true)
       {
            attemps++;
            
            hangman.classList.add(`wrong-${attemps}`);

            if(attemps==7)
            {
                endGame(0);
                lettersContainer.classList.add('finished');
            }
       }

    }

})



function endGame(num){
    let div=document.createElement('div');
    
    
    let textOfDiv
    
    letterGuess.style.display='none';
    
    lettersContainer.style.display='none';
    
    hangman.style.display='none';

    if(num==0){
        textOfDiv=document.createTextNode(`You have failed, the word is ${randomValueOfValues}`);
        
    }else{
        textOfDiv=document.createTextNode(`congrats`);

    }

    div.appendChild(textOfDiv);

    div.className='popup';

    document.body.appendChild(div);

}