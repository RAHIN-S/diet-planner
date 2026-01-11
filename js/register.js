document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // 🔥 STOPS PAGE RELOAD

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("All fields are required");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Registration failed");
            return;
        }

        alert("Registration successful! Please login.");
        window.location.href = "login.html";

    } catch (error) {
        alert("Server error. Please try again.");
        console.error(error);
    }
});
