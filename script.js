document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const profilePic = document.getElementById("profile-pic");
    const uploadPhoto = document.getElementById("upload-photo");
    const enrolledCourses = document.getElementById("enrolled-courses");
    const reminderInput = document.getElementById("reminder-input");
    const setReminderBtn = document.getElementById("set-reminder");
    const clearReminderBtn = document.getElementById("clear-reminder");
    const reminderText = document.getElementById("reminder-text");

    // Load stored reminder
    if (localStorage.getItem("studyReminder")) {
        reminderText.textContent = localStorage.getItem("studyReminder");
    }

    // Theme switcher
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        themeToggle.innerHTML = body.classList.contains("dark-mode")
            ? '<i class="fas fa-sun"></i> Light Mode'
            : '<i class="fas fa-moon"></i> Dark Mode';
    });

    // Redirect to Courses Page
    enrolledCourses.addEventListener("click", () => {
        window.location.href = "courses.html";
    });

    // Profile picture upload
    uploadPhoto.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.style.opacity = 0;
                setTimeout(() => {
                    profilePic.src = e.target.result;
                    profilePic.style.opacity = 1;
                }, 300);
            };
            reader.readAsDataURL(file);
        }
    });

    // Set study reminder
    setReminderBtn.addEventListener("click", () => {
        const reminder = reminderInput.value.trim();
        if (reminder !== "") {
            reminderText.textContent = reminder;
            localStorage.setItem("studyReminder", reminder);
            reminderInput.value = "";
        }
    });

    // Clear study reminder
    clearReminderBtn.addEventListener("click", () => {
        reminderText.textContent = "No reminder set.";
        localStorage.removeItem("studyReminder");
    });

    // Add "Visit My Profile" Button Below Profile Picture
    const profileBox = document.querySelector(".profile-box");
    const profileButton = document.createElement("button");
    profileButton.textContent = "Visit My Profile";
    profileButton.style.display = "block";
    profileButton.style.marginTop = "10px";
    profileButton.addEventListener("click", () => {
        window.open("https://raoabullah.github.io/RaoAbdullah.github.io/", "_blank");
    });
    profileBox.appendChild(profileButton);

    // Show enrolled courses on dashboard from localStorage
    const dashboardCourseList = document.getElementById("dashboard-enrolled-courses");
    if (dashboardCourseList) {
        const savedCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
        savedCourses.forEach(course => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${course.name}
                <progress value="${course.progress}" max="100" class="progress-bar"></progress>
            `;
            dashboardCourseList.appendChild(li);
        });
    }
});