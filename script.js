var n = 3;
var startTime = 0;
var endTime = 0;
function displayCircle() {
  hideAllCircle();
  getAllSquare();
  var row = Math.floor(Math.random() * n) + 1;
  var col = Math.floor(Math.random() * n) + 1;
  console.log(row, col);

  document.getElementById(String(row) + String(col) + "crl").hidden = false;
  console.log(startTime, endTime);
  document.getElementById("time").innerText =
    String((endTime - startTime) / 1000) + "sec";
  startTime = Date.now();
}

function hideAllCircle() {
  for (let row = 1; row <= n; row++) {
    for (let col = 1; col <= n; col++) {
      document.getElementById(String(row) + String(col) + "crl").hidden = true;
    }
  }
}

function getAllSquare() {
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
            displayCircle();
          }
        });
    }
  }
}

displayCircle();
