// Display Current Time
setInterval(() => {
  const now = new Date();
  document.getElementById("current-time").innerText =
    `Current Time: ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
}, 1000);

// Prayer Times
const prayerTimes = [
  { name: "Fajr", time: "02:00" },
  { name: "Dhuhr", time: "13:03" },
  { name: "Asr", time: "18:33" },
  { name: "Maghrib", time: "21:13" }, 
  { name: "Isha", time: "22:30" }
];

// Get Next Prayer
function getNextPrayer() {
  const now = new Date();
  for (const p of prayerTimes) {
    const [h, m] = p.time.split(":").map(Number);
    const prayerTime = new Date(); prayerTime.setHours(h, m, 0);
    if (prayerTime > now) return { ...p, timeObj: prayerTime };
  }

  // Move to next day's Fajr after Isha
  const [h, m] = prayerTimes[0].time.split(":").map(Number);
  const nextDayFajr = new Date();
  nextDayFajr.setDate(now.getDate() + 1); nextDayFajr.setHours(h, m, 0);
  return { ...prayerTimes[0], timeObj: nextDayFajr };
}

// Update Countdown
setInterval(() => {
  const { name, timeObj } = getNextPrayer();
  const now = new Date(), timeDiff = timeObj - now;
  if (timeDiff > 0) {
    const hours = Math.floor((timeDiff / 3600000) % 24);
    const minutes = Math.floor((timeDiff / 60000) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);
    document.getElementById("countdown").innerText =
      `🕌 ${name} is in ${hours}h ${minutes}m ${seconds}s 🕌`;
  } else {
    document.getElementById("countdown").innerText = "It's time for prayer!";
  }
}, 1000);