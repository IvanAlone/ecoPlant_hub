document.addEventListener("DOMContentLoaded", () => {
  // Check user
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("⚠️ Please login first!");
    window.location.href = "login.html";
  }
  document.getElementById("username").textContent = currentUser.name || currentUser.username;

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    });
  }

  // -----------------------------
  // ANNOUNCEMENTS
  // -----------------------------
  const announcementList = document.getElementById("announcementList");

  function renderAnnouncements() {
    const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    announcementList.innerHTML = "";
    if (!announcements.length) {
      announcementList.innerHTML = "<p>No announcements yet.</p>";
      return;
    }

    announcements.slice().reverse().forEach(a => {
      const div = document.createElement("div");
      div.className = "announcement-item";
      div.innerHTML = `
        <strong>${a.title}</strong><br>
        <small>${a.message}</small><br>
        <em style="font-size:0.7rem;">${a.date}</em>
      `;
      announcementList.appendChild(div);
    });
  }

  renderAnnouncements();

  // -----------------------------
  // TREE ORDERS
  // -----------------------------
  const treeForm = document.getElementById("orderTreeForm");
  const treeContainer = document.getElementById("userTreeOrders");

  function renderTreeOrders() {
    const allOrders = JSON.parse(localStorage.getItem("treeOrders")) || [];
    const myOrders = allOrders.filter(o => o.userEmail === currentUser.email);
    treeContainer.innerHTML = "";
    if (!myOrders.length) return treeContainer.innerHTML = "<p>No tree orders yet.</p>";

    myOrders.forEach(order => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <p><strong>${order.quantity} ${order.treeType}</strong></p>
        <p>Status: <strong>${order.status}</strong></p>
        <p>Order ID: ${order.id}</p>
      `;
      treeContainer.appendChild(div);
    });
  }

  if (treeForm) {
    treeForm.addEventListener("submit", e => {
      e.preventDefault();
      const treeType = document.getElementById("treeTypeOrder").value;
      const quantity = parseInt(document.getElementById("treeQuantity").value);
      if (!treeType || !quantity) return alert("Fill all fields!");

      const allOrders = JSON.parse(localStorage.getItem("treeOrders")) || [];
      const newOrder = {
        id: Date.now() + Math.floor(Math.random() * 1000), // unique
        userEmail: currentUser.email,
        treeType,
        quantity,
        status: "Pending",
        date: new Date().toLocaleDateString()
      };
      allOrders.push(newOrder);
      localStorage.setItem("treeOrders", JSON.stringify(allOrders));

      treeForm.reset();
      renderTreeOrders();
    });
  }

  renderTreeOrders();

  // -----------------------------
  // POTTED PLANT ORDERS
  // -----------------------------
  const potForm = document.getElementById("potPlantForm");
  const potContainer = document.getElementById("userPotOrders");

  function renderPotOrders() {
    const allOrders = JSON.parse(localStorage.getItem("potOrders")) || [];
    const myOrders = allOrders.filter(o => o.userEmail === currentUser.email);
    potContainer.innerHTML = "";
    if (!myOrders.length) return potContainer.innerHTML = "<p>No potted plant orders yet.</p>";

    myOrders.forEach(order => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <p><strong>${order.quantity} ${order.plantType}</strong></p>
        <p>Status: <strong>${order.status}</strong></p>
        <p>Order ID: ${order.id}</p>
      `;
      potContainer.appendChild(div);
    });
  }

  if (potForm) {
    potForm.addEventListener("submit", e => {
      e.preventDefault();
      const plantType = document.getElementById("plantType").value;
      const quantity = parseInt(document.getElementById("quantity").value);
      if (!plantType || !quantity) return alert("Fill all fields!");

      const allOrders = JSON.parse(localStorage.getItem("potOrders")) || [];
      const newOrder = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        userEmail: currentUser.email,
        plantType,
        quantity,
        status: "Pending",
        date: new Date().toLocaleDateString()
      };
      allOrders.push(newOrder);
      localStorage.setItem("potOrders", JSON.stringify(allOrders));

      potForm.reset();
      renderPotOrders();
    });
  }

  renderPotOrders();

  // -----------------------------
  // User Stats
  // -----------------------------
  const treesPlantedElem = document.getElementById("treesPlanted");
  const allTrees = JSON.parse(localStorage.getItem("trees")) || [];
  const userTrees = allTrees.filter(t => t.userEmail === currentUser.email);
  if (treesPlantedElem) treesPlantedElem.textContent = userTrees.length;

  // Listen for announcements update (from admin)
  window.addEventListener("storage", e => {
    if (e.key === "announcements") renderAnnouncements();
    if (e.key === "treeOrders") renderTreeOrders();
    if (e.key === "potOrders") renderPotOrders();
  });
});
