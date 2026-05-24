document.addEventListener("DOMContentLoaded", function () {
    const panelShell = document.getElementById("panelShell");
    const panelSidebar = document.getElementById("panelSidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const panelOverlay = document.getElementById("panelOverlay");
    const themeToggle = document.getElementById("themeToggle");

    if (sidebarToggle && panelShell && panelSidebar) {
        sidebarToggle.addEventListener("click", function () {
            if (window.innerWidth <= 991) {
                panelSidebar.classList.toggle("show");
                if (panelOverlay) panelOverlay.classList.toggle("show");
            } else {
                panelShell.classList.toggle("sidebar-collapsed");
            }
        });
    }

    if (panelOverlay && panelSidebar) {
        panelOverlay.addEventListener("click", function () {
            panelSidebar.classList.remove("show");
            panelOverlay.classList.remove("show");
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

    const currentUrl = window.location.pathname;
    document.querySelectorAll(".panel-link").forEach(function (link) {
        const linkUrl = new URL(link.href, window.location.origin).pathname;
        if (currentUrl === linkUrl || currentUrl.startsWith(linkUrl) && linkUrl !== "/") {
            link.classList.add("active");
        }
    });

    document.querySelectorAll("[data-count]").forEach(function (counter) {
        const target = parseInt(counter.getAttribute("data-count"), 10);
        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 60));
        const timer = setInterval(function () {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = current;
        }, 18);
    });

    document.querySelectorAll("[data-table-search]").forEach(function (input) {
        input.addEventListener("input", function () {
            const table = document.querySelector(input.getAttribute("data-table-search"));
            if (!table) return;

            const query = input.value.toLowerCase();
            table.querySelectorAll("tbody tr").forEach(function (row) {
                row.style.display = row.textContent.toLowerCase().includes(query) ? "" : "none";
            });
        });
    });

    const chatBox = document.getElementById("chatBox");
    if (chatBox) {
        chatBox.scrollTo({ top: chatBox.scrollHeight });
    }

    const refreshCards = document.getElementById("refreshCards");
    if (refreshCards) {
        refreshCards.addEventListener("click", function () {
            document.querySelectorAll(".dash-card, .stat-card").forEach(function (card, index) {
                card.style.animation = "none";
                setTimeout(function () {
                    card.style.animation = "fadeUp .45s ease both";
                    card.style.animationDelay = `${index * 35}ms`;
                }, 10);
            });
        });
    }
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