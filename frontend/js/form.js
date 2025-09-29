
const form = document.getElementById('heForm');
const horaInicio = document.getElementById('hora_inicio');
const horaFim = document.getElementById('hora_fim');
const qtdHoras = document.getElementById('qtd_horas');
const token = localStorage.getItem('token');

function calc(){
  if(!horaInicio.value || !horaFim.value) return;
  const [hiH, hiM] = horaInicio.value.split(':').map(Number);
  const [hfH, hfM] = horaFim.value.split(':').map(Number);
  let inicio = hiH + hiM/60;
  let fim = hfH + hfM/60;
  let diff = fim - inicio;
  if(diff < 0) diff = 0;
  qtdHoras.value = Math.round(diff*100)/100;
}

horaInicio.addEventListener('change', calc);
horaFim.addEventListener('change', calc);

form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const payload = {
    funcionario_id: null,
    nome_colaborador: document.getElementById('nome_completo').value,
    login_colaborador: document.getElementById('login_colaborador').value,
    nc: document.getElementById('nc').value,
    data_he: document.getElementById('data_he').value,
    hora_inicio: horaInicio.value,
    hora_fim: horaFim.value,
    motivo: document.getElementById('motivo').value,
    centro_custo: document.querySelector('input[name="cc"]:checked').value
  };
  const res = await fetch('http://localhost:3000/api/horas-extras', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token },
    body: JSON.stringify(payload)
  });
  if(res.ok){ alert('Hora extra registrada!'); form.reset(); qtdHoras.value=''; }
  else alert('Erro ao registrar');
});
