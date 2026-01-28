document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user
  const user = users.find(u => u.email === email && u.password === password);

  const result = document.getElementById("loginResult");
  result.style.display = "block";

  if (user) {
    // Save logged-in user to LocalStorage
    localStorage.setItem("currentUser", JSON.stringify(user));
    result.style.backgroundColor = "#d4edda";
    result.style.color = "#155724";
    result.innerHTML = `<p>✅ Login successful! Redirecting to dashboard...</p>`;

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  } else {
    result.style.backgroundColor = "#f8d7da";
    result.style.color = "#721c24";
    result.innerHTML = `<p>❌ Invalid email or password</p>`;
  }
});
