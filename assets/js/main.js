$(document).ready(function () {

    /* ================= AOS INIT ================= */
    AOS.init({
        duration: 900,
        once: true,
        easing: 'ease-out-quad'
    });


    /* ================= NAVBAR SCROLL EFFECT ================= */
    $(window).on("scroll", function () {
        const scrollTop = $(this).scrollTop();

        if (scrollTop > 50) {
            $(".navbar").addClass("scrolled");
            $("#scrollTopBtn").fadeIn();
        } else {
            $(".navbar").removeClass("scrolled");
            $("#scrollTopBtn").fadeOut();
        }
    });


    /* ================= BACK TO TOP ================= */
    $("#scrollTopBtn").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
    });


    /* ================= HERO SWIPER ================= */
    new Swiper(".swiper-hero", {
        effect: "flip",
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        speed: 1200
    });


    /* ================= TESTIMONIAL SWIPER ================= */
    let testimonialSwiper;


    /* ================= REVIEWS DATA ================= */
    const reviewsData = [
        {
            name: "Aman Sharma",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 5,
            text: "Our Dubai honeymoon was beyond perfect. Everything from flights to luxury hotel stays was flawlessly managed. The yacht cruise and desert safari were unforgettable experiences."
        },
        {
            name: "Priya Mehta",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 5,
            text: "We booked a family trip to Kashmir and it was magical. Snow activities, hotel views, and smooth coordination made it unforgettable."
        },
        {
            name: "Rohit Verma",
            image: "https://randomuser.me/api/portraits/men/65.jpg",
            rating: 4.5,
            text: "Goa trip was perfectly arranged. Premium resort, smooth transfers, and excellent service throughout the journey."
        },
        {
            name: "Neha Kapoor",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            rating: 5,
            text: "Europe trip was luxury at its best. Paris and Switzerland hotels were stunning and perfectly organized."
        },
        {
            name: "Vikram Singh",
            image: "https://randomuser.me/api/portraits/men/12.jpg",
            rating: 5,
            text: "Ladakh trip was adventure-packed and well managed. Hotels, permits, and travel were seamless."
        },
        {
            name: "Anjali Desai",
            image: "https://randomuser.me/api/portraits/women/22.jpg",
            rating: 5,
            text: "Manali honeymoon was magical. Snowfall, cozy stays, and candlelight dinner made it unforgettable."
        }
    ];


    /* ================= STAR GENERATOR ================= */
    function generateStars(rating) {
        let stars = '';

        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i - rating < 1) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            }
        }

        return stars;
    }


    /* ================= LOAD REVIEWS ================= */
    function loadReviews() {
        const wrapper = document.getElementById("reviewsWrapper");
        if (!wrapper) return;

        wrapper.innerHTML = "";

        reviewsData.forEach(review => {

            const slide = document.createElement("div");
            slide.className = "swiper-slide";

            slide.innerHTML = `
                <div class="glass-card review-card text-white text-center">

                    <div class="d-flex flex-column align-items-center mb-3">
                        <img src="${review.image}" class="reviewer-img mb-2">
                        <h6 class="mb-0 text-white">${review.name}</h6>
                    </div>

                    <div class="text-warning mb-3">
                        ${generateStars(review.rating)}
                    </div>

                    <p class="review-text text-white-50 small mb-2">
                        ${review.text}
                    </p>

                    <a href="javascript:void(0);" class="read-more text-gold small fw-bold">
                        Read More
                    </a>
                </div>
            `;

            wrapper.appendChild(slide);
        });


        /* DESTROY OLD SWIPER IF EXISTS (IMPORTANT FIX) */
        if (testimonialSwiper) {
            testimonialSwiper.destroy(true, true);
        }

        /* INIT SWIPER */
        testimonialSwiper = new Swiper(".swiper-testimonials", {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }


    /* ================= READ MORE (FIXED EVENT DELEGATION) ================= */
    $(document).on("click", ".read-more", function () {

        const card = $(this).closest(".review-card");
        const text = card.find(".review-text");

        text.toggleClass("expanded");

        $(this).text(
            text.hasClass("expanded") ? "Show Less" : "Read More"
        );
    });


    /* ================= COUNTER ANIMATION ================= */
    function runCounters() {
        $(".counter-number").each(function () {
            const $el = $(this);
            const target = parseInt($el.data("target")) || 0;

            $({ count: 0 }).animate({ count: target }, {
                duration: 2000,
                easing: "swing",
                step: function () {
                    let value = Math.floor(this.count);

                    if (target === 99) {
                        $el.text(value + "%");
                    } else {
                        $el.text(value + "+");
                    }
                },
                complete: function () {
                    if (target === 99) {
                        $el.text(target + "%");
                    } else {
                        $el.text(target + "+");
                    }
                }
            });
        });
    }


    /* ================= COUNTER TRIGGER ================= */
    let countersFired = false;

    $(window).on("scroll", function () {
        const section = $("#why-choose-us");

        if (section.length && !countersFired) {
            const triggerPoint = section.offset().top - window.innerHeight + 100;

            if ($(window).scrollTop() > triggerPoint) {
                runCounters();
                countersFired = true;
            }
        }
    });


    /* ================= FORM HANDLING ================= */
    $("#enquiryForm, #contactForm, #newsletterForm").on("submit", function (e) {
        e.preventDefault();

        const btn = $(this).find("button[type='submit']");
        const originalText = btn.text();

        btn.prop("disabled", true).text("Processing...");

        setTimeout(() => {
            alert("✨ Request Received! Our luxury travel concierge will contact you soon.");
            this.reset();
            btn.prop("disabled", false).text(originalText);
        }, 1200);
    });


    /* ================= INITIAL LOAD ================= */
    loadReviews();

});