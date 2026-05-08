function projectSearch() {
  const projectsContainer = document.getElementById("projects-container");
  const searchInput = document.getElementById("project-search");
  const filterBar = document.getElementById("project-filters");

  if (!projectsContainer) { console.log("Projects container not found"); return; }

  // Build category filters
  const categories = ["All", ...new Set(projectsData.map(p => p.category))];
  let activeFilter = "All";

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (cat === "All" ? " active" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      activeFilter = cat;
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects();
    });
    filterBar.appendChild(btn);
  });

  function renderProjects() {
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    const filtered = projectsData.filter(p => {
      const matchCat = activeFilter === "All" || p.category === activeFilter;
      const matchSearch = p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies.some(t => t.toLowerCase().includes(query));
      return matchCat && matchSearch;
    });

    projectsContainer.innerHTML = "";

    if (filtered.length === 0) {
      projectsContainer.innerHTML = `<p style="color:var(--text-3);grid-column:1/-1;padding:20px 0;">No projects match your search.</p>`;
      return;
    }

    filtered.forEach(project => {
      const card = document.createElement("div");
      card.className = "project-card";

      const top = document.createElement("div");
      top.className = "project-top";

      const cat = document.createElement("span");
      cat.className = "project-cat";
      cat.textContent = project.category;

      const status = document.createElement("span");
      status.className = "project-status" + (project.status === "Demo" ? " demo" : "");
      status.textContent = project.status;

      top.appendChild(cat);
      top.appendChild(status);

      const name = document.createElement("h3");
      name.className = "project-name";
      name.textContent = project.name;

      const desc = document.createElement("p");
      desc.className = "project-desc";
      desc.textContent = project.description;

      const techWrap = document.createElement("div");
      techWrap.className = "project-tech";
      project.technologies.forEach(t => {
        const tag = document.createElement("span");
        tag.className = "tech-tag";
        tag.textContent = t;
        techWrap.appendChild(tag);
      });

      const links = document.createElement("div");
      links.className = "project-links";

      const demoLink = document.createElement("a");
      demoLink.href = project.liveDemo;
      demoLink.className = "project-link primary";
      // demoLink.textContent = "↗ Live Demo";

      const githubLink = document.createElement("a");
      githubLink.href = project.github;
      githubLink.className = "project-link";
      // githubLink.textContent = "⟡ GitHub";

      links.appendChild(demoLink);
      links.appendChild(githubLink);

      card.appendChild(top);
      card.appendChild(name);
      card.appendChild(desc);
      card.appendChild(techWrap);
      card.appendChild(links);
      projectsContainer.appendChild(card);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", renderProjects);
  }

  renderProjects();
}
