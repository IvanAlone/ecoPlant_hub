document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Fetch existing users from LocalStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already exists
  const emailExists = users.some(user => user.email === email);
  if (emailExists) {
    showMessage("Email already registered. Try logging in.", false);
    return;
  }

  // Create user object
  const user = { username, email, password, treesPlanted: 0, badges: [] };
  users.push(user);

  // Save to LocalStorage
  localStorage.setItem("users", JSON.stringify(users));

  showMessage("✅ Registration successful! You can now login.", true);

  this.reset();
});

// Helper function to show message
function showMessage(msg, success) {
  const result = document.getElementById("registerResult");
  result.style.display = "block";
  result.style.backgroundColor = success ? "#d4edda" : "#f8d7da";
  result.style.color = success ? "#155724" : "#721c24";
  result.innerHTML = `<p>${msg}</p>`;
}

