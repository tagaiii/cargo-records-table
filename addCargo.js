const form = document.querySelector('#cargoForm')
const formError = document.querySelector('#formError')
const cargoList = JSON.parse(localStorage.getItem('cargoList'))
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const cargoName = formData.get('cargoName');
    const cargoStatus = formData.get('cargoStatus');
    const cargoOrigin = formData.get('cargoOrigin');
    const cargoDestination = formData.get('cargoDestination');
    const cargoDepartureDate = formData.get('cargoDepartureDate');

    if (!cargoName || !cargoStatus || !cargoOrigin || !cargoDestination || !cargoDepartureDate) {
        formError.style.display = 'block'
        return
    }
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