// 플립 애니메이션 설정
for(var i = 0; i < document.querySelectorAll(".flipBtnWrapper").length; i++){
    document.querySelectorAll(".flipBtnWrapper")[i].addEventListener("click", function(){
        for(var j = 0; j < this.getElementsByClassName("flipBtn").length; j++){
            this.getElementsByClassName("flipBtn")[j].classList.add("clicked");
        }
    });
}

// 색 지정 때 이미 사용된 인덱스를 저장하는 배열
var excludedNumbers = [];
var totalCardNum = document.querySelectorAll(".flipBtnWrapper").length;

// 색 지정 때 이미 사용된 색을 저장하는 배열
var excludedColors = [];
var colors = ["red", "orange", "yellow", "green", "blue", "navy", "purple", "pink"];

var maxCount = totalCardNum / 2;
var count = 0;

// 카드 색 랜덤 지정
for(var i = 0; i < maxCount; i++){
    var cardNumPair = makeCardNumberPair();
    var cardColor = setCardColor();
    
    document.querySelectorAll(".flipBtn_back")[cardNumPair[0]].classList.add("flipBtn_back_" + cardColor);
    document.querySelectorAll(".flipBtn_back")[cardNumPair[1]].classList.add("flipBtn_back_" + cardColor);
    count++;
}

// 지정될 카드 인덱스를 리턴하는 함수
function makeCardNumberPair(){
    while(true){
        var randomNum1 = Math.floor(Math.random() * totalCardNum);
        var randomNum2 = Math.floor(Math.random() * totalCardNum);
        if(randomNum1 === randomNum2){
            continue;
        }
        var cardNumPair = [randomNum1, randomNum2];

        // 이미 사용된 인덱스인지 확인
        if(checkOverlappingNumber(cardNumPair) === true){
            continue;
        } else {
            excludedNumbers.push(cardNumPair[0]);
            excludedNumbers.push(cardNumPair[1]);
            break;
        }
    }
    return cardNumPair;
}

// 이미 색이 지정된 카드(인덱스)인지 확인하는 함수
function checkOverlappingNumber(numberPair){
    var isOverlapped = false;
    for(var i = 0; i < excludedNumbers.length; i++){
        if(numberPair.includes(excludedNumbers[i])){
            isOverlapped = true;
            break;
        }
    }
    return isOverlapped;
}

// 지정될 카드 색깔을 리턴하는 함수
function setCardColor(){
    while(true){
        var randomColorIdx = Math.floor(Math.random() * colors.length);
        var randomColor = colors[randomColorIdx];
        
        if(checkOverlappingColor(randomColor) === true){
            continue;
        } else {
            excludedColors.push(randomColor);
            break;
        }
    }
    return randomColor;
}

// 이미 사용된 색인지 확인
function checkOverlappingColor(randomColor){
    var isOverlapped = false;
    for(var i = 0; i < excludedColors.length; i++){
        if(randomColor === excludedColors[i]){
            isOverlapped = true;
            break;
        }
    }
    return isOverlapped;
}