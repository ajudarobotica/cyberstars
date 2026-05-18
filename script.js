const slides = [
  {
    roman: "H",
    name: "支撑希望者",
    subtitle: "Aquele que sustenta a esperança",
    description:
      "",
    type: "Estratégia + Foco",
    base: "Planejamento",
    main: "Visão",
    image: "assets/sentinela-nebular.png",
    alt: "Sentinela Nebular",
    accent1: "#7e1744",
    accent2: "#3f1735",
    accent3: "#203055",
    scale: "0.88",
    x: "0%",
    y: "25%"
  },
  {
    roman: "N",
    name: "Der Wegbereiter des Sieges",
    subtitle: "Aquele que conduz à vitória",
    description:
      "",
    type: "Execução + Disciplina",
    base: "Projetos Práticos",
    main: "Persistência",
    image: "assets/guardiao-carmesim.png",
    alt: "Guardião Carmesim",
    accent1: "#8c2032",
    accent2: "#43172c",
    accent3: "#2c203d",
    scale: "0.88",
    x: "0%",
    y: "25%"
  },
  {
    roman: "M",
    name: "Celle qui porte la liberté",
    subtitle: "Aquela que carrega a liberdade",
    description:
      "",
    type: "Criatividade + Visão",
    base: "Criação Digital",
    main: "Imaginação",
    image: "assets/oraculo-nebulosa.png",
    alt: "Oráculo da Nebulosa",
    accent1: "#7a1f64",
    accent2: "#392352",
    accent3: "#243051",
    scale: "0.86",
    x: "0%",
    y: "20%"
  }
];

const root = document.documentElement;
const showcase = document.getElementById("showcase");

const heroName = document.getElementById("heroName");
const heroSubtitle = document.getElementById("heroSubtitle");
const heroDescription = document.getElementById("heroDescription");
const metaType = document.getElementById("metaType");
const metaBase = document.getElementById("metaBase");
const metaMain = document.getElementById("metaMain");
const heroImage = document.getElementById("heroImage");

const progressFill = document.getElementById("progressFill");
const romanIndex = document.getElementById("romanIndex");
const thumbCards = [...document.querySelectorAll(".thumb-card")];
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

let activeIndex = 0;
let locked = false;

function setSlide(index) {
  if (locked) return;

  activeIndex = (index + slides.length) % slides.length;
  const slide = slides[activeIndex];

  locked = true;
  showcase.classList.add("is-changing");

  window.setTimeout(() => {
    heroName.textContent = slide.name;
    heroSubtitle.textContent = slide.subtitle;
    heroDescription.textContent = slide.description;
    metaType.textContent = slide.type;
    metaBase.textContent = slide.base;
    metaMain.textContent = slide.main;

    heroImage.src = slide.image;
    heroImage.alt = slide.alt;

    romanIndex.textContent = slide.roman;
    progressFill.style.width = `${((activeIndex + 1) / slides.length) * 100}%`;

    root.style.setProperty("--accent-1", slide.accent1);
    root.style.setProperty("--accent-2", slide.accent2);
    root.style.setProperty("--accent-3", slide.accent3);
    root.style.setProperty("--hero-scale", slide.scale);
    root.style.setProperty("--hero-x", slide.x);
    root.style.setProperty("--hero-y", slide.y);

    thumbCards.forEach((card, idx) => {
      card.classList.toggle("is-active", idx === activeIndex);
    });
  }, 170);

  window.setTimeout(() => {
    showcase.classList.remove("is-changing");
    locked = false;
  }, 520);
}

thumbCards.forEach((card) => {
  card.addEventListener("click", () => setSlide(Number(card.dataset.slide)));
});

prevSlide.addEventListener("click", () => setSlide(activeIndex - 1));
nextSlide.addEventListener("click", () => setSlide(activeIndex + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") setSlide(activeIndex - 1);
  if (event.key === "ArrowRight") setSlide(activeIndex + 1);
});

/* Fundo estrelado */
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let ratio = 1;
let stars = [];

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  ratio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const amount = Math.max(90, Math.floor((width * height) / 15000));
  stars = Array.from({ length: amount }, () => createStar(true));
}

function createStar(randomY = false) {
  return {
    x: Math.random() * width,
    y: randomY ? Math.random() * height : -6,
    r: Math.random() * 1.1 + 0.18,
    speed: Math.random() * 0.12 + 0.02,
    alpha: Math.random() * 0.42 + 0.12,
    pulse: Math.random() * Math.PI * 2
  };
}

function animateStars() {
  ctx.clearRect(0, 0, width, height);

  for (const star of stars) {
    star.y += star.speed;
    star.pulse += 0.014;

    if (star.y > height + 6) {
      Object.assign(star, createStar(false));
    }

    const alpha = Math.max(0.06, star.alpha + Math.sin(star.pulse) * 0.11);

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 244, 225, ${alpha})`;
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animateStars);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animateStars();
setSlide(0);
