async function fetchHenkilot() {
  const { data, error } = await supabase.from("henkilot").select("*");
  const tbody = document.getElementById("henkilot-body");
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

function showAddHenkiloForm() {
  document.getElementById("henkilo-id").value = "";
  document.getElementById("nimi").value = "";
  document.getElementById("email").value = "";
  document.getElementById("osoite").value = "";
  document.getElementById("toimipaikka").value = "";
  document.getElementById("modal-title").innerText = "Lisää työntekijä";
  document.getElementById("henkilo-modal").style.display = "block";
}

function editHenkilo(id, nimi, email, osoite, toimipaikka) {
  document.getElementById("henkilo-id").value = id;
  document.getElementById("nimi").value = nimi;
  document.getElementById("email").value = email;
  document.getElementById("osoite").value = osoite;
  document.getElementById("toimipaikka").value = toimipaikka;
  document.getElementById("modal-title").innerText = "Muokkaa työntekijää";
  document.getElementById("henkilo-modal").style.display = "block";
}

async function saveHenkilo() {
  const id = document.getElementById("henkilo-id").value;
  const nimi = document.getElementById("nimi").value;
  const email = document.getElementById("email").value;
  const osoite = document.getElementById("osoite").value;
  const toimipaikka = document.getElementById("toimipaikka").value;

  const henkilo = {
    nimi,
    email,
    osoite,
    toimipaikka
  };

  if (id) {
    henkilo.id = id; // existing = update
  }

  const { error } = await supabase.from("henkilot").upsert(henkilo);
  if (error) {
    alert("Virhe tallennuksessa");
  } else {
    document.getElementById("henkilo-modal").style.display = "none";
    fetchHenkilot();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadEmployeeDropdown();
  fetchHenkilot();
});