document.addEventListener("DOMContentLoaded", () => {
    const enrolledCoursesList = document.getElementById("enrolled-courses");
    const recommendedCourses = document.querySelectorAll(".enroll-btn");

    // Load enrolled courses from localStorage
    const savedCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    savedCourses.forEach(course => addCourseToUI(course.name, course.progress));

    // Enroll button click
    recommendedCourses.forEach(button => {
        button.addEventListener("click", (event) => {
            const courseItem = event.target.parentElement;
            const courseName = courseItem.textContent.replace("Enroll", "").trim();

            addCourseToUI(courseName);
            saveCourse(courseName, 0); // initial progress = 0

            event.target.disabled = true;
            event.target.textContent = "Enrolled";
        });
    });

    // Add Course manually
    const addCourseInput = document.createElement("input");
    const addCourseBtn = document.createElement("button");
    addCourseInput.type = "text";
    addCourseInput.placeholder = "Enter new course";
    addCourseInput.id = "add-course-input";
    addCourseBtn.textContent = "Add Course";
    addCourseBtn.id = "add-course-btn";

    enrolledCoursesList.parentElement.appendChild(addCourseInput);
    enrolledCoursesList.parentElement.appendChild(addCourseBtn);

    addCourseBtn.addEventListener("click", () => {
        const courseName = addCourseInput.value.trim();
        if (courseName) {
            addCourseToUI(courseName);
            saveCourse(courseName, 0);
            addCourseInput.value = "";
        }
    });

    function addCourseToUI(name, progress = 0) {
        const li = document.createElement("li");
        li.innerHTML = `
            ${name}
            <progress value="${progress}" max="100" class="progress-bar"></progress>
            <input type="range" min="0" max="100" value="${progress}" class="progress-slider">
            <button class="remove-btn">Remove</button>
        `;

        // Update progress bar in real-time
        const slider = li.querySelector(".progress-slider");
        const progressBar = li.querySelector(".progress-bar");
        slider.addEventListener("input", () => {
            progressBar.value = slider.value;
            updateCourse(name, parseInt(slider.value));
        });

        // Remove button functionality
        li.querySelector(".remove-btn").addEventListener("click", () => {
            li.remove();
            removeCourse(name);
        });

        enrolledCoursesList.appendChild(li);
    }

    function saveCourse(name, progress) {
        const existing = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
        if (!existing.find(course => course.name === name)) {
            existing.push({ name, progress });
            localStorage.setItem("enrolledCourses", JSON.stringify(existing));
        }
    }

    function updateCourse(name, newProgress) {
        let courses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
        courses = courses.map(course =>
            course.name === name ? { ...course, progress: newProgress } : course
        );
        localStorage.setItem("enrolledCourses", JSON.stringify(courses));
    }

    function removeCourse(name) {
        let courses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
        courses = courses.filter(course => course.name !== name);
        localStorage.setItem("enrolledCourses", JSON.stringify(courses));
    }
});