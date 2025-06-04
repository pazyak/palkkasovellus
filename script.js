document.addEventListener("DOMContentLoaded", () => {
  const supabase = window.supabase.createClient(
    "https://ltjvqxboupoxurmknouy.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0anZxeGJvdXBveHVybWtub3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDM0MjEsImV4cCI6MjA2NDYxOTQyMX0.QFx2O48MZfGSESTCmhFzVdNrmuQELI1hmpumRDBytMo"
  );

  async function fetchHenkilot() {
    const { data, error } = await supabase.from("henkilot").select("*");
    console.log("Data from Supabase:", data);  // ← добавили лог
    const tbody = document.querySelector("#employee-table tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    if (data) {
      data.forEach(emp => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${emp.nimi}</td>
          <td>${emp.email}</td>
          <td>${emp.osoite}</td>
          <td>${emp.toimipaikka}</td>
          <td>
            <button onclick="editEmployee('${emp.id}', '${emp.nimi}', '${emp.email}', '${emp.osoite}', '${emp.toimipaikka}')">Muokkaa</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    }
  }

  window.showPage = function(id) {
    document.querySelectorAll(".page").forEach(page => {
      page.style.display = "none";
    });
    document.getElementById(id).style.display = "block";
    if (id === "palkanlaskenta") fetchHenkilot();
  };

  window.showForm = function () {
    document.getElementById("form-modal").style.display = "block";
    document.getElementById("emp-id").value = "";
    document.getElementById("emp-nimi").value = "";
    document.getElementById("emp-email").value = "";
    document.getElementById("emp-osoite").value = "";
    document.getElementById("emp-toimipaikka").value = "";
  };

  window.closeForm = function () {
    document.getElementById("form-modal").style.display = "none";
  };

  window.editEmployee = function (id, nimi, email, osoite, toimipaikka) {
    document.getElementById("emp-id").value = id;
    document.getElementById("emp-nimi").value = nimi;
    document.getElementById("emp-email").value = email;
    document.getElementById("emp-osoite").value = osoite;
    document.getElementById("emp-toimipaikka").value = toimipaikka;
    showForm();
  };

  window.saveEmployee = async function () {
    const id = document.getElementById("emp-id").value;
    const data = {
      nimi: document.getElementById("emp-nimi").value,
      email: document.getElementById("emp-email").value,
      osoite: document.getElementById("emp-osoite").value,
      toimipaikka: document.getElementById("emp-toimipaikka").value
    };
    if (id) data.id = id;
    const { error } = await supabase.from("henkilot").upsert(data);
    if (!error) {
      closeForm();
      fetchHenkilot();
    } else {
      alert("Virhe tallennuksessa");
    }
  };

  // Стартовая загрузка
  showPage("palkanlaskenta");
});