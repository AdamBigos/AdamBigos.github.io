function textChangeListener (evt) {
      var id = evt.target.id;
      var text = evt.target.value;
      
      window.textLine = text;
    
      redrawMeme(window.imageSrc, window.textLine);
    }
    
    function redrawMeme(image, bottomLine) {
      
      var canvas = document.querySelector('canvas');
      var ctx = canvas.getContext("2d");
      if (image != null)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      
      ctx.font = '20pt arial';
      ctx.textAlign = 'center';
      
      ctx.lineWidth = 3;
      ctx.fillStyle = 'white';
      
      if (bottomLine != null) {
        ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 50);
        
      }
    }
    
    function saveFile() {
      window.open(document.querySelector('canvas').toDataURL());
    }
    
   function handleFileSelect(evt) {
      var canvasWidth = 500;
      var canvasHeight = 600;
      var file = evt.target.files[0];
      
      var reader = new FileReader();
        
      reader.onload = function(fileObject) {
        var data = fileObject.target.result;
        
        var image = new Image();
        image.onload = function() {
          
          window.imageSrc = this;
          redrawMeme(window.imageSrc, null, null);
        }
        
        image.src = data;
        console.log(fileObject.target.result);
      };
      reader.readAsDataURL(file)
    }

    var input = document.getElementById('textLine');

    input.oninput = textChangeListener;

    document.getElementById('file').addEventListener('change', handleFileSelect, false);

    document.querySelector('button').addEventListener('click', saveFile, false);