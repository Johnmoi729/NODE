// Lấy danh sách khóa học từ API
async function fetchCourses(search = "") {
  try {
    const response = await fetch(
      `http://localhost:3000/api/courses?search=${search}`
    );
    const courses = await response.json();
    renderCourses(courses);
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
  }
}

// Hiển thị danh sách khóa học
function renderCourses(courses) {
  const container = document.getElementById("courseList");
  container.innerHTML = "";
  courses.forEach((course) => {
    const card = document.createElement("div");
    card.className = "course-card";
    card.innerHTML = `
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            <p>Giá: ${course.price.toLocaleString()} VNĐ</p>
            <p>Thời lượng: ${course.duration}</p>
        `;
    container.appendChild(card);
  });
}

// Xử lý tìm kiếm
document.getElementById("searchInput").addEventListener("input", (e) => {
  fetchCourses(e.target.value);
});

// Load dữ liệu khi trang được tải
if (window.location.pathname.includes("courses.html")) {
  fetchCourses();
}
