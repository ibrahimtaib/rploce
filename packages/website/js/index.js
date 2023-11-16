'use strict';
const DATA_COL_ATTRIBUTE = 'data-col';
const DATA_ROW_ATTRIBUTE = 'data-row';
const $table = document.querySelector('table');
let selectedColor = 'black';
// Render the grid fetched from server inside of $table
const renderTable = (grid) => {
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
});

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

function tableSetUp() {
  // Add event listeners to change the color of the table elements
  $table.addEventListener('click', (event) => {
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
        if (res.status == 200)
          event.target.style.backgroundColor = selectedColor;
      });
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
