document.addEventListener('DOMContentLoaded', () => {
    // Load Layout Global
    if (typeof loadLayout === 'function') {
        loadLayout('komponen-datatable');
    }

    // --- 1. Data Dummy Transaksi ---
    const transactions = [
        { id: 'INV-2025001', customer: 'Budi Santoso', item: 'Paket SKD Platinum', date: '2025-01-10', amount: 50000, status: 'Lunas' },
        { id: 'INV-2025002', customer: 'Siti Aminah', item: 'Paket SKD Gold', date: '2025-01-11', amount: 45000, status: 'Pending' },
        { id: 'INV-2025003', customer: 'Rudi Hartono', item: 'Paket TIU Master', date: '2025-01-12', amount: 35000, status: 'Gagal' },
        { id: 'INV-2025004', customer: 'Dewi Lestari', item: 'Paket TWK Lengkap', date: '2025-01-13', amount: 30000, status: 'Lunas' },
        { id: 'INV-2025005', customer: 'Andi Wijaya', item: 'Paket TKP Jitu', date: '2025-01-14', amount: 30000, status: 'Dibatalkan' },
        { id: 'INV-2025006', customer: 'Rina Kurnia', item: 'Bundling SKD+SKB', date: '2025-01-15', amount: 85000, status: 'Lunas' },
        { id: 'INV-2025007', customer: 'Eko Prasetyo', item: 'Tryout Nasional #1', date: '2025-01-16', amount: 25000, status: 'Pending' },
        { id: 'INV-2025008', customer: 'Maya Sari', item: 'Tryout Nasional #2', date: '2025-01-17', amount: 25000, status: 'Lunas' },
        { id: 'INV-2025009', customer: 'Fajar Nugraha', item: 'Paket SKD Platinum', date: '2025-01-18', amount: 50000, status: 'Lunas' },
        { id: 'INV-2025010', customer: 'Indah Permata', item: 'Paket TIU Master', date: '2025-01-19', amount: 35000, status: 'Gagal' },
        { id: 'INV-2025011', customer: 'Agus Salim', item: 'Paket TWK Lengkap', date: '2025-01-20', amount: 30000, status: 'Lunas' },
        { id: 'INV-2025012', customer: 'Ratna Sari', item: 'Bundling SKD+SKB', date: '2025-01-21', amount: 85000, status: 'Pending' },
        { id: 'INV-2025013', customer: 'Dedi Mulyadi', item: 'Paket SKD Gold', date: '2025-01-22', amount: 45000, status: 'Lunas' },
        { id: 'INV-2025014', customer: 'Sri Wahyuni', item: 'Paket TKP Jitu', date: '2025-01-23', amount: 30000, status: 'Lunas' },
        { id: 'INV-2025015', customer: 'Hendra Gunawan', item: 'Tryout Nasional #1', date: '2025-01-24', amount: 25000, status: 'Dibatalkan' }
    ];

    // --- 2. Manajemen State ---
    const state = {
        rawData: transactions,
        filteredData: [],
        currentPage: 1,
        rowsPerPage: 10,
        sortColumn: 'id',
        sortDirection: 'desc',
        globalSearch: ''
    };

    // Inisialisasi data terfilter
    state.filteredData = [...state.rawData];

    // --- 3. Konfigurasi Kolom Tabel ---
    const columns = [
        { key: 'id', label: 'ID Invoice', type: 'text', sortable: true },
        { key: 'customer', label: 'Pelanggan', type: 'text', sortable: true },
        { key: 'item', label: 'Item Paket', type: 'text', sortable: true },
        { key: 'date', label: 'Tanggal', type: 'date', sortable: true },
        { key: 'amount', label: 'Total (Rp)', type: 'number', sortable: true },
        { key: 'status', label: 'Status', type: 'select', options: ['Lunas', 'Pending', 'Gagal', 'Dibatalkan'], sortable: true },
        { key: 'action', label: 'Aksi', type: 'none', sortable: false }
    ];

    // --- 4. Elemen DOM ---
    const tableHeaders = document.getElementById('table-headers');
    const tableBody = document.getElementById('table-body');
    const paginationControls = document.getElementById('paginationControls');
    const startRowEl = document.getElementById('startRow');
    const endRowEl = document.getElementById('endRow');
    const totalRowsEl = document.getElementById('totalRows');
    const rowsPerPageSelect = document.getElementById('rowsPerPage');
    const globalSearchInput = document.getElementById('globalSearch');

    // --- 5. Fungsi Render ---

    // Render Header Tabel
    const initTableStructure = () => {
        if (!tableHeaders) return;

        // Render Headers
        tableHeaders.innerHTML = columns.map(col => `
            <th scope="col" class="px-6 py-3 cursor-pointer select-none group hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors" onclick="${col.sortable ? `handleSort('${col.key}')` : ''}">
                <div class="flex items-center gap-1">
                    ${col.label}
                    ${col.sortable ? `<i data-lucide="arrow-up-down" class="w-3 h-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 sort-icon" id="sort-${col.key}"></i>` : ''}
                </div>
            </th>
        `).join('');

        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    // Render Isi Tabel (Body)
    const renderTable = () => {
        if (!tableBody) return;

        const start = (state.currentPage - 1) * state.rowsPerPage;
        const end = start + state.rowsPerPage;
        const pageData = state.filteredData.slice(start, end);

        if (pageData.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="${columns.length}" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                        Tidak ada data yang ditemukan.
                    </td>
                </tr>
            `;
        } else {
            tableBody.innerHTML = pageData.map(row => {
                // Styling Status
                let statusClass = '';
                if (row.status === 'Lunas') statusClass = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
                else if (row.status === 'Pending') statusClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
                else if (row.status === 'Gagal') statusClass = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
                else statusClass = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';

                // Format Mata Uang
                const formattedAmount = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(row.amount);

                return `
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td class="px-6 py-4 font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">${row.id}</td>
                        <td class="px-6 py-4 text-gray-900 dark:text-white">${row.customer}</td>
                        <td class="px-6 py-4 text-gray-500 dark:text-gray-400">${row.item}</td>
                        <td class="px-6 py-4 text-gray-500 dark:text-gray-400 whitespace-nowrap">${row.date}</td>
                        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">${formattedAmount}</td>
                        <td class="px-6 py-4">
                            <span class="${statusClass} text-xs font-medium px-2.5 py-0.5 rounded border border-transparent">
                                ${row.status}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Detail</button>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        // Update Teks Info Pagination
        const total = state.filteredData.length;
        if (startRowEl) startRowEl.textContent = total === 0 ? 0 : start + 1;
        if (endRowEl) endRowEl.textContent = Math.min(end, total);
        if (totalRowsEl) totalRowsEl.textContent = total;

        renderPagination(total);
        updateSortIcons();
    };

    // Render Kontrol Pagination
    const renderPagination = (total) => {
        if (!paginationControls) return;

        const totalPages = Math.ceil(total / state.rowsPerPage);
        let html = '';

        // Tombol Previous
        html += `
            <button onclick="changePage(${state.currentPage - 1})" ${state.currentPage === 1 ? 'disabled' : ''} class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                <i data-lucide="chevron-left" class="w-4 h-4"></i>
            </button>
        `;

        // Logika Nomor Halaman
        let startPage = Math.max(1, state.currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            const isActive = i === state.currentPage;
            html += `
                <button onclick="changePage(${i})" class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 dark:border-gray-700 ${isActive ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}">
                    ${i}
                </button>
            `;
        }

        // Tombol Next
        html += `
            <button onclick="changePage(${state.currentPage + 1})" ${state.currentPage === totalPages || totalPages === 0 ? 'disabled' : ''} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </button>
        `;

        paginationControls.innerHTML = html;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    // --- 6. Fungsi Logika ---

    // Proses Data (Filter & Sort)
    const processData = () => {
        let result = [...state.rawData];

        // 1. Pencarian Global
        if (state.globalSearch) {
            const term = state.globalSearch.toLowerCase();
            result = result.filter(row => 
                Object.values(row).some(val => String(val).toLowerCase().includes(term))
            );
        }

        // 2. Sorting
        if (state.sortColumn) {
            result.sort((a, b) => {
                let valA = a[state.sortColumn];
                let valB = b[state.sortColumn];

                if (typeof valA === 'string') valA = valA.toLowerCase();
                if (typeof valB === 'string') valB = valB.toLowerCase();

                if (valA < valB) return state.sortDirection === 'asc' ? -1 : 1;
                if (valA > valB) return state.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        state.filteredData = result;
        
        // Reset ke halaman 1 jika out of bounds
        const totalPages = Math.ceil(state.filteredData.length / state.rowsPerPage);
        if (state.currentPage > totalPages) state.currentPage = 1;
        if (state.currentPage < 1) state.currentPage = 1;

        renderTable();
    };

    // Update UI Ikon Sort
    const updateSortIcons = () => {
        document.querySelectorAll('.sort-icon').forEach(icon => {
            icon.setAttribute('data-lucide', 'arrow-up-down');
            icon.classList.remove('text-blue-600', 'dark:text-blue-400');
            icon.classList.add('text-gray-400');
        });

        const activeIcon = document.getElementById(`sort-${state.sortColumn}`);
        if (activeIcon) {
            activeIcon.setAttribute('data-lucide', state.sortDirection === 'asc' ? 'arrow-up' : 'arrow-down');
            activeIcon.classList.remove('text-gray-400');
            activeIcon.classList.add('text-blue-600', 'dark:text-blue-400');
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    // --- 7. Event Handler Global ---

    window.handleSort = (column) => {
        if (state.sortColumn === column) {
            state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            state.sortColumn = column;
            state.sortDirection = 'asc';
        }
        processData();
    };

    window.changePage = (page) => {
        state.currentPage = page;
        renderTable();
    };

    // --- 8. Event Listeners ---

    // Pencarian Global
    if (globalSearchInput) {
        globalSearchInput.addEventListener('input', (e) => {
            state.globalSearch = e.target.value;
            processData();
        });
    }

    // Baris Per Halaman
    if (rowsPerPageSelect) {
        rowsPerPageSelect.addEventListener('change', (e) => {
            state.rowsPerPage = parseInt(e.target.value);
            state.currentPage = 1;
            renderTable();
        });
    }

    // --- 9. Inisialisasi ---
    initTableStructure();
    processData();
});