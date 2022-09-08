import {AutocompleteBar, Events} from "@needletail/ui";
import GeoSearchBarTemplate from "./templates/geo-search-bar";
import GeoSearchBarResultsTemplate from "./templates/geo-search-bar-results";

// Always check if the element actually exists, if not there's no need to start defining the AutocompleteBar widget.
// If we don't do this Javascript will throw errors.
if (document.getElementById(`geo-search-bar`)) {
    const geoSearchBar = (new AutocompleteBar({
        el: `#geo-search-bar`, // The element the AutocompleteBar will be put in.
        search: {
            buckets: [ // Which buckets are being used, default in the boilerplate `window.needletail_prefix` is available.
                `cities`,
            ],
            attributes: [ // Which attribute(s) are we searching for.
                `city`
            ],
            size: 5, // How many results do we want to fetch from Needletail.
            group_by: `city`, // Which attribute is used to group the results.
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
        placeholder: `Locatie`, // What placeholder should be put inside the input field Needletail generates.
        no_result_message: `Geen resultaten gevonden`, // If the search query doesn't return any result this is the message that will be shown.
        in_url: true, // Should the search query be put in the URL. This is used for easy sharing the URL and being able to navigate back to the page with the same search query.
        minimum_characters: 1, // The minimum amount of characters a user should type before we start searching.
        query: `geo`, // How are we naming the search query in the URL.
        search_on_content_loaded: true, // If the page loads Needletail doesn't automatically search, if we enable this option Needletail will automatically search.
        force_use_of_result: true, // Needletail has multiple ways of searching, if we enable force_use_of_result it will always force Needletail to submit to one of the results.
        initial_input: false, // If this option is enabled Needletail will keep track of what the user typed, and always show it as the first result in the list.
        fill_input_on_click: true, // When we click a record in the results it will fill the input field with the data of that record.
        live_results: false, // This will force all Result widgets on the same page to search in live mode.
        use_in_results: false, // When true the AutocompleteBar will be included in the search request from the Result widget.
        show_results: true, // It's not always necessary to show the dropdown with results. Setting this option to false will disable showing the dropdown.
        debounce: { // Debounce allows us to collect input which is made within a certain time and send it collectively instead of sending loose requests and overloading the server.
            use: true, // Enables or disables debounce.
            wait: 200, // Specifies the time how long we collect input from the user. Time is in milliseconds.
            url_wait: 100, // If the `in_url` option is enabled this will determine how long it takes for the url to update.
        }
    }))
    .setTemplate(GeoSearchBarTemplate) // Add a custom template.
    .setResultTemplate(GeoSearchBarResultsTemplate); // Add a custom dropdown template.

    function setGeoCoordinates(_) {
        if (_.detail.query !== geoSearchBar.getQuery() || !_.detail.value) {
            return;
        }

        document.getElementById(`geo-coordinates-lat`).value = _.detail.value.lat;
        document.getElementById(`geo-coordinates-lng`).value = _.detail.value.lng;
    }

    document.addEventListener(Events.onArrowMovementSearch, setGeoCoordinates);
    document.addEventListener(Events.onForceResultBlur, setGeoCoordinates);
    document.addEventListener(Events.onSubmitSearch, setGeoCoordinates);

    window.needletail.addWidget(geoSearchBar); // Add the widget to Needletail.

    const urlString = window.location.href;
    const url = new URL(urlString);
    const latField = document.getElementById(`geo-coordinates-lat`);
    const lngField = document.getElementById(`geo-coordinates-lng`);
    const distanceField = document.getElementById(`geo-coordinates-distance`);

    // Make sure there is a lat field.
    if (latField) {
        latField.value = url.searchParams.get(`geo`) ? url.searchParams.get(`geo-coordinates-lat`) : ``;

        if (!url.searchParams.get(`geo`) || !url.searchParams.get(`geo-coordinates-lat`)) {
            url.searchParams.delete(`geo-coordinates-lat`);
        }
    } else {
        console.warn(`You're using the geo-search-bar but do not have a field with the \`geo-coordinates-lat\` id`);
    }

    // Make sure there is a lng field.
    if (lngField) {
        lngField.value = url.searchParams.get(`geo`) ? url.searchParams.get(`geo-coordinates-lng`) : ``;

        if (!url.searchParams.get(`geo`) || !url.searchParams.get(`geo-coordinates-lng`)) {
            url.searchParams.delete(`geo-coordinates-lng`);
        }
    } else {
        console.warn(`You're using the geo-search-bar but do not have a field with the \`geo-coordinates-lng\` id`);
    }

    // Make sure there is a distance field.
    if (distanceField) {
        distanceField.value = url.searchParams.get(`geo-coordinates-distance`) ?? `10`;

        if (!url.searchParams.get(`geo-coordinates-distance`)) {
            url.searchParams.delete(`geo-coordinates-distance`);
        }
    } else {
        console.warn(`You're using the geo-search-bar but do not have a field with the \`geo-coordinates-distance\` id`);
    }

    // If neither the latField and lngField have a value reset the geoSearchBar to prevent confusion.
    if (!latField.value && !lngField.value) {
        document.querySelector(`${geoSearchBar.getEl()} input`).value = ``;

        if (!url.searchParams.get(`geo`) ||
            !url.searchParams.get(`geo-coordinates-distance`) ||
            !url.searchParams.get(`geo-coordinates-lat`) ||
            !url.searchParams.get(`geo-coordinates-lng`)
        ) {
            url.searchParams.delete(`geo`);
        }

        let query = url.searchParams.toString();
        query = query ? `?${query}` : url.pathname;

        history.pushState({}, document.title, query);
    }
}