var pairedCards = []
var isFlipping = false

// 선택된 카드 컬러 두 가지가 담기는 배열
var cardColorPair = []
// 선택된 카드 객체가 담기는 배열
var selectedCardPair = []
// 색 지정 때 이미 사용된 인덱스를 저장하는 배열
var excludedNumbers = []
var totalCardNum = document.querySelectorAll(".flipBtnWrapper").length

// 색 지정 때 이미 사용된 색을 저장하는 배열
var excludedColors = []
var colors = ["red", "orange", "yellow", "green", "blue", "navy", "purple", "pink"]

var maxCount = totalCardNum / 2
var count = 0

// 오프닝이 끝나기 전에 클릭이 되지 않기 위한 변수
var isStarting = true

var isGameStarted = false

/*************/
/* functions */
/*************/

function mainLoop() {
  gameStart()
  clickProcess()
}

function clickProcess() {
  // 버튼 클릭시 처리
  for (var i = 0; i < document.querySelectorAll(".flipBtnWrapper").length; i++) {
    document.querySelectorAll(".flipBtnWrapper")[i].addEventListener("click", function () {
      for (var j = 0; j < this.getElementsByClassName("flipBtn").length; j++) {
        // 이전 선택에 의해 카드 애니메이션이 재생중일 때는 아무 일도 일어나지 않는다.
        if (isFlipping) return
        // 카드가 다 뒤집이지기 전까지는 클릭할 수 없음
        if (isStarting) return

        var thisBtn = this.getElementsByClassName("flipBtn")[j]

        // 이미 클릭된 버튼이면 클릭처리 하지 않음.
        if (thisBtn.classList.contains("clicked")) return
        thisBtn.classList.add("clicked")

        // 동일한 버튼을 중복 클릭했을 때는 아무 일도 일어나지 않는다.
        //if (selectedCardPair[0] === thisBtn) return;

        // 카드 색 판별
        var selectedCardColor = getCardColor(thisBtn.getElementsByClassName("flipBtn_back")[0].classList)

        // 색 일치 여부를 확인하기 위한 임시 변수에 저장한다.
        cardColorPair.push(selectedCardColor)
        selectedCardPair.push(thisBtn)

        // 첫 번째 선택일 경우 임시 변수에 저장만 하고 리턴한다.
        if (selectedCardPair.length < 2) {
          return
        } else {
          // 카드 색이 일치할 경우 일치된 카드 목록에 등록한다.
          if (cardColorPair[0] === cardColorPair[1]) {
            console.log("paired")
            pairedCards.push(selectedCardPair[0])
            pairedCards.push(selectedCardPair[1])
            selectedCardPair = []
          } else {
            // 시도 횟수 ui 업데이트
            var prevScore = document.querySelector("#score").innerText
            document.querySelector("#score").innerText = parseInt(prevScore) + 1
            isFlipping = true
            // 카드 플립 애니메이션이 모두 재생 된 이후 뒤집어진다.
            // interval === style.css의 flipbutton transition seconds
            setTimeout(function () {
              selectedCardPair[0].classList.remove("clicked")
              selectedCardPair[1].classList.remove("clicked")
              selectedCardPair = []
              isFlipping = false
            }, 500)
          }
          cardColorPair = []
        }
      }
    })
  }
}

function gameStart() {
  if (isGameStarted) return
  else {
    isGameStarted = true
    setGameBoard()
    openCards()
  }
}

function resetGame() {
  isGameStarted = false
  isStarting = true
  excludedColors = []
  excludedNumbers = []
  count = 0
  pairedCards = []
  isFlipping = false
  cardColorPair = []
  selectedCardPair = []
  document.querySelector("#score").innerText = 0
  resetColor()
  gameStart()
}

function resetColor() {
  var cards = document.querySelectorAll(".flipBtn_back")
  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove(...cards[i].classList)
    cards[i].classList.add("flipBtn_face")
    cards[i].classList.add("flipBtn_back")
  }
}

// 카드 색 랜덤 지정
function setGameBoard() {
  for (var i = 0; i < maxCount; i++) {
    var cardNumPair = makeCardNumberPair()
    var cardColor = setCardColor()

    document.querySelectorAll(".flipBtn_back")[cardNumPair[0]].classList.add("flipBtn_back_" + cardColor)
    document.querySelectorAll(".flipBtn_back")[cardNumPair[1]].classList.add("flipBtn_back_" + cardColor)
    count++
  }
}

// 카드 공개
function openCards() {
  var flipBtns = document.querySelectorAll(".flipBtn")
  // 게임 시작 직후 3초간 카드 공개, 이후 0.1초 간격으로 뒤집어짐
  for (var i = 0; i < flipBtns.length; i++) {
    flipBtns[i].classList.add("clicked")
    ;(function (x) {
      setTimeout(function () {
        flipBtns[x].classList.remove("clicked")
        // 마지막 카드가 뒤집어진 후에 클릭 가능하게 변수 조정
        if (x === flipBtns.length - 1) isStarting = false
      }, 3000 + 100 * x)
    })(i)
  }
}

// 카드 컬러가 무엇인지 리턴한다.
function getCardColor(classList) {
  var cardColor
  for (var i = 0; i < colors.length; i++) {
    if (classList.contains("flipBtn_back_" + colors[i])) {
      cardColor = colors[i]
    }
  }
  // 에러처리
  if (!cardColor) console.log("error")

  return cardColor
}

// 게임판이 초기화될 때 같은 컬러를 가진 카드 인덱스를 리턴하는 함수
function makeCardNumberPair() {
  while (true) {
    var randomNum1 = Math.floor(Math.random() * totalCardNum)
    var randomNum2 = Math.floor(Math.random() * totalCardNum)
    if (randomNum1 === randomNum2) {
      continue
    }
    var cardNumPair = [randomNum1, randomNum2]

    // 이미 사용된 인덱스인지 확인
    if (checkOverlappingNumber(cardNumPair) === true) {
      continue
    } else {
      excludedNumbers.push(cardNumPair[0])
      excludedNumbers.push(cardNumPair[1])
      break
    }
  }
  return cardNumPair
}

// 이미 색이 지정된 카드(인덱스)인지 확인하는 함수
function checkOverlappingNumber(numberPair) {
  var isOverlapped = false
  for (var i = 0; i < excludedNumbers.length; i++) {
    if (numberPair.includes(excludedNumbers[i])) {
      isOverlapped = true
      break
    }
  }
  return isOverlapped
}

// 지정될 카드 색깔을 리턴하는 함수
function setCardColor() {
  while (true) {
    var randomColorIdx = Math.floor(Math.random() * colors.length)
    var randomColor = colors[randomColorIdx]

    if (checkOverlappingColor(randomColor) === true) {
      continue
    } else {
      excludedColors.push(randomColor)
      break
    }
  }
  return randomColor
}

// 이미 사용된 색인지 확인
function checkOverlappingColor(randomColor) {
  var isOverlapped = false
  for (var i = 0; i < excludedColors.length; i++) {
    if (randomColor === excludedColors[i]) {
      isOverlapped = true
      break
    }
  }
  return isOverlapped
}
