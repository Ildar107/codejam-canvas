window.onload = function() {
    const smallMatrixChecker = document.getElementById('small');
    const largeMatrixChecker = document.getElementById('large');
    const imageChecker = document.getElementById('image');
    const canvas = document.getElementById('work-canvas')

    smallMatrixChecker.parentElement.addEventListener('click', (e) => {
        smallMatrixChecker.checked = true;
        getJsonForCanvas('./data/4x4.json', true);
    });
    largeMatrixChecker.parentElement.addEventListener('click', (e) => {
        largeMatrixChecker.checked = true;
        getJsonForCanvas('./data/32x32.json', false);
    });
    imageChecker.parentElement.addEventListener('click', (e) => {
        imageChecker.checked = true;
        setPictureToCanvas();
    });

    imageChecker.checked = true;
    setPictureToCanvas();
  };

  function changePicture(array, isSmall)
  {
    const canvas = document.getElementById('work-canvas')
    ctx = canvas.getContext("2d");
    let width = array[0].length;
    let height = array.length;
    let scale = 1;
    canvas.width = 320; 
    canvas.height = 320; 
    scale = canvas.width/height;
    for(let row = 0; row < width; row++) {
        for(let col = 0; col < height; col++) {
            if(!isSmall) {
                ctx.fillStyle = `rgba(${array[row][col]})`;
            } 
            else {
                ctx.fillStyle = "#" + array[row][col];
            }
            ctx.fillRect(row * scale, col * scale, scale, scale);
        }
    }
  }

  function getJsonForCanvas(url, isSmall)
  {
    fetch(url).then(response => {
        response.json().then(data => changePicture(data, isSmall), error =>  this.alert(error))
    },
    onRejected => this.alert("Ошибка чтения данных"));
  }

  function setPictureToCanvas()
  {
    const canvas = document.getElementById('work-canvas')
    ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = './data/image.png';
    ctx.width = 320;
    ctx.height = 320;
    image.onload = () => ctx.drawImage(image, 0, 0,320,320);
  } 