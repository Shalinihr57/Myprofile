function renderSkills() {
  const skillsContainer = document.getElementById("skills-container");
  if (!skillsContainer) { console.log("Skills container not found"); return; }
  skillsContainer.innerHTML = "";
  skillsData.forEach(function (skill) {
    const card = document.createElement("div");
    card.className = "skill-card";

    const iconBox = document.createElement("div");
    iconBox.className = "skill-icon";
    iconBox.textContent = skill.shortLabel;

    const skillName = document.createElement("h3");
    skillName.className = "skill-name";
    skillName.textContent = skill.name;

    const skillDescription = document.createElement("p");
    skillDescription.className = "skill-desc";
    skillDescription.textContent = skill.description;

    card.appendChild(iconBox);
    card.appendChild(skillName);
    card.appendChild(skillDescription);
    skillsContainer.appendChild(card);
  });
}
