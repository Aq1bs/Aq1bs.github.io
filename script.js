

// Write the time in the emty "" alsoooo it has to be written in 24 hour format


document.addEventListener("DOMContentLoaded", () => {
  const prayerTimes = [
    { name: "Fajr", time: "05:01" },
    { name: "Dhuhr", time: "" },
    { name: "Asr", time: "" },
    { name: "Maghrib", time: "" },
    { name: "Isha", time: "" }
  ];

  function getNextPrayer() {
    const now = new Date();
    for (const p of prayerTimes) {
      const [h, m] = p.time.split(":").map(Number);
      const prayerTime = new Date();
      prayerTime.setHours(h, m, 0, 0);
      if (prayerTime > now) {
        return { ...p, timeObj: prayerTime };
      }
    }
    const [h, m] = prayerTimes[0].time.split(":").map(Number);
    const nextFajr = new Date();
    nextFajr.setDate(now.getDate() + 1);
    nextFajr.setHours(h, m, 0, 0);
    return { ...prayerTimes[0], timeObj: nextFajr };
  }

  function updateClock() {
    const now = new Date();
    const hh = now.getHours().toString().padStart(2, "0");
    const mm = now.getMinutes().toString().padStart(2, "0");
    const ss = now.getSeconds().toString().padStart(2, "0");
    document.getElementById("current-time").innerText =
      `Current Time: ${hh}:${mm}:${ss}`;
  }

  function updateNextPrayer() {
    const now = new Date();
    const next = getNextPrayer();
    const diff = next.timeObj - now;
    const container = document.getElementById("next-prayer");

    if (diff <= 0) {
      container.innerText = "🕌 It's time for prayer! 🕌";
      container.className = "prayer-alert";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    container.innerText = `Next Prayer Is in: ${next.name} in ${hours}h ${minutes}m ${seconds}s`;
    container.className = "countdown";
  }

  setInterval(() => {
    updateClock();
    updateNextPrayer();
  }, 1000);
});

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});



function createLanternTrail() {
  const trail = document.getElementById("lanternTrail");
  for (let i = 0; i < 20; i++) {
    const lantern = document.createElement("div");
    lantern.classList.add("lantern");
    lantern.style.left = `${Math.random() * 100}%`;
    lantern.style.top = `${Math.random() * 100}%`;
    lantern.style.animationDelay = `${Math.random() * 10}s`;
    trail.appendChild(lantern);
  }
}

// Example trigger: only show at night or in Rawdah Mode
const hour = new Date().getHours();
const isNight = hour >= 20 || hour <= 5;
const rawdahMode = true; // or toggle this manually

if (isNight || rawdahMode) {
  createLanternTrail();





  const trigger = document.getElementById("timetableTrigger");
const modal = document.getElementById("timetableModal");
const closeBtn = document.getElementById("closeModal");

trigger.addEventListener("click", () => {
  modal.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});
}

