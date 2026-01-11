/* =====================================================
   WEEKLY PLANNER – FINAL OPTIMIZED VERSION
   ===================================================== */

/* ---------- LOAD FOOD OPTIONS (DYNAMIC) ---------- */
async function loadFoods() {
  try {
    const response = await fetch("http://localhost:5000/api/foods");
    const foods = await response.json();

    document.querySelectorAll("select[data-meal]").forEach((select) => {
      const mealType = select.dataset.meal;

      // Remove old options except "Select"
      select
        .querySelectorAll("option:not(:first-child)")
        .forEach((o) => o.remove());

      foods
        .filter((food) => food.meal_type === mealType)
        .forEach((food) => {
          const option = document.createElement("option");
          option.value = food.food_id; // ✅ INT ID
          option.textContent = food.food_name; // ✅ Display name
          select.appendChild(option);
        });
    });
  } catch (error) {
    console.error("Failed to load foods:", error);
  }
}

/* ---------- SAVE WEEKLY MEAL PLAN ---------- */
async function savePlan() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const plan = [];

  document.querySelectorAll("tbody tr").forEach((row, index) => {
    const selects = row.querySelectorAll("select");

    plan.push({
      day: days[index],
      breakfast_food_id: selects[0].value || null,
      lunch_food_id: selects[1].value || null,
      dinner_food_id: selects[2].value || null,
      snacks_food_id: selects[3].value || null,
    });
  });

  try {
    const response = await fetch("http://localhost:5000/api/meal-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(plan),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to save meal plan");
      return;
    }

    alert("Weekly meal plan saved successfully!");
    lockPlanner(); // 🔒 Lock after save
  } catch (error) {
    console.error("Save plan error:", error);
    alert("Server error while saving meal plan");
  }
}

/* ---------- LOAD SAVED PLAN ---------- */
async function loadSavedPlan() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const response = await fetch("http://localhost:5000/api/meal-plan", {
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();

    if (!Array.isArray(data)) return;

    document.querySelectorAll("tbody tr").forEach((row, index) => {
      const selects = row.querySelectorAll("select");
      const dayPlan = data[index];

      if (!dayPlan) return;

      selects[0].value = dayPlan.breakfast || "";
      selects[1].value = dayPlan.lunch || "";
      selects[2].value = dayPlan.dinner || "";
      selects[3].value = dayPlan.snacks || "";

      // Update Select2 UI
      $(selects).trigger("change");
    });
  } catch (error) {
    console.error("Load saved plan error:", error);
  }
}

/* ---------- PLANNER LOCK / UNLOCK ---------- */
function enablePlannerEdit() {
  document
    .querySelectorAll("#plannerForm select")
    .forEach((el) => (el.disabled = false));

  document.getElementById("editPlanBtn").classList.add("d-none");
  document.getElementById("savePlanBtn").classList.remove("d-none");
}

function lockPlanner() {
  document
    .querySelectorAll("#plannerForm select")
    .forEach((el) => (el.disabled = true));

  document.getElementById("editPlanBtn").classList.remove("d-none");
  document.getElementById("savePlanBtn").classList.add("d-none");
}

function loadFoodsFromConfig() {
  document.querySelectorAll("select[data-meal]").forEach((select) => {
    const mealType = select.dataset.meal;

    // Clear previous options
    select
      .querySelectorAll("option:not(:first-child)")
      .forEach((o) => o.remove());
    select.querySelectorAll("optgroup").forEach((g) => g.remove());

    const foods = FOOD_OPTIONS[mealType] || [];

    const grouped = {};
    foods.forEach((food) => {
      if (!grouped[food.category]) grouped[food.category] = [];
      grouped[food.category].push(food);
    });

    Object.keys(grouped).forEach((category) => {
      const group = document.createElement("optgroup");
      group.label = category;

      grouped[category].forEach((food) => {
        const option = document.createElement("option");
        option.value = food.name; // SAFE VALUE
        option.textContent = food.name;
        group.appendChild(option);
      });

      select.appendChild(group);
    });
  });
}

/* ---------- PAGE INITIALIZATION (SINGLE ENTRY POINT) ---------- */
document.addEventListener("DOMContentLoaded", async () => {
    console.log("planner.js loaded");

    loadFoodsFromConfig();          // 1️⃣ Load food dropdowns
    enableSearchableDropdowns();    // 2️⃣ Enable live search

    await loadSavedPlan();          // 3️⃣ 🔥 FETCH SAVED DATA FROM BACKEND

    lockPlanner();                  // 4️⃣ Lock after restoring data
});

/* ---------- ENABLE SEARCHABLE DROPDOWNS ---------- */

function enableSearchableDropdowns() {
  $("select.form-select").select2({
    width: "100%",
    placeholder: "Search food...",
    allowClear: true,
    minimumResultsForSearch: 0, // 🔥 ALWAYS show search
    matcher: function (params, data) {
      if ($.trim(params.term) === "") {
        return data;
      }

      if (typeof data.text === "undefined") {
        return null;
      }

      // Case-insensitive live search
      if (data.text.toLowerCase().includes(params.term.toLowerCase())) {
        return data;
      }

      return null;
    },
  });
}

function getFoodDetailsByName(foodName) {
  for (const mealType in FOOD_OPTIONS) {
    const found = FOOD_OPTIONS[mealType].find((food) => food.name === foodName);
    if (found) return found;
  }
  return null;
}

document.addEventListener("change", (e) => {
  if (e.target.matches("select[data-meal]")) {
    const foodName = e.target.value;
    if (!foodName) return;

    const food = getFoodDetailsByName(foodName);
    if (!food) return;

    document.getElementById("foodName").textContent = food.name;
    document.getElementById("calories").textContent = food.calories || "N/A";
    document.getElementById("protein").textContent = food.protein || "N/A";
    document.getElementById("vitamins").textContent = food.vitamins || "N/A";
    document.getElementById("benefit").textContent =
      food.benefit || "No additional information";

    document.getElementById("nutritionInfo").style.display = "block";
  }
});
