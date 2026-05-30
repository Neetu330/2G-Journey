
    function budgetOrder(budget) {
        if (budget === "low") return 1;
        if (budget === "mid") return 2;
        if (budget === "high") return 3;
        return 0;
    }

    function filterPackages() {

        let destinations = [];

        $(".filter-destination:checked").each(function () {
            destinations.push($(this).val());
        });

        let budget = $("input[name='budget']:checked").val();
        let searchText = $("#globalSearch").val().toLowerCase();

        let visibleCount = 0;

        $(".package-item").each(function () {

            let destination = $(this).data("destination");
            let packageBudget = $(this).data("budget");

            let title = $(this).find("h5").text().toLowerCase();
            let description = $(this).find("p").text().toLowerCase();

            let destinationMatch =
                destinations.length === 0 ||
                destinations.includes(destination);

            let budgetMatch =
                !budget || budget === packageBudget;

            let searchMatch =
                title.includes(searchText) ||
                description.includes(searchText) ||
                destination.toLowerCase().includes(searchText);

            if (destinationMatch && budgetMatch && searchMatch) {
                $(this).show();
                visibleCount++;
            } else {
                $(this).hide();
            }
        });

        if (visibleCount === 0) {
            $("#noResult").removeClass("d-none");
        } else {
            $("#noResult").addClass("d-none");
        }
    }

    function sortPackages() {

        let sortValue = $("#sortPackages").val();

        let items = $(".package-item").get();

        items.sort(function (a, b) {

            let nameA = $(a).find("h5").text().toUpperCase();
            let nameB = $(b).find("h5").text().toUpperCase();

            let destinationA = $(a).data("destination");
            let destinationB = $(b).data("destination");

            let budgetA = budgetOrder($(a).data("budget"));
            let budgetB = budgetOrder($(b).data("budget"));

            if (sortValue === "name-asc") {
                return nameA.localeCompare(nameB);
            }

            if (sortValue === "name-desc") {
                return nameB.localeCompare(nameA);
            }

            if (sortValue === "destination") {
                return destinationA.localeCompare(destinationB);
            }

            if (sortValue === "budget-low-high") {
                return budgetA - budgetB;
            }

            if (sortValue === "budget-high-low") {
                return budgetB - budgetA;
            }

            return 0;
        });

        $.each(items, function (index, item) {
            $("#packageList").append(item);
        });
    }

    $(".filter-destination,input[name='budget']").on("change", function () {
        filterPackages();
    });

    $("#globalSearch").on("keyup", function () {
        filterPackages();
    });

    $("#sortPackages").on("change", function () {
        sortPackages();
    });

    $("#reset").click(function () {

        $(".filter-destination").prop("checked", false);

        $("input[name='budget']").prop("checked", false);

        $("#globalSearch").val("");

        $("#sortPackages").val("");

        filterPackages();
        sortPackages();
    });
