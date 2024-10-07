class HitPointSpread extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
    }
}

customElements.define('hit-point-spread', HitPointSpread)
