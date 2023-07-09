const DPR = window.devicePixelRatio;
const canvasContainer = document.getElementById('canvas-container');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const passwordContainer = document.getElementById('password-container');
const passwordInput = document.getElementById('password-input');
const passwordButton = document.getElementById('password-button');
canvas.width = canvas.clientWidth * DPR;
canvas.height = canvas.clientHeight * DPR;
let play = false;

function checkPassword() {
    const password = "0109";
    if (passwordInput.value === password) {
        passwordContainer.style.display = 'none';
        b1.style.display = 'block';
        b2.style.display = 'block';
        b3.style.display = 'block';
    }
    else { alert('비밀번호가 잘못되었습니다. 다시 입력해주세요.'); }
}
passwordButton.addEventListener('click', checkPassword);

function drawText() {
    context.font = `${100 * DPR}px Arial`;
    context.fillStyle = '#000000';
    context.textAlign = 'center';
    const textX = canvas.width / 2;
    const textY = canvas.height / 2 - 200 * DPR;
    context.fillText(textX, textY);
}

function drawInitialScreen() {
    const backgroundImage = new Image();
    backgroundImage.src = 'images/main.jpg';
    backgroundImage.onload = function() {
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        drawText();
    };
}
drawInitialScreen();
function handleMouseClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) * DPR;
    const mouseY = (event.clientY - rect.top) * DPR;
    const inputText = window.prompt('삽입할 원하는 내용을 입력하세요 : ');
    if (inputText !== null) {
        context.font = `${15}px Arial`;
        context.fillStyle = '#000000';
        context.textAlign = 'center';
        context.fillText(inputText, mouseX, mouseY);
    }
}
function handleButtonClick(imagePath) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const backgroundImage = new Image();
    backgroundImage.src = imagePath;
    backgroundImage.onload = function() {
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        drawText();
    };
    canvas.addEventListener('click', handleMouseClick);
    b1.style.display = 'none';
    b2.style.display = 'none';
    b3.style.display = 'none';
    backButton.style.display = 'block';
}

const b1 = document.getElementById('daily');
b1.addEventListener('click', function() { handleButtonClick('images/daily.png'); });
const b2 = document.getElementById('weekly');
b2.addEventListener('click', function() { handleButtonClick('images/weekly.png'); });
const b3 = document.getElementById('monthly');
b3.addEventListener('click', function() { handleButtonClick('images/monthly.png'); });

const backButton = document.getElementById('back-button');
backButton.addEventListener('click', function() {
    drawInitialScreen();
    canvas.removeEventListener('click', handleMouseClick);
    b1.style.display = 'block';
    b2.style.display = 'block';
    b3.style.display = 'block';
    backButton.style.display = 'none';
});

document.addEventListener('click', function() {
    if (!play) {
        let music = document.getElementById('music');
        play = true;
        music.play();
    }
});