

// Danh sách người dùng
const users = [];
// Danh sách lịch sử đọc
    const history = [];

    // Thêm người dùng
    function addUser() {
        const username = document.getElementById("username").value;
        if (username) {
            users.push(username);
            updateUserList();
            document.getElementById("username").value = "";
        }
    }

    // Cập nhật danh sách người dùng
    function updateUserList() {
        const userList = document.getElementById("user-list");
        userList.innerHTML = ""; // Xóa danh sách cũ
        users.forEach((user, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${user}`;
            userList.appendChild(li);
        });
    }

    // Thêm lịch sử đọc
    function addHistory(truyen) {
        history.push(truyen);
        updateHistoryList();
    }

    // Cập nhật danh sách lịch sử
    function updateHistoryList() {
        const historyList = document.getElementById("history-list");
        historyList.innerHTML = ""; // Xóa danh sách cũ
        history.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${item}`;
            historyList.appendChild(li);
        });
    }

    // Demo: Tự động thêm lịch sử khi người dùng nhấn vào các mục
    document.querySelectorAll(".category-bar a").forEach((link) => {
        link.addEventListener("click", () => {
            addHistory(link.textContent);
        });
    });

    // Danh sách truyện mẫu
    const stories = Array.from({ length: 50 }, (_, i) => `Truyện ${i + 1}`);
    let currentPage = 1;
    const storiesPerPage = 10;

    // Cập nhật danh sách truyện
    function updateStoryList() {
        const container = document.getElementById("truyen-container");
        container.innerHTML = "";

        const start = (currentPage - 1) * storiesPerPage;
        const end = currentPage * storiesPerPage;
        const currentStories = stories.slice(start, end);

        currentStories.forEach((story) => {
            const div = document.createElement("div");
            div.textContent = story;
            container.appendChild(div);
        });

        document.getElementById("current-page").textContent = currentPage;
    }

    // Chuyển sang trang trước
    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            updateStoryList();
        }
    }

    // Chuyển sang trang sau
    function nextPage() {
        if (currentPage * storiesPerPage < stories.length) {
            currentPage++;
            updateStoryList();
        }
    }

    // Hiển thị trang đầu tiên
    updateStoryList();
