const table = document.querySelector('#table-content')

const getCargoList = async () => {
    const response = await fetch('./cargo.json')
    const data = await response.json()
    console.log("Cargo List:", data)
    return data
}

if (!localStorage.getItem('cargoList')) {
    const InitialCargoList = await getCargoList()
    localStorage.setItem('cargoList', JSON.stringify(InitialCargoList))
}

const cargoList = JSON.parse(localStorage.getItem('cargoList'))

const createStatusSelect = (selectedStatus, cargoId) => {
    const select = document.createElement('select')
    select.className = 'form-select'
    select.setAttribute('aria-label', 'Cargo status')
    select.dataset.cargoId = cargoId

    const statuses = [
        { value: 'pending', text: 'В ожидании отправки', class: 'status-pending' },
        { value: 'sent', text: 'В пути', class: 'status-sent' },
        { value: 'delivered', text: 'Доставлен', class: 'status-delivered' }
    ]

    statuses.forEach(status => {
        const option = document.createElement('option')
        option.value = status.value
        option.textContent = status.text
        if (status.text === selectedStatus) {
            option.selected = true
            select.classList.add(status.class)
        }
        select.appendChild(option)
    })

    return select
}

const updateStatusClass = (select, status) => {
    select.className = 'form-select'
    if (status === 'pending') {
      select.classList.add('status-pending')
    } else if (status === 'sent') {
      select.classList.add('status-sent')
    } else if (status === 'delivered') {
      select.classList.add('status-delivered')
    }
  }

const createTableRow = (cargo) => {
    const row = document.createElement('tr')

    const idCell = document.createElement('td')
    idCell.textContent = cargo.id

    const nameCell = document.createElement('td')
    nameCell.textContent = cargo.name

    const statusCell = document.createElement('td')
    const statusSelect = createStatusSelect(cargo.status, cargo.id)
    statusCell.appendChild(statusSelect)

    updateStatusClass(statusSelect, statusSelect.value)

    statusSelect.addEventListener('change', (event) => {
        updateStatusClass(statusSelect, event.target.value)

        const id = event.target.dataset.cargoId
        const selectedStatus = event.target.options[event.target.selectedIndex].text
        const cargoIndex = cargoList.findIndex((cargo) => cargo.id === id)
        cargoList[cargoIndex].status = selectedStatus
        localStorage.setItem('cargoList', JSON.stringify(cargoList))
    })

    const originCell = document.createElement('td')
    originCell.textContent = cargo.origin

    const destinationCell = document.createElement('td')
    destinationCell.textContent = cargo.destination;

    const departureDateCell = document.createElement('td')
    departureDateCell.textContent = cargo.departureDate;

    row.appendChild(idCell)
    row.appendChild(nameCell)
    row.appendChild(statusCell)
    row.appendChild(originCell)
    row.appendChild(destinationCell)
    row.appendChild(departureDateCell)

    return row
}

export const renderTable = (cargoList) => {
    cargoList.forEach(cargo => {
        const row = createTableRow(cargo)
        table.appendChild(row)
    });
}
renderTable(cargoList.toReversed())