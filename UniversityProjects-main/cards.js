// cards.js — Renders semester cards and project modals

function renderSemesterGrid() {
  const grid = document.getElementById("semester-grid");
  grid.innerHTML = "";

  PORTFOLIO_DATA.semesters.forEach((sem, index) => {
    const card = document.createElement("div");
    card.className = `sem-card ${sem.status}`;
    card.style.setProperty("--sem-color", sem.color);
    card.style.animationDelay = `${index * 60}ms`;

    const projectCount =
      sem.projects.length > 0
        ? `<span class="proj-count">${sem.projects.length} project${sem.projects.length !== 1 ? "s" : ""}</span>`
        : `<span class="proj-count muted">${sem.note}</span>`;

    card.innerHTML = `
      <div class="sem-icon">${sem.icon}</div>
      <div class="sem-label">${sem.label}</div>
      ${projectCount}
      ${sem.status === "active" ? '<div class="active-badge">Active</div>' : ""}
    `;

    if (sem.projects.length > 0) {
      card.addEventListener("click", () => openModal(sem));
      card.style.cursor = "pointer";
    }

    grid.appendChild(card);
  });
}

function openModal(sem) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = `
    <div class="modal-header">
      <div>
        <div class="modal-sem-icon">${sem.icon}</div>
        <h2 class="modal-title">${sem.label}</h2>
        <a href="${sem.githubFolder}" target="_blank" class="github-link">
          View on GitHub ↗
        </a>
      </div>
      <button class="close-btn" onclick="closeModal()">✕</button>
    </div>
    <div class="projects-list">
      ${sem.projects.map(renderProjectCard).join("")}
    </div>
  `;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function renderProjectCard(proj) {
  const tags = proj.tags
    .map((t) => `<span class="tag">${t}</span>`)
    .join("");

  return `
    <div class="project-card">
      <div class="proj-header">
        <span class="proj-icon">${proj.icon}</span>
        <div>
          <div class="proj-title">${proj.title}</div>
          <div class="proj-subtitle">${proj.subtitle}</div>
        </div>
        <span class="proj-type">${proj.type}</span>
      </div>
      <p class="proj-desc">${proj.description}</p>
      <div class="proj-highlight">✦ ${proj.highlight}</div>
      <div class="tags">${tags}</div>
    </div>
  `;
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

// Close on backdrop click
document.addEventListener("DOMContentLoaded", () => {
  renderSemesterGrid();

  document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
