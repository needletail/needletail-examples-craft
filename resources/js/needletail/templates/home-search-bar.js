export default `
    <div class="needletail-autocomplete-bar needletail-autocomplete-bar-{{ name }}">
        <input type="text" name="{{ name }}" class="needletail-autocomplete-bar-input needletail-empty" autocomplete="off" spellcheck="false" placeholder="{{ placeholder }}">
        {{{ results }}}
    </div>
`;