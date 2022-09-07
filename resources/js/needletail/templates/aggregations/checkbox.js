export default `
<div class="needletail-aggregation needletail-aggregation-checkbox needletail-aggregation-checkbox-{{ class_title }} {{ collapsible }} {{ collapsed }}">
    <div class="needletail-aggregation-checkbox-title">
        {{ title }}
    </div>
    <div class="needletail-collapsible-container">
        {{#options}}
            <label class="needletail-aggregation-checkbox-option {{#show_more_options}}needletail-hidden{{/show_more_options}}">
                <input type="checkbox" name="{{ name }}" value="{{ value }}" class="needletail-aggregation-checkbox-option-input needletail-aggregation-checkbox-option-input-{{ name }}">
                <span class="needletail-aggregation-checkbox-option-checkmark"></span>
                <span class="needletail-aggregation-checkbox-option-label">{{ value }}</span>
                <span class="needletail-aggregation-checkbox-option-count">{{ count }}</span>
            </label>
        {{/options}}
        {{#show_more_options}}
            <div class="needletail-show-more-options">{{{ show_more_options_text }}}</div>
            <div class="needletail-show-less-options needletail-hidden">{{{ show_less_options_text }}}</div>
        {{/show_more_options}}
    </div>
</div>
`;