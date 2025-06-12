document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".contents li > a");

    // 현재 페이지 URL 가져오기
    const currentPage = window.location.pathname.split("/").pop();

    menuItems.forEach((link) => {
        // 링크의 href가 현재 페이지와 같다면
        if (link.getAttribute("href") === currentPage) {
            const parentLi = link.parentElement;
            parentLi.classList.add("active"); // 활성화 클래스 추가

            // 모든 상위 li에 active 추가 (상위 메뉴 열기)
            let ancestor = parentLi.parentElement.closest("li");
            while (ancestor) {
                ancestor.classList.add("active");
                ancestor = ancestor.parentElement.closest("li");
            }
        }
    });
});
