// 1. Khai báo biến global nhưng CHƯA khởi tạo Audio ngay
let audio; 
let started = false;
let currentIndex = 0;

const messages = [
    "Chúc Mừng Sinh Nhật! 🎉",
    "Gửi đến cô gái tuyệt vời nhất thế gian...",
    "Trần Hà My ❤️",
    "Hôm nay là ngày 26/02",
    "Và đó cũng là ngày thế giới đón chào một thiên thần!",
    "Hôm nay My đã lớn thêm một tuổi",
    "Chúc em ngày càng xinh đẹp, thuần khiết như 1 thiên thần",
    "Học tập thật giỏi",
    "Mong mọi ước mơ của My đều trở thành hiện thực",
    "Dù có lúc buồn hay mệt mỏi...",
    "Hãy nhớ luôn có những người yêu thương em :D",
    "Hãy luôn giữ nụ cười trên môi nhé",
    "Bởi vì nụ cười của em rất đẹp!",
    "Món quà nhỏ này anh dành tặng cho em, My.......",
    "Happy Birthday, Trần Hà My! 🎂🎁✨"
];

const displayElement = document.getElementById('display-text');
const imgLeft = document.getElementById('img-left');
const imgRight = document.getElementById('img-right');

// 2. Hàm bắt đầu (Kích hoạt khi chạm)
function startEverything() {
    if (!started) {
        started = true;

        // KHỞI TẠO NHẠC TẠI ĐÂY (Bí kíp để chạy trên iPhone/Android)
        if (!audio) {
            audio = new Audio('Coquette Habit(MP3_70K).mp3'); 
            audio.loop = true;
        }

        // Thử phát nhạc
        audio.currentTime = 7; 
        audio.play().then(() => {
            console.log("Nhạc đã phát thành công!");
        }).catch(e => {
            console.log("Lỗi trình duyệt chặn: ", e);
        });

        // Bắt đầu các hiệu ứng khác
        setInterval(createBackgroundHeart, 400);
        displayElement.innerText = "";
        showNextMessage();

        // Xóa sự kiện để tránh bấm nhiều lần gây lặp nhạc
        document.removeEventListener('click', startEverything);
        document.removeEventListener('touchstart', startEverything);
    }
}

// 3. Hàm hiển thị lời chúc (Giữ nguyên logic của bạn)
function showNextMessage() {
    if (currentIndex < messages.length) {
        displayElement.classList.remove('fade-in');

        // Logic đổi ảnh
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
        else if (currentIndex > 2 && currentIndex !== 6) {
             // Giữ ảnh hiển thị hoặc ẩn tùy bạn, ở đây mình giữ nguyên logic cũ
        }

        void displayElement.offsetWidth; 
        displayElement.innerText = messages[currentIndex];
        displayElement.classList.add('fade-in');

        // Hiệu ứng tim từ chữ
        const heartBurst = setInterval(spawnTextHearts, 800);
        setTimeout(() => clearInterval(heartBurst), 4500);

        currentIndex++;
        setTimeout(showNextMessage, 5000); // Giảm xuống 5s để mạch cảm xúc nhanh hơn chút
    } else {
        displayElement.innerText = "Mãi hạnh phúc nhé My! ❤️";
    }
}

// 4. Các hàm bổ trợ (Tim bay, tim nền)
function spawnTextHearts() {
    for(let i = 0; i < 3; i++) {
        const h = document.createElement('div');
        h.classList.add('text-heart');
        h.innerHTML = '❤️';
        const angle = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random() * 50; 
        h.style.setProperty('--x', Math.cos(angle) * dist + 'px');
        h.style.setProperty('--y', Math.sin(angle) * dist + 'px');
        h.style.left = '50%';
        h.style.top = '50%';
        displayElement.appendChild(h);
        setTimeout(() => h.remove(), 2000);
    }
}

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

// Lắng nghe tương tác
document.addEventListener('click', startEverything);
document.addEventListener('touchstart', startEverything);

displayElement.innerText = "Chạm vào màn hình đi My... ❤️";
