export default `
<div class="needletail-aggregation needletail-aggregation-slider needletail-aggregation-slider-{{ class_title }} {{ collapsible }} {{ collapsed }}">
    <div class="needletail-aggregation-slider-title">
        {{ title }}
    </div>
    <div class="needletail-collapsible-container">
        <div class="needletail-aggregation-slider-container">
            <input type="range" name="{{ name }}" min="{{ min }}" max="{{ max }}" value="{{ value }}" class="needletail-aggregation-slider-input needletail-aggregation-slider-input-{{ name }}">
        </div>
    </div>
</div>
`;