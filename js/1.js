// --- CONFIGURACIÓN (URLs base) ---
const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

// --- FUNCIONES LÓGICAS (Consumo de APIs) ---

// Función 1: Traduce nombre de ciudad a Coordenadas y País
const obtenerCoordenadas = async (ciudad) => {
    const respuesta = await fetch(`${GEO_API}?name=${ciudad}&count=1&language=es&format=json`);
    const data = await respuesta.json();
    return data.results ? data.results[0] : null; 
};

// Función 2: Obtiene el clima usando las coordenadas
const obtenerClima = async (lat, lon) => {
    const respuesta = await fetch(`${WEATHER_API}?latitude=${lat}&longitude=${lon}&current=temperature_2m`);
    const data = await respuesta.json();
    return data.current.temperature_2m;
};

// --- FUNCIÓN PRINCIPAL (Orquestadora) ---
const mostrarClimaDeCiudad = async (nombreCiudad) => {
    try {
        const lugar = await obtenerCoordenadas(nombreCiudad);
        
        if (!lugar) throw new Error("Ciudad no encontrada");

        const temperatura = await obtenerClima(lugar.latitude, lugar.longitude);
        
        console.log(`En ${lugar.name}, ${lugar.country}, hace ${temperatura}°C.`);
    } catch (error) {
        console.error("Error en la app:", error.message);
    }
};

// Uso:
mostrarClimaDeCiudad("Buenos Aires");