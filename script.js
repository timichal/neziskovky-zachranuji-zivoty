const spreadsheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRi_CLNShhzWSn2gS_TiJt8WyOaDYBkON0crxToeH_3tRLqNqNXziuxYEX5LovqLpxRY5o-lOsgsOEA/pubhtml";

function procSheet(page) {
  const data = {};
  data.lide = [];
  data.inst = [];

  const rows = page.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  for (let i = 2; i < rows.length; i++) {
    const row = rows[i].getElementsByTagName("td");
    if (row[3].textContent === "A") {
      data.inst.push([row[1].textContent, row[2].textContent]);
    }
  }
  function addToTable(arrName) {
    const div = document.getElementById(`sig-${arrName}`);
    data[arrName].forEach(([col1, col2]) => {
      console.log(col1, col2)
      const row1 = document.createElement("div");
      row1.className = "signature-name";
      row1.innerText = col1;
      const row2 = document.createElement("div");
      row2.className = "signature-occup";
      row2.innerText = col2;
      const signature = document.createElement("div");
      signature.className = "signature";
      signature.appendChild(row1);
      signature.appendChild(row2);
      div.appendChild(signature);
    });
  }

  addToTable("inst");
}

const xhr = new XMLHttpRequest();
xhr.open("GET", spreadsheet);
xhr.onload = () => procSheet(xhr.response);
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.responseType = "document";
xhr.send();
