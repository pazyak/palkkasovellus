const { createClient } = supabase
const supabaseUrl = 'https://ltjvqxboupoxurmknouy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUz...RDBytMo'
const supabaseClient = createClient(supabaseUrl, supabaseKey)

async function fetchHenkilot() {
  const { data, error } = await supabaseClient.from("henkilot").select("*")
  if (error) {
    console.error("Virhe haettaessa:", error)
    return
  }
  const tbody = document.querySelector("#employee-table tbody")
  tbody.innerHTML = ""
  if (!data || data.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5'>Ei työntekijöitä</td></tr>"
    return
  }
  data.forEach(emp => {
    const row = document.createElement("tr")
    row.innerHTML = `<td>${emp.nimi}</td><td>${emp.email}</td><td>${emp.osoite}</td><td>${emp.toimipaikka}</td><td></td>`
    tbody.appendChild(row)
  })
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none")
  document.getElementById(id).style.display = "block"
  if (id === "palkanlaskenta") fetchHenkilot()
  if (id === "kello") loadEmployeeDropdown()
}

async function loadEmployeeDropdown() {
  const { data } = await supabaseClient.from("henkilot").select("*")
  const select = document.getElementById("employeeSelect")
  select.innerHTML = data.map(emp => `<option value="${emp.id}">${emp.nimi}</option>`).join("")
}

document.addEventListener("DOMContentLoaded", () => {
  showPage('palkanlaskenta')
})
