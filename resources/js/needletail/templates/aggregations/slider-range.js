export default `
<div class="needletail-aggregation needletail-aggregation-slider needletail-aggregation-slider-{{ class_title }} {{ collapsible }} {{ collapsed }}">
    <div class="needletail-aggregation-slider-title">
        {{ title }}
    </div>
    <div class="needletail-collapsible-container">
        <div class="needletail-aggregation-slider-container__range">
            {{#inputs_top}}
            <div class="needletail-aggregation-slider-inputs top">
                <input type="number" class="needletail-aggregation-slider-input-min {{ display_only }}">
                <input type="number" class="needletail-aggregation-slider-input-max {{ display_only }}">
            </div>
            {{/inputs_top}}
            <div class="needletail-aggregation-slider-range-container">
                <div class="needletail-aggregation-slider-range">
                    <div class="needletail-aggregation-slider-range-left"></div>
                    <div class="needletail-aggregation-slider-range-divider"></div>
                    <div class="needletail-aggregation-slider-range-right"></div>
                </div>
            </div>
            {{#inputs_bottom}}
                <div class="needletail-aggregation-slider-inputs bottom">
                    <input type="number" class="needletail-aggregation-slider-input-min {{ display_only }}">
                    <input type="number" class="needletail-aggregation-slider-input-max {{ display_only }}">
                </div>
            {{/inputs_bottom}}
        </div>
    </div>
</div>
`;