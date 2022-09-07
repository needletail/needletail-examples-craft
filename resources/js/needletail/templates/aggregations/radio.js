export default `
<div class="needletail-aggregation needletail-aggregation-radio needletail-aggregation-radio-{{ class_title }} {{ collapsible }} {{ collapsed }}">
    <div class="needletail-aggregation-radio-title">
        {{ title }}
    </div>
    <div class="needletail-collapsible-container">
        {{#options}}
            <label class="needletail-aggregation-radio-option {{#show_more_options}}needletail-hidden{{/show_more_options}}">
                <input type="radio" name="{{ name }}" value="{{ value }}" class="needletail-aggregation-radio-option-input needletail-aggregation-radio-option-input-{{ name }}">
                <span class="needletail-aggregation-radio-option-checkmark"></span>
                <span class="needletail-aggregation-radio-option-label">{{ value }}</span>
                <span class="needletail-aggregation-radio-option-count">{{ count }}</span>
            </label>
        {{/options}}
        {{#show_more_options}}
            <div class="needletail-show-more-options">{{{ show_more_options_text }}}</div>
            <div class="needletail-show-less-options needletail-hidden">{{{ show_less_options_text }}}</div>
        {{/show_more_options}}
    </div>
</div>
`;