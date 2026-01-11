/* Typing Effect */
const typingElement = document.getElementById("typingText");

if (typingElement) {
  const text = "Eat Smart. Live Better. 🥗";
  let i = 0;

  function typeEffect() {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeEffect, 80);
    }
  }

  typeEffect();
}

/* Testimonial Slider */
const testimonials = [
  {
    text: "This planner helped me stay consistent with healthy eating.",
    user: "A Happy User",
  },
  {
    text: "Simple, clean and very effective diet planning tool.",
    user: "Fitness Enthusiast",
  },
  {
    text: "Loved the clean UI and smart planning features.",
    user: "Health Conscious User",
  },
];

let index = 0;
setInterval(() => {
  index = (index + 1) % testimonials.length;
  document.getElementById("testimonialText").textContent =
    testimonials[index].text;
  document.getElementById("testimonialUser").textContent =
    "— " + testimonials[index].user;
}, 3000);

/* Dark Mode Toggle */
function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

/* ---------- AUTHENTICATION LOGIC (DEMO) ---------- */

// Called when user clicks Login
function loginUser() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// Called when user clicks Logout
function logoutUser() {
  localStorage.removeItem("token"); // 🔐 remove JWT
  window.location.href = "login.html";
}

// Protect pages from unauthorized access
// function protectPage() {
//   if (localStorage.getItem("isLoggedIn") !== "true") {
//     window.location.href = "login.html";
//   }

function protectPage() {
  if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
  }
}

/* ===============================
   VIEW MEAL PLAN – PREVIEW PAGE
   =============================== */

async function loadMealPlanPreview() {
  const token = localStorage.getItem("token");
  const container = document.getElementById("planContainer");

  if (!container) return;

  try {
    const response = await fetch("http://localhost:5000/api/meal-plan", {
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center text-muted">
          No meal plan saved yet.
        </div>`;
      return;
    }

    container.innerHTML = "";

    data.forEach(day => {
      container.innerHTML += `
        <div class="col-md-4">
          <div class="card shadow-sm h-100">
            <div class="card-header bg-success text-white text-center fw-bold">
              ${day.day_name}
            </div>
            <div class="card-body">
              <p>🍳 <strong>Breakfast:</strong> ${day.breakfast || "—"}</p>
              <p>🍛 <strong>Lunch:</strong> ${day.lunch || "—"}</p>
              <p>🍽️ <strong>Dinner:</strong> ${day.dinner || "—"}</p>
              <p>🍎 <strong>Snacks:</strong> ${day.snacks || "—"}</p>
            </div>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("Failed to load meal plan preview:", error);
    container.innerHTML = `
      <div class="col-12 text-center text-danger">
        Failed to load meal plan.
      </div>`;
  }
}
