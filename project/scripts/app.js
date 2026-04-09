const featuredTrails = [
  {
    id: 1,
    name: "Sunridge Loop",
    region: "Entebbe",
    difficulty: "easy",
    distanceKm: 6,
    elevationM: 170,
    bestSeason: "Dry",
    image: "../images/newbeach-ldstemple.webp",
    alt: "Blue shoreline with a walking trail at sunrise",
    summary: "A scenic loop with gentle climbs and broad lake views, ideal for first-time hikers."
  },
  {
    id: 2,
    name: "Kagera Bluff Path",
    region: "Jinja",
    difficulty: "moderate",
    distanceKm: 11,
    elevationM: 420,
    bestSeason: "Dry",
    image: "../images/preston-temple-bymunzerr.webp",
    alt: "Open path leading to a high ridge under bright clouds",
    summary: "A mixed-terrain route with rewarding viewpoints and breezy ridge sections."
  },
  {
    id: 3,
    name: "Mwamba Ridge Climb",
    region: "Fort Portal",
    difficulty: "hard",
    distanceKm: 14,
    elevationM: 780,
    bestSeason: "Dry",
    image: "../images/rexburgidaho.webp",
    alt: "Distant mountain ridge framed by open sky",
    summary: "A challenging ascent with long switchbacks for experienced hikers."
  },
  {
    id: 4,
    name: "Riverstone Walk",
    region: "Mukono",
    difficulty: "easy",
    distanceKm: 5,
    elevationM: 120,
    bestSeason: "All",
    image: "../images/denverlsd-temple.webp",
    alt: "Calm trail near water surrounded by green vegetation",
    summary: "A short route near water crossings, good for families and relaxed hikes."
  },
  {
    id: 5,
    name: "Cloudstep Traverse",
    region: "Kabale",
    difficulty: "hard",
    distanceKm: 19,
    elevationM: 920,
    bestSeason: "Dry",
    image: "../images/nauvoo.webp",
    alt: "Elevated path with long distance views under a cloudy sky",
    summary: "A full-day traverse with steep gains, exposed sections, and dramatic panoramas."
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

function trailTemplate(trail) {
  return `
    <article class="trail-card" data-id="${trail.id}">
      <img src="${trail.image}" alt="${trail.alt}" width="640" height="360" loading="lazy">
      <div class="card-copy">
        <p class="level">${trail.difficulty}</p>
        <h3>${trail.name}</h3>
        <p>${trail.summary}</p>
        <p class="meta">
          <span><strong>Region:</strong> ${trail.region}</span>
          <span><strong>Distance:</strong> ${trail.distanceKm} km</span>
          <span><strong>Elevation:</strong> ${trail.elevationM} m</span>
          <span><strong>Best season:</strong> ${trail.bestSeason}</span>
        </p>
      </div>
    </article>
  `;
}

function announceFilter(level, count) {
  const status = document.querySelector("#filter-status");

  if (!status) {
    return;
  }

  if (level === "all") {
    status.textContent = `Showing all ${count} featured trails.`;
  } else {
    status.textContent = `Showing ${count} ${level} trails.`;
  }
}

function revealCards() {
  const cards = document.querySelectorAll(".trail-card");

  if (!cards.length) {
    return;
  }

  const observer = new IntersectionObserver((entries, io) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach((card) => {
    observer.observe(card);
  });
}

function renderFeatured(level = "all") {
  const grid = document.querySelector("#featured-grid");

  if (!grid) {
    return;
  }

  const items = level === "all"
    ? featuredTrails
    : featuredTrails.filter((trail) => trail.difficulty === level);

  grid.innerHTML = items.map((trail) => trailTemplate(trail)).join("");
  announceFilter(level, items.length);
  revealCards();
}

function wireFilters() {
  const chips = document.querySelectorAll(".chip");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((node) => {
        node.classList.remove("active");
      });
      chip.classList.add("active");
      renderFeatured(chip.dataset.filter);
    });
  });
}

function showVisitCount() {
  const output = document.querySelector("#visit-count");

  if (!output) {
    return;
  }

  const key = "tc_visit_count";
  const count = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, `${count}`);

  const label = count === 1 ? "This is your first visit." : `You have visited this page ${count} times.`;
  output.textContent = label;
}

function stampYear() {
  const yearNode = document.querySelector("#year");

  if (yearNode) {
    yearNode.textContent = `${new Date().getFullYear()}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  stampYear();
  showVisitCount();
  renderFeatured();
  wireFilters();
});
