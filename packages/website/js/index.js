'use strict';

const $table = document.querySelector('table');
// Render the grid fetched from server inside of $table
const renderTable = (grid) => {
  console.log(grid, $table);
  grid.forEach((row) => {
    const $row = document.createElement('tr');
    row.forEach((cell) => {
      const $cell = document.createElement('td');
      $cell.style.backgroundColor = cell;
      $row.appendChild($cell);
    });
    $table.appendChild($row);
  });
};

fetch('http://localhost:3003/canvas')
  .then((res) => res.json())
  .then(renderTable);
