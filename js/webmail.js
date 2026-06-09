// webmail.js

document.addEventListener('DOMContentLoaded', function () {
    // Preloader
    const preloader = document.querySelector('.loading-overlay');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    }

    // Toggle Password Visibility
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            const icon = this.querySelector('i');
            if (icon) {
                icon.setAttribute('class', type === 'password' ? 'ti ti-eye' : 'ti ti-eye-off');
            }
        });
    }

    // Remember Me functionality
    const rememberCheckbox = document.getElementById('rememberMe');
    const usernameInput = document.getElementById('username');

    // Load saved username if exists
    const savedUsername = localStorage.getItem('webmail_username');
    if (savedUsername && usernameInput) {
        usernameInput.value = savedUsername;
        if (rememberCheckbox) rememberCheckbox.checked = true;
    }

    // Form Submit
    const loginForm = document.getElementById('webmailLoginForm');
    const loginBtn = document.getElementById('loginBtn');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = usernameInput ? usernameInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value : '';

            // Validation
            if (!username) {
                showError('لطفا نام کاربری خود را وارد کنید');
                return;
            }

            if (!password) {
                showError('لطفا رمز عبور خود را وارد کنید');
                return;
            }

            // Save username if remember me checked
            if (rememberCheckbox && rememberCheckbox.checked) {
                localStorage.setItem('webmail_username', username);
            } else {
                localStorage.removeItem('webmail_username');
            }

            sessionStorage.setItem('webmail_user', username);
            sessionStorage.setItem('webmail_pass', password);

            if (loginBtn) {
                loginBtn.classList.add('loading');
                loginBtn.innerHTML = '<span>در حال انتقال...</span><i class="ti ti-loader"></i>';
            }

            setTimeout(() => {
                window.location.href = 'https://wpress16.dnswebhost.com:2096/';
            }, 500);
        });
    }

    if (window.location.hostname === 'wpress16.dnswebhost.com' && window.location.port === '2096') {
        const savedUser = sessionStorage.getItem('webmail_user');
        const savedPass = sessionStorage.getItem('webmail_pass');

        if (savedUser && savedPass) {
            setTimeout(() => {
                const userField = document.querySelector('input[name="_user"], input[name="username"], input[id="rcmloginuser"], input[type="text"][autocomplete="username"]');
                const passField = document.querySelector('input[name="_pass"], input[name="password"], input[id="rcmloginpwd"], input[type="password"][autocomplete="current-password"]');

                if (userField) {
                    userField.value = savedUser;
                    userField.dispatchEvent(new Event('input', { bubbles: true }));
                }

                if (passField) {
                    passField.value = savedPass;
                    passField.dispatchEvent(new Event('input', { bubbles: true }));
                }

                sessionStorage.removeItem('webmail_user');
                sessionStorage.removeItem('webmail_pass');

                if (userField) userField.style.backgroundColor = '#e8f0fe';
                if (passField) passField.style.backgroundColor = '#e8f0fe';

                showPasteSuccessMessage();

            }, 1500);
        }
    }

    function showPasteSuccessMessage() {
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = `
            <div style="position:fixed; top:20px; right:20px; left:20px; max-width:400px; margin:0 auto; background:#4caf50; color:white; padding:14px 20px; border-radius:12px; text-align:center; z-index:99999; font-size:14px; box-shadow:0 4px 15px rgba(0,0,0,0.2); direction:rtl;">
                <i class="ti ti-check" style="font-size:18px; margin-left:8px;"></i>
                اطلاعات شما در فرم کپی شد!
                <br>
                <small style="opacity:0.9;">لطفاً دکمه ورود را بزنید</small>
            </div>
        `;
        document.body.appendChild(msgDiv);

        setTimeout(() => {
            msgDiv.style.opacity = '0';
            setTimeout(() => msgDiv.remove(), 500);
        }, 4000);
    }

    // Function to show error message
    function showError(message) {
        const existingError = document.querySelector('.error-message');
        if (existingError) existingError.remove();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `<i class="ti ti-alert-circle"></i><span>${message}</span>`;

        const form = document.querySelector('.login-form');
        if (form) {
            form.insertBefore(errorDiv, form.firstChild);
            setTimeout(() => {
                if (errorDiv && errorDiv.parentNode) {
                    errorDiv.style.opacity = '0';
                    setTimeout(() => errorDiv.remove(), 300);
                }
            }, 5000);
        }

        if (loginBtn) {
            loginBtn.classList.remove('loading');
            loginBtn.innerHTML = '<span>ورود به ایمیل</span><i class="ti ti-arrow-left"></i>';
        }
    }

    // Enter key submit
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (loginForm) {
                    const event = new Event('submit');
                    loginForm.dispatchEvent(event);
                }
            }
        });
    }

    // Add animation to info cards
    const infoCards = document.querySelectorAll('.info-card');
    if (infoCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        infoCards.forEach(card => observer.observe(card));
    }
});