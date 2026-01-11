document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const response = await fetch("http://localhost:5000/api/meal-plan", {
        headers: {
            "Authorization": token
        }
    });

    const data = await response.json();
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    data.forEach(day => {
        tbody.innerHTML += `
            <tr>
                <td>${day.day}</td>
                <td>${day.breakfast || "-"}</td>
                <td>${day.lunch || "-"}</td>
                <td>${day.dinner || "-"}</td>
                <td>${day.snacks || "-"}</td>
            </tr>
        `;
    });
});
