document.addEventListener('DOMContentLoaded', () => {
    // Initialize layout
    if (typeof loadLayout === 'function') {
        loadLayout('riwayat');
    }

    const container = document.getElementById('pembahasan-container');
    const navContainer = document.getElementById('navigation-container');
    const resultDataString = localStorage.getItem('cpns_cat_result');

    if (!resultDataString) {
        container.innerHTML = `
            <div class="bg-white dark:bg-gray-800 p-8 rounded-xl text-center shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
                    <i data-lucide="alert-circle" class="w-8 h-8"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">Data Tidak Ditemukan</h3>
                <p class="text-gray-500 dark:text-gray-400 mb-6">Silakan kerjakan tryout terlebih dahulu untuk melihat pembahasan.</p>
                <a href="paket-soal.html" class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Ke Paket Soal
                </a>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    const resultData = JSON.parse(resultDataString);
    const { questions, answers } = resultData;

    // --- Pagination State ---
    let currentPage = 1;
    let itemsPerPage = window.innerWidth < 640 ? 5 : 10; // 5 for mobile, 10 for desktop
    let activeQuestionIdx = 0;
    let observer;

    // --- Render Questions (Paginated) ---
    function renderQuestions() {
        const totalPages = Math.ceil(questions.length / itemsPerPage);
        
        // Validate currentPage
        if (currentPage < 1) currentPage = 1;
        if (currentPage > totalPages) currentPage = totalPages;

        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = Math.min(startIdx + itemsPerPage, questions.length);
        const pageQuestions = questions.slice(startIdx, endIdx);

        let html = '';

        pageQuestions.forEach((q, i) => {
            const realIndex = startIdx + i;
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            const isSkipped = !userAnswer;

            let statusBadge = '';
            let borderClass = '';
            
            if (isCorrect) {
                statusBadge = '<span class="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">Benar</span>';
                borderClass = 'border-l-4 border-l-green-500';
            } else if (isSkipped) {
                statusBadge = '<span class="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">Tidak Dijawab</span>';
                borderClass = 'border-l-4 border-gray-400';
            } else {
                statusBadge = '<span class="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800">Salah</span>';
                borderClass = 'border-l-4 border-l-red-500';
            }

            html += `
                <div id="soal-${realIndex}" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${borderClass} scroll-mt-24">
                    <div class="p-5 md:p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex items-center gap-3">
                                <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-sm dark:bg-indigo-900/30 dark:text-indigo-300">
                                    ${realIndex + 1}
                                </span>
                                <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-400">
                                    ${q.category}
                                </span>
                            </div>
                            ${statusBadge}
                        </div>
                        
                        <div class="prose dark:prose-invert max-w-none mb-6 text-gray-800 dark:text-gray-200 text-base">
                            ${q.text}
                        </div>

                        <div class="space-y-3">
            `;

            q.options.forEach(opt => {
                let optionStyle = 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50';
                let icon = '';
                let labelColor = 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700';

                if (opt.key === q.correctAnswer) {
                    optionStyle = 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-500 ring-1 ring-green-500';
                    labelColor = 'text-green-700 bg-green-200 dark:bg-green-800 dark:text-green-100';
                    icon = '<i data-lucide="check-circle" class="w-5 h-5 text-green-600 dark:text-green-400 ml-auto"></i>';
                } else if (opt.key === userAnswer && userAnswer !== q.correctAnswer) {
                    optionStyle = 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-500 ring-1 ring-red-500';
                    labelColor = 'text-red-700 bg-red-200 dark:bg-red-800 dark:text-red-100';
                    icon = '<i data-lucide="x-circle" class="w-5 h-5 text-red-600 dark:text-red-400 ml-auto"></i>';
                }

                html += `
                    <div class="flex items-center p-3 sm:p-4 rounded-lg border ${optionStyle} transition-all">
                        <span class="w-8 h-8 flex items-center justify-center rounded-md text-sm font-bold mr-4 shrink-0 ${labelColor}">
                            ${opt.key}
                        </span>
                        <span class="text-sm sm:text-base text-gray-700 dark:text-gray-200 flex-1">
                            ${opt.text}
                        </span>
                        ${icon}
                    </div>
                `;
            });

            html += `
                        </div>
                        
                        <div class="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700">
                            <div class="flex items-start gap-3">
                                <div class="p-2 bg-indigo-50 text-indigo-600 rounded-lg dark:bg-indigo-900/20 dark:text-indigo-400 shrink-0">
                                    <i data-lucide="lightbulb" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <h5 class="font-bold text-gray-800 dark:text-gray-200 text-sm mb-1">Pembahasan Soal No. ${realIndex + 1}</h5>
                                    <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Jawaban yang benar adalah <strong>${q.correctAnswer}</strong>. 
                                        ${q.explanation ? q.explanation : 'Analisis soal menunjukkan bahwa pilihan ini paling tepat sesuai dengan konteks pertanyaan.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // Add Pagination Controls at the bottom of content
        html += `
            <div class="flex justify-between items-center gap-4 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button id="content-prev-btn" class="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm flex items-center gap-2" ${currentPage === 1 ? 'disabled' : ''}>
                    <i data-lucide="chevron-left" class="w-4 h-4"></i> Sebelumnya
                </button>
                <span class="text-sm font-bold text-gray-700 dark:text-gray-300">Halaman ${currentPage} dari ${totalPages}</span>
                <button id="content-next-btn" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm flex items-center gap-2" ${currentPage === totalPages ? 'disabled' : ''}>
                    Berikutnya <i data-lucide="chevron-right" class="w-4 h-4"></i>
                </button>
            </div>
        `;

        container.innerHTML = html;
        lucide.createIcons();

        // Setup IntersectionObserver to track active question on scroll
        if (observer) observer.disconnect();
        
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = parseInt(entry.target.id.replace('soal-', ''));
                    if (!isNaN(idx) && activeQuestionIdx !== idx) {
                        activeQuestionIdx = idx;
                        renderNavGrid();
                    }
                }
            });
        }, {
            rootMargin: '-50% 0px -50% 0px', // Trigger when element is in the middle of viewport
            threshold: 0
        });

        container.querySelectorAll('[id^="soal-"]').forEach(el => observer.observe(el));

        // Attach listeners
        document.getElementById('content-prev-btn')?.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderQuestions();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        document.getElementById('content-next-btn')?.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderQuestions();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // --- Render Sidebar Navigation (All Items) ---
    function renderNavGrid() {
        if (!navContainer) return;
        
        let navHtml = '';
        
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            const isSkipped = !userAnswer;
            
            let navClass = '';
             if (isCorrect) {
                navClass = 'bg-green-500 text-white border-green-600 hover:bg-green-600';
            } else if (isSkipped) {
                navClass = 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
            } else {
                navClass = 'bg-red-500 text-white border-red-600 hover:bg-red-600';
            }

            const activeNavClass = i === activeQuestionIdx ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800 z-10' : '';

            navHtml += `
                <button onclick="jumpToQuestion(${i})" class="h-10 w-full rounded text-xs font-bold border transition-all shadow-sm flex items-center justify-center ${navClass} ${activeNavClass}">${i + 1}</button>
            `;
        }

        navContainer.innerHTML = navHtml;
    }

    // --- Jump Function ---
    window.jumpToQuestion = (index) => {
        activeQuestionIdx = index;
        renderNavGrid();

        const targetPage = Math.floor(index / itemsPerPage) + 1;
        if (currentPage !== targetPage) {
            currentPage = targetPage;
            renderQuestions();
        } else {
            renderQuestions();
        }
        // Wait for render to finish then scroll
        setTimeout(() => {
            const el = document.getElementById(`soal-${index}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);
    };

    // Initial Render
    renderQuestions();
    renderNavGrid();

    // Resize Listener to update items per page
    window.addEventListener('resize', () => {
        const newItemsPerPage = window.innerWidth < 640 ? 5 : 10;
        if (newItemsPerPage !== navItemsPerPage) {
            navItemsPerPage = newItemsPerPage;
            currentPage = 1; // Reset to page 1 to avoid index issues
            renderQuestions();
        }
    });

    lucide.createIcons();
});