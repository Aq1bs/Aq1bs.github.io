// Display Current Time
setInterval(() => {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  const ss = now.getSeconds().toString().padStart(2, "0");
  document.getElementById("current-time").innerText =
    `Current Time: ${hh}:${mm}:${ss}`;
}, 1000);

// Static Prayer Times Array
const prayerTimes = [
  { name: "Fajr", time: "02:00" },
  { name: "Dhuhr", time: "13:03" },
  { name: "Asr", time: "18:33" },
  { name: "Maghrib", time: "21:13" },
  { name: "Isha", time: "22:30" }
];

// Find Next Prayer
function getNextPrayer() {
  const now = new Date();
  for (const p of prayerTimes) {
    const [h, m] = p.time.split(":").map(Number);
    const prayerTime = new Date();
    prayerTime.setHours(h, m, 0);
    if (prayerTime > now) {
      return { ...p, timeObj: prayerTime };
    }
  }
  // After Isha, next is tomorrow’s Fajr
  const [h, m] = prayerTimes[0].time.split(":").map(Number);
  const nextFajr = new Date();
  nextFajr.setDate(now.getDate() + 1);
  nextFajr.setHours(h, m, 0);
  return { ...prayerTimes[0], timeObj: nextFajr };
}

// Update Countdown
setInterval(() => {
  const { name, timeObj } = getNextPrayer();
  const diff = timeObj - new Date();
  if (diff > 0) {
    const hrs = Math.floor((diff / 3600000) % 24);
    const mins = Math.floor((diff / 60000) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    document.getElementById("countdown").innerText =
      `🕌 ${name} is in ${hrs}h ${mins}m ${secs}s 🕌`;
  } else {
    document.getElementById("countdown").innerText =
      "🕌 It's time for prayer! 🕌";
  }
}, 1000);