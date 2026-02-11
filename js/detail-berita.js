document.addEventListener('DOMContentLoaded', () => {
    if (typeof loadLayout === 'function') {
        loadLayout('info-terkini'); // Memuat layout utama dan highlight menu
    }

    // --- 1. Data Dummy Berita (Konten Statis) ---
    const newsData = [
        {
            id: 1,
            title: 'Jadwal Resmi Seleksi CPNS 2025 Resmi Dirilis BKN',
            excerpt: 'BKN resmi mengumumkan jadwal tahapan seleksi CPNS 2025. Pendaftaran dimulai bulan depan dengan beberapa persyaratan baru.',
            content: `
                <p>Badan Kepegawaian Negara (BKN) akhirnya resmi merilis jadwal tahapan seleksi Calon Pegawai Negeri Sipil (CPNS) untuk tahun anggaran 2025. Pengumuman ini menjadi angin segar bagi jutaan pejuang NIP yang telah menanti kepastian sejak awal tahun.</p>
                <h2>Tahapan Seleksi</h2>
                <p>Berdasarkan surat edaran resmi, berikut adalah lini masa seleksi CPNS 2025:</p>
                <ul>
                    <li><strong>Pengumuman Seleksi:</strong> 15 Agustus - 29 Agustus 2025</li>
                    <li><strong>Pendaftaran Seleksi:</strong> 20 Agustus - 10 September 2025</li>
                    <li><strong>Seleksi Administrasi:</strong> 20 Agustus - 13 September 2025</li>
                    <li><strong>Pengumuman Hasil Seleksi Administrasi:</strong> 14 - 17 September 2025</li>
                    <li><strong>Pelaksanaan SKD CPNS:</strong> 10 Oktober - 15 November 2025</li>
                </ul>
                <p>Plt. Kepala BKN menghimbau agar para calon pelamar mempersiapkan dokumen persyaratan sedini mungkin. "Kami berharap pelamar lebih teliti dalam mengunggah dokumen, karena kesalahan administrasi seringkali menjadi penyebab gugur di tahap awal," ujarnya dalam konferensi pers.</p>
                <h2>Persyaratan Baru</h2>
                <p>Tahun ini, terdapat beberapa penyesuaian terkait syarat batas usia dan kualifikasi pendidikan untuk formasi tertentu. Pelamar disarankan untuk membaca detail persyaratan pada masing-masing instansi yang dilamar melalui portal SSCASN.</p>
            `,
            date: '2 Jam yang lalu',
            views: '2.4k',
            category: 'Pengumuman',
            color: 'blue',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'
            ],
            author: 'Humas BKN'
        },
        {
            id: 2,
            title: 'Tips & Trik Mengerjakan Soal TKP dengan Cepat & Tepat',
            excerpt: 'Bingung dengan soal TKP yang jawabannya mirip semua? Simak strategi memilih jawaban dengan poin 5 dalam waktu singkat.',
            content: `
                <p>Tes Karakteristik Pribadi (TKP) seringkali menjadi jebakan bagi peserta SKD. Berbeda dengan TWK dan TIU yang memiliki jawaban benar atau salah, TKP menilai skala kematangan sikap Anda dengan poin 1 hingga 5. Bagaimana cara mendapatkan poin maksimal?</p>
                <h2>1. Kenali Jejaring Kerja</h2>
                <p>Dalam aspek jejaring kerja, pilihlah jawaban yang menunjukkan sikap terbuka, suka berkolaborasi, dan mampu memperluas koneksi profesional. Hindari jawaban yang terkesan bekerja sendiri atau menutup diri.</p>
                <h2>2. Pelayanan Publik</h2>
                <p>Kata kuncinya adalah "melayani". Pilihlah opsi yang memprioritaskan kepentingan masyarakat umum, bersikap ramah, cekatan, dan tidak membeda-bedakan golongan. Jika ada kendala, carilah solusi yang tidak merugikan publik.</p>
                <h2>3. Profesionalisme</h2>
                <p>Fokus pada penyelesaian tugas. Jawaban dengan poin 5 biasanya menunjukkan dedikasi tinggi, tidak mencampuradukkan urusan pribadi dengan pekerjaan, dan bertanggung jawab penuh atas amanah yang diberikan.</p>
                <p>Latihlah intuisi Anda dengan mengerjakan tryout secara rutin. Semakin sering berlatih, semakin mudah Anda mengidentifikasi pola jawaban terbaik.</p>
            `,
            date: '1 Hari yang lalu',
            views: '1.8k',
            category: 'Tips',
            color: 'green',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'
            ],
            author: 'Coach Aditya'
        },
        {
            id: 3,
            title: 'Perubahan Passing Grade SKD Tahun Ini',
            excerpt: 'Kemenpan RB menetapkan nilai ambang batas baru.',
            content: '<p>Konten berita...</p>',
            date: '3 Hari yang lalu',
            views: '3.2k',
            category: 'Penting',
            color: 'red',
            image: 'https://images.unsplash.com/photo-1584208124888-3a20b9c799e2?q=80&w=1200&auto=format&fit=crop',
            author: 'Admin'
        },
        {
            id: 4,
            title: 'Formasi CPNS 2025 untuk Lulusan SMA/SMK',
            excerpt: 'Pemerintah membuka ribuan formasi untuk lulusan SMA.',
            content: '<p>Konten berita...</p>',
            date: '4 Hari yang lalu',
            views: '5.1k',
            category: 'Pengumuman',
            color: 'blue',
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop',
            author: 'Admin'
        },
        {
            id: 5,
            title: 'Cara Mengatasi Gagal Login di Portal SSCASN',
            excerpt: 'Solusi jika Anda mengalami kendala login.',
            content: '<p>Konten berita...</p>',
            date: '5 Hari yang lalu',
            views: '950',
            category: 'Tips',
            color: 'green',
            image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1200&auto=format&fit=crop',
            author: 'Helpdesk'
        },
        {
            id: 6,
            title: 'Dokumen Wajib yang Sering Terlewat',
            excerpt: 'Cek checklist dokumen wajib berikut ini.',
            content: '<p>Konten berita...</p>',
            date: '1 Minggu yang lalu',
            views: '1.5k',
            category: 'Penting',
            color: 'red',
            image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1200&auto=format&fit=crop',
            author: 'Admin'
        }
    ];

    // --- 2. Logika Pencarian Berita Berdasarkan ID URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id')) || 1;

    // Cari artikel di data dummy
    let article = newsData.find(n => n.id === id);
    
    // Fallback: Jika ID tidak ditemukan (karena data dummy terbatas), buat konten default
    if (!article) {
        article = {
            id: id,
            title: 'Detail Berita Belum Tersedia (Dummy)',
            category: 'Umum',
            date: 'Baru saja',
            views: '0',
            color: 'gray',
            image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop',
            images: ['https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop'],
            author: 'Admin',
            content: '<p>Maaf, konten lengkap untuk berita ini belum tersedia dalam data dummy. Silakan coba berita "Jadwal Resmi Seleksi CPNS" atau "Tips & Trik TKP".</p>'
        };
        // Pinjam styling warna dari data pertama jika ada
        const basicInfo = newsData.find(n => n.id === 1); 
        if(basicInfo) {
             article.color = basicInfo.color;
        }
    }

    // --- 3. Render Navigasi Breadcrumb ---
    const breadcrumbContainer = document.getElementById('breadcrumb-container');
    if (breadcrumbContainer) {
        breadcrumbContainer.innerHTML = `
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li class="inline-flex items-center">
                    <a href="index.html" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                        <i data-lucide="layout-dashboard" class="w-4 h-4 mr-2"></i>
                        Dashboard
                    </a>
                </li>
                <li>
                    <div class="flex items-center">
                        <i data-lucide="chevrons-right" class="w-4 h-4 text-gray-400 mx-1"></i>
                        <a href="info-terkini.html" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 md:ms-2 transition-colors">Info Terkini</a>
                    </div>
                </li>
                <li aria-current="page">
                    <div class="flex items-center">
                        <i data-lucide="chevrons-right" class="w-4 h-4 text-gray-400 mx-1"></i>
                        <span class="ms-1 text-sm font-medium text-blue-600 dark:text-blue-400 md:ms-2 truncate max-w-[150px] sm:max-w-xs">${article.title}</span>
                    </div>
                </li>
            </ol>
        `;
    }

    // --- 4. Render Konten Utama Berita ---
    const contentContainer = document.getElementById('article-content');
    if (contentContainer) {
        // Siapkan gambar untuk slider (jika ada array images, pakai itu. Jika tidak, pakai single image)
        const galleryImages = article.images || [article.image];

        contentContainer.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <!-- Article Header -->
                <div class="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex flex-wrap items-center gap-3 mb-4">
                        <span class="px-3 py-1 text-xs font-bold rounded-full bg-${article.color}-100 text-${article.color}-700 dark:bg-${article.color}-900/30 dark:text-${article.color}-300 uppercase tracking-wide">
                            ${article.category}
                        </span>
                        <span class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${article.date}
                        </span>
                        <span class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <i data-lucide="eye" class="w-3.5 h-3.5"></i> ${article.views} Views
                        </span>
                    </div>
                    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                        ${article.title}
                    </h1>
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=${article.author}&background=random" alt="${article.author}" class="w-full h-full object-cover">
                        </div>
                        <div>
                            <p class="text-sm font-bold text-gray-800 dark:text-white">${article.author}</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">Penulis</p>
                        </div>
                    </div>
                </div>

                <!-- Featured Image Area -->
                <div class="bg-gray-100 dark:bg-gray-900">
                    <!-- Main Slider -->
                    <div class="relative w-full aspect-video bg-gray-200 dark:bg-gray-800 group overflow-hidden">
                        <div id="article-slider-track" class="flex h-full transition-transform duration-500 ease-out">
                            ${galleryImages.map((img, idx) => `
                                <div class="w-full h-full shrink-0 relative flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                                    <img src="${img}" alt="${article.title} - Image ${idx+1}" class="w-full h-full object-cover">
                                </div>
                            `).join('')}
                        </div>
                        ${galleryImages.length > 1 ? `
                            <button onclick="moveArticleSlide(-1)" class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
                                <i data-lucide="chevron-left" class="w-6 h-6"></i>
                            </button>
                            <button onclick="moveArticleSlide(1)" class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
                                <i data-lucide="chevron-right" class="w-6 h-6"></i>
                            </button>
                        ` : ''}
                    </div>
                    
                    <!-- Caption & Thumbnails -->
                    <div class="p-4 border-b border-gray-100 dark:border-gray-700">
                        <p class="text-xs text-gray-500 dark:text-gray-400 italic mb-3 flex items-center gap-1.5"><i data-lucide="camera" class="w-3 h-3"></i> Ilustrasi: ${article.title}</p>
                        
                        ${galleryImages.length > 1 ? `
                            <div class="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                                ${galleryImages.map((img, idx) => `
                                    <button onclick="goToArticleSlide(${idx})" class="relative w-20 h-14 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${idx === 0 ? 'border-blue-600 ring-2 ring-blue-100 dark:ring-blue-900' : 'border-transparent opacity-70 hover:opacity-100'}" id="thumb-${idx}">
                                        <img src="${img}" class="w-full h-full object-cover">
                                    </button>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Article Body -->
                <div class="p-6 md:p-8 prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    ${article.content}
                </div>

                <!-- Footer / Share -->
                <div class="p-6 md:p-8 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <h4 class="text-sm font-bold text-gray-800 dark:text-white mb-3">Bagikan artikel ini:</h4>
                    <div class="flex gap-2">
                        <button class="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"><i data-lucide="facebook" class="w-4 h-4"></i></button>
                        <button class="p-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors"><i data-lucide="twitter" class="w-4 h-4"></i></button>
                        <button class="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"><i data-lucide="message-circle" class="w-4 h-4"></i></button>
                        <button class="p-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"><i data-lucide="link" class="w-4 h-4"></i></button>
                    </div>
                </div>
            </div>
        `;
    }

    // --- 5. Render Berita Terkait (Sidebar) ---
    const relatedContainer = document.getElementById('relatedNewsList');
    const relatedFooter = document.getElementById('relatedNewsFooter');
    
    if (relatedContainer) {
        const related = newsData.filter(n => n.id !== id).slice(0, 5); // Ambil 5 berita lain
        
        let html = related.map(item => `
            <a href="detail-berita.html?id=${item.id}" class="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                <div class="flex gap-4 items-start">
                    <div class="w-24 h-24 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0 relative">
                        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1.5">
                            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-${item.color}-100 text-${item.color}-700 dark:bg-${item.color}-900/30 dark:text-${item.color}-300 uppercase tracking-wide">${item.category}</span>
                            <span class="text-xs text-gray-400 dark:text-gray-500">• ${item.date}</span>
                        </div>
                        <h4 class="text-sm font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-1.5">${item.title}</h4>
                        <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">${item.excerpt}</p>
                    </div>
                </div>
            </a>
        `).join('');

        relatedContainer.innerHTML = html;
        
        if (relatedFooter) {
            relatedFooter.innerHTML = `
                <a href="info-terkini.html" class="text-xs font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                    Lihat Selengkapnya <i data-lucide="chevron-down" class="w-3 h-3"></i>
                </a>
            `;
        }
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();

    // --- 6. Logika Slider Gambar Artikel ---
    let currentSlide = 0;
    const totalSlides = article.images ? article.images.length : 1;
    
    window.moveArticleSlide = (direction) => {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        const track = document.getElementById('article-slider-track');
        if (track) {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        updateThumbnails();
    };

    window.goToArticleSlide = (index) => {
        currentSlide = index;
        const track = document.getElementById('article-slider-track');
        if (track) track.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateThumbnails();
    };

    function updateThumbnails() {
        document.querySelectorAll('[id^="thumb-"]').forEach((thumb, idx) => {
            if (idx === currentSlide) {
                thumb.classList.remove('border-transparent', 'opacity-70');
                thumb.classList.add('border-blue-600', 'ring-2', 'ring-blue-100', 'dark:ring-blue-900');
            } else {
                thumb.classList.add('border-transparent', 'opacity-70');
                thumb.classList.remove('border-blue-600', 'ring-2', 'ring-blue-100', 'dark:ring-blue-900');
            }
        });
    }
});