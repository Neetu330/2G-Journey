document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       Litepicker (Date Range)
    ========================== */
    const travelInput = document.getElementById('travelDates');

    if (travelInput) {
        new Litepicker({
            element: travelInput,
            singleMode: false,
            numberOfMonths: 2,
            numberOfColumns: 2,
            format: 'DD MMM YYYY'
        });
    }

    /* =========================
       Contact Form Submit Modal
    ========================== */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const modalEl = document.getElementById('thankYouModal');

            if (modalEl) {
                const thankYouModal = new bootstrap.Modal(modalEl);
                thankYouModal.show();
            }

            this.reset();
        });
    }

    /* =========================
       Scroll To Top Button
    ========================== */
    const scrollBtn = document.getElementById("scrollTopBtn");

    if (scrollBtn) {

        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                scrollBtn.classList.add("show");
            } else {
                scrollBtn.classList.remove("show");
            }
        });

        scrollBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    

});
