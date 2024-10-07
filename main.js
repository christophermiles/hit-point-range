class HitPointSpread extends HTMLFieldSetElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
    }
}

customElements.define('hit-point-spread', HitPointSpread, { extends: 'fieldset' })
