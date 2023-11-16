'use strict';
const DATA_COL_ATTRIBUTE = 'data-col';
const DATA_ROW_ATTRIBUTE = 'data-row';
const $table = document.querySelector('table');
let selectedColor = 'black';
// Render the grid fetched from server inside of $table
const renderTable = (grid) => {
  // Empty table
  while ($table.firstChild) {
    $table.removeChild($table.firstChild);
  }
  let nbRow = 0;
  grid.forEach((row) => {
    const $row = document.createElement('tr');
    let nbCol = 0;
    row.forEach((cell) => {
      // Assign the cell its coords
      const $cell = document.createElement('td');
      $cell.setAttribute(DATA_ROW_ATTRIBUTE, nbRow);
      $cell.setAttribute(DATA_COL_ATTRIBUTE, nbCol++);
      // make it focusable
      $cell.setAttribute('tabindex', '0');

      $cell.style.backgroundColor = cell;
      $row.appendChild($cell);
    });
    nbRow++;
    $table.appendChild($row);
  });
};

fetch('http://localhost:3003/canvas')
  .then((res) => res.json())
  .then(renderTable);

document.addEventListener('DOMContentLoaded', function () {
  colorPickerSetUp();
  tableSetUp();
  eventsSetUp();
});

/*------------------------ SET UP FUNCTIONS ------------------------ */

function colorPickerSetUp() {
  const colorPicker = document.getElementById('colorInput');
  colorPicker.addEventListener('change', watchColorPicker, false);
}

function watchColorPicker(event) {
  console.log('color change');
  document
    .getElementById('colorInput')
    .setAttribute('value', event.target.value);
}

// Color change function
function colorChangeHandler(event) {
  if (event.target.tagName === 'TD') {
    const selectedColor = document
      .getElementById('colorInput')
      .getAttribute('value');
    console.log(selectedColor);
    const row = event.target.getAttribute(DATA_ROW_ATTRIBUTE);
    const col = event.target.getAttribute(DATA_COL_ATTRIBUTE);
    console.log(
      `http://localhost:3003/canvas/row/${row}/col/${col}/${
        selectedColor.split('#')[1]
      }`
    );
    fetch(
      `http://localhost:3003/canvas/row/${row}/col/${col}/${
        selectedColor.split('#')[1]
      }`,
      {
        method: 'POST'
      }
    ).then((res) => {
      if (res.status == 200) event.target.style.backgroundColor = selectedColor;
    });
  }
}

function tableSetUp() {
  // Add event listeners to change the color of the table elements
  $table.addEventListener('click', colorChangeHandler);
  $table.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      // Your code to handle the "Enter" key press
      colorChangeHandler(event);
    }
  });
}

function focusableTableSetUp() {
  document.addEventListener('DOMContentLoaded', function () {
    const td = document.querySelectorAll('td');
    let selectedCell = null;

    // Add focus event listener to each cell
    td.forEach((cell) => {
      cell.addEventListener('focus', function () {
        selectCell(cell);
      });
    });

    function selectCell(cell) {
      if (selectedCell) {
        selectedCell.classList.remove('selected');
      }

      selectedCell = cell;
      selectedCell.classList.add('selected');
    }
  });
}

function eventsSetUp() {
  const eventSource = new EventSource('http://localhost:3003/canvas/event');

  // Set up event listeners for different types of events
  eventSource.addEventListener('message', function (event) {
    console.log('message');
    // Handle 'message' events
    const data = JSON.parse(event.data);
    renderTable(data);
  });

  eventSource.addEventListener('open', function (event) {
    // Handle 'open' events (connection opened)
    console.log('SSE connection opened');
  });

  eventSource.addEventListener('error', function (event) {
    // Handle 'error' events
    console.error('SSE error:', event);
  });
}
