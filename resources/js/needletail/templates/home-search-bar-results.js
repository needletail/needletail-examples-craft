export default `
    <div class="needletail-autocomplete-bar-results">
        {{#initial_input}}
            <div class="needletail-autocomplete-bar-result needletail-initial-input" data-attribute="{{ initial_input }}">
                {{ initial_input }}
            </div>
        {{/initial_input}}
    
        {{#results}}
            <div class="needletail-autocomplete-bar-result" data-attribute="{{ raw.title }}" data-url="{{ url }}">
                {{#highlight.title}}{{{ highlight.title }}}{{/highlight.title}}{{^highlight.title}}{{ title }}{{/highlight.title}}
            </div>
        {{/results}}
        {{^results}}
            <div class="needletail-autocomplete-bar-no-result">
                {{{ no_result_message }}}
            </div>
        {{/results}}
    </div>
`;