const pin = document.querySelector(".pin");
const lp = document.querySelector(".lp");
const dropZone = document.querySelector(".drop-zone");
const audio = document.getElementById("audio");

let isDragging = false;

// 핀의 초기 위치 저장
const initialPinPosition = {
  top: pin.offsetTop,
  left: pin.offsetLeft,
};

// 드래그 시작
pin.addEventListener("dragstart", (e) => {
  isDragging = true;
  e.dataTransfer.effectAllowed = "move"; // 드래그 효과 설정
});

// 드래그 종료
pin.addEventListener("dragend", () => {
  isDragging = false;
});

// 드롭 영역 위로 이동
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (isDragging) {
    dropZone.classList.add("active");
  }
});

// 드롭 영역 벗어남
dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("active");
});

// 드롭
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("active");

  // 핀을 드롭 영역의 중앙으로 이동
  const rect = dropZone.getBoundingClientRect();
  pin.style.left = `${rect.left + rect.width / 2 - pin.offsetWidth / 2}px`;
  pin.style.top = `${rect.top + rect.height / 2 - pin.offsetHeight / 2}px`;
  pin.style.position = "absolute";

  // LP 회전 및 오디오 재생
  lp.classList.add("rotating");
  audio.play();

  // 일정 시간 후 핀을 초기 위치로 복귀
  setTimeout(() => {
    pin.style.left = `${initialPinPosition.left}px`;
    pin.style.top = `${initialPinPosition.top}px`;
    pin.style.position = "absolute";
    pin.style.transform = "translate(0, 0)";
  }, 2000); // 2초 후 복귀
});

// 디버깅용 로그 추가
lp.addEventListener("animationstart", () => {
  console.log("LP 회전 애니메이션 시작");
});
