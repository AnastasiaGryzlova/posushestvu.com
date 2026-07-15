"use strict";

/* =========================
   Элементы секций
========================= */

const sections = [
  {
    section: document.querySelector(".hero"),
    image: document.querySelector(".hero-image"),
    imageSpeed: 0.11,
    sectionSpeed: 0.02,
    scale: 1.04,
  },
  {
    section: document.querySelector(".desk-section"),
    image: document.querySelector(".desk-image"),
    imageSpeed: 0.07,
    sectionSpeed: 0.016,
    scale: 1.03,
  },
  {
    section: document.querySelector(".philosophy-section"),
    image: document.querySelector(".philosophy-image"),
    imageSpeed: 0.06,
    sectionSpeed: 0.014,
    scale: 1.03,
  },
  {
    section: document.querySelector(".work-plan-section"),
    image: document.querySelector(".work-plan-image"),
    imageSpeed: 0.055,
    sectionSpeed: 0.013,
    scale: 1.03,
  },
  {
    section: document.querySelector(".books-section"),
    image: document.querySelector(".books-image"),
    imageSpeed: 0.05,
    sectionSpeed: 0.012,
    scale: 1.03,
  },
  {
    section: document.querySelector(".tea-section"),
    image: document.querySelector(".tea-image"),
    imageSpeed: 0.05,
    sectionSpeed: 0.012,
    scale: 1.03,
  },
  {
    section: document.querySelector(".final-section"),
    image: document.querySelector(".final-image"),
    imageSpeed: 0.045,
    sectionSpeed: 0.01,
    scale: 1.03,
  },
];

const revealElements = document.querySelectorAll(".reveal");

const finalSection = document.querySelector(".final-section");
const contactForm = document.querySelector("#contact-form");
const formSuccess = document.querySelector(".form-success");

/* =========================
   Плавное появление блоков
========================= */

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================
   Финальная секция
========================= */

const finalObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
  }
);

if (finalSection) {
  finalObserver.observe(finalSection);
}

/* =========================
   Параллакс между секциями
========================= */

let animationFrameRequested = false;

function updateParallax() {
  const viewportHeight = window.innerHeight;

  sections.forEach((item) => {
    if (!item.section || !item.image) {
      return;
    }

    const rect = item.section.getBoundingClientRect();

    const isNearViewport =
      rect.bottom > -viewportHeight * 0.35 &&
      rect.top < viewportHeight * 1.35;

    if (!isNearViewport) {
      return;
    }

    const progress =
      (viewportHeight - rect.top) /
      (viewportHeight + rect.height);

    const normalizedProgress = Math.max(
      0,
      Math.min(1, progress)
    );

    const centeredProgress = normalizedProgress - 0.5;

    const imageMovement =
      centeredProgress *
      viewportHeight *
      item.imageSpeed;

    const sectionMovement =
      centeredProgress *
      viewportHeight *
      item.sectionSpeed;

    item.image.style.transform =
      `translate3d(0, ${imageMovement}px, 0) ` +
      `scale(${item.scale})`;

    item.section.style.transform =
      `translate3d(0, ${sectionMovement}px, 0)`;
  });

  animationFrameRequested = false;
}

function requestParallaxUpdate() {
  if (animationFrameRequested) {
    return;
  }

  animationFrameRequested = true;

  window.requestAnimationFrame(updateParallax);
}

window.addEventListener(
  "scroll",
  requestParallaxUpdate,
  {
    passive: true,
  }
);

window.addEventListener(
  "resize",
  requestParallaxUpdate
);

requestParallaxUpdate();

/* =========================
   Форма
========================= */

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const button =
      contactForm.querySelector(".contact-button");

    const buttonText =
      button?.querySelector("span");

    if (buttonText) {
      buttonText.textContent = "Спасибо";
    }

    if (button) {
      button.disabled = true;
    }

    if (formSuccess) {
      formSuccess.classList.add("is-visible");
    }
  });
}