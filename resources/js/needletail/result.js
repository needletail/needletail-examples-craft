import {Result, Events} from "@needletail/ui";
import ResultTemplate from "./templates/result";
import ResultResultsTemplate from "./templates/result-results";
import ResultSortTemplate from "./templates/result-sort";

// Always check if the element actually exists, if not there's no need to start defining the Result widget.
// If we don't do this Javascript will throw errors.
if (document.getElementById(`result`)) {
    const ctaDiv = document.getElementById(`cta-template`);

    const resultWidget = (new Result({
        el: `#result`, // The element the AutocompleteBar will be put in.
        per_page: 10, // How many results do we want per page to fetch from Needletail.
        minify_pages: 5, // Sometimes you've a lot of pages, this allows you to only show a handful.
        pagination: {
            previous: `Vorige`, // The label for the previous button.
            next: `Volgende`, // The label for the next button.
            first: `Eerste`, // The label for the first button.
            last: `Laatste`, // The label for the last button.
            show_quick_pagination: false, // Quick pagination is the first and last button, disabling this will hide those buttons.
            scroll_back_to_top: true, // After the user switched pages do you want the user to scroll back to the top of the results.
            scroll_offset: 100, // In some cases there's a header on top of the page, this allows you to end the scroll earlier (or later).
            active_class: `active`, // Which class is being used on the current page.
            hide_on_single_page: true, // If there's only one page, hide the navigation if enabled.
            infinite_scroll: false, // This automatically hides the pagination, it will allow the user to scroll infinitely.
            bottom_scroll_offset: 0, // When do you want the infinite scroll to trigger a new search
        },
        loader: ``, // Which loader should be used, possible options are: round-dots, round-line, straight-bars, straight-dots. This will be shown when the widget is loading.
        group_by: ``, // Which attribute is used to group the results.
        sort_by: ``, // Which attribute is used for sorting the results.
        sort_direction: `asc`, // Do we want the results to be sorted ascending (ASC) or descending (DESC).
        sort_select: [], // Define the options that should be shown in the sort select.
        sort_select_default: ``, // Which option in the sort select is default.
        sort_mode: `min`, // If the `sort_by` option is set to an array attribute this mode will be used.
                          // Possible options are:
                          // min, will take the lowest value in the array;
                          // max, will take the highest value in the array;
                          // avg, will take the average value in the array;
                          // sum, will add everything together and use the result to sort on.
        no_result_message: `Geen resultaten gevonden.`, // If the search query doesn't return any result this is the message that will be shown.
        buckets: [ // Which buckets are being used, default in the boilerplate `window.needletail_prefix` is available. This will automatically be filled by the AutocompleteBar's that have `use_in_results` enabled.

        ],
        total_results_text: `:count resultaten`, // The text that displays the total count of the query.
    }))
    .setTemplate(ResultTemplate) // Add a custom template.
    .setResultTemplate(ResultResultsTemplate) // Add a custom result template.
    .setResultSortSelectTemplate(ResultSortTemplate); // Add a custom template for the sort select.

    window.needletail.addWidget(resultWidget);

    document.addEventListener(Events.onResultRequest, (_) => {
        const latField = document.getElementById(`geo-coordinates-lat`);
        const lngField = document.getElementById(`geo-coordinates-lng`);
        const distanceField = document.getElementById(`geo-coordinates-distance`);
        const searchField = document.getElementById(`q`);

        const lat = latField.value;
        const lng = lngField.value;
        const distance = distanceField.value;

        // Check if the `extra_search_values` already exists or not.
        // We have to check this, so we don't accidentally overwrite existing data.
        if (!_.detail.extra_search_values) {
            _.detail.extra_search_values = {};
        }

        if (lat !== null && lat !== `` && lng !== null && lng !== ``) {
            // Since geo search is not natively supported in the UI package we have to add this custom.
            _.detail.extra_search_values.geo_point = {
                field: `geo`,
                lat: parseFloat(lat),
                lng: parseFloat(lng),
                distance: `${distance}km`,
            };
        }

        // Check if `equals_search_values` already exists or not.
        // We have to check this, so we don't accidentally overwrite existing data.
        if (!_.detail.equals_search_values) {
            _.detail.equals_search_values = {};
        }

        // Check if `equals_search_values.fuzzy` already exists or not.
        // We have to check this, so we don't accidentally overwrite existing data.
        if (!_.detail.equals_search_values.fuzzy) {
            _.detail.equals_search_values.fuzzy = [];
        }

        // Push the value of searchField as a value to the attribute you want to search on.
        // If you want to search on multiple attributes push multiple times.
        _.detail.equals_search_values.fuzzy.push({
            field: `title`,
            value: searchField.value,
        });
    });

    document.addEventListener(Events.onBeforeResultRequest, (_) => {
        const urlString = window.location.href;
        const url = new URL(urlString);
        const q = url.searchParams.get(`q`);
        const geo = url.searchParams.get(`geo`);

        if ((geo === null || geo === ``) && (q === null || q === ``)) {
            // If there is no geo data and no search data in the URL sort by postDate.
            resultWidget.setSortBy(`postDate`)
                .setSortDirection(`desc`);
        } else if ((geo === null || geo === ``) && (q !== null && q !== ``)) {
            // If there is search data in the URL but no geo data, sort on nothing.
            resultWidget.setSortBy(``)
                .setSortDirection(`desc`);
        }
    });

    document.addEventListener(Events.onAfterResultRequest, (_) => {
        if (_.detail.pages) {
            _.detail.pages.forEach((page) => {
                page.active = (page.active === `active`) ? `active` : ``;
            });
        }
    });

    document.addEventListener(Events.resultFinished, (_) => {
        // This is only needed if there is a Call To Action div. Return if there's no template for it.
        if (!ctaDiv) {
            return;
        }

        // Fetch all the current Needletail results.
        const results = document.querySelectorAll(`.needletail-result-results .needletail-result-result`);
        // After how many results do we want a CTA.
        const after = 5;

        let afterDiv;

        if (results[after - 1]) {
            afterDiv = results[after - 1];
        } else {
            afterDiv = results[results.length - 1];
        }

        // Clone the node so we keep the template intact.
        const newCtaDiv = ctaDiv.cloneNode(true);
        // Make sure to remove the hidden class, the template should be hidden by default.
        newCtaDiv.classList.remove(`hidden`);
        newCtaDiv.setAttribute(`id`, `new-cta-result-div`);

        // If we know after which div we want to put the CTA put it after that div, else put it after the result block.
        if (afterDiv) {
            afterDiv.after(newCtaDiv);
        } else {
            document.querySelector(`.needletail-result-no-result`).after(newCtaDiv);
        }
    });
}