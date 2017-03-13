
//function eventoptionA() {document.getElementById("optionB").innerHTML = "naciśnij"; document.getElementById("optionA").innerHTML = " "; }

//function eventoptionB() {document.getElementById("optionA").innerHTML = "naciśnij"; document.getElementById("optionB").innerHTML = " "; }

//function eventchangecolorviolet() {document.body.style.backgroundColor = "violet"; }

//function eventchangecolorgreen() {document.body.style.backgroundColor = "green"; }

//document.getElementById("optionA").addEventListener('click', eventoptionA);

//document.getElementById("optionB").addEventListener('click', eventoptionB);

//document.getElementById("violet").addEventListener('click', eventchangecolorviolet);

//document.getElementById("green").addEventListener('click', eventchangecolorgreen);

var changeBackgroundColor = document.getElementByClassName('backgroundColor');

function changeColor() {var value = this.id; 
                           document.body.style.backgroundColor= value; }

for (var i = 0; i < changeBackgroundColor.length; i++ ){
    
    changeBackgroundColor[i].addEventListener( 'click', changeColor );
}

var arraySelect = document.getElementsByTagName('select');

var element = document.getElementById('content');

function dropdownStyles() {var style = this.id; var value = this.value; element.style[style] = value; }

for (var i = 0; i < arraySelect.length; i++ ){
    
    arraySelect[i].addEventListener( 'change', dropdownStyles );

}
