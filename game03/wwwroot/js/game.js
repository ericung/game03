// Expose named exports so Blazor can import this file as an ES module
// Move all DOM access into exported functions so code runs after the component renders

var x = 50;
var y = 50;
//    const canvas = document.getElementById(canvasId);
//    if (!canvas) return;

const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');
function draw() {
    // Example drawing after resize
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // initialize backing store size and a sample drawing
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'blue';
        ctx.fillRect(300,300,200, 100);
        ctx.fillStyle = 'red';
        ctx.fillRect(x, y, 100, 50);
    }
}

function resizeCanvas() {
    // Set CSS size (controls layout)
    canvas.style.width = '600px';
    canvas.style.height = '600px';
    canvas.style.display = 'block';
    canvas.style.marginLeft = 'auto';
    canvas.style.marginRight = 'auto';
    canvas.style.maxWidth = '600px';
    canvas.style.maxHeight = '600px';
    canvas.style.backgroundColor = 'grey'

    draw();
}

// run initial layout/draw
resizeCanvas();

// store handler reference on element for cleanup
canvas.__gameResizeHandler = resizeCanvas;
window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);
window.addEventListener('keydown', function(event) {
    if (event.key === 'w') {
        console.log('W key pressed!');
        y -= 1;
    }
    if (event.key === 's') {
        console.log('S key pressed!');
        y += 1;
    }
    if (event.key === 'a') {
        console.log('A key pressed!');
        x -= 1;
    }
    if (event.key === 'd') {
        console.log('D key pressed!');
        x += 1;
    }

    draw();
});



setTimeout(() => {
    draw('red'); // Change color after delay
    console.log('Canvas redrawn after 2 seconds');
  }, 2000);
