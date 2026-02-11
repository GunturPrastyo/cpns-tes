document.addEventListener('DOMContentLoaded', () => {
    if (typeof loadLayout === 'function') {
        loadLayout('info-terkini'); // Load layout utama
    }

    // --- 1. Data Berita Dummy ---
    const newsData = [
        {
            id: 1,
            title: 'Jadwal Resmi Seleksi CPNS 2025 Resmi Dirilis BKN',
            excerpt: 'BKN resmi mengumumkan jadwal tahapan seleksi CPNS 2025. Pendaftaran dimulai bulan depan dengan beberapa persyaratan baru yang perlu diperhatikan oleh seluruh calon pelamar.',
            date: '2 Jam yang lalu',
            views: '2.4k',
            category: 'Pengumuman',
            color: 'blue',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400&auto=format&fit=crop'
        },
        {
            title: 'Tips & Trik Mengerjakan Soal TKP dengan Cepat & Tepat',
            excerpt: 'Bingung dengan soal TKP yang jawabannya mirip semua? Simak strategi memilih jawaban dengan poin 5 dalam waktu singkat agar skor maksimal.',
            date: '1 Hari yang lalu',
            views: '1.8k',
            category: 'Tips',
            color: 'green',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=400&auto=format&fit=crop'
        },
        {
            title: 'Perubahan Passing Grade SKD Tahun Ini yang Wajib Diketahui',
            excerpt: 'Kemenpan RB menetapkan nilai ambang batas baru untuk SKD tahun ini. Pastikan kamu tahu target skor minimal agar lolos ke tahap SKB.',
            date: '3 Hari yang lalu',
            views: '3.2k',
            category: 'Penting',
            color: 'red',
            image: 'https://images.unsplash.com/photo-1584208124888-3a20b9c799e2?q=80&w=400&auto=format&fit=crop'
        },
        {
            title: 'Formasi CPNS 2025 untuk Lulusan SMA/SMK',
            excerpt: 'Pemerintah membuka ribuan formasi untuk lulusan SMA/SMK sederajat pada seleksi CPNS tahun ini. Cek rincian formasinya di sini.',
            date: '4 Hari yang lalu',
            views: '5.1k',
            category: 'Pengumuman',
            color: 'blue',
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=400&auto=format&fit=crop'
        },
        {
            title: 'Cara Mengatasi Gagal Login di Portal SSCASN',
            excerpt: 'Mengalami kendala saat login ke portal SSCASN? Jangan panik, ikuti langkah-langkah berikut untuk memulihkan akses akun Anda.',
            date: '5 Hari yang lalu',
            views: '950',
            category: 'Tips',
            color: 'green',
            image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=400&auto=format&fit=crop'
        },
        {
            title: 'Dokumen Wajib yang Sering Terlewat Saat Pendaftaran',
            excerpt: 'Banyak pelamar gugur di seleksi administrasi karena dokumen tidak lengkap. Cek checklist dokumen wajib berikut ini.',
            date: '1 Minggu yang lalu',
            views: '1.5k',
            category: 'Penting',
            color: 'red',
            image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=400&auto=format&fit=crop'
        }
    ];

    const newsGrid = document.getElementById('newsGrid');
    const newsPagination = document.getElementById('newsPagination');
    const newsSearchInput = document.getElementById('newsSearch');
    const popularNewsList = document.getElementById('popularNewsList');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // --- 2. State Aplikasi ---
    let currentPage = 1;
    const itemsPerPage = 4; // Tampilkan 4 berita per halaman
    let currentCategory = 'all';
    let searchQuery = '';

    // --- 3. Fungsi Render Berita (Grid) ---
    function renderNews() { 
        if (!newsGrid) return;
        
        // Filter Data
        const filteredNews = newsData.filter(item => {
            const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        // Logika Pagination
        const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
        if (currentPage > totalPages) currentPage = totalPages || 1;
        
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedNews = filteredNews.slice(start, end);

        // Render HTML Grid
        newsGrid.innerHTML = paginatedNews.map(item => `
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                <div class="h-48 overflow-hidden relative">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div class="absolute top-3 left-3">
                        <span class="px-3 py-1 text-[10px] font-bold rounded-full bg-white/95 text-${item.color}-600 backdrop-blur-md shadow-sm uppercase tracking-wide border border-white/20">
                            ${item.category}
                        </span>
                    </div>
                </div>
                <div class="p-5 flex flex-col flex-1">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            <span class="flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${item.date}</span>
                            <span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                            <span class="flex items-center gap-1.5"><i data-lucide="eye" class="w-3.5 h-3.5"></i> ${item.views}</span>
                        </div>
                        <button class="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="Bagikan">
                            <i data-lucide="external-link" class="w-4 h-4"></i>
                        </button>
                    </div>

                    <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                        ${item.title}
                    </h3>
                    
                    <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-5 flex-1 leading-relaxed">
                        ${item.excerpt}
                    </p>
                    
                    <div class="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                        <a href="detail-berita.html?id=${item.id}" class="flex items-center justify-center w-full py-2.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                            Baca Selengkapnya <i data-lucide="arrow-right" class="w-4 h-4 ml-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        // Render Kontrol Pagination
        renderPagination(totalPages);

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // --- 4. Fungsi Render Pagination ---
    function renderPagination(totalPages) {
        if (!newsPagination) return;
        
        if (totalPages <= 1) {
            newsPagination.innerHTML = '';
            return;
        }

        let html = '';
        
        // Tombol Sebelumnya
        html += `
            <button onclick="changeNewsPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                Sebelumnya
            </button>
        `;
        
        // Angka Halaman
        html += `<div class="flex items-center gap-1">`;
        for (let i = 1; i <= totalPages; i++) {
            html += `<button onclick="changeNewsPage(${i})" class="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${i === currentPage ? 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'}">${i}</button>`;
        }
        html += `</div>`;

        // Tombol Selanjutnya
        html += `
            <button onclick="changeNewsPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                Selanjutnya
            </button>
        `;

        newsPagination.innerHTML = html;
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // --- 5. Render Berita Populer (Sidebar) ---
    function renderPopularNews() {
        if (!popularNewsList) return;

        // Urutkan berdasarkan views (parsing 'k' jika ada)
        const sortedNews = [...newsData].sort((a, b) => {
            const viewA = a.views.includes('k') ? parseFloat(a.views) * 1000 : parseFloat(a.views);
            const viewB = b.views.includes('k') ? parseFloat(b.views) * 1000 : parseFloat(b.views);
            return viewB - viewA;
        }).slice(0, 5); // Top 5

        popularNewsList.innerHTML = sortedNews.map((item, index) => `
            <div class="flex gap-4 group cursor-pointer items-start">
                <div class="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative bg-gray-200 dark:bg-gray-700">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute top-0 left-0 bg-blue-600/90 backdrop-blur-[2px] text-white text-[10px] font-bold px-2 py-0.5 rounded-br-lg shadow-sm">
                        #${index + 1}
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-bold text-gray-800 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                        ${item.title}
                    </h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2 leading-relaxed">
                        ${item.excerpt}
                    </p>
                    <div class="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                        <span class="flex items-center gap-1"><i data-lucide="eye" class="w-3 h-3"></i> ${item.views}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // Fungsi Ganti Halaman (Global)
    window.changeNewsPage = (page) => {
        currentPage = page;
        renderNews();
    };

    // Event Listener Filter Kategori
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset kelas aktif
            filterBtns.forEach(b => {
                b.classList.remove('bg-blue-600', 'bg-green-600', 'bg-red-600', 'text-white', 'shadow-md');
                b.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-600', 'dark:text-gray-300', 'border', 'border-gray-200', 'dark:border-gray-700');
            });
            
            // Set kelas aktif pada tombol yang diklik
            btn.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-600', 'dark:text-gray-300', 'border', 'border-gray-200', 'dark:border-gray-700');

            currentCategory = btn.getAttribute('data-category');
            
            let activeColor = 'bg-blue-600'; // Default (Semua & Pengumuman)
            if (currentCategory === 'Tips') activeColor = 'bg-green-600';
            if (currentCategory === 'Penting') activeColor = 'bg-red-600';
            
            btn.classList.add(activeColor, 'text-white', 'shadow-md');
            currentPage = 1; // Reset halaman
            renderNews();
        });
    });

    // Event Listener Pencarian
    if (newsSearchInput) {
        newsSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            currentPage = 1; // Reset halaman
            renderNews();
        });
    }

    // --- 6. Logika Slider Banner ---
    let currentSlide = 0;
    const totalSlides = 3;
    const slider = document.getElementById('infoSlider');
    const dots = document.querySelectorAll('.slider-dot');
    let slideInterval;

    function updateSlider() {
        if (!slider) return;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.remove('w-2', 'bg-white/40');
                dot.classList.add('w-8', 'bg-white');
            } else {
                dot.classList.add('w-2', 'bg-white/40');
                dot.classList.remove('w-8', 'bg-white');
            }
        });
    }

    window.nextInfoSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
        resetInterval();
    };

    window.prevInfoSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
        resetInterval();
    };

    window.goToInfoSlide = (index) => {
        currentSlide = index;
        updateSlider();
        resetInterval();
    };

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(window.nextInfoSlide, 6000); // 6 seconds auto slide
    }

    // Inisialisasi Awal
    renderNews();
    renderPopularNews();
    resetInterval(); // Start slider
});