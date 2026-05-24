document.addEventListener("DOMContentLoaded", function () {
    const shell = document.querySelector(".panel-shell") || document.querySelector(".admin-shell");
    const sidebar = document.getElementById("panelSidebar") || document.getElementById("adminSidebar");
    const toggle = document.getElementById("panelSidebarToggle") || document.getElementById("sidebarToggle");
    const overlay = document.getElementById("panelOverlay") || document.getElementById("sidebarOverlay");
    const themeToggle = document.getElementById("panelThemeToggle") || document.getElementById("themeToggle");

    if (toggle && shell && sidebar) {
        toggle.addEventListener("click", function () {
            if (window.innerWidth <= 991) {
                sidebar.classList.toggle("show");
                if (overlay) overlay.classList.toggle("show");
            } else {
                shell.classList.toggle("sidebar-collapsed");
            }
        });
    }

    if (overlay && sidebar) {
        overlay.addEventListener("click", function () {
            sidebar.classList.remove("show");
            overlay.classList.remove("show");
        });
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            const icon = themeToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-moon");
                icon.classList.toggle("fa-sun");
            }
        });
    }

    const currentPath = window.location.pathname;
    document.querySelectorAll(".panel-link,.admin-link").forEach(function (link) {
        if (link.href && currentPath === new URL(link.href).pathname) {
            link.classList.add("active");
        }
    });

    document.querySelectorAll("[data-count]").forEach(function (counter) {
        const target = parseInt(counter.dataset.count || "0", 10);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const timer = setInterval(function () {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = current;
        }, 25);
    });

    document.querySelectorAll("[data-table-search]").forEach(function (input) {
        const table = document.querySelector(input.dataset.tableSearch);
        if (!table) return;
        input.addEventListener("input", function () {
            const query = input.value.toLowerCase();
            table.querySelectorAll("tbody tr").forEach(function (row) {
                row.style.display = row.innerText.toLowerCase().includes(query) ? "" : "none";
            });
        });
    });

    const chatBox = document.getElementById("chatBox");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
});

const timer = document.getElementById("botSessionTimer");
if (timer) {
    let seconds = Number(timer.innerText);
    setInterval(() => {
        seconds++;
        let hrs = Math.floor(seconds / 3600);
        let mins = Math.floor((seconds % 3600) / 60);
        let secs = seconds % 60;
        timer.innerText = `${mins}m ${secs}s`;
    }, 1000);
}