document.addEventListener('DOMContentLoaded', () => {
    const shell = document.querySelector('.admin-shell');
    const sidebar = document.getElementById('adminSidebar');
    const toggle = document.getElementById('sidebarToggle');
    const overlay = document.getElementById('sidebarOverlay');
    const themeToggle = document.getElementById('themeToggle');
    const globalSearch = document.getElementById('globalSearch');

    const closeMobileSidebar = () => {
        sidebar?.classList.remove('show');
        overlay?.classList.remove('show');
    };

    toggle?.addEventListener('click', () => {
        if (window.innerWidth <= 991) {
            sidebar?.classList.toggle('show');
            overlay?.classList.toggle('show');
        } else {
            shell?.classList.toggle('sidebar-collapsed');
            localStorage.setItem('adminSidebarCollapsed', shell?.classList.contains('sidebar-collapsed'));
        }
    });

    overlay?.addEventListener('click', closeMobileSidebar);

    if (localStorage.getItem('adminSidebarCollapsed') === 'true' && window.innerWidth > 991) {
        shell?.classList.add('sidebar-collapsed');
    }

    document.querySelectorAll('.admin-link').forEach(link => {
        const current = window.location.pathname.replace(/\/$/, '');
        const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '');
        if (current === linkPath) link.classList.add('active');
        link.addEventListener('click', closeMobileSidebar);
    });

    if (localStorage.getItem('adminTheme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle && (themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>');
    }

    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('adminTheme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });

    const filterCards = (term) => {
        const value = term.toLowerCase().trim();
        document.querySelectorAll('.searchable-card').forEach(card => {
            const text = (card.innerText + ' ' + (card.dataset.search || '')).toLowerCase();
            card.style.display = text.includes(value) ? '' : 'none';
        });
    };

    globalSearch?.addEventListener('input', e => filterCards(e.target.value));

    document.querySelectorAll('.table-search').forEach(input => {
        input.addEventListener('input', () => {
            const table = input.closest('.admin-content')?.querySelector('table');
            if (!table) return;
            const value = input.value.toLowerCase().trim();
            table.querySelectorAll('tbody tr').forEach(row => {
                row.style.display = row.innerText.toLowerCase().includes(value) ? '' : 'none';
            });
        });
    });

    document.querySelectorAll('.table-filter').forEach(select => {
        select.addEventListener('change', () => {
            const table = select.closest('.admin-content')?.querySelector('table');
            if (!table) return;
            const value = select.value.toLowerCase().trim();
            table.querySelectorAll('tbody tr').forEach(row => {
                row.style.display = !value || row.innerText.toLowerCase().includes(value) ? '' : 'none';
            });
        });
    });

    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = Number(counter.dataset.count || 0);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 45));
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = current;
            }
        }, 24);
    });

    document.getElementById('refreshCards')?.addEventListener('click', () => {
        document.querySelectorAll('.dash-card, .stat-card').forEach((card, index) => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = `fadeUp .45s ease ${index * 35}ms both`;
            }, 10);
        });
    });
});
