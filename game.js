const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
const startButton = document.getElementById("start-button");
const backgroundMusic = document.getElementById("background-music");

const keyMap = {
    "S": 100,
    "D": 200,
    "A": 300,
};
const noteSequence = ["S", "D", "A"]; // 반복되는 순서
let currentIndex = 0;
let score = 0;
let gameInterval;

// 노트 생성
const createNote = () => {
    const note = document.createElement("div");
    const noteKey = noteSequence[currentIndex]; // 순서대로 키 가져오기
    currentIndex = (currentIndex + 1) % noteSequence.length; // 순환

    note.classList.add("note");
    note.style.left = `${keyMap[noteKey]}px`;
    note.dataset.key = noteKey;

    gameContainer.appendChild(note);

    // 노트가 화면 아래로 이동
    const animation = note.animate(
        [{ transform: "translateY(0)" }, { transform: "translateY(500px)" }],
        { duration: 3000, easing: "linear" }
    );

    animation.onfinish = () => {
        if (!note.classList.contains("hit")) {
            // 화면 끝까지 내려가면 노트 삭제
            note.remove();
        }
    };
};

// 키 입력 핸들러
const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    const notes = document.querySelectorAll(".note");

    notes.forEach((note) => {
        if (note.dataset.key === key && !note.classList.contains("hit")) {
            note.classList.add("hit"); // 히트 처리
            note.style.backgroundColor = "green";
            note.remove();
            score++;
            scoreElement.textContent = `Score: ${score}`;
        }
    });
};

// 게임 시작
const startGame = () => {
    score = 0;
    currentIndex = 0;
    scoreElement.textContent = "Score: 0";

    // 음악 재생
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();

    // 일정 간격으로 노트 생성
    gameInterval = setInterval(createNote, 1500);

    // 시작 버튼 숨김
    startButton.style.display = "none";
};

// 게임 종료
backgroundMusic.addEventListener("ended", () => {
    clearInterval(gameInterval);
    alert(`Game Over! Your score: ${score}`);
    startButton.style.display = "block"; // 시작 버튼 다시 표시
});

// 키 입력 이벤트 리스너 추가
document.addEventListener("keydown", handleKeyPress);
startButton.addEventListener("click", startGame);
