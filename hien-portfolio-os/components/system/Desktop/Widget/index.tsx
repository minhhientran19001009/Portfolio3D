import { useEffect, useState } from "react";
import StyledWidget from "components/system/Desktop/Widget/StyledWidget";

interface WttrArea {
  areaName: { value: string }[];
  country: { value: string }[];
}

interface WttrCondition {
  humidity: string;
  temp_C: string;
  weatherDesc: { value: string }[];
  windspeedKmph: string;
}

interface WttrResponse {
  current_condition: WttrCondition[];
  nearest_area: WttrArea[];
}

const WEATHER_CONDITIONS = [
  { humidity: 62, icon: "⛅", tempRange: [29, 33], text: "Nắng nhẹ", wind: 10 },
  { humidity: 55, icon: "☀️", tempRange: [31, 35], text: "Trời trong xanh", wind: 12 },
  { humidity: 70, icon: "☁️", tempRange: [28, 31], text: "Nhiều mây", wind: 8 },
  { humidity: 85, icon: "🌧️", tempRange: [26, 29], text: "Có mưa rào", wind: 15 },
];

const getSeededValue = (seed: string, min: number, max: number): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    const codePoint = seed.codePointAt(i) || 0;
    hash = (hash * 31 + codePoint) % 1_000_000;
  }
  const range = max - min + 1;
  const val = hash % range;
  return min + val;
};

const getWeatherIcon = (desc: string): string => {
  const d = desc.toLowerCase();
  if (d.includes("sunny") || d.includes("clear")) return "☀️";
  if (d.includes("partly") || d.includes("intervals")) return "⛅";
  if (d.includes("rain") || d.includes("shower") || d.includes("drizzle")) {
    return "🌧️";
  }
  if (d.includes("thunder") || d.includes("storm")) return "⛈️";
  if (d.includes("snow") || d.includes("ice")) return "❄️";
  if (
    d.includes("cloudy") ||
    d.includes("overcast") ||
    d.includes("haze") ||
    d.includes("mist")
  ) {
    return "☁️";
  }
  return "⛅";
};

const translateLocation = (loc: string): string => {
  const l = loc.toLowerCase();
  if (l.includes("ho chi minh") || l.includes("saigon")) return "TP. Hồ Chí Minh";
  if (l.includes("hanoi")) return "Hà Nội";
  if (l.includes("da nang")) return "Đà Nẵng";
  if (l.includes("hai phong")) return "Hải Phòng";
  if (l.includes("nha trang")) return "Nha Trang";
  if (l.includes("hue")) return "Huế";
  if (l.includes("can tho")) return "Cần Thơ";
  return loc;
};

const DesktopWidget: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<Date>(new Date());
  const [uptime, setUptime] = useState<number>(0);
  const [location, setLocation] = useState<string>("Hà Nội, VN");
  const [weather, setWeather] = useState({
    humidity: 62,
    icon: "⛅",
    temp: 32,
    text: "Nắng nhẹ",
    wind: 10,
  });

  const currentHour = time.getHours();
  const currentDay = time.getDate();
  const currentMonth = time.getMonth();
  const currentYear = time.getFullYear();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Time & Uptime ticks
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setUptime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Weather update fetching from wttr.in with local deterministic fallback
  useEffect(() => {
    let active = true;

    // Fetching without city name enables wttr.in IP geolocation
    fetch("https://wttr.in/?format=j1")
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        const response = data as WttrResponse;
        const current = response?.current_condition?.[0];
        if (current) {
          const desc = current.weatherDesc?.[0]?.value || "Nắng nhẹ";
          const tempC = Number(current.temp_C) || 32;
          const humidityVal = Number(current.humidity) || 60;
          const windVal = Number(current.windspeedKmph) || 10;

          const area = response?.nearest_area?.[0];
          const areaName = area?.areaName?.[0]?.value || "Hà Nội";
          const country = area?.country?.[0]?.value || "Vietnam";
          const formattedLocation = `${translateLocation(areaName)}, ${
            country === "Vietnam" ? "VN" : country
          }`;

          // simple translation of conditions for retro look
          let descVn = desc;
          const lowerDesc = desc.toLowerCase();
          if (lowerDesc.includes("sunny")) descVn = "Trời nắng";
          else if (lowerDesc.includes("clear")) descVn = "Trời quang";
          else if (lowerDesc.includes("partly cloudy")) descVn = "Ít mây";
          else if (lowerDesc.includes("cloudy")) descVn = "Nhiều mây";
          else if (lowerDesc.includes("overcast")) descVn = "U ám";
          else if (lowerDesc.includes("rain")) descVn = "Có mưa";
          else if (lowerDesc.includes("drizzle")) descVn = "Mưa phùn";
          else if (lowerDesc.includes("thunder")) descVn = "Có giông";
          else if (lowerDesc.includes("mist") || lowerDesc.includes("fog")) {
            descVn = "Có sương mù";
          } else if (lowerDesc.includes("haze")) {
            descVn = "Sương mù nhẹ";
          }

          setLocation(formattedLocation);
          setWeather({
            humidity: humidityVal,
            icon: getWeatherIcon(desc),
            temp: tempC,
            text: descVn,
            wind: windVal,
          });
        }
      })
      .catch(() => {
        if (!active) return;
        // Fallback to offline deterministic local generation
        let conditionIndex = 3;
        if (currentHour >= 6 && currentHour < 12) {
          conditionIndex = 0;
        } else if (currentHour >= 12 && currentHour < 17) {
          conditionIndex = 1;
        } else if (currentHour >= 17 && currentHour < 22) {
          conditionIndex = 2;
        }

        const cond = WEATHER_CONDITIONS[conditionIndex];
        const seed = `hanoi-${currentYear}-${currentMonth}-${currentDay}-${currentHour}`;

        const tempVal = getSeededValue(
          `${seed}-temp`,
          cond.tempRange[0],
          cond.tempRange[1]
        );
        const humidityVal = getSeededValue(
          `${seed}-humidity`,
          cond.humidity - 3,
          cond.humidity + 3
        );
        const windVal = getSeededValue(
          `${seed}-wind`,
          cond.wind - 2,
          cond.wind + 2
        );

        setLocation("Hà Nội, VN");
        setWeather({
          humidity: humidityVal,
          icon: cond.icon,
          temp: tempVal,
          text: cond.text,
          wind: windVal,
        });
      });

    return () => {
      active = false;
    };
  }, [currentHour, currentDay, currentMonth, currentYear]);

  if (!mounted) return null;

  // Format Time (HH:MM:SS)
  const formatTime = (date: Date): string =>
    date.toLocaleTimeString("en-US", { hour12: false });

  // Format Date (Vietnamese style)
  const formatDate = (date: Date): string =>
    new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      weekday: "long",
      year: "numeric",
    }).format(date);

  // Format Uptime (Hh Mm Ss)
  const formatUptime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `Uptime: ${h}h ${m}m ${s}s`;
  };

  return (
    <StyledWidget>
      <div className="widget-header">
        <span>Active Desktop</span>
        <span className="active-dot" title="Hệ thống trực tuyến" />
      </div>

      {/* Date & Time Section */}
      <div className="widget-section">
        <div className="time-display">{formatTime(time)}</div>
        <div className="date-display">{formatDate(time)}</div>
        <div className="uptime-display" style={{ marginTop: "6px", paddingTop: "4px", borderTop: "1px dashed rgba(255, 255, 255, 0.15)" }}>{formatUptime(uptime)}</div>
      </div>

      {/* Weather Section */}
      <div className="widget-section">
        <div className="weather-display">
          <div className="weather-left">
            <span className="location">{location}</span>
            <span className="condition">{weather.text}</span>
          </div>
          <div className="weather-right">
            <span className="temp">{weather.temp}°C</span>
            <span className="weather-icon">{weather.icon}</span>
          </div>
        </div>
        <div className="weather-details">
          <span>Độ ẩm: {weather.humidity}%</span>
          <span>Sức gió: {weather.wind} km/h</span>
        </div>
      </div>
    </StyledWidget>
  );
};

export default DesktopWidget;
