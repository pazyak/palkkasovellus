
const supa = supabase.createClient("https://ltjvqxboupoxurmknouy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0anZxeGJvdXBveHVybWtub3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDM0MjEsImV4cCI6MjA2NDYxOTQyMX0.QFx2O48MZfGSESTCmhFzVdNrmuQELI1hmpumRDBytMo");

// Переход между страницами
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if (id === 'palkkalista') loadSalaryList();
    if (id === 'henkilot') loadHenkilot();
}

function logout() {
    document.getElementById('app').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

function loginUser() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    if ((email === "admin@example.com" && pass === "admin123") ||
        (email === "matti@example.com" && pass === "matti123")) {
        document.getElementById("login").style.display = "none";
        document.getElementById("app").style.display = "block";
        showPage("palkanlaskenta");
        return false;
    }
    document.getElementById("login-error").innerText = "Väärä sähköposti tai salasana.";
    return false;
}

// Расчёт зарплаты – как в v9

const { createClient } = supabase;
const supa = createClient("https://ltjvqxboupoxurmknouy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0anZxeGJvdXBveHVybWtub3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDM0MjEsImV4cCI6MjA2NDYxOTQyMX0.QFx2O48MZfGSESTCmhFzVdNrmuQELI1hmpumRDBytMo");

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

async function calculateSalary() {
    // ... оставим как есть ...
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
    const date = new Date().toLocaleDateString('fi-FI');

    document.getElementById('result').innerHTML = `
        <h3>Tulos</h3>
        <p><strong>Bruttopalkka:</strong> ${brutto.toFixed(2)} €</p>
        <p><strong>Vähennykset:</strong> ${deductions.toFixed(2)} €</p>
        <p><strong>Nettopalkka:</strong> ${netto.toFixed(2)} €</p>
    `;

    await supa.from("palkkalaskelmat").insert([{ 
        nimi: name,
        tunnit: hours,
        tuntipalkka: rate,
        bruttopalkka: brutto,
        vahennykset: deductions,
        nettopalkka: netto,
        paiva: date
    }]);

    loadSalaryList();

    window.salaryData = { name, hours, rate, evening, night, holiday, tax, tyel, unemployment, brutto, deductions, netto, date };
}

async function loadSalaryList() {
    const tbody = document.querySelector("#salaryTable tbody");
    tbody.innerHTML = "";
    let { data, error } = await supa.from("palkkalaskelmat").select("*").order("id", { ascending: false });
    if (data) {
        data.forEach(r => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${r.nimi}</td><td>${r.tunnit}</td><td>${r.tuntipalkka}</td><td>${r.bruttopalkka.toFixed(2)}</td><td>${r.vahennykset.toFixed(2)}</td><td>${r.nettopalkka.toFixed(2)}</td><td>${r.paiva}</td>`;
            tbody.appendChild(tr);
        });
    }
}


// 👥 Работа с сотрудниками
async function loadHenkilot() {
    const tbody = document.querySelector("#henkiloTable tbody");
    tbody.innerHTML = "";
    const { data, error } = await supa.from("henkilot").select("*").order("id", { ascending: false });
    if (data) {
        data.forEach(h => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${h.nimi}</td>
                <td>${h.email}</td>
                <td>${h.iban}</td>
                <td>${h.veroprosentti}</td>
                <td>${h.osoite}, ${h.postinumero} ${h.toimipaikka}</td>
                <td><button onclick="deleteHenkilo(${h.id})">Poista</button></td>
            `;
            tbody.appendChild(tr);
        });
    }
}

async function saveHenkilo() {
    const obj = {
        nimi: document.getElementById("hnimi").value,
        email: document.getElementById("hemail").value,
        puhelin: document.getElementById("hpuhelin").value,
        iban: document.getElementById("hiban").value,
        bban: document.getElementById("hbban").value,
        veroprosentti: parseFloat(document.getElementById("hvero").value),
        osoite: document.getElementById("hosoite").value,
        postinumero: document.getElementById("hposti").value,
        toimipaikka: document.getElementById("htoimi").value,
    };
    await supa.from("henkilot").insert([obj]);
    loadHenkilot();
    document.getElementById("henkiloForm").reset();
}

async function deleteHenkilo(id) {
    if (confirm("Poistetaanko henkilö?")) {
        await supa.from("henkilot").delete().eq("id", id);
        loadHenkilot();
    }
}

let currentEdit = null;

function openEditModal(h) {
    document.getElementById("editModal").style.display = "block";
    document.getElementById("editId").value = h.id;
    document.getElementById("editNimi").value = h.nimi;
    document.getElementById("editEmail").value = h.email;
    document.getElementById("editPuhelin").value = h.puhelin || "";
    document.getElementById("editIban").value = h.iban;
    document.getElementById("editBban").value = h.bban || "";
    document.getElementById("editVero").value = h.veroprosentti;
    document.getElementById("editOsoite").value = h.osoite || "";
    document.getElementById("editPosti").value = h.postinumero || "";
    document.getElementById("editToimi").value = h.toimipaikka || "";
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

async function updateHenkilo() {
    const id = document.getElementById("editId").value;
    const updated = {
        nimi: document.getElementById("editNimi").value,
        email: document.getElementById("editEmail").value,
        puhelin: document.getElementById("editPuhelin").value,
        iban: document.getElementById("editIban").value,
        bban: document.getElementById("editBban").value,
        veroprosentti: parseFloat(document.getElementById("editVero").value),
        osoite: document.getElementById("editOsoite").value,
        postinumero: document.getElementById("editPosti").value,
        toimipaikka: document.getElementById("editToimi").value,
    };
    await supa.from("henkilot").update(updated).eq("id", id);
    closeModal();
    loadHenkilot();
}

// Модифицируем вывод в loadHenkilot
loadHenkilot = async function () {
    const tbody = document.querySelector("#henkiloTable tbody");
    tbody.innerHTML = "";
    const { data, error } = await supa.from("henkilot").select("*").order("id", { ascending: false });
    if (data) {
        data.forEach(h => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${h.nimi}</td>
                <td>${h.email}</td>
                <td>${h.iban}</td>
                <td>${h.veroprosentti}</td>
                <td>${h.osoite}, ${h.postinumero} ${h.toimipaikka}</td>
                <td>
                    <button onclick='openEditModal(${JSON.stringify(h)})'>Muokkaa</button>
                    <button onclick='deleteHenkilo(${h.id})'>Poista</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
};

// Täytä henkilövalinta
async function fillHenkiloSelect() {
    const select = document.getElementById("henkiloSelect");
    select.innerHTML = '<option value="">Valitse henkilö</option>';
    const { data } = await supa.from("henkilot").select("*").order("nimi");
    if (data) {
        data.forEach(h => {
            const opt = document.createElement("option");
            opt.value = h.id;
            opt.textContent = h.nimi;
            opt.setAttribute("data-vero", h.veroprosentti);
            select.appendChild(opt);
        });
    }
}

// Aseta veroprosentti automaattisesti
document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("henkiloSelect");
    if (select) {
        select.addEventListener("change", () => {
            const selected = select.options[select.selectedIndex];
            const vero = selected.getAttribute("data-vero");
            if (vero) document.getElementById("tax").value = vero;
        });
    }
    fillHenkiloSelect();
});

// Muokkaa laskennan tallennusta
async function calculateSalary() {
    const hours = parseFloat(document.getElementById("hours").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const evening = parseFloat(document.getElementById("evening").value);
    const night = parseFloat(document.getElementById("night").value);
    const holiday = parseFloat(document.getElementById("holiday").value);
    const tax = parseFloat(document.getElementById("tax").value);
    const tyel = parseFloat(document.getElementById("tyel").value);
    const unemployment = parseFloat(document.getElementById("unemployment").value);
    const henkilo_id = parseInt(document.getElementById("henkiloSelect").value);
    const nimi = document.getElementById("henkiloSelect").selectedOptions[0].text;

    const brutto = (hours * rate) + evening + night + holiday;
    const vahennys = brutto * ((tax + tyel + unemployment) / 100);
    const netto = brutto - vahennys;

    const result = `
        <h3>Palkkalaskelma</h3>
        <p><strong>Nimi:</strong> ${nimi}</p>
        <p><strong>Bruttopalkka:</strong> €${brutto.toFixed(2)}</p>
        <p><strong>Vähennykset:</strong> €${vahennys.toFixed(2)}</p>
        <p><strong>Nettopalkka:</strong> €${netto.toFixed(2)}</p>
    `;
    document.getElementById("result").innerHTML = result;

    await supa.from("palkkalaskelmat").insert([{
        nimi, henkilo_id, tuntipalkka: rate, tunnit: hours,
        brutto, netto, paiva: new Date().toISOString().split('T')[0]
    }]);

    loadSalaryList();
}
