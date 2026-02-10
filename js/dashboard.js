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
    const ctx = document.getElementById('scoreChart');
    if (!ctx) return;

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
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#2563eb',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
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
                    tension: 0
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
                        usePointStyle: true,
                        boxWidth: 8,
                        font: { family: "'Poppins', sans-serif", size: 12 }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1f2937',
                    bodyColor: '#4b5563',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: true,
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
                    grid: {
                        color: '#f3f4f6',
                        borderDash: [2, 2]
                    },
                    ticks: {
                        font: { family: "'Poppins', sans-serif", size: 11 },
                        color: '#9ca3af'
                    }
                },
                x: {
                    grid: { display: false },
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
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: '#2563eb',
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#fff',
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
                pointBackgroundColor: '#ef4444',
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
                    grid: { color: '#e5e7eb' },
                    pointLabels: {
                        font: { family: "'Poppins', sans-serif", size: 12, weight: '600' },
                        color: '#4b5563'
                    },
                    min: 0,
                    max: 100,
                    ticks: { display: false } // Hide scale numbers
                }
            },
            plugins: {
                legend: { 
                    display: true,
                    position: 'bottom',
                    labels: { font: { family: "'Poppins', sans-serif", size: 10 }, boxWidth: 10, usePointStyle: true }
                },
                tooltip: {
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

    // Dummy Data
    const activities = [
        { title: 'Tryout SKD Nasional #5', date: '2 Jam yang lalu', score: 405, status: 'Lulus PG', color: 'green' },
        { title: 'Latihan Soal TIU (HOTS)', date: 'Kemarin', score: 85, status: 'Belum Lulus', color: 'orange' },
        { title: 'Tryout SKD Premium #2', date: '3 Hari yang lalu', score: 385, status: 'Lulus PG', color: 'green' }
    ];

    container.innerHTML = activities.map(item => `
        <div class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between group cursor-pointer">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center shrink-0 dark:bg-${item.color}-900/30 dark:text-${item.color}-400">
                    <i data-lucide="${item.color === 'green' ? 'check-circle' : 'alert-circle'}" class="w-5 h-5"></i>
                </div>
                <div>
                    <h4 class="text-sm font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">${item.title}</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${item.date}</p>
                </div>
            </div>
            <div class="text-right">
                <span class="block text-lg font-bold text-gray-800 dark:text-white">${item.score}</span>
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-${item.color}-100 text-${item.color}-700 dark:bg-${item.color}-900/30 dark:text-${item.color}-300">${item.status}</span>
            </div>
        </div>
    `).join('');

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
            date: '2 Jam yang lalu',
            category: 'Pengumuman',
            color: 'blue'
        },
        {
            title: 'Tips & Trik Mengerjakan Soal TKP dengan Cepat & Tepat',
            date: '1 Hari yang lalu',
            category: 'Tips',
            color: 'green'
        },
        {
            title: 'Perubahan Passing Grade SKD Tahun Ini yang Wajib Diketahui',
            date: '3 Hari yang lalu',
            category: 'Penting',
            color: 'red'
        }
    ];

    container.innerHTML = news.map(item => `
        <div class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-start gap-4 group cursor-pointer">
            <div class="w-12 h-12 rounded-lg bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center shrink-0 dark:bg-${item.color}-900/30 dark:text-${item.color}-400">
                 <i data-lucide="${item.category === 'Tips' ? 'lightbulb' : (item.category === 'Penting' ? 'alert-triangle' : 'megaphone')}" class="w-6 h-6"></i>
            </div>
            <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-${item.color}-100 text-${item.color}-700 dark:bg-${item.color}-900/30 dark:text-${item.color}-300 uppercase tracking-wide">${item.category}</span>
                    <span class="text-xs text-gray-400 dark:text-gray-500">• ${item.date}</span>
                </div>
                <h4 class="text-sm font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">${item.title}</h4>
            </div>
        </div>
    `).join('');

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}