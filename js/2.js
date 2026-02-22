// 1. Agregamos 'weather_code' a la URL
const url = "https://api.open-meteo.com/v1/forecast?latitude=19.43&longitude=-99.13&current=temperature_2m,weather_code";

const consultarClima = async () => {
    const res = await fetch(url);
    const data = await res.json();
    
    const codigo = data.current.weather_code;
    const temp = data.current.temperature_2m;

    // 2. Usamos un objeto para "traducir" el código real a texto
    const estadosClima = {
        0: "Soleado",
        1: "Casi despejado",
        2: "Parcialmente nublado",
        3: "Nublado",
        45: "Niebla",
        61: "Lluvia ligera",
        95: "Tormenta eléctrica"
    };

    // 3. Obtenemos la descripción (si el código no está en la lista, ponemos "Desconocido")
    const estadoActual = estadosClima[codigo] || "Clima variado";

    console.log(`Clima actual: ${estadoActual} con ${temp}°C`);
};

consultarClima();