document.addEventListener('DOMContentLoaded', () => {
    // Load Layout (Sidebar & Navbar)
    if (typeof loadLayout === 'function') {
        loadLayout('komponen-editor');
    }

    const questionsList = document.getElementById('questions-list');
    const btnAdd = document.getElementById('btn-add-question');
    const template = document.getElementById('question-template');
    const navGrid = document.getElementById('question-nav-grid');
    
    // Pagination State untuk Navigasi
    let currentNavPage = 1;
    const navPageSize = 20; // Tampilkan 20 nomor per halaman
    
    // Store Quill instances: { id: { soal: quill, pembahasan: quill } }
    const quillRegistry = {};

    // Toolbar Config
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['link', 'image']
    ];

    // --- Core Function: Add Question ---
    function addQuestion(data = null, insertAfterElement = null) {
        const uniqueId = 'q-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        const clone = template.content.cloneNode(true);
        const item = clone.querySelector('.question-item');
        
        item.setAttribute('data-id', uniqueId);
        
        // Setup Containers for Quill
        const soalContainer = item.querySelector('.editor-soal');
        const pembahasanContainer = item.querySelector('.editor-pembahasan');
        const optionsContainer = item.querySelector('.options-container');
        
        // Generate unique IDs for Quill initialization
        soalContainer.id = `soal-${uniqueId}`;
        pembahasanContainer.id = `pembahasan-${uniqueId}`;

        // Render Options (A-E)
        const labels = ['A', 'B', 'C', 'D', 'E'];
        optionsContainer.innerHTML = labels.map((label) => `
            <div class="flex gap-3 items-start">
                <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-500 dark:text-gray-300 shrink-0 mt-1">
                    ${label}
                </div>
                <div class="flex-1">
                    <textarea name="opt-${uniqueId}-${label}" class="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-800 dark:text-gray-200" rows="2" placeholder="Masukkan teks jawaban ${label}..."></textarea>
                </div>
                <div class="mt-3" title="Tandai sebagai kunci jawaban">
                    <input type="radio" name="correct-${uniqueId}" value="${label}" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer">
                </div>
            </div>
        `).join('');

        // Insert into DOM
        if (insertAfterElement) {
            insertAfterElement.after(item);
        } else {
            questionsList.appendChild(item);
        }

        // Initialize Quill
        const quillSoal = new Quill(`#${soalContainer.id}`, {
            theme: 'snow',
            modules: { toolbar: toolbarOptions, imageResize: { displaySize: true } },
            placeholder: 'Tulis pertanyaan soal di sini...'
        });

        const quillPembahasan = new Quill(`#${pembahasanContainer.id}`, {
            theme: 'snow',
            modules: { toolbar: toolbarOptions, imageResize: { displaySize: true } },
            placeholder: 'Tulis pembahasan lengkap di sini...'
        });

        // Register Instances
        quillRegistry[uniqueId] = { soal: quillSoal, pembahasan: quillPembahasan };

        // Fill Data if Duplicate
        if (data) {
            quillSoal.root.innerHTML = data.soal;
            quillPembahasan.root.innerHTML = data.pembahasan;
            item.querySelector('.category-select').value = data.category;
            
            data.options.forEach((optText, idx) => {
                const label = labels[idx];
                const textarea = item.querySelector(`textarea[name="opt-${uniqueId}-${label}"]`);
                if (textarea) textarea.value = optText;
            });

            if (data.correct) {
                const radio = item.querySelector(`input[name="correct-${uniqueId}"][value="${data.correct}"]`);
                if (radio) radio.checked = true;
            }
        }

        // Setup Event Listeners for Buttons
        setupItemEvents(item, uniqueId);
        
        // Re-index numbers
        updateQuestionNumbers();

        // Auto-switch ke halaman navigasi terakhir saat tambah soal baru
        const totalItems = questionsList.querySelectorAll('.question-item').length;
        const newPage = Math.ceil(totalItems / navPageSize);
        if (newPage > currentNavPage) {
            currentNavPage = newPage;
            renderNavigation(); // Render ulang navigasi di halaman baru
        }
        
        // Initialize Icons
        if (typeof lucide !== 'undefined') lucide.createIcons();

        // Scroll to new item if added manually (not initial load)
        if (questionsList.children.length > 1) {
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function setupItemEvents(item, uniqueId) {
        // Move Up
        item.querySelector('.btn-move-up').addEventListener('click', () => {
            if (item.previousElementSibling) {
                item.previousElementSibling.before(item);
                updateQuestionNumbers();
                scrollToItem(item);
            }
        });

        // Move Down
        item.querySelector('.btn-move-down').addEventListener('click', () => {
            if (item.nextElementSibling) {
                item.nextElementSibling.after(item);
                updateQuestionNumbers();
                scrollToItem(item);
            }
        });

        // Delete
        item.querySelector('.btn-delete').addEventListener('click', () => {
            Swal.fire({
                title: 'Hapus Soal?',
                text: "Soal ini akan dihapus permanen.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                confirmButtonText: 'Ya, Hapus'
            }).then((result) => {
                if (result.isConfirmed) {
                    delete quillRegistry[uniqueId];
                    item.remove();
                    updateQuestionNumbers();
                }
            });
        });

        // Duplicate
        item.querySelector('.btn-duplicate').addEventListener('click', () => {
            const data = getQuestionData(item, uniqueId);
            addQuestion(data, item);
        });
    }

    function getQuestionData(item, uniqueId) {
        const registry = quillRegistry[uniqueId];
        const options = [];
        item.querySelectorAll('textarea').forEach(ta => options.push(ta.value));
        const correctEl = item.querySelector(`input[name="correct-${uniqueId}"]:checked`);
        
        return {
            soal: registry.soal.root.innerHTML,
            pembahasan: registry.pembahasan.root.innerHTML,
            category: item.querySelector('.category-select').value,
            options: options,
            correct: correctEl ? correctEl.value : null
        };
    }

    function renderNavigation() {
        if (!navGrid) return;
        navGrid.innerHTML = '';
        
        const items = questionsList.querySelectorAll('.question-item');
        const totalItems = items.length;
        const totalPages = Math.ceil(totalItems / navPageSize);

        // Validasi halaman saat ini (agar tidak out of bounds saat hapus soal)
        if (currentNavPage > totalPages) currentNavPage = totalPages || 1;
        if (currentNavPage < 1) currentNavPage = 1;

        const startIdx = (currentNavPage - 1) * navPageSize;
        const endIdx = Math.min(startIdx + navPageSize, totalItems);
        
        // Render Tombol Nomor (Hanya untuk halaman aktif)
        for (let i = startIdx; i < endIdx; i++) {
            const item = items[i];
            const btn = document.createElement('button');
            btn.className = 'h-8 w-full rounded-md text-xs font-bold border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300';
            btn.textContent = i + 1;
            btn.onclick = () => {
                scrollToItem(item);
            };
            navGrid.appendChild(btn);
        }

        // Render Kontrol Pagination (Jika lebih dari 1 halaman)
        if (totalPages > 1) {
            const controls = document.createElement('div');
            controls.className = 'col-span-full flex justify-between items-center mt-2 pt-2 border-t border-gray-100 dark:border-gray-700';
            
            const prevBtn = document.createElement('button');
            prevBtn.type = 'button';
            prevBtn.className = 'p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors';
            prevBtn.innerHTML = '<i data-lucide="chevron-left" class="w-4 h-4"></i>';
            prevBtn.disabled = currentNavPage === 1;
            prevBtn.onclick = () => { currentNavPage--; renderNavigation(); };

            const info = document.createElement('span');
            info.className = 'text-xs font-medium text-gray-500 dark:text-gray-400';
            info.textContent = `${currentNavPage} / ${totalPages}`;

            const nextBtn = document.createElement('button');
            nextBtn.type = 'button';
            nextBtn.className = 'p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors';
            nextBtn.innerHTML = '<i data-lucide="chevron-right" class="w-4 h-4"></i>';
            nextBtn.disabled = currentNavPage === totalPages;
            nextBtn.onclick = () => { currentNavPage++; renderNavigation(); };

            controls.append(prevBtn, info, nextBtn);
            navGrid.appendChild(controls);
            
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }

    function scrollToItem(item) {
        // Offset untuk navbar fixed (sekitar 100px agar header soal tidak tertutup navbar)
        const headerOffset = 100;
        const elementPosition = item.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    function updateQuestionNumbers() {
        const items = questionsList.querySelectorAll('.question-item');
        items.forEach((item, index) => {
            item.querySelector('.q-number').textContent = index + 1;
            
            // Disable Move Up for first item
            const btnUp = item.querySelector('.btn-move-up');
            if (btnUp) {
                btnUp.disabled = index === 0;
                if (index === 0) btnUp.classList.add('opacity-50', 'cursor-not-allowed');
                else btnUp.classList.remove('opacity-50', 'cursor-not-allowed');
            }

            // Disable Move Down for last item
            const btnDown = item.querySelector('.btn-move-down');
            if (btnDown) {
                btnDown.disabled = index === items.length - 1;
                if (index === items.length - 1) btnDown.classList.add('opacity-50', 'cursor-not-allowed');
                else btnDown.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        });
        renderNavigation();
    }

    // --- Event Listeners ---
    if (btnAdd) {
        btnAdd.addEventListener('click', () => addQuestion());
    }

    // --- Save All ---
    window.saveQuestion = () => {
        const allData = [];
        const items = questionsList.querySelectorAll('.question-item');
        let isValid = true;

        items.forEach(item => {
            const id = item.getAttribute('data-id');
            const data = getQuestionData(item, id);
            
            // Simple Validation
            if (quillRegistry[id].soal.getText().trim().length === 0) isValid = false;
            if (!data.correct) isValid = false;

            allData.push(data);
        });

        if (!isValid) {
            Swal.fire('Validasi Gagal', 'Pastikan semua soal memiliki konten dan kunci jawaban.', 'error');
            return;
        }

        console.log('All Questions:', allData);
        Swal.fire({
            title: 'Berhasil!',
            text: `${allData.length} soal berhasil disimpan.`,
            icon: 'success',
            confirmButtonColor: '#2563eb'
        });
    };

    // --- Init ---
    // Add first empty question
    addQuestion();

    // --- Scroll to Top Logic ---
    const btnScrollTop = document.getElementById('btn-scroll-top');
    if (btnScrollTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnScrollTop.classList.remove('opacity-0', 'invisible', 'translate-y-10');
            } else {
                btnScrollTop.classList.add('opacity-0', 'invisible', 'translate-y-10');
            }
        });

        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Mobile Sidebar Toggle ---
    window.toggleEditorSidebar = () => {
        const sidebar = document.getElementById('editor-sidebar');
        const chevron = document.getElementById('sidebar-chevron');
        
        if (sidebar) {
            const isCollapsed = sidebar.classList.contains('translate-y-[calc(100%-3.5rem)]');
            if (isCollapsed) {
                sidebar.classList.remove('translate-y-[calc(100%-3.5rem)]');
                sidebar.classList.add('translate-y-0');
                if (chevron) chevron.classList.add('rotate-180');
            } else {
                sidebar.classList.add('translate-y-[calc(100%-3.5rem)]');
                sidebar.classList.remove('translate-y-0');
                if (chevron) chevron.classList.remove('rotate-180');
            }
        }
    };
});