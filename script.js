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
  { name: "Fajr", time: "04:07" },
  { name: "Dhuhr", time: "12:14" },
  { name: "Asr", time: "16:21" },
  { name: "Maghrib", time: "18:28" },
  { name: "Isha", time: "20:01" }
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

function updateIftarAndSuhoorCountdown() {
  const now = new Date();
  const prayerTimes = {
    Fajr: "04:15",
    Maghrib: "18:22"
  };

  // Parsing prayer times
  const [fajrHours, fajrMinutes] = prayerTimes.Fajr.split(":").map(Number);
  const [maghribHours, maghribMinutes] = prayerTimes.Maghrib.split(":").map(Number);

  // Create Date objects for Fajr and Maghrib
  const fajrTime = new Date();
  fajrTime.setHours(fajrHours, fajrMinutes, 0);

  const maghribTime = new Date();
  maghribTime.setHours(maghribHours, maghribMinutes, 0);

  const iftarContainer = document.getElementById("iftar-countdown");

  if (now < maghribTime) {
    // Iftar countdown
    const timeDiff = maghribTime - now;

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    iftarContainer.innerText = `🕌 Iftar time in ${hours}h ${minutes}m ${seconds}s 🕌`;

    // Pulse effect during the last minute before Iftar
    if (timeDiff <= 60000) {
      iftarContainer.classList.add("pulse");
    } else {
      iftarContainer.classList.remove("pulse");
    }
  } else if (now < fajrTime) {
    // Suhoor countdown
    const timeDiff = fajrTime - now;

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    iftarContainer.innerText = `🕌 Sehri time ends in ${hours}h ${minutes}m ${seconds}s 🕌`;

    // Pulse effect during the last minute before Suhoor ends
    if (timeDiff <= 60000) {
      iftarContainer.classList.add("pulse");
    } else {
      iftarContainer.classList.remove("pulse");
    }
  } else {
    // After Fajr, show placeholder text
    iftarContainer.innerText = "🕌 Countdown will update after sunset.";
    iftarContainer.classList.remove("pulse");
  }
}

// Call the function every second
setInterval(updateIftarAndSuhoorCountdown, 1000);

// Update the countdown every second
setInterval(() => {
  const { name, timeObj } = getNextPrayer();
  const now = new Date();
  const timeDiff = timeObj - now;

  if (timeDiff > 0) {
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerText =
      `🕌 ${name} is in ${hours}h ${minutes}m ${seconds}s 🕌`;
  }
}, 1000);
