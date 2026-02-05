document.addEventListener('DOMContentLoaded', () => {
  // Initialize layout script
  if (typeof loadLayout === 'function') {
    // Assuming 'riwayat' or similar is the page key for layout active state
    loadLayout('riwayat'); 
  }

  const resultContainer = document.getElementById('result-container');
  const resultLoading = document.getElementById('result-loading');
  const reviewContainer = document.getElementById('review-content');
  const reviewTitle = document.querySelector('h2[id="review-title"]');

  // Hide review section by default as requested
  if (reviewContainer) reviewContainer.style.display = 'none';
  if (reviewTitle) reviewTitle.style.display = 'none';

  const resultDataString = localStorage.getItem('cpns_cat_result');

  if (!resultDataString) {
    resultContainer.innerHTML = '<p class="text-center text-red-500">Data hasil tidak ditemukan. Silakan selesaikan tryout terlebih dahulu.</p>';
    resultLoading.style.display = 'none';
    return;
  }

  const resultData = JSON.parse(resultDataString);
  const { score, correctCount, totalQuestions, answers, questions } = resultData;
  const incorrectCount = totalQuestions - correctCount;
  
  // --- Calculate category scores ---
  const categoryScores = {};
  if (questions && questions.length > 0) {
    questions.forEach(q => {
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { correct: 0, total: 0, score: 0 };
      }
      categoryScores[q.category].total++;
      if (answers[q.id] === q.correctAnswer) {
        categoryScores[q.category].correct++;
      }
    });
  
    for (const category in categoryScores) {
      const { correct, total } = categoryScores[category];
      categoryScores[category].score = total > 0 ? Math.round((correct / total) * 100) : 0;
    }
  }

  // --- Render Summary ---
  function renderSummary() {
    const isPassed = score >= 65; // Example passing grade
    resultLoading.style.display = 'none';
    
    let categoryScoresHTML = '';
    const hasCategories = Object.keys(categoryScores).length > 1;

    if (hasCategories) {
        categoryScoresHTML += `
        <div class="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <h4 class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <i data-lucide="bar-chart-2" class="w-5 h-5 text-blue-500"></i>
                Rincian Skor Per Kategori
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        `;

        let index = 0;
        for (const category in categoryScores) {
            const data = categoryScores[category];
            let catClass = 'blue';
            let iconName = 'book-open';
            if (category.toUpperCase() === 'TIU') { catClass = 'sky'; iconName = 'brain-circuit'; }
            if (category.toUpperCase() === 'TKP') { catClass = 'green'; iconName = 'user-check'; }

            categoryScoresHTML += `
                <div class="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-16 h-16 bg-${catClass}-50 dark:bg-${catClass}-900/20 rounded-bl-full -mr-2 -mt-2 transition-transform group-hover:scale-110"></div>
                    
                    <div class="relative z-10">
                        <div class="flex justify-between items-start mb-2">
                            <div class="p-2 bg-${catClass}-100 dark:bg-${catClass}-900/30 text-${catClass}-600 dark:text-${catClass}-400 rounded-lg">
                                <i data-lucide="${iconName}" class="w-5 h-5"></i>
                            </div>
                            <span class="text-xs font-bold px-2 py-1 bg-${catClass}-50 dark:bg-${catClass}-900/20 text-${catClass}-700 dark:text-${catClass}-300 rounded-full">
                                ${category}
                            </span>
                        </div>
                        
                        <div class="flex items-end gap-2 mt-3">
                            <span class="text-3xl font-bold text-gray-800 dark:text-white">${data.score}</span>
                            <span class="text-sm text-gray-500 dark:text-gray-400 mb-1.5">/ 100</span>
                        </div>
                        
                        <div class="mt-3">
                            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                                <span>Benar: ${data.correct}/${data.total}</span>
                                <span>${data.score}%</span>
                            </div>
                            <div class="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                                <div class="bg-${catClass}-500 h-2 rounded-full transition-all duration-1000" style="width: ${data.score}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            index++;
        }
        categoryScoresHTML += '</div></div>';
    }

    resultContainer.innerHTML = `
      <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        
        <!-- Score Circle Section -->
        <div class="relative shrink-0">
          <div class="w-40 h-40 rounded-full bg-white dark:bg-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(0,0,0,0.2)] flex items-center justify-center relative z-10">
              <svg class="w-36 h-36 transform -rotate-90">
                <circle cx="72" cy="72" r="65" stroke="currentColor" stroke-width="8" class="text-gray-100 dark:text-gray-700" fill="transparent" />
                <circle id="score-circle" cx="72" cy="72" r="65" stroke="currentColor" stroke-width="8" 
                        class="${isPassed ? 'text-green-500' : 'text-red-500'}" 
                        fill="transparent"
                        stroke-linecap="round"
                        stroke-dasharray="${2 * Math.PI * 65}"                    
                        style="transition: stroke-dashoffset 1.5s ease-out;"
                />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">${score}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mt-1">Total Skor</span>
              </div>
          </div>
          <!-- Decorative background blur behind circle -->
          <div class="absolute inset-0 bg-${isPassed ? 'green' : 'red'}-500/20 blur-3xl rounded-full -z-10 transform scale-110"></div>
        </div>

        <!-- Text & Stats Section -->
        <div class="flex-1 w-full text-center md:text-left">
          <div class="mb-6">
              <h3 class="text-2xl md:text-3xl font-bold ${isPassed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} mb-2">
                ${isPassed ? 'Selamat! Anda Lulus' : 'Jangan Menyerah!'}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                ${isPassed 
                    ? 'Performa Anda sangat baik. Pertahankan dan tingkatkan terus kemampuan Anda untuk hasil yang lebih maksimal.' 
                    : 'Hasil tes Anda belum memenuhi ambang batas kelulusan. Pelajari kembali materi yang kurang dikuasai dan coba lagi.'}
              </p>
          </div>

          <div class="grid grid-cols-3 gap-3 sm:gap-4">
            <div class="bg-blue-50 dark:bg-blue-900/10 p-3 sm:p-4 rounded-xl border border-blue-100 dark:border-blue-800/30 flex flex-col items-center md:items-start">
              <div class="flex items-center gap-2 mb-1">
                  <div class="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md text-blue-600 dark:text-blue-400">
                    <i data-lucide="list-checks" class="w-4 h-4"></i>
                  </div>
                  <span class="text-xs font-semibold text-blue-800 dark:text-blue-300 uppercase tracking-wide">Total</span>
              </div>
              <p class="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-400">${totalQuestions}</p>
            </div>
            
            <div class="bg-green-50 dark:bg-green-900/10 p-3 sm:p-4 rounded-xl border border-green-100 dark:border-green-800/30 flex flex-col items-center md:items-start">
              <div class="flex items-center gap-2 mb-1">
                  <div class="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-md text-green-600 dark:text-green-400">
                    <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                  </div>
                  <span class="text-xs font-semibold text-green-800 dark:text-green-300 uppercase tracking-wide">Benar</span>
              </div>
              <p class="text-xl sm:text-2xl font-bold text-green-700 dark:text-green-400">${correctCount}</p>
            </div>

            <div class="bg-red-50 dark:bg-red-900/10 p-3 sm:p-4 rounded-xl border border-red-100 dark:border-red-800/30 flex flex-col items-center md:items-start">
              <div class="flex items-center gap-2 mb-1">
                  <div class="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-md text-red-600 dark:text-red-400">
                    <i data-lucide="x-circle" class="w-4 h-4"></i>
                  </div>
                  <span class="text-xs font-semibold text-red-800 dark:text-red-300 uppercase tracking-wide">Salah</span>
              </div>
              <p class="text-xl sm:text-2xl font-bold text-red-700 dark:text-red-400">${incorrectCount}</p>
            </div>
          </div>
        </div>
      </div>
      ${categoryScoresHTML}
    `;

    // Animate circle after rendering
    setTimeout(() => {
        const circle = document.getElementById('score-circle');
        if (circle) {
            circle.style.strokeDashoffset = `${2 * Math.PI * 65 * (1 - score / 100)}`;
        }
        if (window.lucide) window.lucide.createIcons();
    }, 100);
  }

  renderSummary();
});