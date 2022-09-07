export default `
<div class="needletail-aggregation needletail-aggregation-switch needletail-aggregation-switch-{{ class_title }} {{ collapsible }} {{ collapsed }}">
    <div class="needletail-aggregation-switch-title">
        {{ title }}
    </div>
    <div class="needletail-collapsible-container">
        <span class="needletail-aggregation-boolean-label">{{ off_value }}</span>
        <label class="needletail-aggregation-switch-container">
            <input type="checkbox" name="{{ name }}" value="{{ value }}" class="needletail-aggregation-switch-input needletail-aggregation-switch-input-{{ name }}">
            <span class="needletail-aggregation-switch-slider"></span>
        </label>
        <span class="needletail-aggregation-boolean-label">{{ on_value }}</span>
    </div>
</div>
`;