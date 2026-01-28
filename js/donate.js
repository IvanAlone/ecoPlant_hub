document.getElementById("donationForm").addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("donorName").value.trim();
  const email = document.getElementById("donorEmail").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("supportType").value;

  const donation = { name, email, amount, type, date: new Date().toLocaleDateString() };

  let donations = JSON.parse(localStorage.getItem("donations")) || [];
  donations.push(donation);
  localStorage.setItem("donations", JSON.stringify(donations));

  const result = document.getElementById("donationResult");
  result.style.display = "block";
  result.innerHTML = `<p>✅ Thank you ${name}! Your donation of $${amount} for ${type} is received.</p>`;

  this.reset();
});

// Update homepage donators dynamically
if (window.location.pathname.includes("index.html")) {
  renderDonators();
}


document.getElementById("donationForm").addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("donorName").value.trim();
  const email = document.getElementById("donorEmail").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("supportType").value;

  if (!name || !email || !amount || !type) {
    alert("Please fill in all fields!");
    return;
  }

  const donation = { name, email, amount, type, date: new Date().toLocaleDateString() };

  let donations = JSON.parse(localStorage.getItem("donations")) || [];
  donations.push(donation);
  localStorage.setItem("donations", JSON.stringify(donations));

  // Optional: show success message first
  alert(`✅ Thank you ${name}! Your donation of $${amount} for ${type} is received.`);

  // Redirect to homepage to show donators
  window.location.href = "index.html";
});


document.getElementById("donationForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("donorName").value.trim();
  const email = document.getElementById("donorEmail").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("supportType").value;

  if (!name || !email || !amount || !type) {
    alert("Please fill in all fields!");
    return;
  }

  // Simulate payment / donation
  alert(`✅ Thank you ${name} for donating $${amount} for ${type}!`);

  // Save donation in LocalStorage
  const donation = {
    name,
    email,
    amount,
    type,
    date: new Date().toLocaleDateString()
  };

  let donations = JSON.parse(localStorage.getItem("donations")) || [];
  donations.push(donation);
  localStorage.setItem("donations", JSON.stringify(donations));

  // Redirect to homepage after donation
  window.location.href = "index.html";
});

document.getElementById("donationForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("donorName").value.trim();
  const email = document.getElementById("donorEmail").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("supportType").value;

  if (!name || !email || !amount || !type) {
    alert("Please fill in all fields!");
    return;
  }

  // Save donation in LocalStorage
  const donation = {
    name,
    email,
    amount,
    type,
    date: new Date().toLocaleDateString()
  };

  let donations = JSON.parse(localStorage.getItem("donations")) || [];
  donations.push(donation);
  localStorage.setItem("donations", JSON.stringify(donations));

  // Show thank you message
  const thankYouDiv = document.getElementById("thankYouMessage");
  thankYouDiv.style.display = "block";
  thankYouDiv.innerHTML = `✅ Thank you <strong>${name}</strong> for donating $${amount} for <strong>${type}</strong>! Redirecting to homepage...`;

  // Clear the form
  this.reset();

  // Automatically redirect after 3 seconds
  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000); // 3000ms = 3 seconds
});

