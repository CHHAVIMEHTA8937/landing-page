
document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // 1. PAGE LOADER
  // =====================================

  const loader = document.querySelector(".page-loader");

  window.addEventListener("load", () => {
    loader?.classList.add("loaded");
  });

  // Fallback in case the load event has already fired
  if (document.readyState === "complete") {
    loader?.classList.add("loaded");
  }


  // =====================================
  // 2. STICKY NAVBAR
  // =====================================

  const header = document.querySelector(".header");

  function updateHeader() {
    header?.classList.toggle("scrolled", window.scrollY > 30);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader);


  // =====================================
  // 3. MOBILE NAVIGATION
  // =====================================

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link, .nav-contact");

  function closeMenu() {
    navMenu?.classList.remove("open");
    menuToggle?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });


  // =====================================
  // 4. SCROLL REVEAL ANIMATION
  // =====================================

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  // =====================================
  // 5. ACTIVE NAVIGATION ON SCROLL
  // =====================================

  const sections = document.querySelectorAll("main section[id]");
  const mainNavLinks = document.querySelectorAll(".nav-link");

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mainNavLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  }, {
    rootMargin: "-35% 0px -55% 0px"
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  // =====================================
  // 6. FAQ ACCORDION
  // =====================================

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const wasOpen = item.classList.contains("active");

      faqItems.forEach(faq => {
        faq.classList.remove("active");
        faq.querySelector(".faq-question")
          .setAttribute("aria-expanded", "false");
      });

      if (!wasOpen) {
        item.classList.add("active");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });


  // =====================================
  // 7. CONTACT FORM VALIDATION
  // =====================================

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm?.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    formStatus.textContent =
      "Your details are valid. Connect a form backend or email service to receive messages.";

    formStatus.style.color = "#153f37";

    contactForm.reset();
  });


  // =====================================
  // 8. FOOTER YEAR
  // =====================================

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // =====================================
  // 9. BUTTON INTERACTION
  // =====================================

  const buttons = document.querySelectorAll(".btn");

  buttons.forEach(button => {
    button.addEventListener("pointerdown", () => {
      button.style.transform = "scale(0.97)";
    });

    button.addEventListener("pointerup", () => {
      button.style.transform = "";
    });

    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });

});
