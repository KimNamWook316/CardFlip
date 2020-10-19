var url = location.search

var temp = url.split("?")
var data = temp[1].split(":")
var timeData = data[0].split("=")
var attempData = data[1].split("=")
console.log(timeData)
console.log(attempData)

getResultWindow()

function getResultWindow() {
  document.getElementsByClassName("result_time")[0].innerHTML = getTimeText(timeData[1])
  document.getElementsByClassName("result_attempt")[0].innerHTML = attempData[1] + " 회"
}

function getTimeText(time) {
  var dotSec = time
  var min
  var sec
  if (dotSec / 600 >= 1) {
    min = Math.floor(dotSec / 600)
    dotSec = dotSec % 600
    sec = Math.floor(dotSec / 10)
    dotSec = dotSec % 10
  } else if (dotSec / 10 >= 1) {
    min = "00"
    sec = Math.floor(dotSec / 10)
    dotSec = dotSec % 10
  } else {
    min = "00"
    sec = "00"
  }

  var text = min + "분 " + sec + "초 " + "0" + dotSec
  console.log(text)
  return text
}
