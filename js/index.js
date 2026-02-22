
const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

const input = document.getElementById("inputCiudad");
const btnBuscar = document.getElementById("btnBuscar");
const containerClima = document.getElementById("containerClima");


const obtenercoordenadas = async(ciudad)=>{
    
    const respuesta = await fetch(`${GEO_API}?name=${ciudad}&count=1&language=es&format=json`);
    const data = await respuesta.json();
    return data.results ? data.results[0] : null;

}

const obtenerClima = async(lat,lon)=>{
    const respuesta = await fetch(`${WEATHER_API}?latitude=${lat}&longitude=${lon}&current=temperature_2m`);
    const data = await respuesta.json();
    return{ temperatura: data.current.temperature_2m,
            codigo: data.current.weather_code 
    };

}

const obtenerDescripcion = (codigo) => {
    codigo = Number(codigo);
    if (codigo === 0) return "☀️ Despejado";
    if (codigo <= 3) return "⛅ Parcialmente nublado";
    if (codigo <= 48) return "☁️ Nublado / Niebla";
    if (codigo <= 67) return "🌧️ Lluvia";
    if (codigo <= 77) return "🌨️ Nieve";
    if (codigo <= 82) return "🌦️ Chubascos";
    return "⛈️ Tormenta";
}
    

const mostrarClimaDeCiudad = async()=>{

    const nombreCiudad = input.value.trim();

    if(nombreCiudad === ""){
        containerClima.innerHTML = `<p class="error">Escribe el nombre de una ciudad</p>`;
        return;
    }

    try {

        containerClima.innerHTML = `<p class="cargando">Cargando clima...</p>`;

        const lugar = await obtenercoordenadas(nombreCiudad);

        if(!lugar) throw new Error("Ciudad no encontrada");
        
        const {temperatura, codigo} = await obtenerClima(lugar.latitude, lugar.longitude);
        const descripcion = obtenerDescripcion(codigo);

        containerClima.style.display = "flex";
        
        containerClima.innerHTML = `<h2>Clima en ${lugar.name}.</h2>
                                    <span class="pais"><b>País:</b> ${lugar.country}</span>
                                    <span class="descripcion"><b>Estado:</b> ${descripcion}</span>
                                    <span class="temperatura"><b>Temperatura:</b> ${temperatura}°C</span>
                                    <span class="latlon"><b>Latitud:</b> ${lugar.latitude}, <b>Longitud:</b> ${lugar.longitude}</span>`;
                                    


    } catch (error) {
        console.log("Error en la app", error.message);
        containerClima.innerHTML = `<p class="error">${error.message}</p>`;
        
    }
}


btnBuscar.addEventListener("click", mostrarClimaDeCiudad );
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") mostrarClimaDeCiudad();
});