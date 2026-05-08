function initGeolocation() {
  const message = document.getElementById("message");
  const btn = document.getElementById("locateBtn");
  if (!message || !btn) return;

  btn.addEventListener("click", function () {
    message.textContent = "Detecting location…";
    if (!navigator.geolocation) { message.textContent = "Geolocation not supported."; return; }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        try {
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
          if (!res.ok) throw new Error("API failed");
          const data = await res.json();
          const city = data.city || data.locality || data.principalSubdivision || "your area";
          message.textContent = `📍 Browsing from ${city}`;
        } catch {
          message.textContent = `📍 ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        }
      },
      (err) => {
        const msgs = { 1: "Permission denied.", 2: "Location unavailable.", 3: "Request timed out." };
        message.textContent = msgs[err.code] || "Location error.";
      }
    );
  });
}
