function hid(){
    const sidebar = document.getElementById('add');
    const content = document.getElementById('remove');
    const r = document.getElementsByClassName('r');

    if(!sidebar || !content) return;

    if(window.innerWidth <= 768){
        sidebar.classList.toggle('d-none');
        content.classList.toggle('col-sm-12', sidebar.classList.contains('d-none'));
        content.classList.toggle('col-sm-10', !sidebar.classList.contains('d-none'));
        return;
    }

    if(sidebar.classList.contains('col-md-2')){
        sidebar.classList.replace('col-md-2','col-sm-0_5');
        content.classList.replace('col-md-10','col-sm-11_5');
        Array.from(r).forEach(item => item.classList.add('d-none'));
    }else{
        sidebar.classList.replace('col-sm-0_5','col-md-2');
        content.classList.replace('col-sm-11_5','col-md-10');
        Array.from(r).forEach(item => item.classList.remove('d-none'));
    }
}

function setupTheme(){
    const toggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('authTheme') || 'light';

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if(toggle){
        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('authTheme', next);
            updateThemeIcon(next);
        });
    }
}

function updateThemeIcon(theme){
    const icon = document.querySelector('#themeToggle i');
    if(!icon) return;
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

function setupPasswordToggles(){
    document.querySelectorAll('.password-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = button.querySelector('i');
            if(!input || !icon) return;

            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            icon.className = isHidden ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
        });
    });
}

function setupPasswordValidation(){
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('cpassword');
    const matchText = document.getElementById('passwordMatch');
    const strengthBar = document.querySelector('[data-strength-for="password"] span');

    function scorePassword(value){
        let score = 0;
        if(value.length >= 8) score++;
        if(/[A-Z]/.test(value)) score++;
        if(/[0-9]/.test(value)) score++;
        if(/[^A-Za-z0-9]/.test(value)) score++;
        return score;
    }

    function updateStrength(){
        if(!password || !strengthBar) return;
        const score = scorePassword(password.value);
        const widths = ['0%','25%','50%','75%','100%'];
        const colors = ['#ef4444','#ef4444','#f59e0b','#22c55e','#16a34a'];
        strengthBar.style.width = widths[score];
        strengthBar.style.background = colors[score];
    }

    function validateMatch(){
        if(!password || !confirmPassword) return;

        if(confirmPassword.value.length === 0){
            confirmPassword.setCustomValidity('');
            if(matchText) matchText.textContent = '';
            return;
        }

        if(password.value !== confirmPassword.value){
            confirmPassword.setCustomValidity('Passwords do not match');
            if(matchText){
                matchText.textContent = 'Passwords do not match';
                matchText.style.color = '#dc2626';
            }
        }else{
            confirmPassword.setCustomValidity('');
            if(matchText){
                matchText.textContent = 'Passwords matched';
                matchText.style.color = '#16a34a';
            }
        }
    }

    if(password){
        password.addEventListener('input', () => {
            updateStrength();
            validateMatch();
        });
    }

    if(confirmPassword){
        confirmPassword.addEventListener('input', validateMatch);
    }
}

function setupForms(){
    document.querySelectorAll('.needs-validation').forEach(form => {
        form.addEventListener('submit', event => {
            if(!form.checkValidity()){
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

window.addEventListener('load', () => {
    const chatBox = document.getElementById('chatBox');
    if(chatBox){
        chatBox.scrollTo({ top: chatBox.scrollHeight });
    }

    setupTheme();
    setupPasswordToggles();
    setupPasswordValidation();
    setupForms();
});
