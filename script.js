
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}
window.onload = () => showPage('palkanlaskenta');

function calculateSalary() {
  const name = document.getElementById('name').value;
  const hours = parseFloat(document.getElementById('hours').value) || 0;
  const rate = parseFloat(document.getElementById('rate').value) || 0;
  const evening = parseFloat(document.getElementById('evening').value) || 0;
  const night = parseFloat(document.getElementById('night').value) || 0;
  const holiday = parseFloat(document.getElementById('holiday').value) || 0;
  const tax = parseFloat(document.getElementById('tax').value) || 0;
  const tyel = parseFloat(document.getElementById('tyel').value) || 0;
  const unemployment = parseFloat(document.getElementById('unemployment').value) || 0;

  const brutto = (hours * rate) + evening + night + holiday;
  const deductions = brutto * (tax + tyel + unemployment) / 100;
  const netto = brutto - deductions;

  document.getElementById('result').innerHTML = `
    <h3>Tulos</h3>
    <p><strong>Bruttopalkka:</strong> ${brutto.toFixed(2)} €</p>
    <p><strong>Vähennykset:</strong> ${deductions.toFixed(2)} €</p>
    <p><strong>Nettopalkka:</strong> ${netto.toFixed(2)} €</p>
  `;

  window.salaryData = {
    name,
    date: new Date().toLocaleDateString('fi-FI'),
    hours, rate, evening, night, holiday,
    tax, tyel, unemployment,
    brutto: brutto.toFixed(2),
    deductions: deductions.toFixed(2),
    netto: netto.toFixed(2)
  };
}

function downloadPDF() {
  const data = window.salaryData;
  if (!data) return alert("Laske ensin palkka.");

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text(`Palkanlaskelma – ${data.name}`, 10, 15);
  doc.setFontSize(11);
  doc.text(`Päivämäärä: ${data.date}`, 10, 25);
  doc.text(`Tunnit: ${data.hours}`, 10, 35);
  doc.text(`Tuntipalkka: ${data.rate} €`, 10, 42);
  doc.text(`Iltalisä: ${data.evening} €`, 10, 49);
  doc.text(`Yölisä: ${data.night} €`, 10, 56);
  doc.text(`Pyhälisä: ${data.holiday} €`, 10, 63);
  doc.text(`Veroprosentti: ${data.tax}%`, 10, 70);
  doc.text(`TyEL: ${data.tyel}%`, 10, 77);
  doc.text(`Työttömyys: ${data.unemployment}%`, 10, 84);

  doc.setFontSize(13);
  doc.text(`Bruttopalkka: ${data.brutto} €`, 10, 95);
  doc.text(`Vähennykset: ${data.deductions} €`, 10, 102);
  doc.text(`Nettopalkka: ${data.netto} €`, 10, 109);

  doc.save(`palkkalaskelma_${data.name}.pdf`);
}

function loginUser() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const users = {
        'admin@example.com': 'admin123',
        'matti@example.com': 'matti123'
    };

    if (users[email] && users[email] === password) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        showPage('palkanlaskenta');
    } else {
        document.getElementById('login-error').textContent = 'Virheellinen sähköposti tai salasana.';
    }
    return false;
}

function logout() {
    document.getElementById('app').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}
