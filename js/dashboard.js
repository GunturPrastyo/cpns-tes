document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- 1. Render Charts ---
    renderScoreChart();
    renderCategoryChart();

    // --- 2. Render Recent Activity ---
    renderRecentActivity();

    // --- 3. Render Info Updates ---
    renderInfoList();
});

// --- Chart: Statistik Perkembangan Nilai (Line Chart) ---
function renderScoreChart() {
    const canvas = document.getElementById('scoreChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.25)'); // Blue-600 fade
    gradient.addColorStop(1, 'rgba(37, 99, 235, 0.0)');

    // Dummy Data: Simulasi perkembangan skor 5 tryout terakhir
    const labels = ['TO-1', 'TO-2', 'TO-3', 'TO-4', 'TO-5'];
    const dataScores = [310, 345, 330, 385, 405];
    const targetScore = 450; // Target Aman
    const passingGrade = 311; // Passing Grade SKD (Total)

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Skor Kamu',
                    data: dataScores,
                    borderColor: '#2563eb', // Blue-600
                    backgroundColor: gradient,
                    borderWidth: 3,
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Target Aman',
                    data: Array(labels.length).fill(targetScore),
                    borderColor: '#10b981', // Green-500
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0,
                    fill: false,
                    tension: 0
                },
                {
                    label: 'Passing Grade',
                    data: Array(labels.length).fill(passingGrade),
                    borderColor: '#ef4444', // Red-500
                    borderWidth: 1,
                    borderDash: [3, 3],
                    pointRadius: 0,
                    fill: false,
                    tension: 0,
                    margin: 10
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        boxWidth: 12,
                        boxPadding: 32,
                        font: { family: "'Poppins', sans-serif", size: 12 }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#ffffff',
                    titleColor: '#1f2937',
                    bodyColor: '#4b5563',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    padding: 12,
                    displayColors: true,
                    boxPadding: 4,
                    callbacks: {
                        label: function(context) {
                            return ` ${context.dataset.label}: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 200,
                    max: 550,
                    border: { display: false },
                    grid: {
                        color: '#f3f4f6',
                        tickLength: 0
                    },
                    ticks: {
                        font: { family: "'Poppins', sans-serif", size: 11 },
                        color: '#9ca3af',
                        padding: 10
                    }
                },
                x: {
                    border: { display: false },
                    grid: { display: false, drawBorder: false },
                    ticks: {
                        font: { family: "'Poppins', sans-serif", size: 11 },
                        color: '#6b7280'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// --- Chart: Analisis Kategori (Radar Chart) ---
function renderCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;

    // Data Konteks CPNS
    const maxScores = { TWK: 150, TIU: 175, TKP: 225 };
    const passingGrades = { TWK: 65, TIU: 80, TKP: 166 };
    const userScores = { TWK: 85, TIU: 110, TKP: 190 };

    // Konversi ke Persentase untuk Grafik yang Seimbang
    const dataUserPct = [
        (userScores.TWK / maxScores.TWK) * 100,
        (userScores.TIU / maxScores.TIU) * 100,
        (userScores.TKP / maxScores.TKP) * 100
    ];
    
    const dataPGPct = [
        (passingGrades.TWK / maxScores.TWK) * 100,
        (passingGrades.TIU / maxScores.TIU) * 100,
        (passingGrades.TKP / maxScores.TKP) * 100
    ];

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['TWK', 'TIU', 'TKP'],
            datasets: [{
                label: 'Skor Kamu',
                data: dataUserPct,
                fill: true,
                backgroundColor: 'rgba(37, 99, 235, 0.15)',
                borderColor: '#2563eb',
                pointBackgroundColor: '#2563eb',
                pointBorderColor: 'transparent', // Hilangkan border point di radar
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#2563eb'
            },
            {
                label: 'Passing Grade',
                data: dataPGPct,
                fill: false,
                backgroundColor: 'rgba(239, 68, 68, 0.0)',
                borderColor: '#ef4444', // Merah untuk batas
                borderDash: [5, 5],
                pointBackgroundColor: 'transparent',
                pointBorderColor: '#fff',
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: { borderWidth: 2 }
            },
            scales: {
                r: {
                    angleLines: { color: '#e5e7eb' },
                    grid: { color: '#f3f4f6' },
                    pointLabels: {
                        font: { family: "'Poppins', sans-serif", size: 12, weight: '600' },
                        color: '#4b5563'
                    },
                    min: 0,
                    max: 100,
                    ticks: { display: false, backdropColor: 'transparent' } // Hide scale numbers & backdrop
                }
            },
            plugins: {
                legend: { 
                    display: true,
                    position: 'bottom',
                    labels: { 
                        font: { family: "'Poppins', sans-serif", size: 11 }, 
                        boxWidth: 6, 
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#1f2937',
                    bodyColor: '#4b5563',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    padding: 12,
                    boxPadding: 4,
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const index = context.dataIndex;
                            const categories = ['TWK', 'TIU', 'TKP'];
                            const cat = categories[index];
                            
                            let rawScore = label === 'Skor Kamu' ? userScores[cat] : passingGrades[cat];
                            return `${label}: ${rawScore} (${Math.round(context.raw)}%)`;
                        }
                    }
                }
            }
        }
    });
}

// --- Render Recent Activity List ---
function renderRecentActivity() {
    const container = document.getElementById('recentActivityList');
    if (!container) return;

    // Dummy Data: Ditambah agar mengisi ruang kosong (match height with news card)
    const activities = [
        { 
            title: 'Tryout SKD Nasional #5', 
            date: '2 Jam yang lalu', 
            score: 405, 
            maxScore: 550,
            status: 'Lulus PG', 
            color: 'green',
            type: 'SKD'
        },
        { 
            title: 'Latihan Soal TIU (HOTS)', 
            date: 'Kemarin', 
            score: 110, 
            maxScore: 175,
            status: 'Sangat Baik', 
            color: 'blue',
            type: 'TIU'
        },
        { 
            title: 'Tryout SKD Premium #2', 
            date: '3 Hari yang lalu', 
            score: 385, 
            maxScore: 550,
            status: 'Lulus PG', 
            color: 'green',
            type: 'SKD'
        },
        { 
            title: 'Simulasi CAT BKN 2024', 
            date: '5 Hari yang lalu', 
            score: 290, 
            maxScore: 550,
            status: 'Belum Lulus', 
            color: 'red',
            type: 'SKD'
        },
        { 
            title: 'Tryout SKD Nasional #4', 
            date: '1 Minggu yang lalu', 
            score: 360, 
            maxScore: 550,
            status: 'Lulus PG', 
            color: 'green',
            type: 'SKD'
        }
    ];

    container.innerHTML = activities.map((item, index) => {
        const percentage = (item.score / item.maxScore) * 100;
        const isLast = index === activities.length - 1;
        
        return `
        <div class="p-5 ${!isLast ? 'border-b border-gray-100 dark:border-gray-700' : ''} hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group cursor-pointer">
            <div class="flex justify-between items-start mb-3">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center shrink-0 dark:bg-${item.color}-900/20 dark:text-${item.color}-400 shadow-sm">
                        <i data-lucide="${item.type === 'SKD' ? 'file-check' : 'brain-circuit'}" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h4 class="text-sm font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">${item.title}</h4>
                        <div class="flex items-center gap-2 mt-0.5">
                            <span class="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">${item.type}</span>
                            <span class="text-xs text-gray-400 dark:text-gray-500">• ${item.date}</span>
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <span class="block text-lg font-black text-gray-800 dark:text-white leading-none">${item.score}</span>
                    <span class="text-[10px] text-gray-400">/ ${item.maxScore}</span>
                </div>
            </div>
            
            <div class="flex items-center gap-3">
                <div class="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-${item.color}-500 rounded-full" style="width: ${percentage}%"></div>
                </div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-${item.color}-100 text-${item.color}-700 dark:bg-${item.color}-900/30 dark:text-${item.color}-300 whitespace-nowrap">
                    ${item.status}
                </span>
            </div>
        </div>
    `}).join('');

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// --- Render Info / News List ---
function renderInfoList() {
    const container = document.getElementById('infoList');
    if (!container) return;

    const news = [
        {
            title: 'Jadwal Resmi Seleksi CPNS 2025 Resmi Dirilis BKN',
            excerpt: 'BKN resmi mengumumkan jadwal tahapan seleksi CPNS 2025. Pendaftaran dimulai bulan depan dengan beberapa persyaratan baru...',
            date: '2 Jam yang lalu',
            category: 'Pengumuman',
            color: 'blue',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=200&auto=format&fit=crop'
        },
        {
            title: 'Tips & Trik Mengerjakan Soal TKP dengan Cepat & Tepat',
            excerpt: 'Bingung dengan soal TKP yang jawabannya mirip semua? Simak strategi memilih jawaban dengan poin 5 dalam waktu singkat...',
            date: '1 Hari yang lalu',
            category: 'Tips',
            color: 'green',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=200&auto=format&fit=crop'
        },
        {
            title: 'Perubahan Passing Grade SKD Tahun Ini yang Wajib Diketahui',
            excerpt: 'Kemenpan RB menetapkan nilai ambang batas baru untuk SKD tahun ini. Pastikan kamu tahu target skor minimal agar lolos ke tahap SKB...',
            date: '3 Hari yang lalu',
            category: 'Penting',
            color: 'red',
            image: 'https://images.unsplash.com/photo-1584208124888-3a20b9c799e2?q=80&w=200&auto=format&fit=crop'
        },
        {
            title: 'Formasi CPNS 2025 untuk Lulusan SMA/SMK',
            excerpt: 'Pemerintah membuka ribuan formasi untuk lulusan SMA/SMK sederajat pada seleksi CPNS tahun ini. Cek formasinya di sini...',
            date: '4 Hari yang lalu',
            category: 'Tips',
            color: 'purple',
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=200&auto=format&fit=crop'
        }
    ];

    container.innerHTML = news.map(item => `
        <div class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex gap-4 group cursor-pointer items-start">
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
    `).join('');

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}