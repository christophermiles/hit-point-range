class HitPointSpread extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })

        // region Template
        const template = document.createElement('template')
        template.innerHTML = `
            <style>
                table {
                    width: auto;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid transparent;
                    padding: 8px;
                    text-align: center;
                }
                input[type="number"] {
                    width: 3rem;
                }
            </style>
            
            <div>
                <form id="hitpoint-form">
                    <slot name="form-content">
                        <label for="dice-number" aria-label="Number of dice">
                            <input
                                type="number"
                                id="dice-number"
                                name="dice-number"
                                placeholder="1"
                                required
                            >
                        </label>
                        
                        <label for="dice-type" aria-label="Dice type">
                            d
                            <select name="dice-type" required>
                                <option value="4">4</option>
                                <option value="6">6</option>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="20">20</option>
                            </select>
                        </label>
                        
                        <label for="bonus" aria-label="Modifier">
                            <input
                                type="number"
                                id="bonus"
                                name="bonus"
                                placeholder="+0"
                            >
                        </label>
                        
                        <button type="submit">Calculate</button>
                    </slot>
                </form>

                <div id="result">
                    <slot name="result-table">
                        <!-- Default table structure -->
                        <table>
                            <thead>
                                <tr>
                                    <th>Minimum</th>
                                    <th>Weak</th>
                                    <th>Average</th>
                                    <th>Strong</th>
                                    <th>Maximum</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td id="min-hp">&mdash;</td>
                                    <td id="weak-hp">&mdash;</td>
                                    <td id="avg-hp">&mdash;</td>
                                    <td id="strong-hp">&mdash;</td>
                                    <td id="max-hp">&mdash;</td>
                                </tr>
                            </tbody>
                        </table>
                    </slot>
                </div>
            </div>
        `

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        // endregion
    }
}

customElements.define('hit-point-spread', HitPointSpread)
