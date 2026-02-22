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

// 2. Hàm bắt đầu (Nhạc + Chữ + Tim)
function startEverything() {
    if (!started) {
        started = true;
        
        // Nhạc nhảy đến giây thứ 7 và phát
        audio.currentTime = 7;
        audio.play().catch(e => console.log("Cần tương tác để phát nhạc"));
        
        // Mưa tim bắt đầu ngay
        setInterval(createHeart, 100);

        // Xóa hướng dẫn và chạy lời chúc đầu tiên
        displayElement.innerText = "";
        showNextMessage();
    }
}

// 3. Hàm hiển thị lời chúc và điều khiển 4 ảnh
function showNextMessage() {
    if (currentIndex < messages.length) {
        displayElement.classList.remove('fade-in');

        // KIỂM TRA ĐỂ HIỆN 4 ẢNH KHÁC NHAU
        if (currentIndex === 2) { 
            // Đợt 1: Trần Hà My
            imgLeft.src = "anh1.jpeg";
            imgRight.src = "anh2.jpeg";
            imgLeft.classList.add('show-img');
            imgRight.classList.add('show-img'); 
        } 
        else if (currentIndex === 6) { 
            // Đợt 2: Chúc em xinh đẹp...
            imgLeft.src = "anh3.jpeg";
            imgRight.src = "anh4.jpeg";
            imgLeft.classList.add('show-img');
            imgRight.classList.add('show-img');
        } 
        else {
            // Các câu khác thì ẩn ảnh đi cho tinh tế
            imgLeft.classList.remove('show-img');
            imgRight.classList.remove('show-img');
        }

        void displayElement.offsetWidth; 
        displayElement.innerText = messages[currentIndex];
        displayElement.classList.add('fade-in');
        
        currentIndex++;
        setTimeout(showNextMessage, 6000); 
    } else {
        displayElement.innerText = "Mãi hạnh phúc nhé My! ❤️";
        imgLeft.classList.remove('show-img');
        imgRight.classList.remove('show-img');
    }
}

// 4. Hàm tạo trái tim dày đặc
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    const heartIcons = ['❤️', '💖', '💗', '💓', '🌸', '✨'];
    heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 30 + 20) + 'px'; 
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's'; 
    
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}

// 5. Lắng nghe click
document.addEventListener('click', startEverything);

// Hướng dẫn ban đầu
displayElement.innerText = "Em bấm vào màn hình đi ...";
displayElement.style.cursor = "pointer";