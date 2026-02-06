// Detectar preferência do sistema
function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

// Inicializar tema
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const theme = savedTheme || 'dark';

  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

// Toggle tema
function toggleTheme() {
  document.body.classList.toggle('dark-mode');

  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Inicializar ao carregar
initTheme();

// Escutar mudanças do sistema
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  });
}

// Dados das parcelas
const parcelas = [
  { id: 1, valor: 199.47, vencimento: '10 Jan, 2026', status: 'PAGO' },
  { id: 2, valor: 199.47, vencimento: '10 Fev, 2026', status: 'PENDENTE' },
  { id: 3, valor: 199.47, vencimento: '10 Abr, 2026', status: 'PENDENTE' },
  { id: 4, valor: 199.47, vencimento: '10 Mai, 2026', status: 'PENDENTE' },
  { id: 5, valor: 199.47, vencimento: '10 Jun, 2026', status: 'PENDENTE' },
  { id: 6, valor: 199.47, vencimento: '10 Jul, 2026', status: 'PENDENTE' },
  { id: 7, valor: 199.47, vencimento: '10 Ago, 2026', status: 'PENDENTE' },
  { id: 8, valor: 199.47, vencimento: '10 Set, 2026', status: 'PENDENTE' },
  { id: 9, valor: 199.47, vencimento: '10 Out, 2026', status: 'PENDENTE' },
  { id: 10, valor: 199.47, vencimento: '10 Nov, 2026', status: 'PENDENTE' },
  { id: 11, valor: 199.47, vencimento: '10 Dez, 2026', status: 'PENDENTE' },
  { id: 12, valor: 199.47, vencimento: '10 Jan, 2027', status: 'PENDENTE' },
  { id: 13, valor: 199.47, vencimento: '10 Fev, 2027', status: 'PENDENTE' },
  { id: 14, valor: 199.47, vencimento: '10 Mar, 2027', status: 'PENDENTE' },
  { id: 15, valor: 199.47, vencimento: '10 Abr, 2027', status: 'PENDENTE' },
  { id: 16, valor: 199.47, vencimento: '10 Mai, 2027', status: 'PENDENTE' },
  { id: 17, valor: 199.47, vencimento: '10 Jun, 2027', status: 'PENDENTE' },
  { id: 18, valor: 199.47, vencimento: '10 Jul, 2027', status: 'PENDENTE' },
];

// Renderizar tabela
function renderTable() {
  const tbody = document.querySelector('.payments-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  parcelas.forEach((parcela) => {
    const tr = document.createElement('tr');
    const numeroParcela = String(parcela.id).padStart(2, '0');
    const valorFormatado = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parcela.valor);

    let statusBadge = '';
    let actionContent = '';
    let dateClass = 'date';
    let valorClass = '';

    if (parcela.status === 'PAGO') {
      statusBadge = `
        <span class="badge badge-success">
          <span class="badge-dot"></span>
          PAGO
        </span>`;
    } else if (parcela.status === 'PENDENTE') {
      tr.classList.add('row-highlight');
      dateClass = 'date date-pending';
      valorClass = 'valor-pending';
      statusBadge = `
        <span class="badge badge-pending">
          <span class="badge-dot"></span>
          PENDENTE
        </span>`;
      actionContent = `<button class="btn btn-small btn-dark">Pagar Agora</button>`;
    } else {
      tr.classList.add('row-disabled');
      statusBadge = `<span class="badge badge-scheduled">AGENDADO</span>`;
      actionContent = `<span class="material-symbols-outlined icon-disabled">lock</span>`;
    }

    tr.innerHTML = `
      <td class="parcela-number">${numeroParcela} / 18</td>
      <td class="${valorClass}">${valorFormatado}</td>
      <td class="${dateClass}">${parcela.vencimento}</td>
      <td>${statusBadge}</td>
    `;

    tbody.appendChild(tr);
  });
}

// Inicializar tabela
renderTable();