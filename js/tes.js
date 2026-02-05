document.addEventListener('DOMContentLoaded', () => {
  // --- Dummy Data (20 Soal Manual) ---
  const questions = [
    // --- TWK (Tes Wawasan Kebangsaan) ---
    {
      id: 1,
      category: 'TWK',
      text: 'Ideologi dasar bagi negara Indonesia adalah...',
      options: [
        { key: 'A', text: 'UUD 1945' },
        { key: 'B', text: 'Pancasila' },
        { key: 'C', text: 'Bhinneka Tunggal Ika' },
        { key: 'D', text: 'NKRI' },
        { key: 'E', text: 'Tap MPR' }
      ],
      correctAnswer: 'B'
    },
    {
      id: 2,
      category: 'TWK',
      text: 'Lambang negara Indonesia adalah...',
      options: [
        { key: 'A', text: 'Garuda Pancasila' },
        { key: 'B', text: 'Bendera Merah Putih' },
        { key: 'C', text: 'Bahasa Indonesia' },
        { key: 'D', text: 'Lagu Indonesia Raya' },
        { key: 'E', text: 'UUD 1945' }
      ]
      , correctAnswer: 'A'
    },    {
      id: 3,
      category: 'TWK',
      text: 'Sumpah Pemuda diikrarkan pada tanggal...',
      options: [
        { key: 'A', text: '20 Mei 1908' },
        { key: 'B', text: '17 Agustus 1945' },
        { key: 'C', text: '28 Oktober 1928' },
        { key: 'D', text: '10 November 1945' },
        { key: 'E', text: '1 Juni 1945' }
      ]
      , correctAnswer: 'C'
    },    {
      id: 4,
      category: 'TWK',
      text: 'Presiden pertama Republik Indonesia adalah...',
      options: [
        { key: 'A', text: 'Soeharto' },
        { key: 'B', text: 'B.J. Habibie' },
        { key: 'C', text: 'Ir. Soekarno' },
        { key: 'D', text: 'Megawati' },
        { key: 'E', text: 'Jokowi' }
      ]
      , correctAnswer: 'C'
    },    {
      id: 5,
      category: 'TWK',
      text: 'Bhinneka Tunggal Ika mempunyai arti...',
      options: [
        { key: 'A', text: 'Berbeda-beda tetapi tetap satu' },
        { key: 'B', text: 'Bersatu kita teguh' },
        { key: 'C', text: 'Maju tak gentar' },
        { key: 'D', text: 'Satu nusa satu bangsa' },
        { key: 'E', text: 'Merdeka atau mati' }
      ]
      , correctAnswer: 'A'
    },    {
      id: 6,
      category: 'TWK',
      text: 'Lagu kebangsaan Indonesia Raya diciptakan oleh...',
      options: [
        { key: 'A', text: 'Ismail Marzuki' },
        { key: 'B', text: 'Cornel Simanjuntak' },
        { key: 'C', text: 'W.R. Supratman' },
        { key: 'D', text: 'H. Mutahar' },
        { key: 'E', text: 'Ibu Sud' }
      ]
      , correctAnswer: 'C'
    },
    // --- TIU (Tes Intelegensia Umum) ---
    {
      id: 7,
      category: 'TIU',
      text: 'Sinonim dari kata "Ekskavasi" adalah...',
      options: [
        { key: 'A', text: 'Penggalian' },
        { key: 'B', text: 'Pertolongan' },
        { key: 'C', text: 'Pengangkutan' },
        { key: 'D', text: 'Perluasan' },
        { key: 'E', text: 'Penyelamatan' }
      ]
      , correctAnswer: 'A'
    },    {
      id: 8,
      category: 'TIU',
      text: 'Antonim dari kata "Canggih" adalah...',
      options: [
        { key: 'A', text: 'Modern' },
        { key: 'B', text: 'Kuno' },
        { key: 'C', text: 'Baru' },
        { key: 'D', text: 'Kompleks' },
        { key: 'E', text: 'Rumit' }
      ]
      , correctAnswer: 'B'
    },    {
      id: 9,
      category: 'TIU',
      text: 'Jika 2x + 5 = 15, maka nilai x adalah...',
      options: [
        { key: 'A', text: '2' },
        { key: 'B', text: '3' },
        { key: 'C', text: '4' },
        { key: 'D', text: '5' },
        { key: 'E', text: '6' }
      ]
      , correctAnswer: 'D'
    },    {
      id: 10,
      category: 'TIU',
      text: 'Deret angka: 2, 4, 8, 16, ... Angka selanjutnya adalah...',
      options: [
        { key: 'A', text: '20' },
        { key: 'B', text: '24' },
        { key: 'C', text: '30' },
        { key: 'D', text: '32' },
        { key: 'E', text: '36' }
      ]
      , correctAnswer: 'D'
    },    {
      id: 11,
      category: 'TIU',
      text: 'Semua mamalia bernapas dengan paru-paru. Ikan paus adalah mamalia. Kesimpulannya...',
      options: [
        { key: 'A', text: 'Ikan paus bernapas dengan insang' },
        { key: 'B', text: 'Ikan paus bernapas dengan paru-paru' },
        { key: 'C', text: 'Ikan paus bukan mamalia' },
        { key: 'D', text: 'Sebagian mamalia bernapas dengan insang' },
        { key: 'E', text: 'Tidak dapat ditarik kesimpulan' }
      ]
      , correctAnswer: 'B'
    },    {
      id: 12,
      category: 'TIU',
      text: 'Mobil : Bensin = Manusia : ...',
      options: [
        { key: 'A', text: 'Makanan' },
        { key: 'B', text: 'Rumah' },
        { key: 'C', text: 'Pakaian' },
        { key: 'D', text: 'Uang' },
        { key: 'E', text: 'Jalan' }
      ]
      , correctAnswer: 'A'
    },    {
      id: 13,
      category: 'TIU',
      text: 'Manakah yang tidak termasuk kelompoknya?',
      options: [
        { key: 'A', text: 'Meja' },
        { key: 'B', text: 'Kursi' },
        { key: 'C', text: 'Lemari' },
        { key: 'D', text: 'Buku' },
        { key: 'E', text: 'Sofa' }
      ]
      , correctAnswer: 'D'
    },
    // --- TKP (Tes Karakteristik Pribadi) ---
    {
      id: 14,
      category: 'TKP',
      text: 'Ketika atasan memberikan tugas yang berat, sikap saya...',
      options: [
        { key: 'A', text: 'Menolak dengan halus' },
        { key: 'B', text: 'Menerima dan berusaha menyelesaikannya' },
        { key: 'C', text: 'Meminta bantuan teman' },
        { key: 'D', text: 'Mengeluh kepada rekan kerja' },
        { key: 'E', text: 'Pura-pura sakit' }
      ]
      , correctAnswer: 'B'
    },    {
      id: 15,
      category: 'TKP',
      text: 'Jika ada rekan kerja yang berkonflik, saya akan...',
      options: [
        { key: 'A', text: 'Masa bodoh' },
        { key: 'B', text: 'Memihak salah satu' },
        { key: 'C', text: 'Menjadi penengah' },
        { key: 'D', text: 'Melaporkan ke atasan' },
        { key: 'E', text: 'Ikut memanaskan suasana' }
      ]
      , correctAnswer: 'C'
    },    {
      id: 16,
      category: 'TKP',
      text: 'Dalam bekerja, saya lebih suka...',
      options: [
        { key: 'A', text: 'Bekerja sendiri' },
        { key: 'B', text: 'Bekerja dalam tim' },
        { key: 'C', text: 'Menunggu perintah' },
        { key: 'D', text: 'Santai saja' },
        { key: 'E', text: 'Cepat selesai meski kurang teliti' }
      ]
      , correctAnswer: 'B'
    },    {
      id: 17,
      category: 'TKP',
      text: 'Ketika menghadapi kegagalan, saya...',
      options: [
        { key: 'A', text: 'Putus asa' },
        { key: 'B', text: 'Menyalahkan orang lain' },
        { key: 'C', text: 'Introspeksi dan bangkit lagi' },
        { key: 'D', text: 'Marah-marah' },
        { key: 'E', text: 'Berhenti mencoba' }
      ]
      , correctAnswer: 'C'
    },    {
      id: 18,
      category: 'TKP',
      text: 'Pelayanan publik yang baik menurut saya adalah...',
      options: [
        { key: 'A', text: 'Cepat dan tepat' },
        { key: 'B', text: 'Berbelit-belit' },
        { key: 'C', text: 'Mahal' },
        { key: 'D', text: 'Hanya untuk kenalan' },
        { key: 'E', text: 'Semaunya petugas' }
      ]
      , correctAnswer: 'A'
    },    {
      id: 19,
      category: 'TKP',
      text: 'Inovasi dalam pekerjaan bagi saya...',
      options: [
        { key: 'A', text: 'Sangat penting' },
        { key: 'B', text: 'Tidak perlu' },
        { key: 'C', text: 'Merepotkan' },
        { key: 'D', text: 'Biasa saja' },
        { key: 'E', text: 'Tugas atasan' }
      ]
      , correctAnswer: 'A'
    },    {
      id: 20,
      category: 'TKP',
      text: 'Jika melihat sampah berserakan di kantor, saya...',
      options: [
        { key: 'A', text: 'Membiarkannya' },
        { key: 'B', text: 'Menyuruh OB membersihkan' },
        { key: 'C', text: 'Memungut dan membuangnya' },
        { key: 'D', text: 'Mengomel' },
        { key: 'E', text: 'Pura-pura tidak lihat' }
      ]
      , correctAnswer: 'C'
    }  ];

  // --- State ---
  let currentIdx = 0;
  const answers = {}; // { questionId: selectedKey }
  const doubts = {};  // { questionId: boolean }
  let timeLeft = 90 * 60; // 90 menit dalam detik

  // --- Elements ---
  const qTextEl = document.getElementById('q-text');
  const qOptionsEl = document.getElementById('q-options');
  const navGridEl = document.getElementById('navGrid');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const saveBtn = document.getElementById('saveBtn');
  const submitBtn = document.getElementById('submitBtn');
  const headerNoEl = document.getElementById('header-no');
  const catKategoriEl = document.getElementById('cat-kategori');
  const doubtCheckEl = document.getElementById('doubtCheck');
  const timerEl = document.getElementById('timer');
  const progressBar = document.getElementById('progressBar');

  // --- Functions ---

  function submitTest() {
    // Calculate score
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);

    const resultData = {
      score,
      correctCount,
      totalQuestions: questions.length,
      answers,
      questions, // include questions for review
      timestamp: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('cpns_cat_result', JSON.stringify(resultData));
    
    // Redirect to result page
    window.location.href = 'hasil-tes.html';
  }

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function startTimer() {
    const interval = setInterval(() => {
      timeLeft--;
      if (timerEl) {
        timerEl.textContent = formatTime(timeLeft);
      }
      if (timeLeft <= 0) {
        clearInterval(interval);
        alert('Waktu Habis! Jawaban akan dikirim secara otomatis.');
        submitTest();
      }
    }, 1000);
  }

  function renderQuestion() {
    const q = questions[currentIdx];
    
    // Update Header
    if (headerNoEl) headerNoEl.textContent = q.id;
    if (catKategoriEl) {
      catKategoriEl.textContent = q.category;
      catKategoriEl.className = `px-2 py-0.5 text-xs font-semibold rounded-md ${getCategoryClass(q.category)}`;
    }
    
    // Update Progress Bar
    if (progressBar) progressBar.style.width = `${((currentIdx + 1) / questions.length) * 100}%`;

    // Update Text
    qTextEl.innerHTML = q.text;

    // Update Options
    qOptionsEl.innerHTML = '';
    q.options.forEach(opt => {
      const isSelected = answers[q.id] === opt.key;
      const label = document.createElement('label');
      label.className = `flex items-start border p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
        isSelected 
          ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-500' 
          : 'border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-800'
      }`;
      
      label.innerHTML = `
        <div class="flex items-center h-5">
          <input type="radio" name="q${q.id}" value="${opt.key}" class="hidden" ${isSelected ? 'checked' : ''}>
          <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
            isSelected 
              ? 'border-blue-600 bg-blue-600 text-white' 
              : 'border-gray-400 group-hover:border-blue-400'
          }">
            ${isSelected ? '<div class="w-2 h-2 bg-white rounded-full"></div>' : `<span class="text-xs font-bold text-gray-500">${opt.key}</span>`}
          </div>
        </div>
        <div class="text-sm text-slate-700 dark:text-slate-300 flex-1">
          ${opt.text}
        </div>
      `;

      label.querySelector('input').addEventListener('change', () => {
        answers[q.id] = opt.key;
        renderQuestion(); // Re-render to update styles
        renderNav();      // Update nav grid
      });

      qOptionsEl.appendChild(label);
    });

    // Update Doubt Checkbox
    if (doubtCheckEl) doubtCheckEl.checked = !!doubts[q.id];

    // Update Buttons
    if (prevBtn) prevBtn.disabled = currentIdx === 0;
    if (currentIdx === questions.length - 1) {
      if (nextBtn) nextBtn.classList.add('hidden');
      if (submitBtn) submitBtn.classList.remove('hidden');
    } else {
      nextBtn.classList.remove('hidden');
      submitBtn.classList.add('hidden');
      nextBtn.disabled = false;
    }

    renderNav(); // Ensure nav highlight is correct
  }
  
  function getCategoryClass(category) {
    const classes = {
      'TWK': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
      'TIU': 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
      'TKP': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    };
    return classes[category] || 'bg-gray-100 text-gray-800';
  }

  function renderNav() {
    navGridEl.innerHTML = '';
    questions.forEach((q, idx) => {
      const btn = document.createElement('button');
      const isAnswered = !!answers[q.id];
      const isDoubt = !!doubts[q.id];
      const isCurrent = idx === currentIdx;

      // Base classes: Lebih tinggi (h-9), rounded-lg, shadow halus, flex center
      let classes = "h-9 w-full rounded-lg text-xs font-bold transition-all duration-200 border flex items-center justify-center shadow-sm ";
      
      if (isCurrent) {
        // Active state: Ring lebih jelas, scale up sedikit
        classes += "ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800 z-10 transform scale-105 ";
      }

      if (isAnswered) {
        if (isDoubt) {
          classes += "bg-amber-400 text-white border-amber-500 hover:bg-amber-500";
        } else {
          classes += "bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600";
        }
      } else {
        if (isDoubt) {
           classes += "bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200";
        } else {
           // Default state: Putih/Dark Gray, border halus
           if (isCurrent) {
             classes += "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-blue-500 dark:border-blue-400";
           } else {
             classes += "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500";
           }
        }
      }

      btn.className = classes;
      btn.textContent = q.id;
      btn.onclick = () => {
        currentIdx = idx;
        renderQuestion();
      };

      navGridEl.appendChild(btn);
    });
  }

  // --- Event Listeners ---
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIdx > 0) {
        currentIdx--;
        renderQuestion();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIdx < questions.length - 1) {
        currentIdx++;
        renderQuestion();
      }
    });
  }

  if (doubtCheckEl) {
    doubtCheckEl.addEventListener('change', (e) => {
      doubts[questions[currentIdx].id] = e.target.checked;
      renderNav();
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const progressData = {
        answers,
        doubts,
        currentIdx,
        timeLeft,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('cpns_cat_progress', JSON.stringify(progressData));
      alert('Progres jawaban berhasil disimpan!');
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const answeredCount = Object.keys(answers).length;
      if (confirm(`Kamu sudah menjawab ${answeredCount} dari ${questions.length} soal. Yakin ingin mengakhiri ujian?`)) {
        submitTest();
      }
    });
  }

  // --- Init ---
  startTimer();
  renderQuestion();
  renderNav();
  
  // Initialize Lucide icons if needed
  if (window.lucide) {
    lucide.createIcons();
  }
});