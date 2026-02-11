document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Generator Data Dummy (Simulasi Database) ---
    const generateDummyData = () => {
        // Data statis manual
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
        
        // Urutkan default berdasarkan tanggal terbaru
        return data.sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    // --- 2. Manajemen State (Penyimpanan Status Aplikasi) ---
    let allData = generateDummyData();
    let state = {
        data: [...allData],
        currentPage: 1,
        rowsPerPage: 9, // Adjusted for grid layout (3x3)
        searchQuery: '',
        sortColumn: 'date',
        sortDirection: 'desc' // 'asc' or 'desc'
    };

    // --- 3. Referensi Elemen DOM ---
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

    // --- 4. Fungsi Utama ---

    // Helper: Format Tanggal Indonesia
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }).format(date);
    };

    // Helper: Warna Skor (Hijau/Biru/Merah)
    const getScoreColor = (score) => {
        if (score >= 80) return 'text-emerald-600 dark:text-emerald-400 font-bold';
        if (score >= 65) return 'text-blue-600 dark:text-blue-400 font-semibold';
        return 'text-red-500 dark:text-red-400';
    };

    // Fungsi Filter & Sorting Data
    const filterData = () => {
        const query = state.searchQuery.toLowerCase();
        let filtered = allData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query)
        );

        // Logika Sorting
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
        state.currentPage = 1; // Reset ke halaman 1 saat filter berubah
        updateStats();
        renderTimeline();
    };

    // Update Statistik Ringkasan (Rata-rata Nilai)
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

    // Render Tampilan Timeline (Daftar Riwayat)
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
            itemEl.className = "relative pl-8 py-2 group";
            
            // Tentukan Max Score & Passing Grade berdasarkan kategori
            let maxScore = 550;
            let passingGrade = 311;
            
            if (item.category.includes('TIU')) { maxScore = 175; passingGrade = 80; }
            else if (item.category.includes('TWK')) { maxScore = 150; passingGrade = 65; }
            else if (item.category.includes('TKP')) { maxScore = 225; passingGrade = 166; }

            const percentage = Math.min(100, Math.round((item.score / maxScore) * 100));
            const isPassed = item.score >= passingGrade;
            
            // Styling berdasarkan status kelulusan
            let scoreColor = isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400';
            let dotColor = isPassed ? 'bg-white border-emerald-500 text-emerald-500' : 'bg-white border-red-500 text-red-500';
            let statusIcon = isPassed ? 'trophy' : 'x';
            let statusStripColor = isPassed ? 'bg-emerald-500' : 'bg-red-500';
            let progressBarColor = isPassed ? 'bg-emerald-500' : 'bg-red-500';
            let statusBadgeBg = isPassed ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            let statusText = isPassed ? 'Lulus PG' : 'Tidak Lulus';
            
            // Logika garis timeline (putus di item terakhir)
            const isLast = index === paginatedData.length - 1;

          
            const progressBarHtml = `
                <div class="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full ${progressBarColor} rounded-full" style="width: ${percentage}%"></div>
                </div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${statusBadgeBg} border border-transparent whitespace-nowrap">${statusText}</span>
            `;

            itemEl.innerHTML = `
                <!-- Vertical Line -->
                <div class="absolute left-3 top-0 w-0.5 bg-gray-100 dark:bg-gray-700 ${index === 0 ? 'top-1/2' : ''} ${isLast ? 'h-1/2' : 'h-full'} -z-10"></div>
                
                <!-- Timeline Dot -->
                <div class="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full ${dotColor} border-2 flex items-center justify-center shadow-sm z-10 bg-white dark:bg-gray-800 ring-4 ring-white dark:ring-gray-900">
                    <i data-lucide="${statusIcon}" class="w-3 h-3"></i>
                </div>
                
                <!-- Content Box -->
                <div class="group relative bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    <!-- Status Strip -->
                    <div class="absolute left-0 top-4 bottom-4 w-1 rounded-r-full ${statusStripColor}"></div>

                    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center justify-between pl-3">
                        
                        <!-- Left Info -->
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1 sm:mb-2">
                                <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase tracking-wide border border-gray-200 dark:border-gray-600">${item.category}</span>
                                <span class="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                    <i data-lucide="calendar" class="w-3 h-3"></i> ${formatDate(item.date)}
                                </span>
                            </div>
                            <h3 class="font-bold text-gray-900 dark:text-white text-base sm:text-lg truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1" title="${item.title}">${item.title}</h3>
                            <div class="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                 <span class="flex items-center gap-1.5">
                                    <i data-lucide="clock" class="w-3.5 h-3.5"></i> ${item.duration}
                                </span>
                                <span class="flex items-center gap-1.5">
                                    <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i> Selesai
                                </span>
                            </div>
                            
                            <!-- Progress Bar & Badge (Desktop Only) -->
                            <div class="mt-3 hidden sm:flex items-center gap-3 max-w-sm">
                                ${progressBarHtml}
                            </div>
                        </div>

                        <!-- Right Stats & Action -->
                        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center border-t sm:border-t-0 border-gray-50 dark:border-gray-700 pt-3 sm:pt-0 mt-1 sm:mt-0 w-full sm:w-auto">
                            <div class="w-full sm:w-auto">
                                <div class="flex justify-between items-center w-full sm:w-auto sm:block sm:text-right">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400 sm:hidden">Total Skor</span>
                                    <span class="hidden sm:block text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Total Skor</span>
                                    <div class="flex items-baseline justify-end gap-1">
                                        <span class="text-xl sm:text-2xl font-black ${scoreColor}">${item.score}</span>
                                        <span class="text-xs text-gray-400 font-medium">/ ${maxScore}</span>
                                    </div>
                                </div>
                                
                                <!-- Progress Bar & Badge (Mobile Only - Below Score) -->
                                <div class="mt-2 sm:hidden flex items-center gap-3 w-full">
                                    ${progressBarHtml}
                                </div>
                            </div>
                            
                            <div class="flex gap-2 w-full sm:w-auto">
                                <a href="hasil-tes.html" class="p-2.5 text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 dark:bg-gray-700/50 dark:hover:bg-blue-900/20 rounded-xl transition-all border border-gray-200 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-800 shrink-0" title="Lihat Detail">
                                    <i data-lucide="file-bar-chart-2" class="w-5 h-5"></i>
                                </a>
                                <a href="pembahasan.html" class="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-none transition-all flex items-center justify-center">
                                    Pembahasan
                                </a>
                            </div>
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

    // Update Teks Info Pagination
    const updatePaginationInfo = (totalItems) => {
        const start = totalItems === 0 ? 0 : (state.currentPage - 1) * state.rowsPerPage + 1;
        const end = Math.min(start + state.rowsPerPage - 1, totalItems);
        
        startRowEl.textContent = start;
        endRowEl.textContent = end;
        totalRowsEl.textContent = totalItems;
    };

    // Render Tombol Pagination
    const renderPaginationControls = () => {
        const totalPages = Math.ceil(state.data.length / state.rowsPerPage);
        paginationControls.innerHTML = '';

        // Tombol Previous
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

        // Tombol Angka Halaman
        for (let i = 1; i <= totalPages; i++) {
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

        // Tombol Next
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

    // --- 5. Event Listeners (Interaksi User) ---

    // Pencarian
    searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        filterData();
    });

    // Ubah Jumlah Baris per Halaman
    rowsPerPageSelect.addEventListener('change', (e) => {
        state.rowsPerPage = parseInt(e.target.value);
        state.currentPage = 1;
        renderTimeline();
    });

    // Dropdown Sorting
    sortSelect.addEventListener('change', (e) => {
        const value = e.target.value;
        const [column, direction] = value.split('-');
        state.sortColumn = column;
        state.sortDirection = direction;
        filterData();
    });

    // --- 6. Inisialisasi Awal ---
    if (typeof loadLayout === 'function') {
        loadLayout('riwayat');
    }
    updateStats();
    filterData(); // Initial render
});