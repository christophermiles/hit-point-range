class HitPointSpread extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        // region Template
        const template = document.createElement('template')
        template.innerHTML = `
            <style>
                form {
                    display: inline-flex;
                    align-items: baseline;
                    gap: 0.25rem;
                }
                table {
                    width: auto;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid transparent;
                    padding: 8px;
                    text-align: center;
                }
                input[inputmode="numeric"] {
                    width: 3rem;
                }
            </style>
            
            <div>
                <form id="hitpoint-form">
                    <slot name="form-content">
                        <label for="dice-count" aria-label="Number of dice">
                            <input
                                type="text"
                                inputmode="numeric"
                                id="dice-count"
                                name="dice-count"
                                placeholder="1"
                                required
                            >
                        </label>
                        
                        <label for="dice-type" aria-label="Dice type">
                            d
                            <select id="dice-type" name="dice-type" required>
                                <option value="4">4</option>
                                <option value="6">6</option>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="20">20</option>
                            </select>
                        </label>
                        
                        <label for="modifier" aria-label="Modifier">
                            <input
                                type="text"
                                inputmode="numeric"
                                id="modifier"
                                name="modifier"
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

    connectedCallback() {
        // Attach the form submit event listener here
        this.shadowRoot.querySelector('#hitpoint-form').addEventListener('submit', this._onSubmit.bind(this))
    }

    _onSubmit(event) {
        event.preventDefault()

        const diceCountString = this.shadowRoot.querySelector('#dice-count').value
        const dieTypeString = this.shadowRoot.querySelector('#dice-type').value
        const modifierString = this.shadowRoot.querySelector('#modifier').value

        if (!diceCountString || !dieTypeString) {
            return
        }

        this.updateResults(this.calculateResults(diceCountString, dieTypeString, modifierString))
    }

    updateResults(results) {
        this.shadowRoot.getElementById('min-hp').textContent = results.min
        this.shadowRoot.getElementById('weak-hp').textContent = results.weak
        this.shadowRoot.getElementById('avg-hp').textContent = results.average
        this.shadowRoot.getElementById('strong-hp').textContent = results.strong
        this.shadowRoot.getElementById('max-hp').textContent = results.max
    }

    averageDieResults = {
        4: 2.5,
        6: 3.5,
        8: 4.5,
        10: 5.5,
        12: 6.5,
        20: 10.5
    }

    getAverageDieResult(dieTypeNumber) {
        if (isNaN(dieTypeNumber)) {
            throw new TypeError('Die type must be a number')
        }

        if (!this.averageDieResults.hasOwnProperty(dieTypeNumber)) {
            throw new TypeError(`Unknown die type ${dieTypeNumber}`)
        }

        return this.averageDieResults[dieTypeNumber]
    }

    calculateMiddle(a, b) {
        return Math.floor((a + b) / 2)
    }

    calculateResults(diceCountString, dieTypeString, modifierString = '0') {
        const diceCountNumber = parseInt(diceCountString, 10)
        const dieTypeNumber = parseInt(dieTypeString, 10)
        const modifierNumber = parseInt(modifierString, 10) || 0

        if (isNaN(diceCountNumber) || isNaN(dieTypeNumber) || diceCountNumber <= 0 || dieTypeNumber <= 0) {
            throw new Error('Die type and number of dice must be positive integers.')
        }

        const minimum = diceCountNumber + modifierNumber
        const average = Math.floor(diceCountNumber * this.getAverageDieResult(dieTypeNumber)) + modifierNumber
        const maximum = (diceCountNumber * dieTypeNumber) + modifierNumber

        const weak = this.calculateMiddle(minimum, average)
        const strong = this.calculateMiddle(average, maximum)

        return {
            minimum,
            weak,
            average,
            strong,
            maximum
        }
    }
}

customElements.define('hit-point-spread', HitPointSpread)
