// scripts.js
document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 12;
    const comics = Array.from(document.querySelectorAll('.grid-item'));
    const pagination = document.querySelector('.pagination');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        comics.forEach((comic, index) => {
            if (index >= start && index < end) {
                comic.style.display = 'block';
            } else {
                comic.style.display = 'none';
            }
        });
    }

    function createPagination() {
        const totalPages = Math.ceil(comics.length / itemsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.addEventListener('click', function (e) {
                e.preventDefault();
                showPage(i);
            });
            pagination.appendChild(pageLink);
        }
    }

    createPagination();
    showPage(1); // Hiển thị trang đầu tiên khi trang web tải

    searchButton.addEventListener('click', function () {
        const query = searchInput.value.toLowerCase();
        const filteredComics = comics.filter(comic => {
            const title = comic.querySelector('h3').textContent.toLowerCase();
            return title.includes(query);
        });
        filteredComics.forEach((comic, index) => {
            comic.style.display = 'block';
        });
        const others = comics.filter(comic => !filteredComics.includes(comic));
        others.forEach(comic => {
            comic.style.display = 'none';
        });
    });

    // Lưu lịch sử đọc
    const comicLinks = document.querySelectorAll('.comic-link');
    comicLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const comicId = this.closest('.grid-item').id;
            saveReadingHistory(comicId);
            saveFollowList(comicId);
        });
    });

    function saveReadingHistory(comicId) {
        let history = JSON.parse(localStorage.getItem('readingHistory')) || [];
        if (!history.includes(comicId)) {
            history.push(comicId);
            localStorage.setItem('readingHistory', JSON.stringify(history));
        }
    }

    function loadReadingHistory() {
        let history = JSON.parse(localStorage.getItem('readingHistory')) || [];
        const historyGrid = document.getElementById('history-grid');
        if (historyGrid) {
            history.forEach(comicId => {
                const comic = document.getElementById(comicId).cloneNode(true);
                historyGrid.appendChild(comic);
            });
        }
    }

    function saveFollowList(comicId) {
        let followList = JSON.parse(localStorage.getItem('followList')) || [];
        if (!followList.includes(comicId)) {
            followList.push(comicId);
            localStorage.setItem('followList', JSON.stringify(followList));
        }
    }

    function loadFollowList() {
        let followList = JSON.parse(localStorage.getItem('followList')) || [];
        const followGrid = document.getElementById('follow-grid');
        if (followGrid) {
            followList.forEach(comicId => {
                const comic = document.getElementById(comicId).cloneNode(true);
                followGrid.appendChild(comic);
            });
        }
    }

    loadReadingHistory(); // Load lịch sử khi trang web tải
    loadFollowList(); // Load danh sách theo dõi khi trang web tải

    // Quản lý người dùng
    const userForm = document.getElementById('user-form');
    if (userForm) {
        userForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            console.log(`Tên Người Dùng: ${username}, Email: ${email}, Mật Khẩu:[_{{{CITATION{{{_1{](https://github.com/higithub97/OMG-Web/tree/340263c83461750ab627d955969b96d400b0213e/DOMjs%2FDOMevent.md)[_{{{CITATION{{{_2{](https://github.com/leosenderovsky/JS-Biblioide/tree/09434a428dc8383bc9b476ae51c4b00ceec16275/js%2Flogin.js)