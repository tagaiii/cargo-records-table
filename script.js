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
        { value: 'В ожидании отправки', class: 'status-pending' },
        { value: 'В пути', class: 'status-sent' },
        { value: 'Доставлен', class: 'status-delivered' }
    ]

    statuses.forEach(status => {
        const option = document.createElement('option')
        option.value = status.value
        option.textContent = status.value
        if (status.value === selectedStatus) {
            option.selected = true
            select.classList.add(status.class)
        }
        select.appendChild(option)
    })

    return select
}

const updateStatusClass = (select, status) => {
    select.className = 'form-select'
    if (status === 'В ожидании отправки') {
      select.classList.add('status-pending')
    } else if (status === 'В пути') {
      select.classList.add('status-sent')
    } else if (status === 'Доставлен') {
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
        const selectedStatus = event.target.value
        const cargoIndex = cargoList.findIndex((cargo) => cargo.id === id)

        const today = new Date().setHours(0, 0, 0, 0)
        const cargoDepartureDate = new Date(cargoList[cargoIndex].departureDate)
        if (selectedStatus === 'Доставлен' && today < cargoDepartureDate) {
            alert('Ошибка! Груз не может быть еще доставлен!')
            event.target.value = cargoList[cargoIndex].status
            updateStatusClass(event.target, cargoList[cargoIndex].status)
            return
        } else {
            cargoList[cargoIndex].status = selectedStatus
            localStorage.setItem('cargoList', JSON.stringify(cargoList))
        }
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
    table.innerHTML = ''
    cargoList.forEach(cargo => {
        const row = createTableRow(cargo)
        table.appendChild(row)
    });
}

export const sortCargoList = (a, b) => {
    if (a.id > b.id) {
        return -1
    } else {
        return 1
    }
}
renderTable(cargoList.sort(sortCargoList))