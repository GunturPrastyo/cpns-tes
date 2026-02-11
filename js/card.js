const paketSoal = [
  {
    title: "Paket SKD 1",
    overview: "Simulasi CPNS lengkap sesuai standar BKN (TWK, TIU, TKP).",
    category: "SKD",
    types: ["TWK", "TIU", "TKP"],
    price: 25000,
    progress: 40,
    purchased: true,
    questionCount: 110,
    duration: 100,
    image: "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Paket SKD 2",
    overview: "Latihan lanjutan dengan tingkat kesulitan menengah.",
    category: "SKD",
    types: ["TWK", "TIU", "TKP"],
    price: 30000,
    progress: 0,
    purchased: false,
    questionCount: 110,
    duration: 100,
    image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Paket TKP",
    overview: "Fokus strategi penilaian dan peningkatan skor TKP.",
    category: "TKP",
    types: ["TKP"],
    price: 15000,
    progress: 100,
    purchased: true,
    questionCount: 45,
    duration: 40,
    image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Paket TIU",
    overview: "Latihan numerik, verbal, dan logika TIU.",
    category: "TIU",
    types: ["TIU"],
    price: 15000,
    progress: 0,
    purchased: false,
    questionCount: 35,
    duration: 30,
    image: "https://images.unsplash.com/photo-1557683304-673a23048d34?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Paket TWK",
    overview: "Pendalaman materi wawasan kebangsaan dan pilar negara.",
    category: "TWK",
    types: ["TWK"],
    price: 15000,
    progress: 0,
    purchased: true,
    questionCount: 30,
    duration: 30,
    image: "https://images.unsplash.com/photo-1557682260-96773eb01377?w=800&auto=format&fit=crop&q=60",
  }
];

let selectedFilter = "";
let searchQuery = "";
const container = document.getElementById("paketContainer");
const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    render();
  });
}

function setFilter(filter) {
  selectedFilter = filter;
  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  if (event && event.target) {
    event.target.classList.add("active");
  }
  render();
}

function getStatus(p) {
  if (!p.purchased) return "Terkunci";
  if (p.progress === 100) return "Selesai";
  if (p.progress > 0) return "Berjalan";
  return "Belum Mulai";
}

function render() {
  if (!container) return;
  container.innerHTML = "";

  paketSoal.filter(p => {
    const matchesFilter = !selectedFilter || (selectedFilter === "SKD" ? p.types.length === 3 : p.types.includes(selectedFilter));
    const matchesSearch = p.title.toLowerCase().includes(searchQuery) || p.overview.toLowerCase().includes(searchQuery);
    return matchesFilter && matchesSearch;
  }).forEach(p => {
    const status = getStatus(p);
    const card = document.createElement("div");
    card.className = `group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`;
    
    card.innerHTML = `
      <div class="relative h-36 w-full overflow-hidden">
          <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div class="absolute bottom-3 left-4 right-4 flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm p-1.5 shadow-lg flex items-center justify-center shrink-0">
                  <img src="img/exam.webp" alt="Icon" class="w-8 h-8">
              </div>
              <div class="text-white overflow-hidden">
                  <p class="text-[10px] font-bold opacity-80 uppercase tracking-wider mb-0.5">PAKET SOAL</p>
                  <h3 class="font-bold text-sm leading-tight truncate" title="${p.title}">${p.title}</h3>
              </div>
          </div>
      </div>
      <div class="relative p-5 flex flex-col flex-1">
          <div class="absolute top-0 right-0 w-44 h-32 bg-gradient-to-br ${p.progress === 100 ? "from-green-200/80 to-transparent dark:from-green-800/20" : "from-blue-200/80 to-transparent dark:from-blue-800/20"} rounded-bl-[80px] -mr-8 transition-transform duration-500 group-hover:scale-110 origin-top-right pointer-events-none"></div>
          <div class="relative z-10 flex justify-between items-start mb-3">
              ${badgeCategory(p)}
              ${badgeStatus(status, p.progress)}
          </div>
          <p class="relative z-10 text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">${p.overview}</p>
          <div class="relative z-10 flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4 space-x-4 border-t border-gray-100 dark:border-gray-700 pt-3">
              <div class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg><span>${p.questionCount} Soal</span></div>
              <div class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>${p.duration} Menit</span></div>
          </div>
          <div class="relative z-10 mb-3">
              ${p.purchased ? `<div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>Sudah Dibeli</div>` : `<div class="text-lg font-bold text-slate-800 dark:text-white">Rp ${p.price.toLocaleString('id-ID')}</div>`}
          </div>
          <div class="relative z-10 mb-4">
              <div class="flex justify-between text-xs mb-1"><span class="text-gray-500">Progress</span><span class="font-semibold text-gray-700 dark:text-gray-300">${p.progress}%</span></div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden"><div class="bg-blue-600 h-2 rounded-full transition-all duration-500" style="width:${p.progress}%"></div></div>
          </div>
          ${status === "Selesai" ? 
            `<div class="relative z-10 mt-auto flex gap-2">
                <button onclick="window.location.href='hasil-tes.html'" class="flex-1 py-2.5 rounded-lg font-semibold text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30 transition-colors shadow-sm border border-blue-200 dark:border-blue-800">Lihat Detail</button>
                <button onclick="window.location.href='pembahasan.html'" class="flex-1 py-2.5 rounded-lg font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">Pembahasan</button>
            </div>` 
            : 
            `<button ${
                (status === "Berjalan" || status === "Belum Mulai") 
                ? "onclick=\"window.location.href='tes.html'\"" 
                : `onclick="openPurchaseModal('${p.title}', ${p.price})"`
            } class="relative z-10 mt-auto w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-colors shadow-sm ${status === "Terkunci" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}">${status === "Berjalan" ? "Lanjutkan" : status === "Terkunci" ? "Beli Paket" : "Mulai Tryout"}</button>`
          }
      </div>
    `;
    container.appendChild(card);
  });
  if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
}

function badgeCategory(p) {
  return `<div class="flex flex-wrap gap-1">` + p.types.map(type => {
    if (type === "TWK") return `<span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">TWK</span>`;
    if (type === "TIU") return `<span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300">TIU</span>`;
    if (type === "TKP") return `<span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">TKP</span>`;
    return "";
  }).join("") + `</div>`;
}

function badgeStatus(status, progress) {
  if (status === "Selesai") return `<span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">Selesai</span>`;
  if (status === "Berjalan") return `<span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">${progress}%</span>`;
  if (status === "Terkunci") return `<span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400">Terkunci</span>`;
  return `<span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-yellow-100 text-yellow-800 dark:bg-amber-900/40 dark:text-amber-300">Mulai</span>`;
}

// ================= SLIDER LOGIC =================
let currentSlide = 0;
const totalSlides = 3;
const slider = document.getElementById('bannerSlider');
const dots = document.querySelectorAll('.dot');
let slideInterval;

function updateSlider() {
  if (!slider) return;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.remove('bg-white/50');
      dot.classList.add('bg-white', 'w-8');
    } else {
      dot.classList.add('bg-white/50');
      dot.classList.remove('bg-white', 'w-8');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
  resetInterval();
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    resetInterval();
    if (typeof loadLayout === 'function') {
        loadLayout('paket-soal');
    }
    render();
});

// ================= MODAL LOGIC =================
window.openPurchaseModal = function(title, price) {
    const modal = document.getElementById('purchaseModal');
    if (!modal) return;
    
    const titleEl = document.getElementById('modal-pkg-name-header');
    if (titleEl) titleEl.textContent = title;

    const formattedPrice = "Rp " + price.toLocaleString('id-ID');
    document.getElementById('modal-total').textContent = formattedPrice;
    
    modal.classList.remove('hidden');
    // Re-init icons inside modal if needed
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

window.closePurchaseModal = function() {
    const modal = document.getElementById('purchaseModal');
    if (modal) modal.classList.add('hidden');
}

window.processPurchase = function() {
    const btn = document.querySelector('#purchaseModal button.bg-blue-600');
    const originalText = btn.textContent;
    
    // Simulate Loading
    btn.textContent = 'Memproses...';
    btn.disabled = true;
    btn.classList.add('opacity-75', 'cursor-not-allowed');
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove('opacity-75', 'cursor-not-allowed');
        closePurchaseModal();
        
        Swal.fire({
            title: 'Pembelian Berhasil!',
            text: 'Paket soal telah aktif. Selamat belajar!',
            icon: 'success',
            confirmButtonColor: '#2563eb',
            confirmButtonText: 'Mulai Belajar'
        });
    }, 1500);
}