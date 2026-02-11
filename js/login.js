document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi Ikon
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const btnLogin = document.getElementById('btnLogin');
    const alertError = document.getElementById('alert-error');
    const alertSuccess = document.getElementById('alert-success');

    // Toggle Visibilitas Password
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update Ikon
        if (type === 'password') {
             togglePasswordBtn.innerHTML = '<i data-lucide="eye" class="w-5 h-5"></i>';
        } else {
             togglePasswordBtn.innerHTML = '<i data-lucide="eye-off" class="w-5 h-5"></i>';
        }
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });

    // Handle Submit Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset Alert
        alertError.classList.add('hidden');
        alertSuccess.classList.add('hidden');
        
        // Tampilkan Loading
        const originalBtnText = btnLogin.innerText;
        btnLogin.disabled = true;
        btnLogin.innerText = 'Memproses...';
        btnLogin.classList.add('opacity-75', 'cursor-not-allowed');

        const email = emailInput.value;
        const password = passwordInput.value;

        // Simulasi Validasi / API Call
        setTimeout(() => {
            // Validasi Mock Sederhana
            if (email && password.length >= 6) {
                // Sukses
                alertSuccess.textContent = 'Login berhasil! Mengalihkan ke dashboard...';
                alertSuccess.classList.remove('hidden');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                // Gagal
                alertError.textContent = 'Email atau password salah. (Password min. 6 karakter)';
                alertError.classList.remove('hidden');
                
                btnLogin.disabled = false;
                btnLogin.innerText = originalBtnText;
                btnLogin.classList.remove('opacity-75', 'cursor-not-allowed');
            }
        }, 1500);
    });
});