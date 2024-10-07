class HitPointSpread extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        // region Template
        const template = document.createElement('template')
        template.innerHTML = `
            <style>
                :host {
                    --color-grey: grey;
                    --color-blue: blue;
                    --color-black: black;
                    --color-white: white;
                    --base-font-size: 1rem;
                    --base-text-color: var(--color-black);
                    --base-focus-color: var(--color-blue);
                    --input-font-size: var(--base-font-size);
                    --input-padding-block: 0.25rem;
                    --input-padding-inline: 1px;
                    --input-border-color: var(--color-black);
                    --input-border-block-start: 1px solid transparent;
                    --input-border-block-end: 1px solid var(--input-border-color, black);
                    --input-border-inline-start: 1px solid transparent;
                    --input-border-inline-end: 1px solid transparent;
                    --input-border-radius: 0;
                    --input-focus-outline-width: 0;
                    --input-focus-outline-style: none;
                    --input-focus-outline-color: transparent;
                    --input-focus-outline-offset: 0;
                    --input-focus-border-block-start: 1px solid var(--base-focus-color, black);
                    --input-focus-border-block-end: 1px solid var(--base-focus-color, black);
                    --input-focus-border-inline-start: 1px solid var(--base-focus-color, black);
                    --input-focus-border-inline-end: 1px solid var(--base-focus-color, black);
                    --select-font-size: var(--base-font-size);
                    --select-padding-block: 0.25rem;
                    --select-padding-inline: 1px;
                    --select-border-color: var(--color-black);
                    --select-border-block-start: 1px solid transparent;
                    --select-border-block-end: 1px solid transparent;
                    --select-border-inline-start: 1px solid transparent;
                    --select-border-inline-end: 1px solid transparent;
                    --select-background-color: none;
                    --select-border-radius: 0;
                    --select-focus-outline-width: 0;
                    --select-focus-outline-style: none;
                    --select-focus-outline-color: transparent;
                    --select-focus-outline-offset: 0;
                    --select-focus-border-block-start: 1px solid var(--base-focus-color);
                    --select-focus-border-block-end: 1px solid var(--base-focus-color);
                    --select-focus-border-inline-start: 1px solid var(--base-focus-color);
                    --select-focus-border-inline-end: 1px solid var(--base-focus-color);
                    --button-font-size: var(--input-font-size, 1rem);
                    --button-border: none;
                    --button-background-color: var(--color-black, black);
                    --button-color: var(--color-white, white);
                    --button-padding-block: 0.25rem;
                    --button-padding-inline: 0.25rem;
                    --button-border-radius: 0;
                    --button-focus-outline-width: 1px;
                    --button-focus-outline-style: solid;
                    --button-focus-outline-color: var(--base-focus-color);
                    --button-focus-outline-offset: 0px;
                    --button-focus-border-block-start: none;
                    --button-focus-border-block-end: none;
                    --button-focus-border-inline-start: none;
                    --button-focus-border-inline-end: none;
                }
                
                input {
                    all: unset;
                    font-size: var(--input-font-size, inherit);
                    padding-block: var(--input-padding-block, initial);
                    padding-inline: var(--input-padding-inline, initial);
                    border-block-start: var(--input-border-block-start, initial);
                    border-block-end: var(--input-border-block-end, initial);
                    border-inline-start: var(--input-border-inline-start, initial);
                    border-inline-end: var(--input-border-inline-end, initial);
                    border-radius: var(--input-border-radius, initial);
                    font-family: inherit;
                }

                select {
                    all: unset;
                    font-size: var(--select-font-size, inherit);
                    padding-block: var(--select-padding-block, initial);
                    padding-inline: var(--select-padding-inline, initial);
                    border-block-start: var(--select-border-block-start, initial);
                    border-block-end: var(--select-border-block-end, initial);
                    border-inline-start: var(--select-border-inline-start, initial);
                    border-inline-end: var(--select-border-inline-end, initial);
                    background-color: var(--select-background-color, initial);
                    border-radius: var(--select-border-radius, initial);
                    font-family: inherit;
                    cursor: pointer;
                }
                
                button {
                    all: unset;
                    background-color: var(--button-background-color, initial);
                    color: var(--button-color, inherit);
                    padding-block: var(--button-padding-block, initial);
                    padding-inline: var(--button-padding-inline, initial);
                    border: var(--button-border, initial);
                    border-radius: var(--button-border-radius, initial);
                    font-family: inherit;
                    font-size: var(--input-font-size, inherit);
                    cursor: pointer;
                }
                
                input:focus-visible {
                    outline: var(--input-focus-outline-width, initial) var(--input-focus-outline-style, initial) var(--input-focus-outline-color, initial);
                    outline-offset: var(--input-focus-outline-offset, initial);
                    border-block-start: var(--input-focus-border-block-start, initial);
                    border-block-end: var(--input-focus-border-block-end, initial);
                    border-inline-start: var(--input-focus-border-inline-start, initial);
                    border-inline-end: var(--input-focus-border-inline-end, initial);
                }

                select:focus-visible {
                    outline: var(--select-focus-outline-width, initial) var(--select-focus-outline-style, initial) var(--select-focus-outline-color, initial);
                    outline-offset: var(--select-focus-outline-offset, initial);
                    border-block-start: var(--select-focus-border-block-start, initial);
                    border-block-end: var(--select-focus-border-block-end, initial);
                    border-inline-start: var(--select-focus-border-inline-start, initial);
                    border-inline-end: var(--select-focus-border-inline-end, initial);
                }

                button:focus-visible {
                    outline: var(--button-focus-outline-width, initial) var(--button-focus-outline-style, initial) var(--button-focus-outline-color, initial);
                    outline-offset: var(--button-focus-outline-offset, initial);
                    border-block-start: var(--button-focus-border-block-start, initial);
                    border-block-end: var(--button-focus-border-block-end, initial);
                    border-inline-start: var(--button-focus-border-inline-start, initial);
                    border-inline-end: var(--button-focus-border-inline-end, initial);
                }
                
                #container {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    align-items: center;
                }
                
                form {
                    display: inline-flex;
                    gap: 0.25rem;
                    align-items: baseline;
                }
                
                fieldset {
                    display: flex;
                    border: none;
                }
                
                fieldset > div {
                    display: flex;
                    align-items: baseline;
                    gap: 0.25rem;
                }
                
                legend {
                    white-space: nowrap;
                    padding: 0;
                    font-size: inherit;
                    font-weight: bold;
                }
                
                button {
                    flex-shrink: 0;
                }

                input[name="dice-count"] {
                    width: 2rem;
                    text-align: right;
                }
                input[name="modifier"] {
                    width: 3rem;
                    text-align: left;
                }
                table {
                    width: auto;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid transparent;
                    padding: 0.25rem;
                    text-align: center;
                }
                td:empty:after {
                    content: '—';
                    color: var(--color-grey);
                }
                
            </style>
            
            <div id="container">
                <form id="hitpoint-form">
                    <slot name="form-content">
                        <fieldset>
                            <div>
                                <legend>
                                    <slot name="legend-content">
                                        Hit Dice
                                    </slot>
                                </legend>
                
                                <label for="dice-count" aria-label="Number of dice">
                                    <input type="text" inputmode="numeric" id="dice-count" name="dice-count" placeholder="1" required="">
                                </label>
                
                                <label for="dice-type" aria-label="Dice type">
                                    <select id="dice-type" name="dice-type" required="">
                                        <option value="4">d4</option>
                                        <option value="6">d6</option>
                                        <option value="8" selected="">d8</option>
                                        <option value="10">d10</option>
                                        <option value="12">d12</option>
                                        <option value="20">d20</option>
                                    </select>
                                </label>
                
                                <label for="modifier" aria-label="Modifier">
                                    <input type="text" inputmode="numeric" id="modifier" name="modifier" placeholder="+0">
                                </label>
                            </div>
                        </fieldset>
                        
                        <button type="submit" tabindex="0">
                            Calculate
                        </button>
                    </slot>
                </form>

                <slot name="result-table">
                    <table id="result">
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
                                <td id="min-hp"></td>
                                <td id="weak-hp"></td>
                                <td id="avg-hp"></td>
                                <td id="strong-hp"></td>
                                <td id="max-hp"></td>
                            </tr>
                        </tbody>
                    </table>
                </slot>
                
                <slot name="result-history">
                    <ol id="result-history"></ol>
                </slot>
            </div>
        `

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        // endregion
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#hitpoint-form').addEventListener('submit', this._onSubmit.bind(this))
    }

    _onSubmit(event) {
        event.preventDefault()

        const diceCountString = this.shadowRoot.querySelector('#dice-count').value
        const dieTypeString = this.shadowRoot.querySelector('#dice-type').value

        const modifierString = this.shadowRoot.querySelector('#modifier').value
        const modifierDisplay = !isNaN(modifierString.substring(0, 1)) ? `+${modifierString}` : modifierString

        this.shadowRoot.querySelector('#modifier').value = modifierDisplay

        if (!diceCountString || !dieTypeString) {
            return
        }

        const hitDiceExpressionForDisplay = `${diceCountString}d${diceCountString}${modifierDisplay}`

        this.updateResults(hitDiceExpressionForDisplay, this.calculateResults(diceCountString, dieTypeString, modifierString))
    }

    resultsHistory = {}

    updateResults(hitDiceExpression, results) {
        const dateAdded = Date.now()

        this.resultsHistory[dateAdded] = [hitDiceExpression, results]

        const table = this.shadowRoot.querySelector('table#result')

        table.querySelector('#min-hp').textContent = results.minimum
        table.querySelector('#weak-hp').textContent = results.weak
        table.querySelector('#avg-hp').textContent = results.average
        table.querySelector('#strong-hp').textContent = results.strong
        table.querySelector('#max-hp').textContent = results.maximum

        const resultsHistoryEntry = `
            <li>
                <strong>
                    ${hitDiceExpression}
                </strong>
                
                ${results.minimum} / ${results.weak} / <strong>${results.average}</strong> / ${results.strong} / ${results.maximum}
            </li>
        `

        this.shadowRoot.querySelector('#result-history').insertAdjacentHTML('beforeend', resultsHistoryEntry)
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

    calculateMinimum(diceCountNumber, modifierNumber) {
        if (isNaN(diceCountNumber) || diceCountNumber <= 0) {
            throw new Error('Dice count number must be a positive integer')
        }

        if (isNaN(modifierNumber)) {
            throw new Error('Modifier number must be an integer')
        }

        const minimum = diceCountNumber + modifierNumber

        return minimum >= 1 ? minimum : 1
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

        const minimum = this.calculateMinimum(diceCountNumber, modifierNumber)
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
