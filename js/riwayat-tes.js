document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Dummy Data Generator (Simulasi Database) ---
    const generateDummyData = () => {
        // Data statis manual agar pasti muncul
        const data = [
            {
                id: 1,
                title: 'Simulasi SKD CAT Nasional 2025',
                category: 'SKD Lengkap',
                date: new Date().toISOString(),
                score: 405,
                duration: '90 Menit'
            },
            {
                id: 2,
                title: 'Latihan Soal TIU - Numerik',
                category: 'TIU',
                date: new Date(Date.now() - 86400000).toISOString(), // Kemarin
                score: 110,
                duration: '30 Menit'
            },
            {
                id: 3,
                title: 'Latihan Soal TWK - Pilar Negara',
                category: 'TWK',
                date: new Date(Date.now() - 172800000).toISOString(), // 2 hari lalu
                score: 55,
                duration: '20 Menit'
            },
            {
                id: 4,
                title: 'Tryout Akbar CPNS 2024',
                category: 'SKD Lengkap',
                date: new Date(Date.now() - 259200000).toISOString(), // 3 hari lalu
                score: 380,
                duration: '100 Menit'
            },
            {
                id: 5,
                title: 'Latihan TKP - Pelayanan Publik',
                category: 'TKP',
                date: new Date(Date.now() - 345600000).toISOString(), // 4 hari lalu
                score: 145,
                duration: '25 Menit'
            },
            {
                id: 6,
                title: 'Tryout SKD Premium - Batch 1',
                category: 'SKD Lengkap',
                date: new Date(Date.now() - 432000000).toISOString(), // 5 hari lalu
                score: 395,
                duration: '95 Menit'
            },
            {
                id: 7,
                title: 'Latihan Soal TIU - Silogisme',
                category: 'TIU',
                date: new Date(Date.now() - 518400000).toISOString(), // 6 hari lalu
                score: 125,
                duration: '35 Menit'
            },
            {
                id: 8,
                title: 'Latihan Soal TWK - Sejarah',
                category: 'TWK',
                date: new Date(Date.now() - 604800000).toISOString(), // 7 hari lalu
                score: 85,
                duration: '25 Menit'
            },
            {
                id: 9,
                title: 'Simulasi Mini SKD',
                category: 'SKD Lengkap',
                date: new Date(Date.now() - 691200000).toISOString(), // 8 hari lalu
                score: 250,
                duration: '50 Menit'
            },
            {
                id: 10,
                title: 'Latihan TKP - Jejaring Kerja',
                category: 'TKP',
                date: new Date(Date.now() - 777600000).toISOString(), // 9 hari lalu
                score: 155,
                duration: '30 Menit'
            }
        ];
        
        // Tambahkan data dari localStorage jika ada (dari form-tes.js)
        const localResult = localStorage.getItem('cpns_cat_result');
        if (localResult) {
            try {
                const parsed = JSON.parse(localResult);
                data.unshift({
                    id: 999,
                    title: 'Simulasi CAT Terakhir',
                    category: 'SKD Lengkap',
                    date: parsed.timestamp || new Date().toISOString(),
                    score: parsed.score || 0,
                    duration: '90 Menit'
                });
            } catch (e) {
                console.error("Gagal memuat data lokal:", e);
            }
        }
        
        // Sort default by date descending
        return data.sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    // --- 2. State Management ---
    let allData = generateDummyData();
    let state = {
        data: [...allData],
        currentPage: 1,
        rowsPerPage: 9, // Adjusted for grid layout (3x3)
        searchQuery: '',
        sortColumn: 'date',
        sortDirection: 'desc' // 'asc' or 'desc'
    };

    // --- 3. DOM Elements ---
    const timelineList = document.getElementById('timelineList');
    const searchInput = document.getElementById('searchInput');
    const rowsPerPageSelect = document.getElementById('rowsPerPage');
    const sortSelect = document.getElementById('sortSelect');
    const startRowEl = document.getElementById('startRow');
    const endRowEl = document.getElementById('endRow');
    const totalRowsEl = document.getElementById('totalRows');
    const paginationControls = document.getElementById('paginationControls');
    const avgLengkapEl = document.getElementById('avg-lengkap');
    const avgTiuEl = document.getElementById('avg-tiu');
    const avgTwkEl = document.getElementById('avg-twk');
    const avgTkpEl = document.getElementById('avg-tkp');

    // --- 4. Core Functions ---

    // Helper: Format Date Indonesia
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }).format(date);
    };

    // Helper: Get Score Color
    const getScoreColor = (score) => {
        if (score >= 80) return 'text-emerald-600 dark:text-emerald-400 font-bold';
        if (score >= 65) return 'text-blue-600 dark:text-blue-400 font-semibold';
        return 'text-red-500 dark:text-red-400';
    };

    // Filter Data
    const filterData = () => {
        const query = state.searchQuery.toLowerCase();
        let filtered = allData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query)
        );

        // Sort Data
        filtered.sort((a, b) => {
            let valA = a[state.sortColumn];
            let valB = b[state.sortColumn];

            if (state.sortColumn === 'date') {
                valA = new Date(valA).getTime();
                valB = new Date(valB).getTime();
            }

            if (valA < valB) return state.sortDirection === 'asc' ? -1 : 1;
            if (valA > valB) return state.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        state.data = filtered;
        state.currentPage = 1; // Reset to page 1 on filter/sort
        updateStats();
        renderTimeline();
    };

    // Update Summary Stats
    const updateStats = () => {
        const stats = {
            'Lengkap': { total: 0, count: 0 },
            'TIU': { total: 0, count: 0 },
            'TWK': { total: 0, count: 0 },
            'TKP': { total: 0, count: 0 }
        };

        allData.forEach(item => {
            let cat = item.category || 'Lengkap';
            if (cat.toLowerCase().includes('lengkap') || cat.toLowerCase().includes('skd')) cat = 'Lengkap';
            else if (cat.toLowerCase().includes('tiu')) cat = 'TIU';
            else if (cat.toLowerCase().includes('twk')) cat = 'TWK';
            else if (cat.toLowerCase().includes('tkp')) cat = 'TKP';
            else cat = 'Lengkap';

            if (stats[cat]) {
                stats[cat].total += (item.score || 0);
                stats[cat].count++;
            }
        });

        if (avgLengkapEl) avgLengkapEl.textContent = stats['Lengkap'].count ? Math.round(stats['Lengkap'].total / stats['Lengkap'].count) : 0;
        if (avgTiuEl) avgTiuEl.textContent = stats['TIU'].count ? Math.round(stats['TIU'].total / stats['TIU'].count) : 0;
        if (avgTwkEl) avgTwkEl.textContent = stats['TWK'].count ? Math.round(stats['TWK'].total / stats['TWK'].count) : 0;
        if (avgTkpEl) avgTkpEl.textContent = stats['TKP'].count ? Math.round(stats['TKP'].total / stats['TKP'].count) : 0;
    };

    // Render Timeline
    const renderTimeline = () => {
        const start = (state.currentPage - 1) * state.rowsPerPage;
        const end = start + state.rowsPerPage;
        const paginatedData = state.data.slice(start, end);

        timelineList.innerHTML = '';

        if (paginatedData.length === 0) {
            timelineList.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400 pl-12">
                    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-3">
                        <i data-lucide="search-x" class="w-8 h-8 opacity-50"></i>
                    </div>
                    <p class="text-lg font-medium">Tidak ada data yang ditemukan</p>
                    <p class="text-sm">Coba kata kunci lain atau ubah filter.</p>
                </div>
            `;
            lucide.createIcons();
            updatePaginationInfo(0);
            return;
        }

        paginatedData.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = "relative pl-8 py-1 group";
            
            // Determine colors based on score
            let scoreColor = 'text-red-600 dark:text-red-400';
            let dotColor = 'bg-white border-red-500 text-red-500';
            let borderColor = 'border-l-4 border-l-red-500 border-gray-200 dark:border-gray-700';
            let statusIcon = 'x';

            if (item.score >= 80) {
                scoreColor = 'text-emerald-600 dark:text-emerald-400';
                dotColor = 'bg-white border-emerald-500 text-emerald-500';
                borderColor = 'border-l-4 border-l-emerald-500 border-gray-200 dark:border-gray-700';
                statusIcon = 'trophy';
            } else if (item.score >= 65) {
                scoreColor = 'text-blue-600 dark:text-blue-400';
                dotColor = 'bg-white border-blue-500 text-blue-500';
                borderColor = 'border-l-4 border-l-blue-500 border-gray-200 dark:border-gray-700';
                statusIcon = 'check';
            }
            
            // Timeline line logic
            const isLast = index === paginatedData.length - 1;

            itemEl.innerHTML = `
                <!-- Vertical Line -->
                <div class="absolute left-3 top-0 w-0.5 bg-gray-200 dark:bg-gray-700 ${index === 0 ? 'top-1/2' : ''} ${isLast ? 'h-1/2' : 'h-full'} -z-10"></div>
                
                <!-- Timeline Dot -->
                <div class="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full ${dotColor} border-2 flex items-center justify-center shadow-sm z-10 bg-white dark:bg-gray-800">
                    <i data-lucide="${statusIcon}" class="w-3 h-3"></i>
                </div>
                
                <!-- Content Box -->
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 border ${borderColor} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
                    
                    <!-- Left Info -->
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1.5">
                            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase tracking-wider">${item.category}</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <i data-lucide="calendar" class="w-3 h-3"></i> ${formatDate(item.date)}
                            </span>
                        </div>
                        <h3 class="font-bold text-gray-800 dark:text-white text-base truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" title="${item.title}">${item.title}</h3>
                        <div class="flex items-center gap-4 mt-1">
                             <span class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <i data-lucide="clock" class="w-3 h-3"></i> ${item.duration}
                            </span>
                        </div>
                    </div>

                    <!-- Right Stats & Action -->
                    <div class="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-gray-100 dark:border-gray-700 pt-3 sm:pt-0 mt-1 sm:mt-0">
                        <div class="text-right px-2">
                            <span class="block text-[10px] text-gray-400 uppercase font-bold">Skor</span>
                            <span class="text-xl font-black ${scoreColor}">${item.score}</span>
                        </div>
                        
                        <div class="flex gap-2">
                            <a href="hasil-tes.html" class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Lihat Detail">
                                <i data-lucide="file-text" class="w-5 h-5"></i>
                            </a>
                            <a href="pembahasan.html" class="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 dark:shadow-none flex items-center gap-1">
                                Pembahasan <i data-lucide="chevron-right" class="w-3 h-3"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            timelineList.appendChild(itemEl);
        });

        lucide.createIcons();
        updatePaginationInfo(state.data.length);
        renderPaginationControls();
    };

    // Update Pagination Info Text
    const updatePaginationInfo = (totalItems) => {
        const start = totalItems === 0 ? 0 : (state.currentPage - 1) * state.rowsPerPage + 1;
        const end = Math.min(start + state.rowsPerPage - 1, totalItems);
        
        startRowEl.textContent = start;
        endRowEl.textContent = end;
        totalRowsEl.textContent = totalItems;
    };

    // Render Pagination Buttons
    const renderPaginationControls = () => {
        const totalPages = Math.ceil(state.data.length / state.rowsPerPage);
        paginationControls.innerHTML = '';

        // Previous Button
        const prevBtn = document.createElement('button');
        prevBtn.className = `flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${state.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`;
        prevBtn.innerHTML = '<i data-lucide="chevron-left" class="w-4 h-4"></i>';
        prevBtn.disabled = state.currentPage === 1;
        prevBtn.onclick = () => {
            if (state.currentPage > 1) {
                state.currentPage--;
                renderTimeline();
            }
        };
        paginationControls.appendChild(prevBtn);

        // Page Numbers (Simplified: show all for now, or max 5)
        for (let i = 1; i <= totalPages; i++) {
            // Logic to show limited pages can be added here (e.g., 1, 2, ..., 10)
            if (i === 1 || i === totalPages || (i >= state.currentPage - 1 && i <= state.currentPage + 1)) {
                const pageBtn = document.createElement('button');
                const isActive = i === state.currentPage;
                pageBtn.className = isActive 
                    ? "flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
                
                pageBtn.textContent = i;
                pageBtn.onclick = () => {
                    state.currentPage = i;
                    renderTimeline();
                };
                paginationControls.appendChild(pageBtn);
            } else if (i === state.currentPage - 2 || i === state.currentPage + 2) {
                const dots = document.createElement('span');
                dots.className = "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400";
                dots.textContent = '...';
                paginationControls.appendChild(dots);
            }
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = `flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${state.currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : ''}`;
        nextBtn.innerHTML = '<i data-lucide="chevron-right" class="w-4 h-4"></i>';
        nextBtn.disabled = state.currentPage === totalPages || totalPages === 0;
        nextBtn.onclick = () => {
            if (state.currentPage < totalPages) {
                state.currentPage++;
                renderTimeline();
            }
        };
        paginationControls.appendChild(nextBtn);
        lucide.createIcons();
    };

    // --- 5. Event Listeners ---

    // Search
    searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        filterData();
    });

    // Rows Per Page
    rowsPerPageSelect.addEventListener('change', (e) => {
        state.rowsPerPage = parseInt(e.target.value);
        state.currentPage = 1;
        renderTimeline();
    });

    // Sorting Dropdown
    sortSelect.addEventListener('change', (e) => {
        const value = e.target.value;
        const [column, direction] = value.split('-');
        state.sortColumn = column;
        state.sortDirection = direction;
        filterData();
    });

    // --- 6. Init ---
    if (typeof loadLayout === 'function') {
        loadLayout('riwayat');
    }
    updateStats();
    filterData(); // Initial render
});