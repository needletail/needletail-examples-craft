export default `
<div class="needletail-aggregation-bar">
    {{#show_clear_filters_top}}
        <div class="needletail-clear-filters-top">
            {{{ clear_filters }}}
        </div>
    {{/show_clear_filters_top}}
    {{#fields}}
        <div class="needletail-aggregation-item">
            {{{ . }}}
        </div>
    {{/fields}}
    {{#show_clear_filters_bottom}}
        <div class="needletail-clear-filters-bottom">
            {{{ clear_filters }}}
        </div>
    {{/show_clear_filters_bottom}}
</div>
`;