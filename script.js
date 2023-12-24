function napraviRedTabele(item){
    const row = document.createElement('tr');

    const naziv = document.createElement('td');
    naziv.textContent = item.naziv;
    row.appendChild(naziv);

    const cena = document.createElement('td');
    cena.id = "cena" + item.naziv + item.cena
    cena.textContent = item.cena;
    row.appendChild(cena);

    const kolicina = document.createElement('td');    
    kolicina.id = item.naziv + item.cena

    let btnUmanji = document.createElement('button')
    btnUmanji.innerHTML = "-"
    btnUmanji.addEventListener('click', function(event) {
        let target = event.target;
        let pid = target.parentElement.id
        let tekstKolicine = document.getElementById(pid).childNodes[1];
        let trenutnaKolicina = parseInt(tekstKolicine.innerHTML);
        if (trenutnaKolicina > 0){
            trenutnaKolicina--;
            item.kolicina = trenutnaKolicina
            tekstKolicine.innerHTML = trenutnaKolicina;
        }

        let cenaTxt = document.getElementById("cena" + item.naziv + item.cena).textContent;
        document.getElementById("ukupna" + pid).textContent = parseInt(cenaTxt) * parseInt(tekstKolicine.innerHTML);
        osveziUkupnuCenu();
    });

    let lblKolicina = document.createElement('span')
    lblKolicina.id = "span" + item.naziv + item.cena
    lblKolicina.innerHTML = item.komada

    let btnUvecaj = document.createElement('button')
    btnUvecaj.innerHTML = "+"
    btnUvecaj.addEventListener('click', function(event) {
        let target = event.target;
        let pid = target.parentElement.id
        let tekstKolicine = document.getElementById(pid).childNodes[1];
        let trenutnaKolicina = parseInt(tekstKolicine.innerHTML);
        trenutnaKolicina++;
        item.kolicina = trenutnaKolicina
        tekstKolicine.innerHTML = trenutnaKolicina;

        let cenaTxt = document.getElementById("cena" + item.naziv + item.cena).textContent;
        document.getElementById("ukupna" + pid).textContent = parseInt(cenaTxt) * parseInt(tekstKolicine.innerHTML);
        osveziUkupnuCenu();
    });

    kolicina.appendChild(btnUmanji);
    kolicina.appendChild(lblKolicina);
    kolicina.appendChild(btnUvecaj);

    row.appendChild(kolicina);

    const ukupnaCena = document.createElement('td');
    ukupnaCena.id = "ukupna" + item.naziv + item.cena
    ukupnaCena.textContent = parseInt(cena.textContent) * parseInt(lblKolicina.innerHTML);
    row.appendChild(ukupnaCena);

    return row;
}


function napraviHeadereTabele(){
    const tableHeaders = ['Naziv', 'Cena', 'Kolicina', 'Ukupna cena'];
    const headerRow = document.createElement('tr');
    tableHeaders.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    return headerRow;
}

function osveziUkupnuCenu(){
    var tabela = document.getElementById("table-container");
    
    var tableRows = tabela.getElementsByTagName('tr');
    var suma = 0;
    
    // Loop through the TD elements excluding the first and last rows
    for (var i = 1; i < tableRows.length; i++) {
      var td = tableRows[i].childNodes[3];
      var vrednost = parseInt(td.innerText || td.textContent);
      
      if (!isNaN(vrednost)) {
        suma += vrednost;
      }
    }    
    document.getElementById("ukupnaCena").textContent = suma;
}

function initializeData(){
    // Get reference to table container
    const tableContainer = document.getElementById('table-container');

    // Create table headers
    let headerRow = napraviHeadereTabele();
    tableContainer.appendChild(headerRow);
    
    // Create table rows
    for(let i = 0; i < items.length; i++){
        let row = napraviRedTabele(items[i]);
        tableContainer.appendChild(row);
    }

    document.getElementById("dodaj").addEventListener('click', function(event) {
        let noviNaziv = document.getElementById("tbNaziv").value        
        let novaCena = parseInt(document.getElementById("tbCena").value)
        let novaKolicina = parseInt(document.getElementById("tbKolicina").value)

        if(noviNaziv && novaCena && novaKolicina){
            let noviItem = {naziv:noviNaziv, cena:novaCena, komada:novaKolicina};    
            items.push(noviItem)
            let row = napraviRedTabele(noviItem)
            tableContainer.appendChild(row);
            osveziUkupnuCenu();
        }        
    });

    osveziUkupnuCenu();

}

initializeData();