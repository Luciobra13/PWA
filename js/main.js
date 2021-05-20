const url = 'https://openweathermap.org/api';
const API_KEY ='';
const aC = 'https://api.openweathermap.org/data/2.5/weather';
const api_key_map = "";

const btn = document.getElementById('enviar');
const cuerpo = document.getElementById('cuerpo');
const inputElement = document.getElementById('buscar');
const ciudad = document.querySelector('.ciudad');
const tiempo = document.querySelector('.tiempo');
const detalle = document.querySelector('.details');
const temperatura = document.querySelector('.temperatura');
const maxima = document.querySelector('.max');
const minima = document.querySelector('.min');
const humedad = document.querySelector('.hum');
const termica = document.querySelector('.st');
const presion = document.querySelector('.presion');
const viento = document.querySelector('.viento');
const mapa = document.querySelector('.map');

btn.addEventListener("click", () =>{
buscarClima(inputElement.value);
 })
 
function buscarClima(ciudadBuscada){
    console.log ('Palabra', ciudadBuscada);
    
    const fetchPromise = fetch(`${aC}?appid=${API_KEY}&q=${ciudadBuscada}&units=metric&lang=es`);	
    
    fetchPromise.then(response => {
       // console.log ('result', response);
        return response.json();
    }).then(result => {
        console.log('data', result);
		imprimir(result);
    }).catch(err => {
		console.log('fallo!: ', err);
    });
    
  }



function imprimir(result) {
	console.log(result);
	
	var cityBuscada = result.name;
	var temp = result.main.temp;
	var tempMax = result.main.temp_max;
	var tempMin = result.main.temp_min;
	var humi = result.main.humidity;
	var sensa = result.main.feels_like;
	var press = result.main.pressure;
	var aire = result.wind.speed * 3.6;
	var titulo = result.weather[0].description;
	var logo = result.weather[0].icon;
	console.log (logo);
	
	tiempo.src = 'http://openweathermap.org/img/wn/'+logo+'@2x.png';
	
	detalle.alt = titulo;
	ciudad.innerHTML = cityBuscada;
	temperatura.innerHTML = temp;
	maxima.innerHTML = tempMax;
	minima.innerHTML = tempMin;
	humedad.innerHTML = humi;
	termica.innerHTML = sensa;
	presion.innerHTML = press;
	viento.innerHTML = aire;
	detalle.innerHTML = titulo;
	mapa.src = "https://www.google.com/maps/embed/v1/place?key="+api_key_map+ "&q=" + cityBuscada;
	
	var clima = {
	"icono": logo,
	"ciudad": cityBuscada,
	"descripcion": titulo,
	"temperatura": temp,
	"temp_maxima": tempMax,
	"temp_minima": tempMin,
	"sentacion_termica": sensa,
	"humedad": humi,
	"presion": press,
	"viento": aire
};
	console.log(clima);
localStorage.setItem('datos', JSON.stringify(clima));	
}








window.onload = function () {
	var objet = JSON.parse(localStorage.getItem('datos'));
	console.log(objet);
	
	tiempo.src = 'http://openweathermap.org/img/wn/'+objet.icono+'@2x.png'
	ciudad.innerHTML = objet.ciudad;
	temperatura.innerHTML = objet.temperatura;
	maxima.innerHTML = objet.temp_maxima;
	minima.innerHTML = objet.temp_minima;
	humedad.innerHTML = objet.humedad;
	termica.innerHTML = objet.sentacion_termica;
	presion.innerHTML = objet.presion;
	viento.innerHTML = objet.viento;
	detalle.innerHTML = objet.descripcion;
	detalle.alt = objet.descripcion;
	mapa.src = "https://www.google.com/maps/embed/v1/place?key=&q=" + objet.ciudad;
	
} 