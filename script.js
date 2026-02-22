// 1. Khởi tạo nhạc
const audio = new Audio('nhac.mp3'); 
audio.loop = true;

const messages = [
    "Chúc Mừng Sinh Nhật! 🎉",
    "Gửi đến cô gái tuyệt vời nhất thế gian...",
    "Trần Hà My ❤️",
    "Hôm nay là ngày 26/02/2012",
    "Vì đó là ngày thế giới đón chào một thiên thần!",
    "Hôm nay My đã lớn thêm một tuổi",
    "Chúc em ngày càng xinh đẹp , thuần khiết như 1 thiên thần bé nhỏ",
    "Học tập thật giỏi",
    "Mong mọi ước mơ của My đều trở thành hiện thực",
    "Dù có lúc buồn hay mệt mỏi...",
    "Hãy nhớ luôn có những người yêu thương em :D",
    "Hãy luôn giữ nụ cười trên em nhé ",
    "Bởi vì nụ cười của em rất đẹp!",
    "Món quà nhỏ này anh dành tặng cho em, My.......",
    "Happy Birthday, Trần Hà My! 🎂🎁✨"
];

let currentIndex = 0;
const displayElement = document.getElementById('display-text');
const imgLeft = document.getElementById('img-left');
const imgRight = document.getElementById('img-right');
let started = false;

// 2. Hàm tạo tim nhỏ bay ra từ chữ (Hiệu ứng tinh tế)
function spawnTextHearts() {
    if (!started || displayElement.innerText.includes("bấm")) return;

    for(let i = 0; i < 3; i++) {
        const h = document.createElement('div');
        h.classList.add('text-heart');
        h.innerHTML = '❤️';
        
        // Hướng bay ngẫu nhiên (tản ra xung quanh)
        const angle = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random() * 50; // Khoảng cách bay
        
        h.style.setProperty('--x', Math.cos(angle) * dist + 'px');
        h.style.setProperty('--y', Math.sin(angle) * dist + 'px');
        
        // Xuất hiện ở giữa dòng chữ
        h.style.left = '50%';
        h.style.top = '50%';
        
        displayElement.appendChild(h);
        
        // Xóa tim sau khi bay xong
        setTimeout(() => h.remove(), 2000);
    }
}

// 3. Hàm bắt đầu (Nhạc + Chữ + Tim nền)
function startEverything() {
    if (!started) {
        started = true;
        
        // Nhạc nhảy đến giây thứ 7 và phát
        audio.currentTime = 7;
        audio.play().catch(e => console.log("Cần tương tác để phát nhạc"));
        
        // Mưa tim nền (mờ phía sau)
        setInterval(createBackgroundHeart, 400);

        // Xóa hướng dẫn và chạy lời chúc đầu tiên
        displayElement.innerText = "";
        showNextMessage();
    }
}

// 4. Hàm hiển thị lời chúc và điều khiển ảnh
function showNextMessage() {
    if (currentIndex < messages.length) {
        displayElement.classList.remove('fade-in');

        // Logic hiện ảnh 2 bên
        if (currentIndex === 2) { 
            imgLeft.src = "anh1.jpeg";
            imgRight.src = "anh2.jpeg";
            imgLeft.classList.add('show-img');
            imgRight.classList.add('show-img'); 
        } 
        else if (currentIndex === 6) { 
            imgLeft.src = "anh3.jpeg";
            imgRight.src = "anh4.jpeg";
            imgLeft.classList.add('show-img');
            imgRight.classList.add('show-img');
        } 
        else {
            imgLeft.classList.remove('show-img');
            imgRight.classList.remove('show-img');
        }

        void displayElement.offsetWidth; 
        displayElement.innerText = messages[currentIndex];
        displayElement.classList.add('fade-in');

        // BẮT ĐẦU HIỆU ỨNG TIM BAY RA TỪ CHỮ
        // Chạy liên tục trong 4 giây rồi dừng để chuẩn bị cho câu tiếp theo
        const heartBurst = setInterval(spawnTextHearts, 800);
        setTimeout(() => clearInterval(heartBurst), 4500);
        
        currentIndex++;
        setTimeout(showNextMessage, 6000); 
    } else {
        displayElement.innerText = "Mãi hạnh phúc nhé My! ❤️";
        imgLeft.classList.remove('show-img');
        imgRight.classList.remove('show-img');
    }
}

// 5. Hàm tạo trái tim rơi nền (Mờ ảo)
function createBackgroundHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    const heartIcons = ['❤️', '💖', '💗', '🌸', '✨'];
    heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px'; 
    heart.style.animationDuration = (Math.random() * 4 + 3) + 's'; 
    
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 6000);
}

// 6. Lắng nghe click để khởi động
document.addEventListener('click', startEverything);

// Hướng dẫn ban đầu
displayElement.innerText = "Em bấm vào màn hình đi ...";
displayElement.style.cursor = "pointer";