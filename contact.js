/* =============================================
   DEVLOGUEANDO - CONTACT JS
   Contact form validation and toaster
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('contactToast');

    if (contactForm && toast) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Select all inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Reset errors
            document.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));

            // Validate Name
            if (nameInput.value.trim() === '') {
                nameInput.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            // Validate Message
            if (messageInput.value.trim() === '') {
                messageInput.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            // If valid, show success toast and reset
            if (isValid) {

                // Mocking an async form submit
                const btn = contactForm.querySelector('.btn-primary');
                const originalText = btn.innerHTML;
                btn.innerHTML = 'ENVIANDO...';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    contactForm.reset();

                    // Show Toast
                    toast.classList.add('show');
                    toast.classList.remove('toast-error');
                    toast.querySelector('.toast-text').innerHTML = '<strong>¡Mensaje Enviado!</strong> Nos pondremos en contacto pronto.';

                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 4000);

                }, 1500);
            } else {
                // Show error toast
                toast.classList.add('show', 'toast-error');
                toast.querySelector('.toast-text').innerHTML = '<strong>Error:</strong> Revisa los campos en rojo.';

                setTimeout(() => {
                    toast.classList.remove('show');
                }, 4000);
            }
        });
    }
});
