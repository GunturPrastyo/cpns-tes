window.loadLayout = function(activePage) {
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
  if (toggleBtn && sidebar && navbar && mainContent) {
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
          
          mainContent.classList.remove('md:ml-20');
          mainContent.classList.add('md:ml-64');
          
          navbarLogo.classList.add('md:hidden'); // Sembunyikan logo navbar
          sidebarTexts.forEach(t => t.classList.remove('hidden')); // Munculkan teks
        } else {
          // Collapse Sidebar
          sidebar.classList.remove('w-64');
          sidebar.classList.add('w-20');
          
          navbar.classList.remove('md:left-64');
          navbar.classList.add('md:left-20');
          
          mainContent.classList.remove('md:ml-64');
          mainContent.classList.add('md:ml-20');
          
          navbarLogo.classList.remove('md:hidden'); // Munculkan logo navbar
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

  if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', function() {
          // Ambil elemen icon terbaru saat tombol diklik untuk menghindari referensi hilang
          const currentDarkIcon = document.getElementById('theme-toggle-dark-icon');
          const currentLightIcon = document.getElementById('theme-toggle-light-icon');

          // Toggle icons
          currentDarkIcon?.classList.toggle('hidden');
          currentLightIcon?.classList.toggle('hidden');

          // Toggle theme
          if (document.documentElement.classList.contains('dark')) {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('color-theme', 'light');
          } else {
              document.documentElement.classList.add('dark');
              localStorage.setItem('color-theme', 'dark');
          }
      });
  }

  // --- Logic Dropdowns (User & Notification) ---
  const setupDropdown = (btnId, dropdownId) => {
      const btn = document.getElementById(btnId);
      const dropdown = document.getElementById(dropdownId);
      
      if (btn && dropdown) {
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
  if (notifDropdown) {
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