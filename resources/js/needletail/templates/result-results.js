export default `
{{#results}}
    <div class="needletail-result-result">
        <div class="needletail-result-title">{{ title }}</div>
        <div class="needletail-result-body">{{ body }}</div>
    </div>
{{/results}}
{{^results}}
    <div class="needletail-result-no-result">
        {{{ no_result_message }}}
    </div>
{{/results}}
`;