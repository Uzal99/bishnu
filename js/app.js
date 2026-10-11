document.addEventListener("DOMContentLoaded", () => {
  loadProfile();
  loadProjects();
});

// Load main profile info
async function loadProfile() {
  try {
    const res = await fetch("content/profile.json");
    if (!res.ok) return;
    const data = await res.json();

    document.getElementById("user-name").innerText = data.name || "Your Name";
    document.getElementById("user-title").innerText = data.title || "";
    document.getElementById("user-objective").innerText = data.objective || "";

    // Load contact buttons
    const contactContainer = document.getElementById("contact-links");
    contactContainer.innerHTML = "";
    if (data.email) contactContainer.innerHTML += `<a href="mailto:${data.email}">Email</a>`;
    if (data.phone) contactContainer.innerHTML += `<a href="tel:${data.phone}">Phone</a>`;
    if (data.linkedin) contactContainer.innerHTML += `<a href="${data.linkedin}" target="_blank">LinkedIn</a>`;
    if (data.behance) contactContainer.innerHTML += `<a href="${data.behance}" target="_blank">Behance</a>`;

    // Load skills badges
    const skillsContainer = document.getElementById("skills-list");
    skillsContainer.innerHTML = (data.skills || [])
      .map(skill => `<span class="skill-badge">${skill}</span>`)
      .join("");

    // Load work experience
    const expContainer = document.getElementById("experience-list");
    expContainer.innerHTML = (data.experience || [])
      .map(exp => `
        <div class="timeline-item">
          <h3>${exp.role} — ${exp.company}</h3>
          <div class="sub">${exp.year}</div>
          <p>${exp.description}</p>
        </div>
      `).join("");

    // Load education
    const eduContainer = document.getElementById("education-list");
    eduContainer.innerHTML = (data.education || [])
      .map(edu => `
        <div class="timeline-item">
          <h3>${edu.title}</h3>
          <div class="sub">${edu.institution} (${edu.year})</div>
        </div>
      `).join("");

  } catch (err) {
    console.error("Error loading profile data:", err);
  }
}

// Load dynamic project collection entries
async function loadProjects() {
  const projectsContainer = document.getElementById("projects-list");
  
  // List project JSON filenames here as you create them or fetch them via an API/Index
  const projectFiles = ["sample-project.json"];

  projectsContainer.innerHTML = "";

  for (const file of projectFiles) {
    try {
      const res = await fetch(`content/projects/${file}`);
      if (!res.ok) continue;
      const proj = await res.json();

      projectsContainer.innerHTML += `
        <div class="project-card">
          <img src="${proj.image || 'https://via.placeholder.com/600x400'}" alt="${proj.title}" />
          <div class="project-info">
            <span class="category">${proj.category || 'Design'}</span>
            <h3>${proj.title}</h3>
            <p>${proj.description}</p>
            ${proj.link ? `<a href="${proj.link}" target="_blank">View Project →</a>` : ''}
          </div>
        </div>
      `;
    } catch (err) {
      console.error(`Error loading project ${file}:`, err);
    }
  }
}