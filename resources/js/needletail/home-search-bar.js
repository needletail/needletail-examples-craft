import {AutocompleteBar, Events} from "@needletail/ui";
import HomeSearchBarTemplate from "./templates/home-search-bar";
import HomeSearchBarResultsTemplate from "./templates/home-search-bar-results";

// Always check if the element actually exists, if not there's no need to start defining the AutocompleteBar widget.
// If we don't do this Javascript will throw errors.
if (document.getElementById(`home-search-bar`)) {
    const homeSearchBar = (new AutocompleteBar({
        el: `#home-search-bar`, // The element the AutocompleteBar will be put in.
        search: {
            buckets: [ // Which buckets are being used, default in the boilerplate `window.needletail_prefix` is available.
                `${window.needletail_prefix}vacatures`,
            ],
            attributes: [ // Which attribute(s) are we searching for.
                `title`
            ],
            size: 10, // How many results do we want to fetch from Needletail.
            group_by: ``, // Which attribute is used to group the results.
            sort_by: ``, // Which attribute is used for sorting the results.
            sort_direction: ``, // Do we want the results to be sorted ascending (ASC) or descending (DESC).
            sort_mode: `min`, // If the `sort_by` option is set to an array attribute this mode will be used.
                              // Possible options are:
                              // min, will take the lowest value in the array;
                              // max, will take the highest value in the array;
                              // avg, will take the average value in the array;
                              // sum, will add everything together and use the result to sort on.
            show_bucket: false, // Enable this option if you want the bucket name to return as part of the results. This option is extremely handy when searching in more than 1 bucket.
            bucket_mapping: [ // In some cases your bucket names are not user-friendly, this will let you map your bucket names to more user-friendly names.

            ],
        },
        placeholder: `Zoek op functie of trefwoord`, // What placeholder should be put inside the input field Needletail generates.
        no_result_message: 'Geen resultaten gevonden', // If the search query doesn't return any result this is the message that will be shown.
        in_url: false, // Should the search query be put in the URL. This is used for easy sharing the URL and being able to navigate back to the page with the same search query.
        minimum_characters: 1, // The minimum amount of characters a user should type before we start searching.
        query: `e`, // How are we naming the search query in the URL.
        search_on_content_loaded: true, // If the page loads Needletail doesn't automatically search, if we enable this option Needletail will automatically search.
        force_use_of_result: false, // Needletail has multiple ways of searching, if we enable force_use_of_result it will always force Needletail to submit to one of the results.
        initial_input: false, // If this option is enabled Needletail will keep track of what the user typed, and always show it as the first result in the list.
        fill_input_on_click: true, // When we click a record in the results it will fill the input field with the data of that record.
        live_results: false, // This will force all Result widgets on the same page to search in live mode.
        use_in_results: true, // When true the AutocompleteBar will be included in the search request from the Result widget.
        show_results: true, // It's not always necessary to show the dropdown with results. Setting this option to false will disable showing the dropdown.
        debounce: { // Debounce allows us to collect input which is made within a certain time and send it collectively instead of sending loose requests and overloading the server.
            use: true, // Enables or disables debounce.
            wait: 200, // Specifies the time how long we collect input from the user. Time is in milliseconds.
            url_wait: 100, // If the `in_url` option is enabled this will determine how long it takes for the url to update.
        }
    }))
    .setTemplate(HomeSearchBarTemplate) // Add a custom template.
    .setResultTemplate(HomeSearchBarResultsTemplate); // Add a custom dropdown template.

    function submitHomeSearchBar(search = null) {
        const urlString = window.location.href;
        const url = new URL(urlString);

        // Get the url parameter to search for.
        let c = url.searchParams.get(homeSearchBar.getQuery());

        // If search is set it's supposed to override the url parameter.
        if (search !== null) {
            c = search;
        }

        if (c === null || c === '') {
            // If there's nothing to search on redirect to the result page without any query.
            window.location.href = `/vacatures`;
        } else {
            // If we search for something redirect to the result page with a query.
            // This query will be prefilled in an AutocompleteBar if the query string matches.
            window.location.href = `/vacatures?q=${c}`;
        }
    }

    document.addEventListener((Events.onSubmitSearch), (_) => {
        if (_.detail.query !== homeSearchBar.getQuery()) {
            return;
        }

        if (_.detail.value.url !== undefined && _.detail.value.url !== null) {
            // If we have a specific record redirect directly to that record.
            window.location.href = _.detail.value.url;
        } else {
            // Handle the search to the result page.
            submitHomeSearchBar(_.detail.value);
        }
    });

    window.needletail.addWidget(homeSearchBar); // Add the widget to Needletail.

    // Register the click event for the button.
    const homeSearchButton = document.getElementById(`home-search-button`);
    homeSearchButton.addEventListener(`click`, (_) => submitHomeSearchBar());
}