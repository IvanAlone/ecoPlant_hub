const leaderboardDiv = document.getElementById("leaderboard");

// Get all users
let users = JSON.parse(localStorage.getItem("users")) || [];

// Sort descending by treesPlanted
const sorted = users.sort((a, b) => b.treesPlanted - a.treesPlanted);

if (sorted.length === 0) {
  leaderboardDiv.innerHTML = "<p>No trees planted yet.</p>";
} else {
  sorted.forEach((user, index) => {
    const card = document.createElement("div");
    card.className = "card";

    let medal = "🍃"; // default medal
    let bgColor = "#ffffff";

    if (index === 0) {
      medal = "🥇"; bgColor = "#ffefc0";
    } else if (index === 1) {
      medal = "🥈"; bgColor = "#e0e0e0";
    } else if (index === 2) {
      medal = "🥉"; bgColor = "#f3d0b0";
    }

    // Get top badge if exists
    let topBadge = "";
    if (user.badges && user.badges.length > 0) {
      topBadge = user.badges[user.badges.length - 1]; // last badge = highest
    }

    card.style.backgroundColor = bgColor;

    card.innerHTML = `
      <h3>${medal} ${user.username} ${topBadge ? '| ' + topBadge : ''}</h3>
      <p><strong>Trees Planted:</strong> ${user.treesPlanted}</p>
      <p><strong>Rank:</strong> ${index + 1}</p>
    `;

    leaderboardDiv.appendChild(card);
  });
}
