/**
 * Created by Daniel Weissberger on 12/28/2016.
 */


function card(face,height,width){
    this.face = face;
    this.height = height;
    this.width = width;

}

function memoryGame(card,rows,col) {
    this.card = card;
    this.delay = 1000;
    this.rows = rows;
    this.col = col;
    this.images = [];
    this.imgArray = [];
    this.twoSelected = 0;
    this.imagesSelected = [];
    this.prevSelected = "";
    this.difficultyLevel = "easy";
    this.cards = [];
    this.topic = "";
    this.imageLength = 0;
    this.colClass;
    this.wrongGuesses = 0;
    this.score = document.getElementById("score");

    this.createGame = function () {
        var container = J$("memContainer");
        for (var i = 0; i < this.rows; i++) {
            var row = J$("div");
            row.selector.id = "row" + i;
            row.addClass("row");
            var colArr = [];
            for (var j = 0; j < this.col; j++) {
                var col = J$("div");
                var card = J$("div");
                col.addClass(this.colClass);
                col.style({height: this.card.height + "px", display: "inline-block"});
                card.addClass(["card"]);
                card.style({
                    height: (this.card.height - 40) + "px",
                    width: "80%",
                    display: "inline-block",
                    margin: "20px",
                    backgroundImage: "url('https://playingcardcollector.files.wordpress.com/2014/10/bicycle-rongorongo-playing-cards-back-k.png?w=645')",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                })
                card.addEvent("click", this.flipFunction);
                card.selector.id = row.selector.id + "col" + j;

                colArr.push(card);

                card.appendTo(col);
                col.appendTo(row);
            }
            this.cards.push(colArr);
            row.appendTo(container);
        }
        this.imgArray = [];
        this.generateImgArray();
    }

    this.flipFunction = function(e){

        if (memGame1.imagesSelected.length<2 && e.target.getAttribute("guessed") != "true" && e.target != memGame1.prevSelected) {
            var locationString = e.target.id.replace("row", "").replace("col", "");

            e.target.style.backgroundImage = "url("+memGame1.imgArray[parseInt(locationString[0])][parseInt(locationString[1])]+")";

            memGame1.imagesSelected.push(memGame1.imgArray[parseInt(locationString[0])][parseInt(locationString[1])]);

            if (memGame1.imagesSelected.length == 1) {
                memGame1.prevSelected = e.target;
            }


            if (memGame1.imagesSelected.length == 2) {
                if (memGame1.imagesSelected[0] != memGame1.imagesSelected[1]) {

                    setTimeout(function () {

                        if ((memGame1.imagesSelected[0] != memGame1.imagesSelected[1])) {
                            J$(e.target.id).style({
                                backgroundImage: "url('https://playingcardcollector.files.wordpress.com/2014/10/bicycle-rongorongo-playing-cards-back-k.png?w=645')",
                                backgroundSize: "100% 100%",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            });
                            J$(memGame1.prevSelected.id).style({
                                backgroundImage: "url('https://playingcardcollector.files.wordpress.com/2014/10/bicycle-rongorongo-playing-cards-back-k.png?w=645')",
                                backgroundSize: "100% 100%",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            });
                        }
                        memGame1.imagesSelected = [];
                        memGame1.wrongGuesses +=1;
                        memGame1.score.textContent = memGame1.wrongGuesses+"";
                        memGame1.prevSelected = "";
                    }, memGame1.delay);

                }
                else {
                    memGame1.imagesSelected = [];
                    e.target.setAttribute("guessed","true");
                    memGame1.prevSelected.setAttribute("guessed","true");
                }
            }
        }



    }

    this.generateImgArray = function(){
        var size = this.rows*this.col;
        var length = this.images.length;
        var img;
        var originalImages = this.images.slice();
        var imgArray = this.imgArray;
        var imgCount = [];
        var idx;
        var counter=0;
        var row = [];
        while(length--){
            imgCount.push(0);
        }
        length = size;
        while(length--){
            idx = Math.floor(Math.random() * this.images.length);
            img = this.images[idx];

            var index = originalImages.indexOf(img);
            if(imgCount[index]<2){
                row.push(img);
                counter++;
                imgCount[index]++;
                if(imgCount[index]===2){
                    this.images.splice(idx,1);
                }
                if(counter==this.col){
                    imgArray.push(row);
                    row = [];
                    counter = 0;
                }
            }
            else{
                length++;
            }
        }
    }


}


var card1 = new card("https://s-media-cache-ak0.pinimg.com/236x/91/69/ef/9169ef73b3564976a7dc564d66861027.jpg",180,40);

var memGame1 = new memoryGame(card1,3,4,1);
imagesEasy = ['http://static01.mediaite.com/med/wp-content/uploads/2012/12/aziz-ansari.jpg','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTJP1yRbbFj9g_wojA14mBMA8gR9D5z2n3fzZ0wXNn5RQfVxgT2WQ','http://s.wsj.net/public/resources/images/OB-FL008_russel_E_20100204091525.jpg','http://cdn.ticketfly.com/i/00/02/24/27/33-atlg.jpg','http://a3.files.biography.com/image/upload/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTIwNjA4NjM0MDYwOTY1Mzg4.jpg','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQJs8PAEr8Xn_ibCGE3WKDfIvFz0k1QNK7VpuJMTmjlbsWoW-7Sxg'];
memGame1.images = imagesEasy;

var memGame = memGame1;

function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}

var images = [];
function getImages() {

    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
            tags: memGame.topic,
            tagmode: "any",
            format: "json"
        },
        function (data) {
            //var rnd = Math.floor(Math.random() * data.items.length);

            var image_src;

            for(var j=0;j<data.items.length;j++){
                image_src = data.items[j]['media']['m'].replace("_m", "_b");
                if (images.indexOf(image_src) === -1){
                    images.push(image_src);
                }

            }
            console.log(images.length);
            images.length = memGame.imageLength;
            memGame.images = images;
            preloadImages(images);
            var cardContainer = J$("memContainer").selector;
            while (cardContainer.firstChild) {
                cardContainer.removeChild(cardContainer.firstChild);
            }
            memGame.createGame();

        });

};



function getImgElem(imgArr,length){
    var newArr = [];
    while(length--){
        newArr.push(imgArr[length]);
    }
    return newArr;
}

function startGame() {

    memGame.wrongGuesses = 0;
    memGame.score.textContent = memGame.wrongGuesses;
    memGame.topic = prompt("Enter a topic for your Memory Game");
    if (memGame.difficultyLevel === "easy"){
        memGame.delay = 1000;
        images = [];
        memGame.imageLength = 6;
        memGame.rows = 3;
        memGame.col = 4;
        memGame.colClass = ["col-md-3","col-xs-6"];
        getImages();

    }
    else if (memGame.difficultyLevel === "medium")
    {
        memGame.delay = 750;
        images = [];
        memGame.imageLength = 9;
        memGame.rows = 3;
        memGame.col = 6;
        memGame.colClass = ["col-md-2","col-xs-4"];
        getImages();

    }
    else{
        memGame.delay = 500;
        images = [];
        memGame.imageLength = 12;
        memGame.rows = 4;
        memGame.col = 6;
        memGame.colClass = ["col-md-2","col-xs-4"];
        getImages();

    }

    // console.log(images);

}

function uncheckRadios(e){
    var radios = document.getElementsByClassName("radioDiff");
    var j = radios.length;
    while(j--){
        radios[j].checked = false;
    }
    e.target.checked = true;
    memGame.difficultyLevel = e.target.name;
}


var radios = document.getElementsByClassName("radioDiff");
j = radios.length;
while(j--){
    radios[j].addEventListener("click",uncheckRadios);
}





startGame();


