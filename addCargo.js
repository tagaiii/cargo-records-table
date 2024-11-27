const form = document.querySelector('#cargoForm')
const cargoList = JSON.parse(localStorage.getItem('cargoList'))
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const cargoId = (cargoList.length + 1).toString().padStart(3, '0')

    cargoList.push({
      id: `CARGO${cargoId}`,
      name: formData.get('cargoName'),
      status: formData.get('cargoStatus'),
      origin: formData.get('cargoOrigin'),
      destination: formData.get('cargoDestination'),
      departureDate: formData.get('cargoDepartureDate'),
    });
    localStorage.setItem('cargoList', JSON.stringify(cargoList))
    
    window.location.reload()
});