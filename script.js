const supabase = supabase.createClient(
  "https://ltjvqxboupoxurmknouy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0anZxeGJvdXBveHVybWtub3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDM0MjEsImV4cCI6MjA2NDYxOTQyMX0.QFx2O48MZfGSESTCmhFzVdNrmuQELI1hmpumRDBytMo"
);

function showPage(id) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(p => p.style.display = "none");

  const target = document.getElementById(id);
  if (target) target.style.display = "block";

  if (id === "palkanlaskenta") fetchHenkilot();
  if (id === "kello") loadEmployeeDropdown();
}

async function loadEmployeeDropdown() {
  const select = document.getElementById("employeeSelect");
  if (!select) return;
  select.innerHTML = '<option value="">-- Valitse työntekijä --</option>';
  const { data, error } = await supabase.from("henkilot").select("id, nimi");
  if (data) {
    data.forEach(emp => {
      const opt = document.createElement("option");
      opt.value = emp.id;
      opt.textContent = emp.nimi;
      select.appendChild(opt);
    });
  }
}

async function fetchHenkilot() {
  const tbody = document.getElementById("henkilot-body");
  if (!tbody) return;
  const { data, error } = await supabase.from("henkilot").select("*");
  tbody.innerHTML = "";
  if (data) {
    data.forEach(h => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${h.nimi}</td>
        <td>${h.email}</td>
        <td>${h.osoite}</td>
        <td>${h.toimipaikka}</td>
        <td>
          <button onclick="editHenkilo('${h.id}', '${h.nimi}', '${h.email}', '${h.osoite}', '${h.toimipaikka}')">Muokkaa</button>
        </td>
      `;
      tbody.appendChild(row);
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
  const nimi = document.getElementById("emp-nimi").value;
  const email = document.getElementById("emp-email").value;
  const osoite = document.getElementById("emp-osoite").value;
  const toimipaikka = document.getElementById("emp-toimipaikka").value;

  const data = { nimi, email, osoite, toimipaikka };
  if (id) data.id = id;

  const { error } = await supabase.from("henkilot").upsert(data);
  if (error) {
    alert("Virhe tallennuksessa");
  } else {
    document.getElementById("form-modal").style.display = "none";
    fetchHenkilot();
  }
}

function closeForm() {
  document.getElementById("form-modal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  showPage("palkanlaskenta");
  loadEmployeeDropdown();
  fetchHenkilot();
});