

// Write the time in the emty "" alsoooo it has to be written in 24 hour format


document.addEventListener("DOMContentLoaded", () => {


document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("close-btn");

  
});

  // Full prayer schedule for October 2025
  const prayerSchedule = [
    { date: "2025-10-12", times: { Fajr: "05:32", Sunrise: "07:24", Dhuhr: "12:54", Asr: "16:23", Maghrib: "18:20", Isha: "20:14" } },
    { date: "2025-10-13", times: { Fajr: "05:34", Sunrise: "07:26", Dhuhr: "12:53", Asr: "16:21", Maghrib: "18:18", Isha: "20:11" } },
    { date: "2025-10-14", times: { Fajr: "05:36", Sunrise: "07:28", Dhuhr: "12:53", Asr: "16:18", Maghrib: "18:15", Isha: "20:09" } },
    { date: "2025-10-15", times: { Fajr: "05:38", Sunrise: "07:30", Dhuhr: "12:53", Asr: "16:16", Maghrib: "18:13", Isha: "20:07" } },
    { date: "2025-10-16", times: { Fajr: "05:40", Sunrise: "07:32", Dhuhr: "12:53", Asr: "16:14", Maghrib: "18:11", Isha: "20:04" } },
    { date: "2025-10-17", times: { Fajr: "05:41", Sunrise: "07:33", Dhuhr: "12:52", Asr: "16:12", Maghrib: "18:09", Isha: "20:02" } },
    { date: "2025-10-18", times: { Fajr: "05:43", Sunrise: "07:35", Dhuhr: "12:52", Asr: "16:10", Maghrib: "18:06", Isha: "20:00" } },
    { date: "2025-10-19", times: { Fajr: "05:45", Sunrise: "07:37", Dhuhr: "12:52", Asr: "16:08", Maghrib: "18:04", Isha: "19:58" } },
    { date: "2025-10-20", times: { Fajr: "05:47", Sunrise: "07:39", Dhuhr: "12:52", Asr: "16:06", Maghrib: "18:02", Isha: "19:56" } },
    { date: "2025-10-21", times: { Fajr: "05:49", Sunrise: "07:41", Dhuhr: "12:52", Asr: "16:04", Maghrib: "18:00", Isha: "19:54" } },
    { date: "2025-10-22", times: { Fajr: "05:50", Sunrise: "07:43", Dhuhr: "12:52", Asr: "16:02", Maghrib: "17:57", Isha: "19:52" } },
    { date: "2025-10-23", times: { Fajr: "05:52", Sunrise: "07:45", Dhuhr: "12:51", Asr: "16:00", Maghrib: "17:55", Isha: "19:50" } },
    { date: "2025-10-24", times: { Fajr: "05:54", Sunrise: "07:47", Dhuhr: "12:51", Asr: "15:58", Maghrib: "17:53", Isha: "19:48" } },
    { date: "2025-10-25", times: { Fajr: "05:56", Sunrise: "07:49", Dhuhr: "12:51", Asr: "15:56", Maghrib: "17:51", Isha: "19:46" } },
    { date: "2025-10-26", times: { Fajr: "04:57", Sunrise: "06:51", Dhuhr: "11:51", Asr: "14:54", Maghrib: "16:49", Isha: "18:44" } },
    { date: "2025-10-27", times: { Fajr: "04:59", Sunrise: "06:52", Dhuhr: "11:51", Asr: "14:52", Maghrib: "16:57", Isha: "18:42" } },
    { date: "2025-10-28", times: { Fajr: "05:01", Sunrise: "06:54", Dhuhr: "11:51", Asr: "14:50", Maghrib: "16:45", Isha: "18:40" } },
    { date: "2025-10-29", times: { Fajr: "05:03", Sunrise: "06:56", Dhuhr: "11:51", Asr: "14:48", Maghrib: "16:43", Isha: "18:38" } },
    { date: "2025-10-30", times: { Fajr: "05:04", Sunrise: "06:58", Dhuhr: "11:51", Asr: "14:47", Maghrib: "16:41", Isha: "18:36" } },
    { date: "2025-10-31", times: { Fajr: "05:06", Sunrise: "07:00", Dhuhr: "11:51", Asr: "14:45", Maghrib: "16:39", Isha: "18:35" } }
  ];

  function parseDateOnlyLocal(yyyyMMdd) {
    const [y, m, d] = yyyyMMdd.split("-").map(Number);
    return new Date(y, m - 1, d, 0, 0, 0, 0);
  }

  function getNextPrayer() {
    const now = new Date();
    const order = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    const sorted = prayerSchedule.slice().sort((a, b) => parseDateOnlyLocal(a.date) - parseDateOnlyLocal(b.date));
    for (const day of sorted) {
      const dayStart = parseDateOnlyLocal(day.date);
      for (const name of order) {
        const t = day.times[name];
        if (!t) continue;
        const [hh, mm] = t.split(":").map(Number);
        const dt = new Date(dayStart.getFullYear(), dayStart.getMonth(), dayStart.getDate(), hh, mm, 0, 0);
        if (dt > now) return { name, timeObj: dt, timeStr: t, date: day.date };
      }
    }
    return null;
  }

  function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    document.getElementById("current-time").innerText = `Current Time: ${hh}:${mm}:${ss}`;
  }

  function updateNextPrayer() {
    const container = document.getElementById("next-prayer");
    const next = getNextPrayer();
    console.log("Next prayer:", next.name, next.timeStr, "on", next.date);
    if (!next) {
      container.innerText = "No upcoming prayer times in the schedule.";
      container.className = "";
      return;
    }
    const diff = Math.max(0, next.timeObj - new Date());
    if (diff === 0) {
      container.innerText = `🕌 It's time for ${next.name} (${next.timeStr})`;
      container.className = "prayer-alert";
      return;
    }
    const totalSec = Math.floor(diff / 1000);
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
  container.innerHTML = `Next: ${next.name} at ${next.timeStr} — in ${hours}h ${minutes}m ${seconds}s <span style="font-size: 0.8em; color: #666;">(${next.date})</span>`;
    container.className = "";
  }

  updateClock();
  updateNextPrayer();
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

