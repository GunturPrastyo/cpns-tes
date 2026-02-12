document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Logika Pindah Tab (Paket Saya / Riwayat) ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        // Sembunyikan semua konten
        tabContents.forEach(content => {
            content.classList.add('hidden');
        });

        // Reset semua tombol ke state tidak aktif
        tabBtns.forEach(btn => {
            // Hapus kelas aktif
            btn.classList.remove('bg-blue-50', 'dark:bg-blue-900/20', 'text-blue-700', 'dark:text-blue-300', 'font-medium');
            // Tambah kelas tidak aktif
            btn.classList.add('text-gray-600', 'dark:text-gray-400', 'hover:bg-gray-50', 'dark:hover:bg-gray-700/50');
        });

        // Tampilkan konten target
        const targetContent = document.getElementById(`tab-${tabId}`);
        if (targetContent) {
            targetContent.classList.remove('hidden');
        }

        // Set tombol aktif
        const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        if (activeBtn) {
            activeBtn.classList.remove('text-gray-600', 'dark:text-gray-400', 'hover:bg-gray-50', 'dark:hover:bg-gray-700/50');
            activeBtn.classList.add('bg-blue-50', 'dark:bg-blue-900/20', 'text-blue-700', 'dark:text-blue-300', 'font-medium');
        }
    }

    // Pasang Event Listener pada Tab
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // --- 2. Render Bagian "Paket Saya" ---
    renderMyPackages();

    // --- 3. Render Bagian "Riwayat Transaksi" ---
    renderTransactions();

    // Inisialisasi Ikon
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// State Global untuk Paket
let packagesState = {
    data: [],
    filteredData: [],
    currentPage: 1,
    limit: 5,
    search: '',
    filter: ''
};

function renderMyPackages() {
    // Inisialisasi Data Dummy jika kosong
    if (packagesState.data.length === 0) {
        packagesState.data = [
            {
                title: "Paket SKD 1 - Simulasi Lengkap",
                category: "SKD",
                progress: 40,
                status: "Berjalan",
                image: "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800&auto=format&fit=crop&q=60",
                lastAccess: "2 Jam yang lalu",
                totalSoal: 110
            },
            {
                title: "Paket TKP - Strategi Jitu",
                category: "TKP",
                progress: 100,
                status: "Selesai",
                image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&auto=format&fit=crop&q=60",
                lastAccess: "1 Hari yang lalu",
                totalSoal: 45
            },
            {
                title: "Paket TWK - Wawasan Kebangsaan",
                category: "TWK",
                progress: 0,
                status: "Belum Mulai",
                image: "https://images.unsplash.com/photo-1557682260-96773eb01377?w=800&auto=format&fit=crop&q=60",
                lastAccess: "-",
                totalSoal: 30
            },
            {
                title: "Paket TIU - Logika & Numerik",
                category: "TIU",
                progress: 15,
                status: "Berjalan",
                image: "https://images.unsplash.com/photo-1557683304-673a23048d34?w=800&auto=format&fit=crop&q=60",
                lastAccess: "3 Hari yang lalu",
                totalSoal: 35
            },
            {
                title: "Paket SKD 2 - Tryout Nasional",
                category: "SKD",
                progress: 0,
                status: "Belum Mulai",
                image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&auto=format&fit=crop&q=60",
                lastAccess: "-",
                totalSoal: 110
            },
            {
                title: "Paket Platinum CPNS 2025",
                category: "SKD",
                progress: 5,
                status: "Berjalan",
                image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60",
                lastAccess: "5 Jam yang lalu",
                totalSoal: 110
            }
        ];
        packagesState.filteredData = packagesState.data;
    }

    setupPackageListeners();
    updatePackageList();
}

function setupPackageListeners() {
    const searchInput = document.getElementById('packageSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            packagesState.search = e.target.value;
            processPackages();
        });
    }
}

window.filterMyPackages = function(filter) {
    packagesState.filter = filter;
    
    // Update UI Filter Aktif
    document.querySelectorAll('.package-filter').forEach(btn => {
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    processPackages();
};

function processPackages() {
    const lower = packagesState.search.toLowerCase();
    const filter = packagesState.filter;

    packagesState.filteredData = packagesState.data.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(lower) || p.category.toLowerCase().includes(lower);
        const matchesFilter = filter === '' || p.category === filter;
        return matchesSearch && matchesFilter;
    });
    packagesState.currentPage = 1;
    updatePackageList();
}

function updatePackageList() {
    const container = document.getElementById('myPackagesList');
    const paginationContainer = document.getElementById('packagesPagination');
    if (!container) return;

    const start = (packagesState.currentPage - 1) * packagesState.limit;
    const end = start + packagesState.limit;
    const pageData = packagesState.filteredData.slice(start, end);

    if (pageData.length === 0) {
        container.innerHTML = `<div class="text-center text-gray-500 py-8">Tidak ada paket yang ditemukan.</div>`;
    } else {
        container.innerHTML = pageData.map(p => {
            let statusClass = '';
            let btnText = 'Mulai';
            let btnClass = 'bg-blue-600 hover:bg-blue-700 text-white';
            
            if (p.status === 'Selesai') {
                statusClass = 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
                btnText = 'Lihat Hasil';
                btnClass = 'bg-green-600 hover:bg-green-700 text-white';
            } else if (p.status === 'Berjalan') {
                statusClass = 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
                btnText = 'Lanjutkan';
            } else {
                statusClass = 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
            }

            return `
            <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-5 items-start sm:items-center hover:shadow-md transition-shadow group">
                <div class="w-full sm:w-24 h-32 sm:h-24 rounded-lg overflow-hidden shrink-0 relative">
                    <img src="${p.image}" class="w-full h-full object-cover" alt="${p.title}">
                    <div class="absolute inset-0 bg-black/10"></div>
                </div>
                <div class="flex-1 min-w-0 w-full">
                    <div class="flex justify-between items-start mb-1">
                        <h4 class="font-bold text-gray-800 dark:text-white truncate pr-2">${p.title}</h4>
                        <span class="text-[10px] px-2.5 py-1 rounded-full font-semibold shrink-0 ${statusClass}">${p.status}</span>
                    </div>
                    <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <span class="flex items-center gap-1"><i data-lucide="book-open" class="w-3 h-3"></i> ${p.category}</span>
                        <span class="flex items-center gap-1"><i data-lucide="list-checks" class="w-3 h-3"></i> ${p.totalSoal} Soal</span>
                        <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> ${p.lastAccess}</span>
                    </div>
                    
                    <div class="flex items-center gap-4">
                        <div class="flex-1">
                            <div class="flex justify-between items-center mb-1">
                                <span class="text-[10px] text-gray-500">Progress</span>
                                <span class="text-[10px] font-bold text-gray-700 dark:text-gray-300">${p.progress}%</span>
                            </div>
                            <div class="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                <div class="bg-blue-600 h-1.5 rounded-full transition-all duration-500 group-hover:bg-blue-500" style="width: ${p.progress}%"></div>
                            </div>
                        </div>
                        <button onclick="window.location.href='${p.status === 'Selesai' ? 'hasil-tes.html' : 'tes.html'}'" class="px-5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm hover:shadow-md ${btnClass}">
                            ${btnText} <i data-lucide="arrow-right" class="w-3 h-3 inline ml-1"></i>
                        </button>
                    </div>
                </div>
            </div>
        `}).join('');
    }

    // Render Pagination Paket
    if (paginationContainer) {
        const totalItems = packagesState.filteredData.length;
        const totalPages = Math.ceil(totalItems / packagesState.limit);
        const startItem = totalItems === 0 ? 0 : start + 1;
        const endItem = Math.min(end, totalItems);

        paginationContainer.innerHTML = `
            <span class="text-sm text-gray-700 dark:text-gray-400">
                Menampilkan <span class="font-semibold text-gray-900 dark:text-white">${startItem}</span> sampai <span class="font-semibold text-gray-900 dark:text-white">${endItem}</span> dari <span class="font-semibold text-gray-900 dark:text-white">${totalItems}</span> paket
            </span>
            <div class="inline-flex -space-x-px text-sm">
                <button onclick="changePackagePage(${packagesState.currentPage - 1})" ${packagesState.currentPage === 1 ? 'disabled' : ''} class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
                ${Array.from({length: totalPages}, (_, i) => i + 1).map(p => `
                    <button onclick="changePackagePage(${p})" class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-200 dark:border-gray-700 ${p === packagesState.currentPage ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}">${p}</button>
                `).join('')}
                <button onclick="changePackagePage(${packagesState.currentPage + 1})" ${packagesState.currentPage === totalPages || totalPages === 0 ? 'disabled' : ''} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
            </div>
        `;
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

window.changePackagePage = function(page) {
    if (page < 1 || page > Math.ceil(packagesState.filteredData.length / packagesState.limit)) return;
    packagesState.currentPage = page;
    updatePackageList();
};

// State Global untuk Transaksi
let transState = {
    data: [],
    filteredData: [],
    currentPage: 1,
    limit: 5,
    search: '',
    sortKey: null,
    sortOrder: 'asc' 
};

function renderTransactions() {
    // Inisialisasi Data Dummy Transaksi
    const baseData = [
        { id: '#INV-2025001', item: 'Paket SKD 1', date: '10 Jan 2025', price: 'Rp 25.000', status: 'Lunas' },
        { id: '#INV-2025002', item: 'Paket TKP', date: '12 Jan 2025', price: 'Rp 15.000', status: 'Lunas' },
        { id: '#INV-2025003', item: 'Paket TWK', date: '15 Jan 2025', price: 'Rp 15.000', status: 'Lunas' },
        { id: '#INV-2025004', item: 'Paket TIU', date: '20 Jan 2025', price: 'Rp 15.000', status: 'Pending' },
        { id: '#INV-2025005', item: 'Paket Platinum', date: '25 Jan 2025', price: 'Rp 99.000', status: 'Gagal' },
        { id: '#INV-2025006', item: 'Paket SKD 2', date: '26 Jan 2025', price: 'Rp 25.000', status: 'Lunas' },
        { id: '#INV-2025007', item: 'Paket SKD 3', date: '28 Jan 2025', price: 'Rp 25.000', status: 'Pending' },
        { id: '#INV-2025008', item: 'Paket Bundling', date: '30 Jan 2025', price: 'Rp 50.000', status: 'Lunas' },
    ];
    transState.data = baseData;
    transState.filteredData = baseData;

    setupTransactionListeners();
    updateTransactionTable();
}

function setupTransactionListeners() {
    const searchInput = document.getElementById('transSearch');
    const limitSelect = document.getElementById('transLimit');

    if(searchInput) searchInput.addEventListener('input', (e) => { transState.search = e.target.value; processTransactions(); });
    if(limitSelect) limitSelect.addEventListener('change', (e) => { transState.limit = parseInt(e.target.value); transState.currentPage = 1; updateTransactionTable(); });
}

window.sortTransactions = function(key) {
    if (transState.sortKey === key) {
        transState.sortOrder = transState.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        transState.sortKey = key;
        transState.sortOrder = 'asc';
    }
    processTransactions();
    updateSortIcons();
};

function processTransactions() {
    let result = [...transState.data];

    // 1. Logika Pencarian
    if (transState.search) {
        const lower = transState.search.toLowerCase();
        result = result.filter(t => 
            t.id.toLowerCase().includes(lower) || 
            t.item.toLowerCase().includes(lower) || 
            t.status.toLowerCase().includes(lower) || 
            t.date.toLowerCase().includes(lower) || 
            t.price.toLowerCase().includes(lower)
        );
    }

    // 2. Logika Sorting
    if (transState.sortKey) {
        result.sort((a, b) => {
            let valA = a[transState.sortKey];
            let valB = b[transState.sortKey];

            // Handle special formats
            if (transState.sortKey === 'price') {
                valA = parseInt(valA.replace(/[^0-9]/g, ''));
                valB = parseInt(valB.replace(/[^0-9]/g, ''));
            } else if (transState.sortKey === 'date') {
                valA = new Date(valA).getTime();
                valB = new Date(valB).getTime();
            } else {
                valA = valA.toString().toLowerCase();
                valB = valB.toString().toLowerCase();
            }

            if (valA < valB) return transState.sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return transState.sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }

    transState.filteredData = result;

    transState.currentPage = 1;
    updateTransactionTable();
}

function updateSortIcons() {
    // Reset semua ikon sort
    const icons = document.querySelectorAll('[id^="sort-icon-"]');
    icons.forEach(icon => {
        icon.setAttribute('data-lucide', 'arrow-up-down');
        icon.classList.remove('text-blue-600');
        icon.classList.add('text-gray-400');
    });

    // Set ikon aktif
    if (transState.sortKey) {
        const activeIcon = document.getElementById(`sort-icon-${transState.sortKey}`);
        if (activeIcon) {
            activeIcon.setAttribute('data-lucide', transState.sortOrder === 'asc' ? 'arrow-up' : 'arrow-down');
            activeIcon.classList.remove('text-gray-400');
            activeIcon.classList.add('text-blue-600');
        }
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function updateTransactionTable() {
    const tbody = document.getElementById('transactionList');
    const paginationContainer = document.getElementById('paginationContainer');
    if (!tbody) return;

    const start = (transState.currentPage - 1) * transState.limit;
    const end = start + transState.limit;
    const pageData = transState.filteredData.slice(start, end);

    if (pageData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">Tidak ada data transaksi.</td></tr>`;
    } else {
        tbody.innerHTML = pageData.map(t => {
            let statusClass = '';
            if (t.status === 'Lunas') statusClass = 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
            else if (t.status === 'Pending') statusClass = 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
            else statusClass = 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';

            return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td class="px-6 py-4 font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">${t.id}</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">${t.item}</td>
                <td class="px-6 py-4 text-gray-500 dark:text-gray-400">${t.date}</td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">${t.price}</td>
                <td class="px-6 py-4">
                    <span class="${statusClass} px-2.5 py-1 rounded-full text-xs font-medium border">
                        ${t.status}
                    </span>
                </td>
                <td class="px-6 py-4 text-right">
                    <button class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><i data-lucide="more-horizontal" class="w-4 h-4"></i></button>
                </td>
            </tr>
        `}).join('');
    }

    // Render Pagination Transaksi
    if (paginationContainer) {
        const totalItems = transState.filteredData.length;
        const totalPages = Math.ceil(totalItems / transState.limit);
        const startItem = totalItems === 0 ? 0 : start + 1;
        const endItem = Math.min(end, totalItems);

        paginationContainer.innerHTML = `
            <span class="text-sm text-gray-700 dark:text-gray-400">
                Menampilkan <span class="font-semibold text-gray-900 dark:text-white">${startItem}</span> sampai <span class="font-semibold text-gray-900 dark:text-white">${endItem}</span> dari <span class="font-semibold text-gray-900 dark:text-white">${totalItems}</span> data
            </span>
            <div class="inline-flex -space-x-px text-sm">
                <button onclick="changeTransPage(${transState.currentPage - 1})" ${transState.currentPage === 1 ? 'disabled' : ''} class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
                ${Array.from({length: totalPages}, (_, i) => i + 1).map(p => `
                    <button onclick="changeTransPage(${p})" class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-200 dark:border-gray-700 ${p === transState.currentPage ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}">${p}</button>
                `).join('')}
                <button onclick="changeTransPage(${transState.currentPage + 1})" ${transState.currentPage === totalPages || totalPages === 0 ? 'disabled' : ''} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
            </div>
        `;
    }
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Fungsi ganti halaman transaksi (Global)
window.changeTransPage = function(page) {
    if (page < 1 || page > Math.ceil(transState.filteredData.length / transState.limit)) return;
    transState.currentPage = page;
    updateTransactionTable();
};

// --- 4. Logika Modal Foto Profil ---
let cropper = null;

window.openPhotoModal = () => {
    const modal = document.getElementById('photoModal');
    const currentImg = document.getElementById('mainProfileImage');
    const currentPreview = document.getElementById('currentPhotoPreview');
    const initialView = document.getElementById('initialView');
    const cropperContainer = document.getElementById('cropperContainer');
    const controls = document.getElementById('cropperControls');
    const btnSave = document.getElementById('btnSavePhoto');
    
    if (modal) {
        // Reset State
        if (currentImg && currentPreview) {
            currentPreview.src = currentImg.src;
        }
        
        // Tampilkan Initial View, Sembunyikan Cropper
        if (initialView) initialView.classList.remove('hidden');
        if (cropperContainer) cropperContainer.classList.add('hidden');
        if (controls) controls.classList.add('hidden');
        if (btnSave) btnSave.disabled = true;

        // Reset Input File
        const input = document.getElementById('photoInput');
        if (input) input.value = '';

        // Hapus instance cropper lama jika ada
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }

        modal.classList.remove('hidden');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
};

window.closePhotoModal = () => {
    const modal = document.getElementById('photoModal');
    if (modal) modal.classList.add('hidden');
    
    // Cleanup Cropper saat tutup
    if (cropper) {
        cropper.destroy();
        cropper = null;
    }
};

window.triggerFileInput = () => {
    document.getElementById('photoInput').click();
};

window.handleFileSelect = (input) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const image = document.getElementById('cropperImage');
            const initialView = document.getElementById('initialView');
            const cropperContainer = document.getElementById('cropperContainer');
            const controls = document.getElementById('cropperControls');
            const btnSave = document.getElementById('btnSavePhoto');

            // Update Source Gambar
            image.src = e.target.result;

            // Switch View
            initialView.classList.add('hidden');
            cropperContainer.classList.remove('hidden');
            controls.classList.remove('hidden');
            btnSave.disabled = false;

            // Init Cropper
            if (cropper) cropper.destroy();
            
            cropper = new Cropper(image, {
                aspectRatio: 1, // Foto profil biasanya persegi
                viewMode: 1,
                dragMode: 'move',
                autoCropArea: 1,
                restore: false,
                guides: true,
                center: true,
                highlight: false,
                cropBoxMovable: true,
                cropBoxResizable: true,
                toggleDragModeOnDblclick: false,
            });
        }
        reader.readAsDataURL(input.files[0]);
    }
};

// Helper Functions untuk Kontrol Cropper
window.rotateImage = (deg) => { if (cropper) cropper.rotate(deg); };
window.zoomImage = (ratio) => { if (cropper) cropper.zoom(ratio); };
window.resetCropper = () => { if (cropper) cropper.reset(); };

window.saveCroppedPhoto = () => {
    if (!cropper) return;

    // Ambil hasil crop sebagai Data URL (Canvas)
    const canvas = cropper.getCroppedCanvas({
        width: 300,
        height: 300,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
    });

    const croppedImage = canvas.toDataURL('image/jpeg');
    const mainImg = document.getElementById('mainProfileImage');
    
    // Update Foto Profil Utama
    if (mainImg) mainImg.src = croppedImage;
    
    closePhotoModal();
    
    Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Foto profil telah diperbarui.',
        timer: 1500,
        showConfirmButton: false
    });
};