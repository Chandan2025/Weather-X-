const apiKey = "1dd715b6f8104a7097f165204250806"; // Replace with your WeatherAPI.com API key

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");
const cityNameEl = document.getElementById("city-name");
const weatherIconEl = document.getElementById("weather-icon");
const temperatureEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const weatherAnimationEl = document.getElementById("weather-animation");
const voiceBtn = document.getElementById("voice-btn");

// Fetch weather data function
async function getWeather(city) {
  if (!city) return;
  try {
    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`);
    if (!res.ok) throw new Error("City not found or API error");
    const data = await res.json();

    cityNameEl.textContent = `${data.location.name}, ${data.location.country}`;
    temperatureEl.textContent = `Temperature: ${data.current.temp_c}°C`;
    conditionEl.textContent = `Condition: ${data.current.condition.text}`;
    humidityEl.textContent = `Humidity: ${data.current.humidity}%`;
    windEl.textContent = `Wind Speed: ${data.current.wind_kph} kph`;
    weatherIconEl.src = data.current.condition.icon;
    weatherIconEl.alt = data.current.condition.text;

    weatherInfo.style.display = "block";

    updateBackground(data.current.condition.text.toLowerCase());
  } catch (e) {
    alert(e.message);
    weatherInfo.style.display = "none";
    weatherAnimationEl.innerHTML = "";
    document.body.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
  }
}

// Event listeners
searchBtn.addEventListener("click", () => {
  getWeather(searchInput.value.trim());
});
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather(searchInput.value.trim());
});

// Voice search functionality
voiceBtn.addEventListener("click", () => {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Your browser does not support voice recognition.");
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start();

  voiceBtn.textContent = "🎙️...";

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    getWeather(transcript);
    voiceBtn.textContent = "🎤";
  };

  recognition.onerror = (event) => {
    alert('Voice recognition error: ' + event.error);
    voiceBtn.textContent = "🎤";
  };

  recognition.onend = () => {
    voiceBtn.textContent = "🎤";
  };
});

// Background animations

function updateBackground(condition) {
  weatherAnimationEl.innerHTML = "";
  document.body.style.background = "linear-gradient(135deg, #667eea, #764ba2)";

  const rainWords = ["rain", "drizzle", "shower"];
  const thunderWords = ["thunder", "storm", "lightning"];
  const snowWords = ["snow", "sleet", "blizzard"];
  const sunWords = ["sunny", "clear"];
  const cloudWords = ["cloud", "overcast", "fog", "mist", "haze"];

  if (rainWords.some(w => condition.includes(w))) createRain();
  else if (thunderWords.some(w => condition.includes(w))) createThunder();
  else if (snowWords.some(w => condition.includes(w))) createSnow();
  else if (sunWords.some(w => condition.includes(w))) createSun();
  else if (cloudWords.some(w => condition.includes(w))) createCloud();
  else createSun();
}

function createRain() {
  document.body.style.background = "linear-gradient(135deg, #485563, #29323c)";
  for (let i = 0; i < 150; i++) {
    const drop = document.createElement("div");
    drop.classList.add("raindrop");
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = 0.5 + Math.random() * 0.7 + "s";
    drop.style.animationDelay = Math.random() * 5 + "s";
    drop.style.height = 10 + Math.random() * 20 + "px";
    weatherAnimationEl.appendChild(drop);
  }
}

function createSnow() {
  document.body.style.background = "linear-gradient(135deg, #4e6372, #28343a)";
  for (let i = 0; i < 100; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    const size = 5 + Math.random() * 10;
    snowflake.style.width = size + "px";
    snowflake.style.height = size + "px";
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.animationDuration = 5 + Math.random() * 5 + "s";
    snowflake.style.animationDelay = Math.random() * 10 + "s";
    weatherAnimationEl.appendChild(snowflake);
  }
}

function createThunder() {
  document.body.style.background = "linear-gradient(135deg, #000000, #434343)";
  const flash = document.createElement("div");
  flash.classList.add("flash");
  weatherAnimationEl.appendChild(flash);
}

function createSun() {
  document.body.style.background = "linear-gradient(135deg, #f6d365, #fda085)";
  // Sun and rays animation can be added here if needed
}

function createCloud() {
  document.body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
  const cloud1 = document.createElement("div");
  cloud1.classList.add("cloud", "cloud1");
  const cloud2 = document.createElement("div");
  cloud2.classList.add("cloud", "cloud2");
  weatherAnimationEl.appendChild(cloud1);
  weatherAnimationEl.appendChild(cloud2);
}
