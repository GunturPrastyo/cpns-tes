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
        <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 class="text-xl font-bold text-center md:text-left mb-4 text-gray-800 dark:text-gray-200">Rincian Skor</h4>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        `;

        let index = 0;
        for (const category in categoryScores) {
            const data = categoryScores[category];
            let catClass = 'blue';
            if (category.toUpperCase() === 'TIU') catClass = 'sky';
            if (category.toUpperCase() === 'TKP') catClass = 'green';
            const colSpanClass = index === 0 ? 'col-span-2 sm:col-span-1' : 'col-span-1';

            categoryScoresHTML += `
                <div class="${colSpanClass} bg-${catClass}-50 dark:bg-${catClass}-900/30 p-4 rounded-xl border border-${catClass}-200 dark:border-${catClass}-800/50 text-center shadow-sm">
                    <p class="text-sm font-bold text-${catClass}-800 dark:text-${catClass}-300">${category}</p>
                    <p class="text-4xl font-bold text-${catClass}-600 dark:text-${catClass}-400 my-1">${data.score}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${data.correct} / ${data.total} Benar</p>
                </div>
            `;
            index++;
        }
        categoryScoresHTML += '</div></div>';
    }

    resultContainer.innerHTML = `
      <div class="flex flex-col md:flex-row items-center gap-6">
        <div class="relative">
          <svg class="w-32 h-32 transform -rotate-90">
            <circle cx="64" cy="64" r="54" stroke="currentColor" stroke-width="10" class="text-gray-200 dark:text-gray-700" fill="transparent" />
            <circle id="score-circle" cx="64" cy="64" r="54" stroke="currentColor" stroke-width="10" 
                    class="${isPassed ? 'text-green-500' : 'text-red-500'}" 
                    fill="transparent"
                    stroke-linecap="round"
                    stroke-dasharray="${2 * Math.PI * 54}"                    
                    style="transition: stroke-dashoffset 1.5s ease-out;"
            />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-3xl font-bold text-gray-800 dark:text-white">${score}</span>
          </div>
        </div>
        <div class="flex-1 text-center md:text-left">
          <h3 class="text-2xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}">
            ${isPassed ? 'Luar Biasa, Anda Lulus!' : 'Tetap Semangat, Coba Lagi!'}
          </h3>
          <p class="text-gray-500 dark:text-gray-400 mt-1">Skor Anda adalah ${score} dari 100.</p>
          <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg col-span-2 sm:col-span-1">
              <p class="text-sm text-blue-800 dark:text-blue-300 font-semibold">Total Soal</p>
              <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">${totalQuestions}</p>
            </div>
            <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p class="text-sm text-green-800 dark:text-green-300 font-semibold">Benar</p>
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">${correctCount}</p>
            </div>
            <div class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <p class="text-sm text-red-800 dark:text-red-300 font-semibold">Salah</p>
              <p class="text-2xl font-bold text-red-600 dark:text-red-400">${incorrectCount}</p>
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
            circle.style.strokeDashoffset = `${2 * Math.PI * 54 * (1 - score / 100)}`;
        }
    }, 100);
  }

  renderSummary();
});