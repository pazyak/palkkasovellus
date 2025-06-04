const supa = supabase.createClient(
  "https://ltjvqxboupoxurmknouy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
);

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(id).style.display = "block";
  if (id === "palkanlaskenta") fetchHenkilot();
  if (id === "kello") loadEmployeeDropdown();
}

async function fetchHenkilot() {
  const tbody = document.getElementById("henkilot-body");
  const { data, error } = await supa.from("henkilot").select("*");
  tbody.innerHTML = "";
  if (data) {
    data.forEach(h => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${h.nimi}</td>
        <td>${h.email}</td>
        <td>${h.osoite}</td>
        <td>${h.toimipaikka}</td>
        <td><button onclick="editHenkilo('${h.id}', '${h.nimi}', '${h.email}', '${h.osoite}', '${h.toimipaikka}')">Muokkaa</button></td>
      `;
      tbody.appendChild(row);
    });
  }
}

async function loadEmployeeDropdown() {
  const select = document.getElementById("employeeSelect");
  const { data } = await supa.from("henkilot").select("id, nimi");
  select.innerHTML = '<option value="">-- Valitse --</option>';
  if (data) {
    data.forEach(emp => {
      const opt = document.createElement("option");
      opt.value = emp.id;
      opt.textContent = emp.nimi;
      select.appendChild(opt);
    });
  }
}

function showForm() {
  document.getElementById("emp-id").value = "";
  document.getElementById("emp-nimi").value = "";
  document.getElementById("emp-email").value = "";
  document.getElementById("emp-osoite").value = "";
  document.getElementById("emp-toimipaikka").value = "";
  document.getElementById("form-modal").style.display = "block";
}

function editHenkilo(id, nimi, email, osoite, toimipaikka) {
  document.getElementById("emp-id").value = id;
  document.getElementById("emp-nimi").value = nimi;
  document.getElementById("emp-email").value = email;
  document.getElementById("emp-osoite").value = osoite;
  document.getElementById("emp-toimipaikka").value = toimipaikka;
  document.getElementById("form-modal").style.display = "block";
}

async function saveEmployee() {
  const id = document.getElementById("emp-id").value;
  const data = {
    nimi: document.getElementById("emp-nimi").value,
    email: document.getElementById("emp-email").value,
    osoite: document.getElementById("emp-osoite").value,
    toimipaikka: document.getElementById("emp-toimipaikka").value
  };
  if (id) data.id = id;

  const { error } = await supa.from("henkilot").upsert(data);
  if (!error) {
    document.getElementById("form-modal").style.display = "none";
    fetchHenkilot();
  }
}

function closeForm() {
  document.getElementById("form-modal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  showPage("palkanlaskenta");
});