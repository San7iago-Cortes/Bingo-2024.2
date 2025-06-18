//Referencias a los elementos del DOM
const generateCardForm = document.getElementById('generate-card-form');
const extractButton = document.getElementById('extract-button');
const resetButton = document.getElementById('reset-button');
const numbersList = document.getElementById('numbers-list');
const bingoCardsContainer = document.getElementById('bingo-cards-container');
const musicElement = document.getElementById('background-music');
const volumeControl = document.getElementById('volume-control');

let extractedNumbers = [];

//Reproducción automática de música
document.addEventListener('DOMContentLoaded', () => {
    musicElement.play().catch(() => {
        console.log('Reproducción automática bloqueada.');
        document.addEventListener('click', () => {
            musicElement.play();
        });
    });
});

// Ajustar volumen
volumeControl.addEventListener('input', function() {
    musicElement.volume = this.value;
});

//Generar una nueva tarjeta de bingo
generateCardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('participant-name').value.trim();
    if (name) {
        const formData = new FormData();
        formData.append('name', name);
        fetch('/generate_card', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log("Bingo card data:", data);
            if (data.status === 'success') {
                displayBingoCard(data.card, name);
                document.getElementById('participant-name').value = '';
                extractButton.disabled = false;
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al intentar generar la tabla.');
        });
    }
});

//Extraer un nuevo número
extractButton.addEventListener('click', () => {
    fetch('/extract_number')
        .then(response => response.json())
        .then(data => {
            console.log("Extracted number:", data.number);
            if (data.status === 'success' || data.status === 'winner') {
                const listItem = document.createElement('li');
                listItem.textContent = data.number;
                numbersList.appendChild(listItem);
                extractedNumbers.push(data.number);

// Actualizar las celdas de las tarjetas
                enableNumberOnCards(data.number);

                if (data.status === 'winner') {
                    alert('¡' + data.winner + ' ha ganado!');
                    extractButton.disabled = true;
                }
            } else if (data.status === 'finished' || data.status === 'game_over') {
                alert(data.message);
                extractButton.disabled = true;
            } else if (data.status === 'error') {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al sacar un número.');
        });
});

//Reiniciar el juego
resetButton.addEventListener('click', () => {
    fetch('/reset')
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            numbersList.innerHTML = '';
            bingoCardsContainer.innerHTML = '';
            extractedNumbers = [];
            extractButton.disabled = true;
        });
});

//Mostrar la tarjeta de bingo en el DOM
function displayBingoCard(card, participantName) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    const nameLabel = document.createElement('h3');
    nameLabel.textContent = participantName;
    cardContainer.appendChild(nameLabel);

    const table = document.createElement('table');
    table.classList.add('bingo-card');

//Encabezado de la tabla
    const headerRow = document.createElement('tr');
    ['B', 'I', 'N', 'G', 'O'].forEach(letter => {
        const th = document.createElement('th');
        th.textContent = letter;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

//Crear 5 filas para los números
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        ['B', 'I', 'N', 'G', 'O'].forEach(letter => {
            const cellValue = card[letter][i];
            const td = document.createElement('td');
            td.textContent = cellValue !== undefined ? cellValue : '';
            td.dataset.number = cellValue;

            if (cellValue === 'FREE') {
                td.classList.add('free-space');
                td.classList.add('marked');
            } else {
//Verificar si el número ya fue sacado
                if (extractedNumbers.includes(cellValue)) {
                    td.classList.add('extractable');
                    td.addEventListener('click', function() {
                        td.classList.toggle('marked');
                    });
                } else {
                    td.classList.add('not-extractable');
                    td.style.pointerEvents = 'none';
                }
            }
            row.appendChild(td);
        });
        table.appendChild(row);
    }

    cardContainer.appendChild(table);
    bingoCardsContainer.appendChild(cardContainer);
}

//Habilitar las celdas correspondientes al número que se sacó
function enableNumberOnCards(number) {
    const cells = document.querySelectorAll(`td[data-number='${number}']`);
    cells.forEach(cell => {
        if (!cell.classList.contains('marked')) {
            // Habilitar clic
            cell.classList.remove('not-extractable');
            cell.classList.add('extractable');
            cell.style.pointerEvents = '';
            cell.addEventListener('click', function() {
                cell.classList.toggle('marked');
            });
        }
    });
}
