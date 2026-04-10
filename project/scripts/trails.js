const trails = [
  {
    name: "Sunridge Loop",
    region: "Entebbe",
    difficulty: "easy",
    distanceKm: 6,
    timeHours: 2.5,
    image: "../images/newbeach-ldstemple.webp",
    alt: "Sunlit walking path near water"
  },
  {
    name: "Kagera Bluff Path",
    region: "Jinja",
    difficulty: "moderate",
    distanceKm: 11,
    timeHours: 4.5,
    image: "../images/preston-temple-bymunzerr.webp",
    alt: "Ridge path with open sky"
  },
  {
    name: "Mwamba Ridge Climb",
    region: "Fort Portal",
    difficulty: "hard",
    distanceKm: 14,
    timeHours: 6,
    image: "../images/rexburgidaho.webp",
    alt: "Long mountain trail under clouds"
  },
  {
    name: "Riverstone Walk",
    region: "Mukono",
    difficulty: "easy",
    distanceKm: 5,
    timeHours: 2,
    image: "../images/denverlsd-temple.webp",
    alt: "Green route beside a calm stream"
  },
  {
    name: "Cloudstep Traverse",
    region: "Kabale",
    difficulty: "hard",
    distanceKm: 19,
    timeHours: 8,
    image: "../images/nauvoo.webp",
    alt: "High-altitude path with distant views"
  },
  {
    name: "Hillview Connector",
    region: "Jinja",
    difficulty: "moderate",
    distanceKm: 9,
    timeHours: 3.5,
    image: "../images/lake-victoria.webp",
    alt: "Trail crossing rolling hills"
  }
];

function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", `${isOpen}`);
  });
}

function stampYear() {
  const yearNode = document.querySelector("#year");

  if (yearNode) {
    yearNode.textContent = `${new Date().getFullYear()}`;
  }
}

function trailCardTemplate(trail) {
  return `
    <article class="trail-card is-visible">
      <img src="${trail.image}" alt="${trail.alt}" width="640" height="360" loading="lazy">
      <div class="card-copy">
        <p class="level">${trail.difficulty}</p>
        <h3>${trail.name}</h3>
        <p class="meta">
          <span><strong>Region:</strong> ${trail.region}</span>
          <span><strong>Distance:</strong> ${trail.distanceKm} km</span>
          <span><strong>Typical time:</strong> ${trail.timeHours} hours</span>
        </p>
      </div>
    </article>
  `;
}

function populateRegions() {
  const regionSelect = document.querySelector("#region");

  if (!regionSelect) {
    return;
  }

  const regions = [...new Set(trails.map((trail) => trail.region))].sort();
  const options = regions.map((region) => `<option value="${region}">${region}</option>`).join("");
  regionSelect.insertAdjacentHTML("beforeend", options);
}

function setDistanceOutput(value) {
  const output = document.querySelector("#distance-output");

  if (output) {
    output.textContent = `Up to ${value} km`;
  }
}

function getFilters() {
  const search = document.querySelector("#search")?.value.trim() || "";
  const region = document.querySelector("#region")?.value || "all";
  const difficulty = document.querySelector("#difficulty")?.value || "all";
  const maxDistance = Number(document.querySelector("#max-distance")?.value || 22);

  return { search, region, difficulty, maxDistance };
}

function trailMatches(trail, filters) {
  const matchesSearch = trail.name.toLowerCase().includes(filters.search.toLowerCase());
  const matchesRegion = filters.region === "all" || trail.region === filters.region;
  const matchesDifficulty = filters.difficulty === "all" || trail.difficulty === filters.difficulty;
  const matchesDistance = trail.distanceKm <= filters.maxDistance;

  return matchesSearch && matchesRegion && matchesDifficulty && matchesDistance;
}

function renderResults() {
  const grid = document.querySelector("#trails-grid");
  const status = document.querySelector("#results-status");

  if (!grid || !status) {
    return;
  }

  const filters = getFilters();
  const results = trails.filter((trail) => trailMatches(trail, filters));

  if (results.length > 0) {
    grid.innerHTML = results.map((trail) => trailCardTemplate(trail)).join("");
    status.textContent = `${results.length} trail${results.length === 1 ? "" : "s"} match your filters.`;
  } else {
    grid.innerHTML = "";
    status.textContent = "No trails matched. Try increasing max distance or setting difficulty to all.";
  }

  localStorage.setItem("tc_last_trail_filter", JSON.stringify(filters));
}

function restoreLastFilters() {
  const saved = localStorage.getItem("tc_last_trail_filter");

  if (!saved) {
    return;
  }

  let filters;

  try {
    filters = JSON.parse(saved);
  } catch {
    localStorage.removeItem("tc_last_trail_filter");
    return;
  }

  if (!filters || typeof filters !== "object") {
    localStorage.removeItem("tc_last_trail_filter");
    return;
  }

  const searchNode = document.querySelector("#search");
  const regionNode = document.querySelector("#region");
  const difficultyNode = document.querySelector("#difficulty");
  const distanceNode = document.querySelector("#max-distance");

  if (searchNode && typeof filters.search === "string") {
    searchNode.value = filters.search;
  }

  if (regionNode && typeof filters.region === "string") {
    regionNode.value = filters.region;
  }

  if (difficultyNode && typeof filters.difficulty === "string") {
    difficultyNode.value = filters.difficulty;
  }

  if (distanceNode && Number.isFinite(filters.maxDistance)) {
    distanceNode.value = `${filters.maxDistance}`;
    setDistanceOutput(filters.maxDistance);
  }
}

function setupFilterListeners() {
  const form = document.querySelector("#trail-filter-form");
  const distance = document.querySelector("#max-distance");

  if (form) {
    form.addEventListener("input", renderResults);
    form.addEventListener("change", renderResults);
  }

  if (distance) {
    distance.addEventListener("input", () => {
      setDistanceOutput(Number(distance.value));
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  stampYear();
  populateRegions();
  restoreLastFilters();
  setupFilterListeners();
  renderResults();
});
