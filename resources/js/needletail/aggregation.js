import {AggregationBar} from "@needletail/ui";
import AggregationBarTemplate from "./templates/aggregation";
import ClearFiltersTemplate from "./templates/aggregations/clear-filters";

// Always check if the element actually exists, if not there's no need to start defining the AutocompleteBar widget.
// If we don't do this Javascript will throw errors.
if (document.getElementById(`aggregation-bar`)) {
    const aggregationBar = (new AggregationBar({
        el: `#aggregation-bar`, // The element the AggregationBar will be put in.
        clear_filters: {
            use: true,
            top: false,
            bottom: false,
            text: 'Filters resetten',
            hide_on_none_active: true,
        }
    }))
    .setTemplate(AggregationBarTemplate) // Add a custom template.
    .setClearFiltersTemplate(ClearFiltersTemplate); // Add a custom dropdown template.

    window.needletail.addWidget(aggregationBar); // Add the widget to Needletail.
}