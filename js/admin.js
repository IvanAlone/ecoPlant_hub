document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("⚠️ You must log in!");
    window.location.href = "login.html";
  }

  // ------------------------
  // LOGOUT
  // ------------------------
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  // ------------------------
  // ANNOUNCEMENTS
  // ------------------------
  const announcementForm = document.getElementById("announcementForm");
  const adminAnnouncementList = document.getElementById("adminAnnouncementList");

  function renderAnnouncements() {
    const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    adminAnnouncementList.innerHTML = "";
    if (!announcements.length) {
      adminAnnouncementList.innerHTML = "<p>No announcements yet.</p>";
      return;
    }

    announcements.slice().reverse().forEach(a => {
      const div = document.createElement("div");
      div.className = "announcement-item card";
      div.innerHTML = `
        <strong>${a.title}</strong>
        <p>${a.message}</p>
        <em>${a.date}</em>
        <button class="deleteAnnouncement" data-id="${a.id}">Delete</button>
      `;
      adminAnnouncementList.appendChild(div);
    });
  }

  announcementForm.addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const message = document.getElementById("message").value;
    if (!title || !message) return alert("Fill all fields!");

    const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    announcements.push({
      id: Date.now(),
      title,
      message,
      date: new Date().toLocaleString()
    });
    localStorage.setItem("announcements", JSON.stringify(announcements));
    announcementForm.reset();
    renderAnnouncements();
  });

  // Delete announcement
  document.addEventListener("click", e => {
    if (e.target.classList.contains("deleteAnnouncement")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
      announcements = announcements.filter(a => a.id !== id);
      localStorage.setItem("announcements", JSON.stringify(announcements));
      renderAnnouncements();
    }
  });

  renderAnnouncements();

  // ------------------------
  // TREE ORDERS
  // ------------------------
  const adminTreeOrders = document.getElementById("adminTreeOrders");
  function renderTreeOrders() {
    const orders = JSON.parse(localStorage.getItem("treeOrders")) || [];
    adminTreeOrders.innerHTML = "";
    if (!orders.length) {
      adminTreeOrders.innerHTML = "<p>No tree orders yet.</p>";
      return;
    }

    orders.slice().reverse().forEach(o => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <p><strong>User:</strong> ${o.email || o.userEmail}</p>
        <p><strong>Tree:</strong> ${o.treeType}</p>
        <p><strong>Quantity:</strong> ${o.quantity}</p>
        <p><strong>Status:</strong> ${o.status}</p>
        ${o.status === "Pending" ? `<button class="approveTree" data-id="${o.id}">Approve</button>` : ""}
      `;
      adminTreeOrders.appendChild(div);
    });
  }

  // Approve tree order
  document.addEventListener("click", e => {
    if (e.target.classList.contains("approveTree")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      const orders = JSON.parse(localStorage.getItem("treeOrders")) || [];
      const order = orders.find(o => o.id === id);
      if (!order) return;
      order.status = "Approved";
      localStorage.setItem("treeOrders", JSON.stringify(orders));
      renderTreeOrders();
    }
  });

  renderTreeOrders();

  // ------------------------
  // POTTED PLANT ORDERS
  // ------------------------
  const adminPlantOrders = document.getElementById("adminPlantOrders");
  function renderPlantOrders() {
    const orders = JSON.parse(localStorage.getItem("potOrders")) || [];
    adminPlantOrders.innerHTML = "";
    if (!orders.length) {
      adminPlantOrders.innerHTML = "<p>No potted plant orders yet.</p>";
      return;
    }

    orders.slice().reverse().forEach(o => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <p><strong>User:</strong> ${o.email || o.userEmail}</p>
        <p><strong>Plant:</strong> ${o.plantType}</p>
        <p><strong>Quantity:</strong> ${o.quantity}</p>
        <p><strong>Status:</strong> ${o.status}</p>
        ${o.status === "Pending" ? `<button class="approvePlant" data-id="${o.id}">Approve</button>` : ""}
      `;
      adminPlantOrders.appendChild(div);
    });
  }

  // Approve plant order
  document.addEventListener("click", e => {
    if (e.target.classList.contains("approvePlant")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      const orders = JSON.parse(localStorage.getItem("potOrders")) || [];
      const order = orders.find(o => o.id === id);
      if (!order) return;
      order.status = "Approved";
      localStorage.setItem("potOrders", JSON.stringify(orders));
      renderPlantOrders();
    }
  });

  renderPlantOrders();
});
