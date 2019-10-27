
window.onload = function() {
    const smallMatrixCheker = document.getElementById('small');
    const largeMatrixCheker = document.getElementById('large');
    const imageChecker = document.getElementById('image');
    const canvas = document.getElementById('work-canvas')

    smallMatrixCheker.onchange = function() {
        if (event.returnValue) {
            getJsonForCanvas('./data/4x4.json', true);  
        }
    };
    largeMatrixCheker.onchange = function() {
        if (event.returnValue) {
            getJsonForCanvas('./data/32x32.json', false);
        }
    };
    imageChecker.onchange = function() {
        if (event.returnValue) {
            setPictureToCanvas();
        }
    };

    imageChecker.checked = true;
    imageChecker.onchange();
  };

  function changePicture(array, isSmall)
  {
    const canvas = document.getElementById('work-canvas')
    ctx = canvas.getContext("2d");
    let width = array[0].length;
    let height = array.length;
    let scale = 1;

    if(isSmall)
        scale = 80;
    else
        scale = 10;

    canvas.width = width * scale; 
    canvas.height = height * scale; 

    for(var row = 0; row < width; row++) {
        for(var col = 0; col < height; col++) {
            if(!isSmall)
                ctx.fillStyle = `rgba(${array[row][col]})`;
             else
                ctx.fillStyle = "#" + array[row][col];
            ctx.fillRect(row * scale, col * scale, scale, scale);
        }
    }
  }

  function getJsonForCanvas(url, isSmall)
  {
    fetch(url).then(response => {
        let array = response.json().then(data => changePicture(data, isSmall), error =>  this.alert(error))
    },
    onRejected => this.alert("Ошибка чтения данных"));
  }

  function setPictureToCanvas()
  {
    const canvas = document.getElementById('work-canvas')
    ctx = canvas.getContext("2d");
    base_image = new Image();
    base_image.src = '/data/image.png';
    ctx.width = 320;
    ctx.height = 320;
    base_image.onload = function(){
       ctx.drawImage(base_image, 0, 0,320,320);
    }
  } 