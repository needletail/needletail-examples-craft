import {Radio} from "@needletail/ui";
import RadioTemplate from "./../templates/aggregations/radio";

export default (Radio({
    title: '', // The title of the Checkbox filter.
    attribute: '', // What attribute are we filtering on.
    collapsible: false, // Can the filter be collapsed.
    default_collapsed: false, // Is the filter collapsed by default, option does nothing when `collapsible` is set to false.
    hide_on_empty: true, // Hide the filter when there are no options to show.
    show_more_options: {
        use: true, // Show a `show more options` button that expands the filter.
        text: `Toon meer opties`, // The text for the button.
        less_text: `Toon minder opties`, // Once expanded this text will be shown.
        load: 10, // How many options to display before showing the button.
    },
    option_order: [ // Sometimes you want a fixed order for the options. Put them in this array to do so. Leaving options out will put them below the forced order.

    ]
}))
.setTemplate(RadioTemplate);