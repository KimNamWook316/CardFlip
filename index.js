// flip Animation
for(var i = 0; i < document.querySelectorAll(".flipBtnWrapper").length; i++){
    document.querySelectorAll(".flipBtnWrapper")[i].addEventListener("click", function(){
        for(var j = 0; j < this.getElementsByClassName("flipBtn").length; j++){
            this.getElementsByClassName("flipBtn")[j].classList.add("clicked");
        }
    });
}

