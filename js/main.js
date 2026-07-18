// Theme
const html = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");
const themeIconSun = document.getElementById("icon-sun");
const themeIconMoon = document.getElementById("icon-moon");

function setTheme(theme) {
  html.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
  themeIconSun.classList.toggle("hidden", theme === "dark");
  themeIconMoon.classList.toggle("hidden", theme !== "dark");
}

const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(saved || (prefersDark ? "dark" : "light"));

themeBtn.addEventListener("click", () => {
  setTheme(html.classList.contains("dark") ? "light" : "dark");
});

// Mobile menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuOpen = document.getElementById("icon-menu-open");
const menuClose = document.getElementById("icon-menu-close");

menuBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuOpen.classList.toggle("hidden", isOpen);
  menuClose.classList.toggle("hidden", !isOpen);
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuOpen.classList.remove("hidden");
    menuClose.classList.add("hidden");
  });
});

// Navbar scroll + active section
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = Array.from(navLinks).map((l) => document.querySelector(l.getAttribute("href")));

window.addEventListener("scroll", () => {
  navbar.classList.toggle("nav-scrolled", window.scrollY > 20);

  const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.getElementById("scroll-progress").style.transform = `scaleX(${progress})`;

  let current = "";
  sections.forEach((section) => {
    if (section && section.getBoundingClientRect().top <= 120) {
      current = section.id;
    }
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

// Typewriter
const roles = [
  "Electronics Engineer",
  "AI Enthusiast",
  "Project Manager",
  "Business Analytics",
];
const typewriter = document.getElementById("typewriter");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = roles[roleIndex];
  if (!deleting) {
    typewriter.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    typewriter.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 40 : 70);
}
type();

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.querySelectorAll(".skill-bar").forEach((bar) => bar.classList.add("animate"));
      }
    });
  },
  { threshold: 0.1, rootMargin: "-60px" }
);
revealEls.forEach((el) => observer.observe(el));

// Contact form
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const message = form.message.value;
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(message);
  window.location.href = `mailto:thakshneshnesh@gmail.com?subject=${subject}&body=${body}`;
  const btn = form.querySelector("button");
  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Opening email...`;
  setTimeout(() => {
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
    form.reset();
  }, 3000);
});
