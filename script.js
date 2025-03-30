// Function to update and display the current time
function updateCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  document.getElementById("current-time").innerText =
    `Current Time: ${hours}:${minutes}:${seconds}`;
}

// Update the current time every second
setInterval(updateCurrentTime, 1000);
updateCurrentTime(); // Call it once immediately to display the time right away

// Define all the prayer times for the day
const prayerTimes = [
  { name: "Fajr", time: "04:41" },
  { name: "Sunrise", time: "06:40" },
  { name: "Dhuhr", time: "13:11" },
  { name: "Asr", time: "17:34" },
  { name: "Maghrib", time: "19:44" },
  { name: "Isha", time: "21:21" }
];

// Function to calculate the next prayer
function getNextPrayer() {
  const now = new Date();

  for (let i = 0; i < prayerTimes.length; i++) {
    const [hours, minutes] = prayerTimes[i].time.split(":").map(Number);
    const prayerTime = new Date();
    prayerTime.setHours(hours, minutes, 0);

    // Check if the prayer is still upcoming today
    if (prayerTime > now) {
      return { ...prayerTimes[i], timeObj: prayerTime };
    }
  }

  // If all today's prayers are over, return the first prayer for tomorrow
  const [hours, minutes] = prayerTimes[0].time.split(":").map(Number);
  const nextDayPrayerTime = new Date();
  nextDayPrayerTime.setDate(now.getDate() + 1);
  nextDayPrayerTime.setHours(hours, minutes, 0);

  return { ...prayerTimes[0], timeObj: nextDayPrayerTime };
}

// Function to update the prayer countdown
function updateCountdown() {
  const { name, timeObj } = getNextPrayer();
  const now = new Date();
  const timeDiff = timeObj - now;

  if (timeDiff > 0) {
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    document.getElementById("countdown").innerText =
      `🕌 ${name} is in ${hours}h ${minutes}m ${seconds}s 🕌`;
  } else {
    document.getElementById("countdown").innerText = "It's time for prayer!";
  }
}

// Update the countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Call it once to initialize