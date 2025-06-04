
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}
window.onload = () => showPage('palkanlaskenta');

function calculateSalary() {
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
}
