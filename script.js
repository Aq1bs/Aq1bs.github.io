

// Write the time in the emty "" alsoooo it has to be written in 24 hour format


document.addEventListener("DOMContentLoaded", () => {
  const prayerTimes = [
    { name: "Fajr", time: "" },
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