const tableBody = document.querySelector('#tableHE tbody');
const btnFilter = document.getElementById('btnFilter');
const token = localStorage.getItem('token');

async function load() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const status = document.getElementById('status').value;

    let url = 'http://localhost:3000/api/horas-extras?';
    if(from) url += `from=${from}&`;
    if(to) url += `to=${to}&`;
    if(status) url += `status=${status}&`;

    const res = await fetch(url, {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await res.json();
    tableBody.innerHTML = '';

    data.forEach(he => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${he.id}</td>
            <td>${he.nome_colaborador}</td>
            <td>${he.data_he}</td>
            <td>${he.qtd_horas}</td>
            <td>${he.centro_custo}</td>
            <td>${he.status}</td>
            <td>
                ${he.status === 'PENDENTE' ? `
                <button class="btn btn-success btn-sm" onclick="updateStatus(${he.id}, 'APROVADO')">Aprovar</button>
                <button class="btn btn-danger btn-sm" onclick="updateStatus(${he.id}, 'REPROVADO')">Reprovar</button>
                ` : ''}
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

async function updateStatus(id, status) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const res = await fetch(`http://localhost:3000/api/horas-extras/${id}/status`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ status, aprovado_por: user.login })
    });
    if(res.ok) load();
    else alert('Erro ao atualizar status');
}

// Inicializa a tabela
load();

// Filtrar
btnFilter.addEventListener('click', load);