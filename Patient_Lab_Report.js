/*==================================================
            MEDICARE+
      PATIENT LAB REPORTS JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*====================================
            WELCOME MESSAGE
    ====================================*/

    console.log("Patient Lab Reports Loaded Successfully");

    /*====================================
            SEARCH REPORTS
    ====================================*/

    const searchInput = document.querySelector(".search input");

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value = searchInput.value.toLowerCase();

            const rows = document.querySelectorAll("tbody tr");

            rows.forEach(row => {

                const text = row.innerText.toLowerCase();

                row.style.display = text.includes(value)
                    ? ""
                    : "none";

            });

        });

    }

    /*====================================
            COUNT ANIMATION
    ====================================*/

    const counters = document.querySelectorAll(".card h2");

    counters.forEach(counter => {

        const target = parseInt(counter.innerText);

        let count = 0;

        const speed = target / 40;

        const update = () => {

            count += speed;

            if (count < target) {

                counter.innerText = Math.floor(count);

                requestAnimationFrame(update);

            } else {

                counter.innerText = target;

            }

        };

        update();

    });

    /*====================================
            DOWNLOAD BUTTONS
    ====================================*/

    const viewButtons = document.querySelectorAll(".view");

    viewButtons.forEach(button => {

        button.addEventListener("click", () => {

            const report = button.closest("tr")
                .children[0].innerText;

            alert(report + " downloaded successfully.");

        });

    });

    /*====================================
        DOWNLOAD ALL REPORTS
    ====================================*/

    const downloadAll = document.querySelector(".table-header button");

    if (downloadAll) {

        downloadAll.addEventListener("click", () => {

            alert("Preparing all reports for download...");

        });

    }

    /*====================================
            NOTIFICATIONS
    ====================================*/

    const notificationBtn =
        document.querySelector(".fa-bell");

    if (notificationBtn) {

        notificationBtn.parentElement
            .addEventListener("click", () => {

                alert("No new notifications.");

            });

    }

    /*====================================
            MESSAGES
    ====================================*/

    const messageBtn =
        document.querySelector(".fa-envelope");

    if (messageBtn) {

        messageBtn.parentElement
            .addEventListener("click", () => {

                alert("No unread messages.");

            });

    }

    /*====================================
            DARK MODE
    ====================================*/

    const moon =
        document.querySelector(".fa-moon");

    if (moon) {

        moon.parentElement
            .addEventListener("click", () => {

                document.body.classList.toggle("light-mode");

                if (document.body.classList.contains("light-mode")) {

                    moon.classList.remove("fa-moon");

                    moon.classList.add("fa-sun");

                }

                else {

                    moon.classList.remove("fa-sun");

                    moon.classList.add("fa-moon");

                }

            });

    }

    /*====================================
            ACTIVE MENU
    ====================================*/

    const menuLinks =
        document.querySelectorAll(".menu li");

    menuLinks.forEach(item => {

        item.addEventListener("click", () => {

            menuLinks.forEach(link => {

                link.classList.remove("active");

            });

            item.classList.add("active");

        });

    });

    /*====================================
            CARD HOVER EFFECT
    ====================================*/

    const cards =
        document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-8px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0px)";

        });

    });

    /*====================================
            TABLE ANIMATION
    ====================================*/

    const rows =
        document.querySelectorAll("tbody tr");

    rows.forEach((row, index) => {

        row.style.opacity = "0";

        row.style.transform = "translateY(20px)";

        setTimeout(() => {

            row.style.transition =
                ".5s ease";

            row.style.opacity = "1";

            row.style.transform =
                "translateY(0px)";

        }, index * 120);

    });

    /*====================================
            KEYBOARD SHORTCUT
    ====================================*/

    document.addEventListener("keydown", e => {

        if (e.ctrlKey && e.key === "f") {

            e.preventDefault();

            searchInput.focus();

        }

    });

    /*====================================
            PROFILE IMAGE
    ====================================*/

    const profile =
        document.querySelector(".top-icons img");

    if (profile) {

        profile.addEventListener("click", () => {

            alert("Opening Patient Profile...");

        });

    }

    /*====================================
            AUTO DATE
    ====================================*/

    const today = new Date();

    console.log("Today's Date : ", today.toDateString());

});