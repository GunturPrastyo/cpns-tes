window.loadLayout = function(activePage) {
  // --- 1. Inject Sidebar & Navbar HTML ---
  const sidebarHTML = `
<aside id="sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 transform -translate-x-full md:translate-x-0 border-r border-gray-200 dark:border-gray-700 overflow-hidden">
  <div class="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap">
     <h1 class="font-bold text-xl text-blue-600 dark:text-blue-400 flex items-center gap-2">
        <i data-lucide="graduation-cap" class="w-6 h-6 flex-shrink-0"></i>
        <span class="sidebar-text transition-opacity duration-300">CPNS Learning</span>
     </h1>
  </div>

  <nav class="p-4 space-y-2 text-sm overflow-y-auto h-[calc(100vh-4rem)]">
    <p class="sidebar-text text-xs font-semibold text-gray-400 mb-2 px-3 uppercase tracking-wider transition-opacity duration-300 whitespace-nowrap">Menu Utama</p>
    
    <a href="dashboard.html" class="nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 group ${activePage === 'dashboard' ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : ''}" data-page="dashboard">
      <i data-lucide="layout-dashboard" class="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 ${activePage === 'dashboard' ? 'text-blue-600 dark:text-blue-400' : ''}"></i>
      <span class="font-medium sidebar-text transition-opacity duration-300 whitespace-nowrap">Dashboard</span>
    </a>
    <a href="paket-soal.html" class="nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 group ${activePage === 'paket-soal' ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : ''}" data-page="paket-soal">
      <i data-lucide="book-open" class="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 ${activePage === 'paket-soal' ? 'text-blue-600 dark:text-blue-400' : ''}"></i>
      <span class="font-medium sidebar-text transition-opacity duration-300 whitespace-nowrap">Paket Soal</span>
    </a>
    <a href="riwayat-tes.html" class="nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 group ${activePage === 'riwayat' ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : ''}" data-page="riwayat">
      <i data-lucide="history" class="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 ${activePage === 'riwayat' ? 'text-blue-600 dark:text-blue-400' : ''}"></i>
      <span class="font-medium sidebar-text transition-opacity duration-300 whitespace-nowrap">Riwayat Tryout</span>
    </a>
    <a href="profil.html" class="nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 group ${activePage === 'profil' ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : ''}" data-page="profil">
      <i data-lucide="user" class="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 ${activePage === 'profil' ? 'text-blue-600 dark:text-blue-400' : ''}"></i>
      <span class="font-medium sidebar-text transition-opacity duration-300 whitespace-nowrap">Profil Saya</span>
    </a>
  </nav>
</aside>
`;

  const navbarHTML = `
<header id="navbar" class="fixed top-0 right-0 z-30 bg-white dark:bg-gray-800 shadow-sm transition-all duration-300 left-0 md:left-64 h-16 border-b border-gray-200 dark:border-gray-700">
  <div class="flex items-center justify-between px-4 md:px-6 h-full">
    <div class="flex items-center gap-3">
      <button id="sidebar-toggle" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
        <i data-lucide="menu" class="w-6 h-6"></i>
      </button>
      <h1 id="navbar-logo" class="font-bold text-lg text-blue-600 dark:text-blue-400 block md:hidden transition-opacity duration-300">
        CPNS Learning
      </h1>
    </div>

    <div class="flex items-center gap-4">
      <div class="relative">
        <button id="notif-toggle" class="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none">
          <i data-lucide="bell" class="w-5 h-5"></i>
          <span class="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white border-2 border-white dark:border-gray-800">4</span>
        </button>
        <div id="notif-dropdown" class="hidden absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50 transform origin-top-right transition-all">
          <div class="px-4 py-2 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h3 class="font-semibold text-sm text-gray-800 dark:text-gray-200">Notifikasi</h3>
            <span class="text-[10px] bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full font-medium">4 Baru</span>
          </div>
          <div class="max-h-[300px] overflow-y-auto p-4 text-center text-gray-500 text-sm">
             <p>Tidak ada notifikasi baru.</p>
          </div>
        </div>
      </div>

      <button id="theme-toggle" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
        <span id="theme-toggle-dark-icon"><i data-lucide="moon" class="w-5 h-5"></i></span>
        <span id="theme-toggle-light-icon" class="hidden"><i data-lucide="sun" class="w-5 h-5"></i></span>
      </button>

      <div class="relative">
        <button id="user-menu-toggle" class="flex items-center gap-2 focus:outline-none p-1 pr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <img src="https://i.pravatar.cc/150?img=11" class="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 object-cover" />
          <span class="text-sm font-medium hidden sm:block text-gray-700 dark:text-gray-200">Budi Santoso</span>
          <i data-lucide="chevron-down" class="w-4 h-4 text-gray-500"></i>
        </button>
        
        <div id="user-dropdown" class="hidden absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50 transform origin-top-right transition-all">
          <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700 mb-1">
            <p class="text-sm font-semibold text-gray-800 dark:text-gray-200">Budi Santoso</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">budi.santoso@email.com</p>
          </div>
          <a href="profil.html" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"><i data-lucide="user" class="w-4 h-4"></i> Profil Saya</a>
          <a href="#" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"><i data-lucide="log-out" class="w-4 h-4 text-red-500"></i> Keluar</a>
        </div>
      </div>
    </div>
  </div>
</header>
`;

  // Inject Navbar first (so it's top of body but Sidebar is usually first in DOM structure in templates)
  // Actually, let's just prepend them.
  if (!document.getElementById('navbar')) {
      document.body.insertAdjacentHTML('afterbegin', navbarHTML);
  }
  if (!document.getElementById('sidebar')) {
      document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
  }

  if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
    lucide.createIcons(); // Render Icons
  }

  const sidebar = document.getElementById('sidebar');
  const navbar = document.getElementById('navbar');
  const mainContent = document.getElementById('main-content');
  const navbarLogo = document.getElementById('navbar-logo');
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebarTexts = document.querySelectorAll('.sidebar-text');

  // Logic Toggle Sidebar
  // Pastikan listener tidak dipasang ganda dengan mengecek atribut khusus
  if (toggleBtn && sidebar && navbar && !toggleBtn.hasAttribute('data-sidebar-listener')) {
    toggleBtn.setAttribute('data-sidebar-listener', 'true');

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isDesktop = window.innerWidth >= 768;
      
      if (isDesktop) {
        // Desktop: Collapse/Expand
        const isCollapsed = sidebar.classList.contains('w-20');
        
        if (isCollapsed) {
          // Expand Sidebar
          sidebar.classList.remove('w-20');
          sidebar.classList.add('w-64');
          
          navbar.classList.remove('md:left-20');
          navbar.classList.add('md:left-64');
          
          if (mainContent) {
            mainContent.classList.remove('md:ml-20');
            mainContent.classList.add('md:ml-64');
          } else {
            console.warn("Elemen #main-content tidak ditemukan. Konten tidak akan bergeser.");
          }
          
          if (navbarLogo) {
            navbarLogo.classList.add('md:hidden'); // Sembunyikan logo navbar
          }
          sidebarTexts.forEach(t => t.classList.remove('hidden')); // Munculkan teks
        } else {
          // Collapse Sidebar
          sidebar.classList.remove('w-64');
          sidebar.classList.add('w-20');
          
          navbar.classList.remove('md:left-64');
          navbar.classList.add('md:left-20');
          
          if (mainContent) {
            mainContent.classList.remove('md:ml-64');
            mainContent.classList.add('md:ml-20');
          } else {
            console.warn("Elemen #main-content tidak ditemukan. Konten tidak akan bergeser.");
          }
          
          if (navbarLogo) {
            navbarLogo.classList.remove('md:hidden'); // Munculkan logo navbar
          }
          sidebarTexts.forEach(t => t.classList.add('hidden')); // Sembunyikan teks
        }
      } else {
        // Mobile: Off-canvas Toggle
        const isClosed = sidebar.classList.contains('-translate-x-full');
        if (isClosed) {
          sidebar.classList.remove('-translate-x-full');
        } else {
          sidebar.classList.add('-translate-x-full');
        }
      }
    });

    // Menutup sidebar saat klik di luar (Mobile Only)
    document.addEventListener('click', (e) => {
      const isDesktop = window.innerWidth >= 768;
      if (!isDesktop && sidebar && !sidebar.classList.contains('-translate-x-full')) {
         const isSidebarOpen = !sidebar.classList.contains('-translate-x-full');
         // Jika sidebar terbuka DAN klik bukan di dalam sidebar DAN klik bukan di tombol toggle
         if (isSidebarOpen && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
            sidebar.classList.add('-translate-x-full');
         }
      }
    });
  }

  // --- Logic Dark Mode ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');

  // Set initial state based on localStorage or system preference
  if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      darkIcon?.classList.add('hidden');
      lightIcon?.classList.remove('hidden');
  } else {
      document.documentElement.classList.remove('dark');
      darkIcon?.classList.remove('hidden');
      lightIcon?.classList.add('hidden');
  }

  // Pastikan event listener tidak dipasang ganda
  if (themeToggleBtn && !themeToggleBtn.hasAttribute('data-listener-attached')) {
      themeToggleBtn.setAttribute('data-listener-attached', 'true');
      
      themeToggleBtn.addEventListener('click', function() {
          // Ambil elemen icon terbaru saat tombol diklik untuk menghindari referensi hilang
          const currentDarkIcon = document.getElementById('theme-toggle-dark-icon');
          const currentLightIcon = document.getElementById('theme-toggle-light-icon');

          // Toggle theme
          if (document.documentElement.classList.contains('dark')) {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('color-theme', 'light');
              
              // Mode Terang: Tampilkan Bulan (untuk ke gelap), Sembunyikan Matahari
              currentDarkIcon?.classList.remove('hidden');
              currentLightIcon?.classList.add('hidden');
          } else {
              document.documentElement.classList.add('dark');
              localStorage.setItem('color-theme', 'dark');
              
              // Mode Gelap: Sembunyikan Bulan, Tampilkan Matahari (untuk ke terang)
              currentDarkIcon?.classList.add('hidden');
              currentLightIcon?.classList.remove('hidden');
          }
      });
  }

  // --- Logic Dropdowns (User & Notification) ---
  const setupDropdown = (btnId, dropdownId) => {
      const btn = document.getElementById(btnId);
      const dropdown = document.getElementById(dropdownId);
      
      // Pastikan listener tidak dipasang ganda dengan mengecek atribut khusus
      if (btn && dropdown && !btn.hasAttribute('data-dropdown-listener')) {
          btn.setAttribute('data-dropdown-listener', 'true');

          btn.addEventListener('click', (e) => {
              e.stopPropagation();
              // Tutup dropdown lain jika ada (opsional, agar tidak tumpang tindih)
              const allDropdowns = document.querySelectorAll('[id$="-dropdown"]');
              allDropdowns.forEach(d => {
                  if (d.id !== dropdownId) d.classList.add('hidden');
              });
              
              dropdown.classList.toggle('hidden');
          });
          
          document.addEventListener('click', (e) => {
              if (!dropdown.classList.contains('hidden')) {
                  if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
                      dropdown.classList.add('hidden');
                  }
              }
          });
      }
  };

  setupDropdown('user-menu-toggle', 'user-dropdown');
  setupDropdown('notif-toggle', 'notif-dropdown');

  // --- Logic Dismiss Notification ---
  const notifDropdown = document.getElementById('notif-dropdown');
  // Cegah duplikasi listener pada notifikasi juga
  if (notifDropdown && !notifDropdown.hasAttribute('data-dismiss-listener')) {
      notifDropdown.setAttribute('data-dismiss-listener', 'true');
      notifDropdown.addEventListener('click', (e) => {
          const closeBtn = e.target.closest('button');
          // Cek apakah tombol yang diklik adalah tombol close (biasanya absolute di pojok)
          if (closeBtn && closeBtn.classList.contains('absolute')) {
              e.preventDefault();
              e.stopPropagation(); // Mencegah dropdown tertutup saat menghapus
              
              const notifItem = closeBtn.closest('.group'); // Item notifikasi
              if (notifItem) {
                  notifItem.remove();
                  
                  // Update Badge Count (jika ada)
                  const badge = document.querySelector('#notif-toggle .bg-red-500');
                  if (badge) {
                      let count = parseInt(badge.innerText);
                      if (!isNaN(count) && count > 0) {
                          count--;
                          badge.innerText = count;
                          if (count === 0) {
                              // Sembunyikan wrapper badge (yang ada animate-ping)
                              const badgeWrapper = badge.closest('span.absolute'); 
                              if (badgeWrapper) badgeWrapper.style.display = 'none';
                          }
                      }
                  }

                  // Cek jika list kosong
                  const listContainer = notifDropdown.querySelector('.overflow-y-auto') || notifDropdown;
                  if (listContainer.querySelectorAll('.group').length === 0) {
                      listContainer.innerHTML = '<div class="p-4 text-center text-sm text-gray-500"><p>Semua sudah terbaca!</p></div>';
                  }
              }
          }
      });
  }
}