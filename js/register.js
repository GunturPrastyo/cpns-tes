document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi Ikon
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const registerForm = document.getElementById('registerForm');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const btnRegister = document.getElementById('btnRegister');
    const alertError = document.getElementById('alert-error');
    const alertSuccess = document.getElementById('alert-success');

    // Toggle Visibilitas Password (Lihat/Sembunyi)
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update Ikon Mata
        if (type === 'password') {
             togglePasswordBtn.innerHTML = '<i data-lucide="eye" class="w-5 h-5"></i>';
        } else {
             togglePasswordBtn.innerHTML = '<i data-lucide="eye-off" class="w-5 h-5"></i>';
        }
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });

    // Handle Submit Form Registrasi
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset Alert
        alertError.classList.add('hidden');
        alertSuccess.classList.add('hidden');
        
        // Validasi Password Match
        if (passwordInput.value !== confirmPasswordInput.value) {
            alertError.textContent = 'Konfirmasi password tidak cocok.';
            alertError.classList.remove('hidden');
            return;
        }

        // Tampilkan Loading
        const originalBtnText = btnRegister.innerHTML;
        btnRegister.disabled = true;
        btnRegister.innerHTML = '<span>Memproses...</span>';
        btnRegister.classList.add('opacity-75', 'cursor-not-allowed');

        // Simulasi API Call
        setTimeout(() => {
            // Sukses
            alertSuccess.textContent = 'Pendaftaran berhasil! Mengalihkan ke halaman login...';
            alertSuccess.classList.remove('hidden');
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        }, 1500);
    });
});