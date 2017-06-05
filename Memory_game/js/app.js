(function( window ) {
  function extend( a, b ) {
    for( var key in b ) { 
      if( b.hasOwnProperty( key ) ) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  function Memory( options ) {
    this.options = extend( {}, this.options );
    extend( this.options, options );
    this._init();
  }

  Memory.prototype.options = {
    wrapperID : "container",
    cards : [
      {
        id : 1,
        img: "img/default/monsters-01.png"
      },
      {
        id : 2,
        img: "img/default/monsters-02.png"
      },
      {
        id : 3,
        img: "img/default/monsters-03.png"
      },
      {
        id : 4,
        img: "img/default/monsters-04.png"
      },
      {
        id : 5,
        img: "img/default/monsters-05.png"
      },
      {
        id : 6,
        img: "img/default/monsters-06.png"
      },
      {
        id : 7,
        img: "img/default/monsters-07.png"
      },
      {
        id : 8,
        img: "img/default/monsters-08.png"
      },
      {
        id : 9,
        img: "img/default/monsters-09.png"
      },
      {
        id : 10,
        img: "img/default/monsters-10.png"
      },
      {
        id : 11,
        img: "img/default/monsters-11.png"
      },
      {
        id : 12,
        img: "img/default/monsters-12.png"
      },
      {
        id : 13,
        img: "img/default/monsters-13.png"
      },
      {
        id : 14,
        img: "img/default/monsters-14.png"
      },
      {
        id : 15,
        img: "img/default/monsters-15.png"
      },
      {
        id : 16,
        img: "img/default/monsters-16.png"
      }
    ],
    onGameStart : function() { return false; },
    onGameEnd : function() { return false; }
  }

  Memory.prototype._init = function() {
    this.game = document.createElement("div");
    this.game.id = "mg";
    this.game.className = "mg";
    document.getElementById(this.options.wrapperID).appendChild(this.game);

    this.gameMeta = document.createElement("div");
    this.gameMeta.className = "mg_meta";

    this.gameStartScreen = document.createElement("div");
    this.gameStartScreen.id = "start-screen";
    this.gameStartScreen.className = "start-screen";

    this.gameWrapper = document.createElement("div");
    this.gameWrapper.id = "wrapper";
    this.gameWrapper.className = "wrapper";
    this.gameContents = document.createElement("div");
    this.gameContents.id = "contents";
    this.gameWrapper.appendChild(this.gameContents);

    this.gameMessages = document.createElement("div");
    this.gameMessages.id = "onend";
    this.gameMessages.className = "onend";

    this._setupGame();
  };
    
  Memory.prototype._setupGame = function() {
    var self = this;
    this.gameState = 1;
    this.cards = shuffle(this.options.cards);
    this.card1 = "";
    this.card2 = "";
    this.card1id = "";
    this.card2id = "";
    this.card1flipped = false;
    this.card2flipped = false;
    this.flippedTiles = 0;
    this.numMoves = 0;

    this.gameMetaHTML = '<span class="moves">Moves: \
      <span id="moves">' + this.numMoves + '</span>\
      </span>\
      </div>';
    this.gameMeta.innerHTML = this.gameMetaHTML;
    this.game.appendChild(this.gameMeta);

    this.gameStartScreenHTML = '<h2 class="start-screen--heading">ZAPRASZAM DO GRY! </h2>\
      <p class="start-screen--text">Celem jest odnalezienie wszystkich par w jak najmniejszej ilości ruchów. Gra powstała przy współpracy z moim (natenczas) sześcioletnim synem, który zasilił grę ilustracjami.</p>\
      <button id="Start_button" class="button">START</button>';
    this.gameStartScreen.innerHTML = this.gameStartScreenHTML;
    this.game.appendChild(this.gameStartScreen);
    
    document.getElementById("Start_button").onclick = function(){
        self._setupGameWrapper();
    };
      
  }

  Memory.prototype._setupGameWrapper = function() {
    this.level = 2;
    this.gameStartScreen.parentNode.removeChild(this.gameStartScreen);
    this.gameContents.className = "contents level-"+this.level;
    this.game.appendChild(this.gameWrapper);

    this._renderTiles();
  };

  Memory.prototype._renderTiles = function() {
    this.gridX = 6;
    this.gridY = 3;
    this.numTiles = this.gridX * this.gridY;
    this.halfNumTiles = this.numTiles/2;
    this.newCards = [];
    for ( var i = 0; i < this.halfNumTiles; i++ ) {
      this.newCards.push(this.cards[i], this.cards[i]);
    }
    this.newCards = shuffle(this.newCards);
    this.tilesHTML = '';
    for ( var i = 0; i < this.numTiles; i++  ) {
      var n = i + 1;
      this.tilesHTML += '<div class="tile tile-' + n + '">\
        <div class="tile--inner" data-id="' + this.newCards[i]["id"] + '">\
        <span class="tile--outside"></span>\
        <span class="tile--inside"><img src="' + this.newCards[i]["img"] + '"></span>\
        </div>\
        </div>';
    }
    this.gameContents.innerHTML = this.tilesHTML;
    this.gameState = 2;
    this.options.onGameStart();
    this._gamePlay();
  }

  Memory.prototype._gamePlay = function() {
    var tiles = document.querySelectorAll(".tile--inner");
    for (var i = 0, len = tiles.length; i < len; i++) {
      var tile = tiles[i];
      this._gamePlayEvents(tile);
    };
  };

  Memory.prototype._gamePlayEvents = function(tile) {
    var self = this;
    tile.addEventListener( "click", function(e) {
      if (!this.classList.contains("flipped")) {
        if (self.card1flipped === false && self.card2flipped === false) {
          this.classList.add("flipped");
          self.card1 = this;
          self.card1id = this.getAttribute("data-id");
          self.card1flipped = true;
        } else if( self.card1flipped === true && self.card2flipped === false ) {
          this.classList.add("flipped");
          self.card2 = this;
          self.card2id = this.getAttribute("data-id");
          self.card2flipped = true;
          if ( self.card1id == self.card2id ) {
            self._cardsMatch();
          } else {
            self._cardsMismatch();
          }
        }
      }
    });
  }

  Memory.prototype._cardsMatch = function() {
    var self = this;
      
    window.setTimeout( function(){
      self.card1.classList.add("correct");
      self.card2.classList.add("correct");
    }, 200 );

    window.setTimeout( function(){
      self.card1.classList.remove("correct");
      self.card2.classList.remove("correct");
      self._gameResetVars();
      self.flippedTiles = self.flippedTiles + 2;
      if (self.flippedTiles == self.numTiles) {
        self._winGame();
      }
    }, 1000 );

    this._gameCounterPlusOne();
  };

  Memory.prototype._cardsMismatch = function() {
    var self = this;
      
    window.setTimeout( function(){
      self.card1.classList.remove("flipped");
      self.card2.classList.remove("flipped");
      self._gameResetVars();
    }, 500 );

    this._gameCounterPlusOne();
  };

  Memory.prototype._gameResetVars = function() {
    this.card1 = "";
    this.card2 = "";
    this.card1id = "";
    this.card2id = "";
    this.card1flipped = false;
    this.card2flipped = false;
  }

  Memory.prototype._gameCounterPlusOne = function() {
    this.numMoves = this.numMoves + 1;
    this.moveCounterUpdate = document.getElementById("moves").innerHTML = this.numMoves;
  };

  Memory.prototype._clearGame = function() {
    if (this.gameMeta.parentNode !== null) this.game.removeChild(this.gameMeta);
    if (this.gameStartScreen.parentNode !== null) this.game.removeChild(this.gameStartScreen);
    if (this.gameWrapper.parentNode !== null) this.game.removeChild(this.gameWrapper);
    if (this.gameMessages.parentNode !== null) this.game.removeChild(this.gameMessages);
  }
  
  Memory.prototype._winGame = function() {
    var self = this;
    if (this.options.onGameEnd() === false) {
      this._clearGame();
      this.gameMessages.innerHTML = '<h2 class="ending_heading">SUPER WYGRAŁEŚ!</h2>\
        <p class="onend--message">Rozwiązałeś zadanie w ' + this.numMoves + ' ruchach.</p>\
        <button id="onend--restart" class="button">Zagrasz jeszcze raz?</button>';
      this.game.appendChild(this.gameMessages);
      document.getElementById("onend--restart").addEventListener( "click", function(e) {
        self.resetGame();
      });
    } else {
      this.options.onGameEnd();
    }
  }

  Memory.prototype.resetGame = function() {
    this._clearGame();
    this._setupGame();
  };

  window.Memory = Memory;

})( window );

(function(){
    var myMem = new Memory({
        wrapperID : "memory_game",
        onGameStart : function() { return false; },
        onGameEnd : function() { return false; }
    });
})();