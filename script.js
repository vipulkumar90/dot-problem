var size = 10;
var startTime = 0;
var endTime = 0;
function displayCircle(n) {
  hideAllCircle(n);
  getAllSquare(n);
  var row = Math.floor(Math.random() * n) + 1;
  var col = Math.floor(Math.random() * n) + 1;

  document.getElementById(String(row) + String(col) + "crl").hidden = false;
  document.getElementById("time").innerText =
    String(
      (endTime - startTime) / 1000 >= 0 ? (endTime - startTime) / 1000 : 0
    ) + "sec";
  startTime = Date.now();
}

function hideAllCircle(n) {
  for (let row = 1; row <= n; row++) {
    for (let col = 1; col <= n; col++) {
      document.getElementById(String(row) + String(col) + "crl").hidden = true;
    }
  }
}

function getAllSquare(n) {
  for (let row = 1; row <= n; row++) {
    for (let col = 1; col <= n; col++) {
      document
        .getElementById(String(row) + String(col) + "sq")
        .addEventListener("mouseenter", function () {
          if (
            document.getElementById(String(row) + String(col) + "crl")
              .hidden === false
          ) {
            endTime = Date.now();
            displayCircle(n);
          }
        });
    }
  }
}

function createGrid(n) {
  var containter = document.getElementById("cntr");
  var rowHtml = `
  <span class="row" id="row">
    {0}
  </span>
  `;
  var squareHtml = `
  <span class="square" id="{0}sq">
    <span class="circle" hidden id="{0}crl"></span>
  </span>
  `;
  var gridHtml = "";
  for (let row = 1; row <= n; row++) {
    var squareHtmlStr = "";
    for (let col = 1; col <= n; col++) {
      squareHtmlStr += formatString(squareHtml, [String(row) + String(col)]);
    }
    gridHtml += formatString(rowHtml, [squareHtmlStr]);
  }
  containter.innerHTML = gridHtml;
}

function formatString(string, params) {
  return string.replace(/{(\d+)}/g, (match, index) => {
    return typeof params[index] !== "undefined" ? params[index] : match;
  });
}

function createDdl(n) {
  var select = document.getElementById("grid-size");

  for (let i = 1; i <= n; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = `${i}`;
    select.appendChild(option);
  }
}

var select = document.getElementById("grid-size");
select.addEventListener("change", function () {
  createGrid(select.value);
  displayCircle(select.value);
});

createDdl(size);
