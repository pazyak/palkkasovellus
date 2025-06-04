const SUPABASE_URL = "https://ltjvqxboupoxurmknouy.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0anZxeGJvdXBveHVybWtub3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDM0MjEsImV4cCI6MjA2NDYxOTQyMX0.QFx2O48MZfGSESTCmhFzVdNrmuQELI1hmpumRDBytMo";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function showPage(id) {
  document.querySelectorAll(".page").forEach(el => el.style.display = "none");
  document.getElementById(id).style.display = "block";
  if (id === "palkanlaskenta") loadEmployees();
}

async function loadEmployees() {
  const { data, error } = await supabase.from("henkilot").select("*");
  const tbody = document.querySelector("#employee-table tbody");
  tbody.innerHTML = "";
  if (data) {
    data.forEach(emp => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${emp.nimi || ""}</td>
        <td>${emp.email || ""}</td>
        <td>${emp.osoite || ""}</td>
        <td>${emp.toimipaikka || ""}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}
