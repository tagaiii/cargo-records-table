import { renderTable, sortCargoList } from "./script.js"
const statusRadioInputs = document.querySelectorAll('input[name="statusRadio"]')
const cargoList = JSON.parse(localStorage.getItem('cargoList'))

const filterCargoList = () => {
    const selectedFilter = document.querySelector('input[name="statusRadio"]:checked').value

    let filteredCargoList
    if (selectedFilter === 'all') {
        filteredCargoList = cargoList
    } else if (selectedFilter === 'sent'){
        filteredCargoList = cargoList.filter(cargo => cargo.status === 'В пути')
    } else if (selectedFilter === 'pending'){
        filteredCargoList = cargoList.filter(cargo => cargo.status === 'В ожидании отправки')
    } else if (selectedFilter === 'delivered'){
        filteredCargoList = cargoList.filter(cargo => cargo.status === 'Доставлен')
    }

    renderTable(filteredCargoList.sort(sortCargoList));
}

statusRadioInputs.forEach(input => {
    input.addEventListener('change', filterCargoList)
})