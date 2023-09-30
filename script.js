var size = 10;
var startTime = Date.now();
var endTime = 0;
var round = 1;
function displayCircle(n) {
  document.getElementById("start-game").hidden = true;
  hideAllCircle(n);
  getAllSquare(n);
  var row = Math.floor(Math.random() * n) + 1;
  var col = Math.floor(Math.random() * n) + 1;
  setInterval(function () {
    var time = ((Date.now() - startTime) / 1000).toFixed(1);
    document.getElementById("time").innerText =
      String(time >= 0 ? time : 0) + "sec";
  }, 1);
  document.getElementById(String(row) + String(col) + "crl").hidden = false;
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
            addScore(startTime);
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

function addScore(startTime) {
  var tbody = document.getElementById("tbody");
  var tr = document.createElement("tr");
  var tdRound = document.createElement("td");
  var tdTime = document.createElement("td");
  tdRound.innerText = round;
  round += 1;
  tdTime.innerText = ((Date.now() - startTime) / 1000).toFixed(1);
  tr.appendChild(tdRound);
  tr.appendChild(tdTime);
  tbody.appendChild(tr);
}

var select = document.getElementById("grid-size");
select.addEventListener("change", function () {
  createGrid(select.value);
  displayCircle(select.value);
});

createDdl(size);
