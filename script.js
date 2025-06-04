const SUPABASE_URL = "https://ltjvqxboupoxurmknouy.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0anZxeGJvdXBveHVybWtub3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDM0MjEsImV4cCI6MjA2NDYxOTQyMX0.QFx2O48MZfGSESTCmhFzVdNrmuQELI1hmpumRDBytMo";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function showPage(id) {
  document.querySelectorAll(".page").forEach(el => el.style.display = "none");
  document.getElementById(id).style.display = "block";
  if (id === "palkanlaskenta") loadEmployees();
}

async function loadEmployees() {
  const tbody = document.querySelector("#employee-table tbody");
  const errorBox = document.querySelector("#error-message");
  tbody.innerHTML = "";
  errorBox.innerText = "";

  const { data, error } = await supabase.from("henkilot").select("*");

  if (error) {
    errorBox.innerText = "Virhe ladattaessa tietoja: " + error.message;
    return;
  }

  data.forEach(emp => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${emp.nimi}</td>
      <td>${emp.email}</td>
      <td>${emp.osoite}</td>
      <td>${emp.toimipaikka}</td>
      <td><button onclick='editEmployee(${JSON.stringify(emp)})'>Muokkaa</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function showForm() {
  document.getElementById("form-title").innerText = "Lisää työntekijä";
  document.getElementById("emp-id").value = "";
  document.getElementById("emp-nimi").value = "";
  document.getElementById("emp-email").value = "";
  document.getElementById("emp-osoite").value = "";
  document.getElementById("emp-toimipaikka").value = "";
  document.getElementById("form-modal").style.display = "block";
}

function editEmployee(emp) {
  document.getElementById("form-title").innerText = "Muokkaa työntekijää";
  document.getElementById("emp-id").value = emp.id;
  document.getElementById("emp-nimi").value = emp.nimi;
  document.getElementById("emp-email").value = emp.email;
  document.getElementById("emp-osoite").value = emp.osoite;
  document.getElementById("emp-toimipaikka").value = emp.toimipaikka;
  document.getElementById("form-modal").style.display = "block";
}

function closeForm() {
  document.getElementById("form-modal").style.display = "none";
}

async function saveEmployee() {
  const id = document.getElementById("emp-id").value;
  const nimi = document.getElementById("emp-nimi").value;
  const email = document.getElementById("emp-email").value;
  const osoite = document.getElementById("emp-osoite").value;
  const toimipaikka = document.getElementById("emp-toimipaikka").value;

  if (id) {
    await supabase.from("henkilot").update({ nimi, email, osoite, toimipaikka }).eq("id", id);
  } else {
    await supabase.from("henkilot").insert([{ nimi, email, osoite, toimipaikka }]);
  }

  closeForm();
  loadEmployees();
}
async function loadEmployeeDropdown() {
  const select = document.getElementById("employeeSelect");
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

async function loadWorklog() {
  const empId = document.getElementById("employeeSelect").value;
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  if (!empId) return;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const { data: worklogs } = await supabase
    .from("tyoaika")
    .select("*")
    .eq("henkilo_id", empId)
    .gte("paiva", `${year}-${month + 1}-01`)
    .lte("paiva", `${year}-${month + 1}-${daysInMonth}`);

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    const log = worklogs.find(w => w.paiva === dateStr);

    const row = document.createElement("div");
    row.style.margin = "0.5rem 0";
    row.innerHTML = `
      <strong>${dateStr}</strong><br>
      Alku: <input type="time" value="${log?.alku || ""}" id="start-${day}" />
      Loppu: <input type="time" value="${log?.loppu || ""}" id="end-${day}" />
      <select id="tila-${day}">
        <option value="työ" ${log?.tila === "työ" ? "selected" : ""}>Työ</option>
        <option value="loma" ${log?.tila === "loma" ? "selected" : ""}>Loma</option>
        <option value="sairas" ${log?.tila === "sairas" ? "selected" : ""}>Sairas</option>
        <option value="" ${!log?.tila ? "selected" : ""}>-</option>
      </select>
    `;
    calendar.appendChild(row);
  }

  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Tallenna kuukauden tiedot";
  saveBtn.onclick = async () => {
    const updates = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const start = document.getElementById(`start-${day}`).value;
      const end = document.getElementById(`end-${day}`).value;
      const tila = document.getElementById(`tila-${day}`).value;
      const dateStr = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      if (start || end || tila) {
        updates.push({ henkilo_id: empId, paiva: dateStr, alku: start, loppu: end, tila });
      }
    }

    await supabase.from("tyoaika").upsert(updates, { onConflict: ["henkilo_id", "paiva"] });
    alert("Tallennettu!");
  };

  calendar.appendChild(saveBtn);
}

document.addEventListener("DOMContentLoaded", () => {
  loadEmployeeDropdown();
});
