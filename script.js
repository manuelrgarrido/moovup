function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function calculateNauticalMiles(lat1, lon1, lat2, lon2) {
  const R = 3440; 

  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  const distance = R * c;

  return distance;
}

function calcularDistancia() {
  var origem = document.getElementById('origem').value.replace(/[^\d,-.]/g, '').split(',');
  var destino = document.getElementById('destino').value.replace(/[^\d,-.]/g, '').split(',');
  console.log(origem)

  const lat1 = parseFloat(origem[0]);
  const lon1 = parseFloat(origem[1]);
  const lat2 = parseFloat(destino[0]);
  const lon2 = parseFloat(destino[1]);

  const distance = calculateNauticalMiles(lat1, lon1, lat2, lon2);

  document.getElementById('distanciaResultado').textContent = distance.toFixed(2) + ' nm';
  return false;
}

function decimalParaHorasMinutos(decimal) {
  var horas = Math.floor(decimal);
  var minutos = Math.round((decimal - horas) * 60);
  return horas + "h " + minutos + "min";
}
function calculos() {
  var aeronave = document.getElementById('modeloAeronave').value.replace(/[^\d,-.]/g, '').split(',')
  var distancia = parseFloat(document.getElementById('distanciaResultado').textContent);
  var velocidade = parseFloat(aeronave[0]);
  var consumo = parseFloat(aeronave[1]);
  var tempoVoo = distancia/velocidade;
  var custoCombustivel = (consumo*tempoVoo)*14.5
  document.getElementById('custoCombustivel').textContent = 'R$ '+ custoCombustivel.toFixed(2);


  var tempoFormatado = decimalParaHorasMinutos(tempoVoo);
  document.getElementById('tempoResultado').textContent = tempoFormatado;

  var origem = document.getElementById('origem').value.replace(/[^\d,-.]/g, '').split(',');
  var destino = document.getElementById('destino').value.replace(/[^\d,-.]/g, '').split(',');
  var taxaDestino = parseFloat(destino[2])
  document.getElementById('custoTaxas').textContent = 'R$ '+ taxaDestino.toFixed(2);
  var custoTotal = custoCombustivel+taxaDestino
  document.getElementById('custoTotal').textContent = 'R$ '+ custoTotal.toFixed(2);
  return false;
}

