(() => {
  "use strict";
  const cfg = window.PRACTICE_CONFIG;
  if (!cfg) return;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);

  document.querySelectorAll("[data-config]").forEach((element) => {
    const value = cfg[element.dataset.config];
    if (typeof value === "string") element.textContent = value;
  });
  document.querySelectorAll("[data-optional-config]").forEach((element) => {
    if (!cfg[element.dataset.optionalConfig]) element.hidden = true;
  });
  document.querySelectorAll("[data-phone]").forEach((element) => {
    element.href = "tel:" + cfg.phoneLink;
  });
  document.querySelectorAll("[data-email]").forEach((element) => {
    element.href = "mailto:" + cfg.email;
    element.textContent = cfg.email;
  });
  document.querySelectorAll("[data-rules-link]").forEach((element) => {
    element.href = cfg.professionalRulesUrl;
    element.textContent = cfg.professionalRules;
  });
  const directions = document.getElementById("directions-link");
  if (directions) {
    const place = [cfg.address, cfg.postalCode, cfg.city].filter(Boolean).join(", ");
    directions.href = "https://www.openstreetmap.org/search?query=" + encodeURIComponent(place);
  }

  if (document.querySelector(".hero")) {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      name: cfg.practiceName,
      medicalSpecialty: cfg.specialty,
      telephone: cfg.phoneDisplay,
      email: cfg.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: cfg.address,
        postalCode: cfg.postalCode,
        addressLocality: cfg.city,
        addressCountry: "DE"
      }
    };
    const structuredDataElement = document.createElement("script");
    structuredDataElement.type = "application/ld+json";
    structuredDataElement.textContent = JSON.stringify(structuredData);
    document.head.appendChild(structuredDataElement);
  }

  const serviceGrid = document.getElementById("service-grid");
  if (serviceGrid) {
    serviceGrid.innerHTML = cfg.services.map((item) =>
      '<article class="service-card"><img class="service-photo" src="' + escapeHtml(item.photo) + '" alt="' + escapeHtml(item.photoAlt) + '" loading="lazy" decoding="async"><div class="service-card-copy"><span class="service-number">' + escapeHtml(item.icon) +
      '</span><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.text) +
      '</p><a href="#termin" aria-label="Termin anfragen: ' + escapeHtml(item.title) +
      '">Mehr erfahren <span aria-hidden="true">↗</span></a></div></article>'
    ).join("");
  }

  const treatments = document.getElementById("treatment-list");
  if (treatments) {
    treatments.innerHTML = cfg.treatments.map((item, index) =>
      '<article class="treatment-item"><span class="treatment-index">0' + (index + 1) +
      '</span><div><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.text) +
      '</p></div><span class="treatment-arrow" aria-hidden="true">↗</span></article>'
    ).join("");
  }

  const renderHours = (limit) => cfg.openingHours.slice(0, limit).map(([day, hours]) =>
    '<div class="hours-row"><dt>' + escapeHtml(day) + '</dt><dd>' + escapeHtml(hours) + '</dd></div>'
  ).join("");
  const hoursList = document.getElementById("hours-list");
  const hoursMini = document.getElementById("hours-mini");
  const year = document.getElementById("year");
  if (hoursList) hoursList.innerHTML = renderHours(cfg.openingHours.length);
  if (hoursMini) hoursMini.innerHTML = renderHours(3);
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Menü öffnen" : "Menü schließen");
    nav.classList.toggle("is-open", !isOpen);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Menü öffnen");
      nav.classList.remove("is-open");
    }));
  }

  const dateField = document.getElementById("date");
  const form = document.getElementById("appointment-form");
  const status = document.getElementById("form-status");
  if (!dateField || !form || !status) return;
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  dateField.min = today.toISOString().slice(0, 10);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const appointmentDate = new Date(String(values.get("date")) + "T12:00:00");
    const date = appointmentDate.toLocaleDateString("de-DE", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
    const subject = "Terminanfrage – " + cfg.practiceName;
    const body = [
      "Guten Tag " + cfg.practiceName + ",",
      "",
      "ich möchte einen Termin anfragen.",
      "",
      "Name: " + values.get("name"),
      "Telefon: " + values.get("phone"),
      values.get("email") ? "E-Mail: " + values.get("email") : null,
      "Wunschtermin ab: " + date,
      "Tageszeit: " + values.get("period"),
      "",
      "Bitte bestätigen Sie den Terminwunsch telefonisch oder per E-Mail.",
      "",
      "Hinweis: Diese Nachricht enthält keine Angaben zu Beschwerden oder Diagnosen."
    ].filter(Boolean).join("\n");
    status.textContent = "Ihr E-Mail-Programm wird geöffnet. Die Anfrage gilt erst als versendet, wenn Sie die E-Mail dort absenden.";
    window.location.href = "mailto:" + cfg.email +
      "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });
})();
