document.addEventListener("DOMContentLoaded", () => {
  const typing = document.getElementById("typing");
  const text = "Мій сайт";
  let i = 0;

  const type = () => {
    if (typing && i < text.length) {
      typing.textContent += text[i++];
      setTimeout(type, 150);
    }
  };
  if (typing) (typing.textContent = ""), type();

  document.getElementById("year").textContent = new Date().getFullYear();

  const links = document.querySelectorAll(".nav-list a");
  const page = location.pathname.split("/").pop();

  links.forEach((l) => {
    if (l.getAttribute("href") === page) l.classList.add("active");
  });

  const theme = document.querySelector(".theme-toggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("theme-dark");
  }

  theme?.addEventListener("click", () => {
    document.body.classList.toggle("theme-dark");

    localStorage.setItem(
      "theme",
      document.body.classList.contains("theme-dark") ? "dark" : "light"
    );
  });

  const topBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    topBtn.hidden = window.scrollY < 200;
  });

  topBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelectorAll(".accordion-item").forEach((i) => {
    i.addEventListener("click", () => i.classList.toggle("open"));
  });

  const modal = document.querySelector(".modal");

  document.querySelector("[data-modal-open]")?.addEventListener("click", () => {
    modal.classList.add("show");
  });

  document.querySelector(".modal-close")?.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("show");
  });

  const cards = document.getElementById("cards");

  if (cards) {
    fetch("data/services.json")
      .then((r) => r.json())
      .then((data) => {
        cards.innerHTML = data
          .map(
            (i) => `
            <div class="card" data-category="${i.category}">
              <h3>${i.title}</h3>
              <p>${i.desc}</p>
            </div>
          `
          )
          .join("");
      });
  }

  const form = document.querySelector(".contact-form");
  const counter = document.querySelector(".char-counter");
  const status = document.getElementById("form-status");
  const clear = document.querySelector(".clear-draft");

  const key = "draft";

  if (form) {
    const saved = JSON.parse(localStorage.getItem(key) || "{}");

    Object.entries(saved).forEach(([k, v]) => {
      if (form.elements[k]) form.elements[k].value = v;
    });

    form.addEventListener("input", () => {
      const data = Object.fromEntries(new FormData(form));
      localStorage.setItem(key, JSON.stringify(data));

      counter.textContent = (data.message?.length || 0) + " символів";
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(form));

      if (data.name.length < 2) return (status.textContent = "Ім'я коротке");
      if (!data.email.includes("@"))
        return (status.textContent = "Email неправильний");
      if (!data.message.trim())
        return (status.textContent = "Порожнє повідомлення");

      status.textContent = "Відправлено ✔";
      localStorage.removeItem(key);
      form.reset();
    });
  }

  clear?.addEventListener("click", () => {
    localStorage.removeItem("draft");
    form?.reset();
  });
});
(() => {
  /* =========================
       🎨 ПЕРЕМИКАННЯ ФОНІВ
    ========================= */

  const savedBg = localStorage.getItem("bg-theme");

  if (savedBg) {
    document.body.classList.add(savedBg);
  }

  document.querySelectorAll("[data-bg]").forEach((btn) => {
    btn.addEventListener("click", () => {
      // прибираємо старі теми
      document.body.classList.remove("light-bg", "blue-bg", "dark-bg");

      const theme = btn.dataset.bg + "-bg";

      document.body.classList.add(theme);
      localStorage.setItem("bg-theme", theme);
    });
  });

  /* =========================
       📅 РІК У FOOTER
    ========================= */

  const yearEl = document.querySelector("#year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =========================
       📜 АКТИВНА СТОРІНКА
    ========================= */

  const links = document.querySelectorAll(".nav-list a");

  links.forEach((link) => {
    if (link.href === location.href) {
      link.classList.add("active");
    }
  });

  /* =========================
       ⬆ КНОПКА ВГОРУ (якщо є)
    ========================= */

  const btnTop = document.querySelector(".back-to-top");

  if (btnTop) {
    window.addEventListener("scroll", () => {
      btnTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    btnTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
fetch("data/services.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.querySelector(".services");

    if (!container) return;

    data.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("service-card");

      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <strong>${item.price} $</strong>
      `;

      container.appendChild(card);
    });
  })
  .catch((err) => console.log("Помилка JSON:", err));
fetch("data/services.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.querySelector(".services");
    if (!container) return;

    container.innerHTML = ""; // очищаємо

    data.forEach((item) => {
      container.innerHTML += `
        <div class="service-card">
          <h3>${item.title ?? "Без назви"}</h3>
          <p>${item.description ?? "Без опису"}</p>
          <strong>${item.price ?? 0} $</strong>
        </div>
      `;
    });
  })
  .catch((err) => console.log("JSON error:", err));
fetch("data/services.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.querySelector(".services");
    if (!container) return;

    container.innerHTML = "";

    data.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("service-card");

      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div><strong>${item.price}$</strong></div>
        <small>${item.category}</small>
      `;

      container.appendChild(card);
    });
  })
  .catch((err) => console.log(err));
fetch("data/services.json")
  .then((res) => {
    if (!res.ok) throw new Error("JSON не знайдено");
    return res.json();
  })
  .then((data) => {
    const container = document.querySelector(".services");
    if (!container) return;

    container.innerHTML = "";

    data.forEach((item) => {
      container.innerHTML += `
        <div class="service-card">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <span class="price">${item.price}$</span>
          <small>${item.category}</small>
        </div>
      `;
    });
  })
  .catch((err) => console.log("ERROR:", err));
