export default `
<select class="needletail-sort-select">
    {{#options}}
        <option value="{{ name }}" data-attribute="{{ attribute }}" data-direction="{{ direction }}">{{#display_name}}{{{ display_name }}}{{/display_name}}{{^display_name}}{{ name }}{{/display_name}}</option>
    {{/options}}
</select>
`;