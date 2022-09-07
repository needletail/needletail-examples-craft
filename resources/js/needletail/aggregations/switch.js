import {Switch} from "@needletail/ui";
import SwitchTemplate from "./../templates/aggregations/switch";

export default (new Switch({
    title: ``, // The title of the Checkbox filter.
    attribute: ``, // What attribute are we filtering on.
    collapsible: false, // Can the filter be collapsed.
    default_collapsed: false, // Is the filter collapsed by default, option does nothing when `collapsible` is set to false.
    on_value: `On`, // The value if the switch is enabled.
    off_value: `Off`, // The value if the switch is disabled.
    attribute_value: ``, // The value the attribute should be when turned on.
}))
.setTemplate(SwitchTemplate);