async function saveProfile() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

 const profileData = {
    full_name: document.getElementById("full_name").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    height: document.getElementById("height").value,
    weight: document.getElementById("weight").value,
    dietary_preference: document.getElementById("dietary_preference").value,
    diet_goal: document.getElementById("diet_goal").value,
    allergies: "None"
};


  try {
    const response = await fetch("http://localhost:5000/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to save profile");
      return;
    }

    alert("Profile saved successfully!");

    lockProfile();
    window.location.href = "index.html";
  } catch (error) {
    console.error(error);
    alert("Server error while saving profile");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const response = await fetch("http://localhost:5000/api/profile", {
    headers: {
      Authorization: token,
    },
  });

  const data = await response.json();
  if (data.message) return;

  document.getElementById("full_name").value = data.full_name || "";
  document.getElementById("age").value = data.age || "";
  document.getElementById("gender").value = data.gender || "";
  document.getElementById("height").value = data.height || "";
  document.getElementById("weight").value = data.weight || "";
  document.getElementById("dietary_preference").value =
    data.dietary_preference || "";
  document.getElementById("diet_goal").value = data.diet_goal || "";
});

function enableEdit() {
  document
    .querySelectorAll("#profileForm input, #profileForm select")
    .forEach((el) => (el.disabled = false));

  document.getElementById("editBtn").classList.add("d-none");
  document.getElementById("saveBtn").classList.remove("d-none");
}

function lockProfile() {
  document
    .querySelectorAll("#profileForm input, #profileForm select")
    .forEach((el) => (el.disabled = true));

  document.getElementById("editBtn").classList.remove("d-none");
  document.getElementById("saveBtn").classList.add("d-none");
}
