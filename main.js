class HitPointSpread extends HTMLFieldSetElement {
    constructor() {
        super();
    }
}

customElements.define('hit-point-spread', HitPointSpread, { extends: 'fieldset' });
