import {Slider} from "@needletail/ui";
import SliderRangeTemplate from "./../templates/aggregations/slider-range";

export default (new Slider({
    title: ``, // The title of the Checkbox filter.
    attribute: ``, // What attribute are we filtering on.
    collapsible: false, // Can the filter be collapsed.
    default_collapsed: false, // Is the filter collapsed by default, option does nothing when `collapsible` is set to false.
    min: 0, // The minimum value in the slider.
    max: 10, // The maximum value in the slider.
    default_value: 5, // What value to start on.
    range: true, // Is it a range slider or a normal slider.
    default_range_min: 0, // The default value for the left range slider option.
    default_range_max: 10, // The default value for the right range slider option.
    type: `from:to`, // How to handle the slider.
                // Allowed types are: from, to, from:to
    inputs: `top`, // Default Needletail shows input fields to display the selected values in a range slider. Possible options are: top, bottom
    display_only: false, // If you want the input fields to be read only enable this option.
}))
.setTemplate(SliderRangeTemplate);