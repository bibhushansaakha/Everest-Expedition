const weatherConditions = ['Clear', 'Cloudy', 'Snowy', 'Stormy'];

export const weatherGenerator = {
  generateWeather: () => {
    const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const temperature = Math.floor(Math.random() * (-10 - (-30) + 1) + (-30)); // -30°C to -10°C
    const windSpeed = Math.floor(Math.random() * (80 - 10 + 1) + 10); // 10 km/h to 80 km/h
    const visibility = Math.floor(Math.random() * (2000 - 100 + 1) + 100); // 100m to 2000m

    return {
      condition,
      temperature,
      windSpeed,
      visibility,
    };
  },
};
