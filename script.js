
// Display Current Time

setInterval(() => {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  const ss = now.getSeconds().toString().padStart(2, "0");
  document.getElementById("current-time").innerText =
    `Current Time: ${hh}:${mm}:${ss}`;
}, 1000);






// Static Prayer Times Array  In The ""  Type The Time Using 24 Hour Format
const prayerTimes = [
  { name: "Fajr", time: "" },
  { name: "Dhuhr", time: "" },
  { name: "Asr", time: "" },
  { name: "Maghrib", time: "" },
  { name: "Isha", time: "" }
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

// Update Countdown (Where it says no data in ramadan coppy n paste this "🕌 It's time for prayer! 🕌")
setInterval(() => {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  const ss = now.getSeconds().toString().padStart(2, "0");
  document.getElementById("current-time").innerText =
    `Current Time: ${hh}:${mm}:${ss}`;
}, 1000);

