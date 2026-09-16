const rooms = [
  {
    name: "Avilianum",
    coordinates: [45.564323, 8.116494],
    location: "Corso Avilianum 48, Vigliano Biellese",
    image: "Avilianum/653715355.jpg",
    size: "60 m²",
    layout: "1 camera, 3 letti, 1 bagno",
    extras: ["Balcone", "Vista montagna", "Parcheggio coperto", "Wi-Fi"],
    description:
      "Appartamento con balcone, vista su giardino e montagna, cucina attrezzata e ambienti raccolti pensati per una sosta pratica ma confortevole.",
    booking: "https://www.booking.com/Share-Q0LaeUB",
  },
  {
    name: "Billotti",
    coordinates: [45.557989, 8.027683],
    location: "Via Lorenzo Billotti 6, Biella",
    image: "Billotti/678394477.jpg",
    size: "62 m²",
    layout: "2 camere, 3 letti, 1 bagno",
    extras: ["Terrazza", "Vista fiume", "Parcheggio", "Wi-Fi"],
    description:
      "Soluzione luminosa con terrazza e balcone, due camere da letto e una distribuzione adatta sia a coppie sia a piccoli nuclei familiari.",
    booking: "https://www.booking.com/Share-293Y0X",
  },
  {
    name: "DeMarchi",
    coordinates: [45.5616903, 8.0526030],
    location: "Via Gaetano de Marchi 1, Biella",
    image: "DeMarchi/852735262.jpg",
    size: "72 m²",
    layout: "1 camera, 2 letti, 1 bagno",
    extras: ["Vista citta", "Giardino", "Parcheggio", "Wi-Fi"],
    description:
      "Alloggio a Biella con spazi generosi, cucina privata e affaccio urbano, pensato per chi cerca una base centrale con una presenza di verde.",
    booking: "https://www.booking.com/Share-4HUirJ",
  },
  {
    name: "Favaro di là 1",
    coordinates: [45.60109, 8.005227],
    location: "Strada Favaro di La 29, Favaro",
    image: "Favaro di là 1/674473515.jpg",
    size: "100 m²",
    layout: "2 camere, 3 letti, 1 bagno",
    extras: ["Balcone", "Vista montagna", "Navetta", "Wi-Fi"],
    description:
      "Appartamento ampio in edificio storico, con ambienti versatili, terrazza nelle vicinanze e una posizione utile anche per chi vuole muoversi nei dintorni.",
    booking: "https://www.booking.com/Share-7HK3jg",
  },
  {
    name: "Favaro di là 2",
    coordinates: [45.60109, 8.005227],
    location: "Strada Favaro di La 29, Favaro",
    image: "Favaro di là 2/678353773.jpg",
    size: "100 m²",
    layout: "3 camere, 4 letti, 1 bagno",
    extras: ["Vista montagna", "Autonoleggio", "Parcheggio", "Wi-Fi"],
    description:
      "La soluzione piu capiente della selezione, con tre camere da letto e una distribuzione adatta a soggiorni di gruppo o per famiglie numerose.",
    booking: "https://www.booking.com/Share-bAmWzq5",
  },
];

const roomsGrid = document.querySelector("#rooms-grid");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

const closeMobileMenu = () => {
  if (!navToggle || !siteNav) {
    return;
  }

  navToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
};

roomsGrid.innerHTML = rooms
  .map(
    (room, index) => `
      <article id="alloggio-${index}" class="room-card reveal" data-room-index="${index}" tabindex="-1">
        <div class="room-image">
          <img src="${room.image}" alt="${room.name}">
        </div>
        <div class="room-content">
          <div class="room-header">
            <div>
              <h3>${room.name}</h3>
              <p class="room-location">${room.location}</p>
            </div>
          </div>

          <ul class="room-meta">
            <li>${room.layout}</li>
            <li>${room.size}</li>
            <li>Animali ammessi</li>
          </ul>

          <p class="room-description">${room.description}</p>

          <ul class="room-tags">
            ${room.extras.map((item) => `<li>${item}</li>`).join("")}
          </ul>

          <div class="room-footer">
            <a class="room-map-link" href="#dove-siamo" data-map-room="${index}" aria-label="Mostra ${room.name} sulla mappa">Vedi sulla mappa</a>
            <a class="room-link" href="${room.booking}" target="_blank" rel="noreferrer">
              Vai su Booking
            </a>
          </div>
        </div>
      </article>
    `
  )
  .join("");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  document.addEventListener("click", (event) => {
    const isOpen = siteNav.classList.contains("is-open");
    const clickInsideMenu = siteNav.contains(event.target);
    const clickOnToggle = navToggle.contains(event.target);

    if (isOpen && !clickInsideMenu && !clickOnToggle) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
}

const revealNodes = document.querySelectorAll(
  ".hero-copy, .hero-panel, .intro, .contact-card, .feature-card, .room-card"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealNodes.forEach((node) => revealObserver.observe(node));

// Coordinates saved at build time; no geocoding requests are made by visitors.
// Sources: Travelmyth (Avilianum and Favaro di Là 1),
// billotti.italianalpshotel.com (Billotti), OpenStreetMap house node 3202696625 (DeMarchi).
// Favaro 1 and 2 share the same address and coordinates.
const mapElement = document.querySelector("#alloggi-map");
const mapStatus = document.querySelector("#map-status");
const mapRetry = document.querySelector("#map-retry");
let accommodationMap;
let mapPromise;
let selectionRequest = 0;
const roomMarkers = [];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function loadMapAsset(tag, url, integrity) {
  return new Promise((resolve, reject) => {
    const element = document.createElement(tag);
    const timeout = window.setTimeout(() => fail(), 15000);
    const fail = () => {
      window.clearTimeout(timeout);
      element.remove();
      reject(new Error(`Unable to load ${url}`));
    };
    element.onload = () => {
      window.clearTimeout(timeout);
      resolve();
    };
    element.onerror = fail;
    if (integrity) {
      element.integrity = integrity;
      element.crossOrigin = "anonymous";
    }
    if (tag === "link") {
      element.rel = "stylesheet";
      element.href = url;
    } else {
      element.src = url;
    }
    document.head.append(element);
  });
}

async function loadLeafletAsset(tag, filename, integrity) {
  try {
    await loadMapAsset(tag, `vendor/leaflet/${filename}`);
  } catch {
    // Some uploads omit vendor/. Use the same pinned release as a fallback.
    await loadMapAsset(tag, `https://unpkg.com/leaflet@1.9.4/dist/${filename}`, integrity);
  }
}

function highlightRoom(index) {
  document.querySelectorAll(".room-card").forEach((card, cardIndex) => {
    card.classList.toggle("is-map-selected", cardIndex === index);
  });
}

function ensureMap() {
  if (mapPromise) return mapPromise;
  mapStatus.textContent = "Caricamento della mappa…";
  mapRetry.hidden = true;
  mapPromise = (async () => {
    await loadLeafletAsset("link", "leaflet.css", "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=");
    if (!window.L) {
      await loadLeafletAsset("script", "leaflet.js", "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=");
    }
    const L = window.L;
    accommodationMap = L.map(mapElement, { scrollWheelZoom: false });
    const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(accommodationMap);
    tiles.on("tileerror", () => {
      mapStatus.textContent = "La cartografia non è disponibile. Puoi comunque selezionare i marker e consultare gli indirizzi.";
      mapRetry.hidden = false;
    });
    rooms.forEach((room, index) => {
      // Offset only the icons of co-located apartments, never their coordinates.
      const anchor = index === 3 ? [46, 44] : index === 4 ? [-2, 44] : [22, 44];
      const marker = L.marker(room.coordinates, {
        title: room.name,
        alt: `${room.name}: ${room.location}`,
        icon: L.divIcon({
          className: "room-marker",
          html: `<span>${index + 1}</span>`,
          iconSize: [44, 44],
          iconAnchor: anchor,
          popupAnchor: [22 - anchor[0], -46],
        }),
      }).addTo(accommodationMap);
      const popup = document.createElement("div");
      popup.className = "room-popup";
      const name = document.createElement("a");
      name.href = `#alloggio-${index}`;
      name.textContent = room.name;
      name.setAttribute("aria-label", `Vai alla scheda di ${room.name}`);
      name.addEventListener("click", (event) => {
        event.preventDefault();
        highlightRoom(index);
        const card = document.getElementById(`alloggio-${index}`);
        card.classList.add("is-visible");
        card.focus({ preventScroll: true });
        card.scrollIntoView({ behavior: reducedMotion.matches ? "instant" : "smooth", block: "start" });
      });
      const address = document.createElement("p");
      address.textContent = room.location;
      popup.append(name, address);
      marker.bindPopup(popup);
      marker.on("popupopen", () => highlightRoom(index));
      roomMarkers.push(marker);
    });
    accommodationMap.fitBounds(rooms.map((room) => room.coordinates), { padding: [48, 48] });
    mapStatus.textContent = "Seleziona un marker, poi il nome dell’alloggio per tornare alla scheda. I due alloggi di Favaro condividono lo stesso indirizzo.";
    return accommodationMap;
  })().catch(() => {
    if (accommodationMap) accommodationMap.remove();
    accommodationMap = undefined;
    roomMarkers.length = 0;
    mapPromise = undefined;
    mapStatus.textContent = "Non è stato possibile caricare la mappa. Gli indirizzi restano disponibili nelle schede degli alloggi.";
    mapRetry.hidden = false;
    return null;
  });
  return mapPromise;
}

async function showRoomOnMap(index) {
  const request = ++selectionRequest;
  document.querySelector("#dove-siamo").scrollIntoView({ behavior: reducedMotion.matches ? "instant" : "smooth" });
  const map = await ensureMap();
  if (!map || request !== selectionRequest) return;
  map.invalidateSize();
  map.setView(rooms[index].coordinates, 16, { animate: false });
  roomMarkers[index].openPopup();
  highlightRoom(index);
}

roomsGrid.addEventListener("click", (event) => {
  const mapLink = event.target.closest("[data-map-room]");
  if (mapLink) {
    event.preventDefault();
    void showRoomOnMap(Number(mapLink.dataset.mapRoom));
  }
});

mapRetry.addEventListener("click", () => {
  if (accommodationMap) accommodationMap.remove();
  accommodationMap = undefined;
  mapPromise = undefined;
  roomMarkers.length = 0;
  void ensureMap();
});

const mapObserver = new IntersectionObserver((entries) => {
  if (entries.some((entry) => entry.isIntersecting)) {
    mapObserver.disconnect();
    void ensureMap();
  }
}, { rootMargin: "300px" });
mapObserver.observe(mapElement);
