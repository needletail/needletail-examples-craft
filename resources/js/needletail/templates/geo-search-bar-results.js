export default `
    <div class="needletail-autocomplete-bar-results">
        {{#initial_input}}
            <div class="needletail-autocomplete-bar-result needletail-initial-input" data-attribute="{{ initial_input }}">
                {{ initial_input }}
            </div>
        {{/initial_input}}
    
        {{#results}}
            <div class="needletail-autocomplete-bar-result" data-attribute="{{ city }}" data-lat="{{ lat }}" data-lng="{{ lng }}">
                {{#highlight.city}}{{{ highlight.city }}}{{/highlight.city}}{{^highlight.city}}{{ city }}{{/highlight.city}}
            </div>
        {{/results}}
        {{^results}}
            <div class="needletail-autocomplete-bar-no-result">
                {{{ no_result_message }}}
            </div>
        {{/results}}
    </div>
`;