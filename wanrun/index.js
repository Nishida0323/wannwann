let map;
let markersLayer = L.layerGroup();
let userLocationLayer = L.layerGroup();
let currentLat = 35.6812;
let currentLng = 139.7671;
let currentAreaCode = "130000";

let allFacilities = [];
let maxDistanceKm = 60;
let currentPriority = "auto";
let searchQuery = "";

let weatherMode = "auto";
let currentWeather = {
  condition: "clear",
  temp: 22,
  pop: 10,
  text: "晴れ"
};

const builtinDogParks = [
  { id: "tk-01", name: "代々木公園 ドッグラン", lat: 35.6710, lng: 139.6950, isIndoor: false, isFree: true, isHighway: false, hours: "日の出 - 日没", fee: "無料 (要利用登録)", address: "東京都渋谷区代々木神園町2-1" },
  { id: "tk-02", name: "駒沢オリンピック公園 ドッグラン", lat: 35.6263, lng: 139.6602, isIndoor: false, isFree: true, isHighway: false, hours: "24時間開放", fee: "無料 (登録制)", address: "東京都世田谷区駒沢公園1-1" },
  { id: "tk-03", name: "木場公園 ドッグラン", lat: 35.6762, lng: 139.8080, isIndoor: false, isFree: true, isHighway: false, hours: "24時間開放", fee: "無料 (登録制)", address: "東京都江東区木場4-1" },
  { id: "tk-04", name: "芝浦中央公園 ドッグラン", lat: 35.6322, lng: 139.7435, isIndoor: false, isFree: true, isHighway: false, hours: "07:00 - 17:00", fee: "無料 (港区登録)", address: "東京都港区港南1-2-28" },
  { id: "tk-05", name: "愛犬ヴィレッジ 新宿店", lat: 35.6980, lng: 139.7090, isIndoor: true, isFree: false, isHighway: false, hours: "11:00 - 20:00", fee: "1時間 ¥1,200", address: "東京都新宿区大久保1-10-10" },
  { id: "tk-06", name: "WAN-BASE 中目黒", lat: 35.6450, lng: 139.7100, isIndoor: true, isFree: false, isHighway: false, hours: "11:00 - 19:00", fee: "1時間 ¥1,000", address: "東京都目黒区中目黒1丁目" },
  { id: "tk-07", name: "城北中央公園 ドッグラン", lat: 35.7592, lng: 139.6740, isIndoor: false, isFree: true, isHighway: false, hours: "24時間開放", fee: "無料 (登録制)", address: "東京都練馬区氷川台1-3-1" },
  { id: "tk-08", name: "立川昭和記念公園 ドッグラン", lat: 35.7118, lng: 139.3942, isIndoor: false, isFree: false, isHighway: false, hours: "09:30 - 17:00", fee: "入園料のみ(施設無料)", address: "東京都立川市緑町3173" },
  { id: "tk-09", name: "カインズ昭島店 ドッグラン", lat: 35.7142, lng: 139.3621, isIndoor: false, isFree: true, isHighway: false, hours: "09:00 - 20:00", fee: "無料 (カインズ会員)", address: "東京都昭島市つつじが丘2-8-55" },
  { id: "tk-10", name: "辰巳の森海浜公園 ドッグラン", lat: 35.6475, lng: 139.8142, isIndoor: false, isFree: true, isHighway: false, hours: "09:00 - 17:00", fee: "無料 (登録制)", address: "東京都江東区辰巳2-1-35" },
  { id: "tk-11", name: "小金井公園 ドッグラン", lat: 35.7163, lng: 139.5245, isIndoor: false, isFree: true, isHighway: false, hours: "24時間開放", fee: "無料 (登録制)", address: "東京都小金井市関野町1-13-1" },
  { id: "tk-12", name: "水元公園 ドッグラン", lat: 35.7904, lng: 139.8702, isIndoor: false, isFree: true, isHighway: false, hours: "24時間開放", fee: "無料 (登録制)", address: "東京都葛飾区水元公園3-2" },

  { id: "kn-01", name: "新横浜公園 ドッグラン", lat: 35.5100, lng: 139.6050, isIndoor: false, isFree: false, isHighway: false, hours: "09:30 - 17:00", fee: "1頭 ¥500", address: "神奈川県横浜市港北区小机町3300" },
  { id: "kn-02", name: "WANCOTT 横浜", lat: 35.4410, lng: 139.6450, isIndoor: true, isFree: false, isHighway: false, hours: "10:00 - 19:00", fee: "1時間 ¥1,650", address: "神奈川県横浜市中区山下町168-1" },
  { id: "kn-03", name: "東名高速 EXPASA海老名(下り) ドッグラン", lat: 35.4347, lng: 139.3942, isIndoor: false, isFree: true, isHighway: true, hours: "24時間開放", fee: "完全無料", address: "神奈川県海老名市大谷南5-2-1" },
  { id: "kn-04", name: "東名高速 港北PA(下り) ドッグラン", lat: 35.5262, lng: 139.5695, isIndoor: false, isFree: true, isHighway: true, hours: "24時間開放", fee: "完全無料", address: "神奈川県横浜市緑区西八朔町" },
  { id: "kn-05", name: "寄七つ星ドッグラン", lat: 35.3995, lng: 139.1170, isIndoor: false, isFree: false, isHighway: false, hours: "09:00 - 17:00", fee: "犬1頭 ¥440 / 大人¥330", address: "神奈川県足柄上郡松田町寄5605" },

  { id: "cb-01", name: "カインズ幕張店 ドッグラン", lat: 35.6560, lng: 140.0210, isIndoor: false, isFree: true, isHighway: false, hours: "09:00 - 20:00", fee: "無料 (会員制)", address: "千葉県習志野市芝園1-2-1" },
  { id: "cb-02", name: "館山道 市原SA(上り) ドッグラン", lat: 35.4850, lng: 140.1120, isIndoor: false, isFree: true, isHighway: true, hours: "24時間開放", fee: "完全無料", address: "千葉県市原市海保" },
  { id: "st-01", name: "道満ドッグラン (彩湖グリーンパーク)", lat: 35.8180, lng: 139.6150, isIndoor: false, isFree: false, isHighway: false, hours: "10:00 - 17:00", fee: "1頭 ¥550", address: "埼玉県戸田市重瀬745" },
  { id: "st-02", name: "カインズ浦和美園店 ドッグラン", lat: 35.8980, lng: 139.7250, isIndoor: false, isFree: true, isHighway: false, hours: "09:00 - 20:00", fee: "無料 (会員制)", address: "埼玉県さいたま市緑区美園1-11-1" },
  { id: "st-03", name: "関越道 高坂SA(上り/下り) ドッグラン", lat: 35.9980, lng: 139.3870, isIndoor: false, isFree: true, isHighway: true, hours: "24時間開放", fee: "完全無料", address: "埼玉県東松山市田木" },

  { id: "os-01", name: "花博記念公園 鶴見緑地ドッグラン", lat: 34.7110, lng: 135.5780, isIndoor: false, isFree: true, isHighway: false, hours: "09:00 - 17:30", fee: "完全無料", address: "大阪府大阪市鶴見区緑地公園" },
  { id: "os-02", name: "GRASS DOG & CAT (うめきた)", lat: 34.7042, lng: 135.4950, isIndoor: true, isFree: false, isHighway: false, hours: "10:00 - 20:00", fee: "1時間 ¥1,100", address: "大阪府大阪市北区大深町4-20" },
  { id: "os-03", name: "住吉公園 ドッグラン", lat: 34.6140, lng: 135.4880, isIndoor: false, isFree: true, isHighway: false, hours: "終日開放", fee: "完全無料", address: "大阪府大阪市住之江区浜口東1-1-13" },
  { id: "os-04", name: "カインズ東大阪店 ドッグラン", lat: 34.6780, lng: 135.6020, isIndoor: true, isFree: true, isHighway: false, hours: "09:30 - 20:00", fee: "無料 (屋根付き/会員制)", address: "大阪府東大阪市稲田新町3-9-64" },
  { id: "os-05", name: "名神高速 吹田SA(上り) ドッグラン", lat: 34.7700, lng: 135.5260, isIndoor: false, isFree: true, isHighway: true, hours: "24時間開放", fee: "完全無料", address: "大阪府吹田市岸部北4-8-1" },
  { id: "hy-01", name: "HAT神戸 脇の浜人工芝ドッグラン", lat: 34.6980, lng: 135.2150, isIndoor: false, isFree: true, isHighway: false, hours: "終日開放", fee: "完全無料", address: "兵庫県神戸市中央区脇浜海岸通" },
  { id: "hy-02", name: "山陽道 三木SA(上り/下り) ドッグラン", lat: 34.8140, lng: 134.9810, isIndoor: false, isFree: true, isHighway: true, hours: "24時間開放", fee: "完全無料", address: "兵庫県三木市大村大門" },

  { id: "ac-01", name: "庄内緑地 ドッグラン", lat: 35.2155, lng: 136.8920, isIndoor: false, isFree: true, isHighway: false, hours: "09:00 - 16:45", fee: "無料 (要登録)", address: "愛知県名古屋市西区山田町" },
  { id: "ac-02", name: "ディスワン八事店 インドアガーデン", lat: 35.1380, lng: 136.9630, isIndoor: true, isFree: false, isHighway: false, hours: "10:00 - 19:00", fee: "1時間 ¥800", address: "愛知県名古屋市昭和区広路町" },
  { id: "ac-03", name: "伊勢湾岸道 刈谷ハイウェイオアシス", lat: 35.0390, lng: 137.0340, isIndoor: false, isFree: true, isHighway: true, hours: "07:00 - 22:00", fee: "完全無料", address: "愛知県刈谷市東境町吉野55" },
  { id: "hk-01", name: "モエレ沼公園 周辺広場", lat: 43.1230, lng: 141.4250, isIndoor: false, isFree: true, isHighway: false, hours: "07:00 - 19:00", fee: "完全無料", address: "北海道札幌市東区モエレ沼公園" },
  { id: "fk-01", name: "国営 海の中道海浜公園 ドッグラン", lat: 33.6600, lng: 130.3600, isIndoor: false, isFree: false, isHighway: false, hours: "09:30 - 17:30", fee: "入園料のみ(施設無料)", address: "福岡県福岡市東区西戸崎" },
  { id: "fk-02", name: "九州道 古賀SA(上り/下り) ドッグラン", lat: 33.7250, lng: 130.4900, isIndoor: false, isFree: true, isHighway: true, hours: "24時間開放", fee: "完全無料", address: "福岡県古賀市筵内" }
];

const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter"
];

function calcDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c * 10) / 10;
}

window.addEventListener("DOMContentLoaded", () => {
  initMap();
  allFacilities = [...builtinDogParks];
  applyFiltersAndRender();
  fetchWeatherData(currentAreaCode);
  fetchOnlineFacilities(currentLat, currentLng);
});

function initMap() {
  map = L.map('map', { zoomControl: false }).setView([currentLat, currentLng], 12);
  L.control.zoom({ position: 'topright' }).addTo(map);

  L.tileLayer('https://tile.openstreetmap.jp/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  markersLayer.addTo(map);
  userLocationLayer.addTo(map);
  updateUserLocationMarker(currentLat, currentLng);
}

function updateUserLocationMarker(lat, lng) {
  userLocationLayer.clearLayers();
  const pulseIcon = L.divIcon({
    className: 'user-location-pulse',
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
  L.marker([lat, lng], { icon: pulseIcon }).addTo(userLocationLayer)
    .bindPopup("<b style='font-size:12px;'>現在地</b>");
}

async function fetchOnlineFacilities(lat, lng) {
  const spinner = document.getElementById("loading-spinner");
  const badge = document.getElementById("data-source-badge");
  spinner.classList.remove("hidden");

  const query = `[out:json][timeout:15];
(
  node["leisure"="dog_park"](around:25000, ${lat}, ${lng});
  way["leisure"="dog_park"](around:25000, ${lat}, ${lng});
  node["amenity"="dog_cafe"](around:25000, ${lat}, ${lng});
);
out center 60;`;

  let fetchedData = null;
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 16000);

      const res = await fetch(endpoint, {
        method: 'POST',
        body: 'data=' + encodeURIComponent(query),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        fetchedData = await res.json();
        break;
      }
    } catch (e) {
      continue;
    }
  }

  spinner.classList.add("hidden");

  if (fetchedData && fetchedData.elements && fetchedData.elements.length > 0) {
    const osmItems = fetchedData.elements.map((el, i) => {
      const itemLat = el.lat || (el.center && el.center.lat);
      const itemLng = el.lon || (el.center && el.center.lon);
      const tags = el.tags || {};
      let name = tags.name || tags["name:ja"] || `ドッグランスポット #${i+1}`;
      const isIndoor = tags.covered === 'yes' || tags.indoor === 'yes' || /室内|インドア/.test(name);
      const isFree = tags.fee === 'no' || !tags.fee;
      const isHighway = /SA|PA|サービスエリア|パーキングエリア/.test(name);

      return {
        id: `osm-${el.id}`,
        name: name,
        lat: itemLat,
        lng: itemLng,
        isIndoor: isIndoor,
        isFree: isFree,
        isHighway: isHighway,
        hours: tags.opening_hours || "現地または公式にて確認",
        fee: isFree ? "無料 (または現地要確認)" : "有料施設",
        address: tags["addr:full"] || tags["addr:city"] || "所在地情報なし (地図を参照)"
      };
    }).filter(item => item.lat && item.lng);

    const merged = [...builtinDogParks];
    osmItems.forEach(item => {
      if (!merged.some(m => Math.abs(m.lat - item.lat) < 0.003 && Math.abs(m.lng - item.lng) < 0.003)) {
        merged.push(item);
      }
    });
    allFacilities = merged;
    badge.textContent = `オンライン拡充済 (+${osmItems.length}件)`;
    badge.className = "bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[9px] font-semibold";
  } else {
    allFacilities = [...builtinDogParks];
    badge.textContent = "標準データベース稼働中";
    badge.className = "bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-[9px] font-semibold";
  }

  applyFiltersAndRender();
}

function refreshFacilities(lat, lng) {
  showToast("周辺データを再探索しています...");
  fetchOnlineFacilities(lat, lng);
}

async function fetchWeatherData(areaCode) {
  try {
    const res = await fetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/${areaCode}.json`);
    if (!res.ok) throw new Error("JMA fetch error");
    const data = await res.json();

    const weatherSeries = data[0]?.timeSeries[0]?.areas[0];
    const popSeries = data[0]?.timeSeries[1]?.areas[0];
    const tempSeries = data[0]?.timeSeries[2]?.areas[0];

    const weatherText = weatherSeries?.weathers?.[0] || "晴れ";
    const popValue = parseInt(popSeries?.pops?.[0] || "10", 10);
    let tempValue = 22;
    if (tempSeries?.temps && tempSeries.temps.length > 0) {
      tempValue = parseInt(tempSeries.temps[tempSeries.temps.length - 1], 10) || 22;
    }

    let condition = "clear";
    if (weatherText.includes("雨")) condition = "rain";
    else if (weatherText.includes("曇")) condition = "cloudy";

    currentWeather = {
      condition: condition,
      temp: tempValue,
      pop: popValue,
      text: weatherText
    };

    if (weatherMode === "auto") {
      applyWeatherUI();
      triggerWeatherNotification();
    }
  } catch (err) {
    currentWeather = { condition: "clear", temp: 22, pop: 10, text: "晴れ" };
    if (weatherMode === "auto") applyWeatherUI();
  }
}

function triggerWeatherNotification() {
  if (currentWeather.condition === "rain" || currentWeather.pop >= 60) {
    showToast("🌧️ 雨天検知: 濡れずに遊べる「室内・屋根付き」ドッグランを優先表示しています");
  } else if (currentWeather.temp >= 30) {
    showToast("⚠️ 猛暑アラート: 路面温度が高温です！室内ドッグランを推奨します");
  }
}

function applyWeatherUI() {
  const bannerStatus = document.getElementById("weather-status");
  const bannerTemp = document.getElementById("banner-temp");
  const bannerPop = document.getElementById("banner-pop");
  const weatherIcon = document.getElementById("weather-icon");
  const pavementStatus = document.getElementById("pavement-status");
  const heatBadge = document.getElementById("heat-badge");

  bannerTemp.textContent = `気温 ${currentWeather.temp}℃`;
  bannerPop.textContent = `降水 ${currentWeather.pop}%`;
  bannerStatus.textContent = currentWeather.text;

  let pavementTemp = currentWeather.temp;
  if (currentWeather.condition === "clear") {
    pavementTemp = Math.round(currentWeather.temp * 1.35 + 5);
    weatherIcon.textContent = "☀️";
  } else if (currentWeather.condition === "cloudy") {
    pavementTemp = Math.round(currentWeather.temp * 1.1 + 2);
    weatherIcon.textContent = "☁️";
  } else {
    pavementTemp = currentWeather.temp;
    weatherIcon.textContent = "🌧️";
  }

  pavementStatus.innerHTML = `🐾 <span>路面推定温度: 約${pavementTemp}℃</span>`;

  if (pavementTemp >= 45 || currentWeather.temp >= 33) {
    heatBadge.textContent = "⚠️ 火傷・熱中症危険！室内推奨";
    heatBadge.className = "px-1.5 py-0.2 rounded font-bold text-[9px] bg-red-600 text-white animate-pulse";
  } else if (pavementTemp >= 38 || currentWeather.temp >= 28) {
    heatBadge.textContent = "⚡ 日陰・夕方以降を推奨";
    heatBadge.className = "px-1.5 py-0.2 rounded font-bold text-[9px] bg-amber-600 text-white";
  } else {
    heatBadge.textContent = "安全にお散歩可能";
    heatBadge.className = "px-1.5 py-0.2 rounded font-bold text-[9px] bg-emerald-600 text-white";
  }

  applyFiltersAndRender();
}

function applyFiltersAndRender() {
  let list = allFacilities.map(f => {
    const d = calcDistance(currentLat, currentLng, f.lat, f.lng);
    return { ...f, distance: d };
  });

  if (maxDistanceKm < 900) {
    list = list.filter(f => f.distance <= maxDistanceKm);
  }

  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase();
    list = list.filter(f => 
      f.name.toLowerCase().includes(q) ||
      f.address.toLowerCase().includes(q)
    );
  }

  const isBadWeather = currentWeather.condition === "rain" || currentWeather.temp >= 30 || currentWeather.pop >= 60;