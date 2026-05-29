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
    new Swiper(".swiper-hero", { effect: "coverflow", loop: true, autoplay: { delay: 3000, disableOnInteraction: false }, speed: 1200 });
    /* ================= TESTIMONIAL SWIPER ================= */
    const testimonialSwiper = new Swiper(".swiper-testimonials", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 }
        }
    });

    /* ================= FANCYBOX ================= */
    Fancybox.bind("[data-fancybox]", {
        compact: false,
        animated: true
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

                    // Only % for satisfaction counter
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

    /* ================= COUNTER TRIGGER (SAFE) ================= */
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

        // better UX than alert
        const btn = $(this).find("button[type='submit']");
        const originalText = btn.text();

        btn.prop("disabled", true).text("Processing...");

        setTimeout(() => {
            alert("✨ Request Received! Our luxury travel concierge will contact you soon.");
            this.reset();
            btn.prop("disabled", false).text(originalText);
        }, 1200);
    });



    // UNIFIED ADVANCED ALGORITHMIC FILTER ENGINE
    function runUnifiedFilterEngine() {
        // 1. Fetch normalized global textual user queries
        let searchString = $("#globalSearchInput").val().toLowerCase().trim();

        // 2. Aggregate active checked destination choices
        let targetedDestinations = [];
        $(".filter-destination:checked").each(function () {
            targetedDestinations.push($(this).val());
        });

        // 3. Aggregate active checked duration variants (Days/Nights)
        let targetedDurations = [];
        $(".filter-duration:checked").each(function () {
            targetedDurations.push($(this).val().toLowerCase());
        });

        // 4. Extract verified radio budget tier configurations
        let designatedBudgetTier = $("input[name='budgetRadio']:checked").val();

        let validCounter = 0;

        // 5. Sequentially scan package cards matching parameters
        $(".package-item").each(function () {
            let $cardItem = $(this);

            // Extract data attributes
            let attributeTitle = $cardItem.data("title") ? $cardItem.data("title").toLowerCase() : "";
            let attributeLocation = $cardItem.data("destination") ? $cardItem.data("destination").toLowerCase() : "";
            let attributeDuration = $cardItem.data("duration") ? $cardItem.data("duration").toLowerCase() : "";
            let attributePrice = parseInt($cardItem.data("price"), 10) || 0;

            let passesSearch = false;
            let passesDest = false;
            let passesDuration = false;
            let passesBudget = false;

            // A: Multi-Parameter Global Text Verification (Title, Location, Duration, Price)
            if (searchString === "") {
                passesSearch = true;
            } else if (
                attributeTitle.includes(searchString) ||
                attributeLocation.includes(searchString) ||
                attributeDuration.includes(searchString) ||
                attributePrice.toString().includes(searchString)
            ) {
                passesSearch = true;
            }

            // B: Destination Array Group Verification
            if (targetedDestinations.length === 0 || targetedDestinations.includes($cardItem.data("destination"))) {
                passesDest = true;
            }

            // C: NEW - Duration Array Group Verification
            if (targetedDurations.length === 0 || targetedDurations.includes(attributeDuration)) {
                passesDuration = true;
            }

            // D: Strict Numeric Boundaries Price Matching
            if (!designatedBudgetTier) {
                passesBudget = true;
            } else if (designatedBudgetTier === "low" && attributePrice < 50000) {
                passesBudget = true;
            } else if (designatedBudgetTier === "mid" && attributePrice >= 50000 && attributePrice <= 100000) {
                passesBudget = true;
            } else if (designatedBudgetTier === "high" && attributePrice > 100000) {
                passesBudget = true;
            }

            // Compound Logic Evaluation: Must pass ALL criteria to stay visible
            if (passesSearch && passesDest && passesDuration && passesBudget) {
                $cardItem.fadeIn(350);
                validCounter++;
            } else {
                $cardItem.fadeOut(200);
            }
        });

        // Render matching results fallback states smoothly
        if (validCounter === 0) {
            $("#noResultsFallbackBox").removeClass("d-none").fadeIn(300);
        } else {
            $("#noResultsFallbackBox").addClass("d-none");
        }
    }

    // TRIGGER ASSIGNMENTS FOR HOOKS
    $("#globalSearchInput").on("keyup search input", runUnifiedFilterEngine);
    $(".filter-destination, .filter-duration, input[name='budgetRadio']").on("change", runUnifiedFilterEngine);

    // GLOBAL RESET CONTROLLER
    $("#resetFiltersBtn").click(function () {
        $("#globalSearchInput").val("");
        $("input[type='checkbox']").prop("checked", false);
        $("input[type='radio']").prop("checked", false);
        $(".package-item").fadeIn(350);
        $("#noResultsFallbackBox").addClass("d-none");
    });

    // WINDOW STICKY NAVIGATION EFFECT RULE
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // WHATSAPP REDIRECTION INTERACTION FORMULATOR
    $(".btn-gold").click(function () {
        let packageName = $(this).siblings(".package-title").text();
        let targetUrl = "https://wa.me/919876543210?text=" + encodeURIComponent("Hello LuxVibe, I am interested in booking the premium package: " + packageName);
        window.open(targetUrl, '_blank');
    });

    // FILTER FUNCTION
    function filterPackages() {

        let selectedDest = [];
        $(".filter-destination:checked").each(function () {
            selectedDest.push($(this).val());
        });

        let budget = $("input[name='budget']:checked").val();

        let count = 0;

        $(".package-item").each(function () {

            let dest = $(this).data("destination");
            let bud = $(this).data("budget");

            let show = true;

            if (selectedDest.length && !selectedDest.includes(dest)) {
                show = false;
            }

            if (budget && budget !== bud) {
                show = false;
            }

            if (show) {
                $(this).fadeIn();
                count++;
            } else {
                $(this).fadeOut();
            }

        });

        if (count === 0) {
            $("#noResult").removeClass("d-none");
        } else {
            $("#noResult").addClass("d-none");
        }

    }

    // EVENTS
    $(".filter-destination, input[name='budget']").on("change", filterPackages);

    // RESET
    $("#reset").click(function () {
        $("input").prop("checked", false);
        $(".package-item").fadeIn();
        $("#noResult").addClass("d-none");
    });


    // SYSTEM VIEW STATE CONTROLLER
    // "albums" values point to album grid cover; string values point to dynamic folder IDs
    let currentAppScopeMode = "albums";

    // 1. DYNAMIC SYSTEM CONTROL ROUTER (SEARCH + FILTERING HUB)
    function executeRenderPipeline() {
        let searchString = $("#globalGallerySearch").val().toLowerCase().trim();
        let matchingCounter = 0;

        if (currentAppScopeMode === "albums") {
            // Operational Step: Filter parent album covers
            $(".inner-media-item").addClass("d-none");
            $("#innerAlbumMediaGrid").addClass("d-none");
            $("#albumCoversGrid").removeClass("d-none");

            $(".album-item-wrapper").each(function () {
                let $album = $(this);
                let title = $album.data("title").toLowerCase();
                let dateText = $album.data("string-date").toLowerCase();

                if (searchString === "" || title.includes(searchString) || dateText.includes(searchString)) {
                    $album.removeClass("d-none");
                    matchingCounter++;
                } else {
                    $album.addClass("d-none");
                }
            });
        }
        else {
            // Operational Step: Filter inner photo/video elements belonging to active album
            $(".album-item-wrapper").addClass("d-none");
            $("#albumCoversGrid").addClass("d-none");
            $("#innerAlbumMediaGrid").removeClass("d-none");

            $(".inner-media-item").each(function () {
                let $media = $(this);
                let parentId = $media.data("parent-album");
                let mediaName = $media.data("name").toLowerCase();
                let mediaDate = $media.data("display-date").toLowerCase();

                if (parentId === currentAppScopeMode) {
                    if (searchString === "" || mediaName.includes(searchString) || mediaDate.includes(searchString)) {
                        $media.removeClass("d-none");
                        matchingCounter++;
                    } else {
                        $media.addClass("d-none");
                    }
                } else {
                    $media.addClass("d-none");
                }
            });
        }

        // Check visibility counters to flash fallback panel cleanly
        if (matchingCounter === 0) {
            $("#galleryEmptyFallback").removeClass("d-none");
        } else {
            $("#galleryEmptyFallback").addClass("d-none");
        }

        executeSortPipeline();
    }

    // 2. DATA DECK SORTING OPERATION ALGORITHM
    function executeSortPipeline() {
        let sortingRule = $("#globalGallerySort").val();

        if (currentAppScopeMode === "albums") {
            let $container = $("#albumCoversGrid");
            let $items = $container.children(".album-item-wrapper");

            $items.sort(function (a, b) {
                let titleA = $(a).data("title").toLowerCase();
                let titleB = $(b).data("title").toLowerCase();
                let dateA = new Date($(a).data("date"));
                let dateB = new Date($(b).data("date"));

                if (sortingRule === "name-asc") return titleA.localeCompare(titleB);
                if (sortingRule === "name-desc") return titleB.localeCompare(titleA);
                if (sortingRule === "date-asc") return dateA - dateB;
                return dateB - dateA; // default date-desc
            });
            $container.append($items);
        }
        else {
            let $container = $("#innerAlbumMediaGrid");
            let $items = $container.children(".inner-media-item");

            $items.sort(function (a, b) {
                let nameA = $(a).data("name").toLowerCase();
                let nameB = $(b).data("name").toLowerCase();
                let dateA = new Date($(a).data("date"));
                let dateB = new Date($(b).data("date"));

                if (sortingRule === "name-asc") return nameA.localeCompare(nameB);
                if (sortingRule === "name-desc") return nameB.localeCompare(nameA);
                if (sortingRule === "date-asc") return dateA - dateB;
                return dateB - dateA; // default date-desc
            });
            $container.append($items);
        }
    }

    // 3. ALBUM GRID SELECTION HOOK
    $(".album-item-wrapper").click(function () {
        let albumId = $(this).data("album-id");
        let albumTitle = $(this).data("title");

        // Shift Application Context State Pointer
        currentAppScopeMode = albumId;

        // Adjust headers layout elements smoothly
        $("#mainGalleryHeading").text(albumTitle);
        $("#mainGallerySubheading").text("Viewing internal media logs inside directory workspace");

        // Show back navigation controls inside navbar header layer
        $("#backNavWrapper").removeClass("d-none");

        // Flush search text context settings box safely on switch
        $("#globalGallerySearch").val("").attr("placeholder", "Search files inside this specific album...");

        executeRenderPipeline();
    });

    // BACK NAVIGATION HOOK TO MAIN ROSTER LIST
    $("#btnBackToAlbums").click(function () {
        currentAppScopeMode = "albums";

        $("#mainGalleryHeading").text("Travel Albums");
        $("#mainGallerySubheading").text("Browse curated memories by destinations and tours");
        $("#backNavWrapper").addClass("d-none");

        $("#globalGallerySearch").val("").attr("placeholder", "Search albums by name or timeline space...");

        executeRenderPipeline();
    });

    // 4. MODAL WINDOW LIGHTBOX ENGINE (PHOTOS & VIDEOS RECEPTACLE)
    $(document).on("click", ".inner-media-item", function () {
        let $item = $(this);
        let type = $item.data("type");
        let name = $item.data("name");
        let dateStr = $item.data("display-date");

        $("#modalAssetTitle").text(name);
        $("#modalAssetDate").html('<i class="far fa-calendar-alt me-1"></i> ' + dateStr);

        // Tear down lingering structures inside container targets
        $("#modalPopupImage").addClass("d-none").attr("src", "");
        $("#modalPopupVideoWrapper").addClass("d-none");
        $("#modalPopupIframe").attr("src", "");

        if (type === "image") {
            let imgSrc = $item.find("img").attr("src");
            $("#modalPopupImage").attr("src", imgSrc).removeClass("d-none");
        }
        else if (type === "video") {
            let videoUrl = $item.data("src");
            // Active automatic streaming play trigger hook parameters injection
            $("#modalPopupIframe").attr("src", videoUrl + "?autoplay=1");
            $("#modalPopupVideoWrapper").removeClass("d-none");
        }

        $("#albumAssetModal").modal("show");
    });

    // Clean up and freeze iframe objects immediately on modal close events
    $('#albumAssetModal').on('hidden.bs.modal', function () {
        $("#modalPopupIframe").attr("src", "");
        $("#modalPopupImage").attr("src", "");
    });

    // EVENT LISTENERS BINDINGS REGISTRY
    $("#globalGallerySearch").on("keyup search input", executeRenderPipeline);
    $("#globalGallerySort").on("change", executeRenderPipeline);

    // INITIALIZATION ENGINE RUN
    executeRenderPipeline();
});