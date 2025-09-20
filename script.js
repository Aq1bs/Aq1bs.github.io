// Display Current Time
setInterval(() => {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  const ss = now.getSeconds().toString().padStart(2, "0");
  document.getElementById("current-time").innerText =
    `Current Time: ${hh}:${mm}:${ss}`;
}, 1000);



// Display Gregorian Date
const dateEl = document.getElementById("gregorian-date");
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateEl.textContent = `📅 Today is ${today.toLocaleDateString('en-GB', options)}`;




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
      "🕌 No data 🕌";
  }



// Weather Box
async function loadWeather() {
  const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=53.65&longitude=-1.78&current_weather=true');
  const data = await res.json();
  const w = data.current_weather;
  const temp = Math.round(w.temperature);
  const wind = Math.round(w.windspeed);
  const code = w.weathercode;

  const conditions = {
    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Depositing rime fog", 51: "Light drizzle", 61: "Light rain",
    71: "Light snow", 80: "Rain showers", 95: "Thunderstorm"
  };

  const desc = conditions[code] || "Unknown";
  document.getElementById("weather-box").innerHTML =
    `🌦️ <strong>Huddersfield Weather</strong><br>
     ${desc}<br>
     🌡️ ${temp}°C<br>
     💨 Wind: ${wind} km/h`;
}
loadWeather();





}, 1000);