class RollHitDice extends HTMLElement {
    DEFAULT_HIT_DIE_TYPE = '8'

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        // region Template
        const template = document.createElement('template')
        template.innerHTML = `
            <style>
                input {
                    appearance: var(--input-appearance, textfield);
                    font-size: var(--input-font-size, revert);
                    font-family: var(--input-font-family, revert), system-ui;
                    padding: var(--input-padding-block, revert) var(--input-padding-inline, revert);
                    border-block-start: var(--input-border-block-start, revert); 
                    border-block-end: var(--input-border-block-end, revert);
                    border-inline-start: var(--input-border-inline-start, revert);
                    border-inline-end: var(--input-border-inline-end, revert); 
                }

                select {
                    appearance: var(--select-appearance, menulist-button);
                    font-size: var(--select-font-size, revert);
                    font-family: var(--select-font-family, revert), system-ui;
                    padding: var(--select-padding-block) var(--select-padding-inline, revert);
                    border: var(--select-border, revert);
                    background-color: var(--select-background-color, revert);
                    border-radius: var(--select-border-radius, revert);
                }
                
                button {
                    appearance: var(--button-appearance, button);
                    font-size: var(--button-font-size, revert);
                    font-family: var(--button-font-family, revert), system-ui;
                    padding: var(--button-padding-block) var(--button-padding-inline, revert);
                    background-color: var(--button-background-color, revert);
                    color: var(--button-color, revert);
                    border: var(--button-border, revert);
                    border-radius: var(--button-border-radius, revert);
                }
                
                input:focus-visible {
                    outline: var(--input-focus-outline, revert);
                    outline-offset: var(--input-focus-outline-offset, revert);
                }

                select:focus-visible {
                    outline: var(--select-focus-outline, revert);
                    outline-offset: var(--select-focus-outline-offset, revert);
                }

                button:focus-visible {
                    outline: var(--button-focus-outline, revert);
                    outline-offset: var(--button-focus-outline-offset, revert);
                }
                
                #container {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    align-items: center;
                    font-family: var(--base-font-family), system-ui;
                }
                
                form {
                    display: inline-flex;
                    gap: 0;
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
                    font-size: var(--base-font-size, revert);
                    font-weight: bold;
                }
                
                button {
                    flex-shrink: 0;
                }

                input[name="dice-count"] {
                    width: 2ch;
                    text-align: right;
                }
                input[name="modifier"] {
                    width: 3ch;
                    text-align: left;
                }
                table#result {
                    width: auto;
                    border-collapse: collapse;
                }
                table#result th, 
                table#result td {
                    padding: 0.25rem 1ch;
                    text-align: center;
                }
                table#result th {
                    border: var(--table-inline-head-border, revert);
                }
                table#result td {
                    border: var(--table-cell-border, revert);
                }
                table#result tbody tr:nth-child(even) th,
                table#result tbody tr:nth-child(even) td {
                    background-color: var(--table-stripe-color, revert);
                }
                table#result thead tr:last-child th {
                    min-width: 7ch; /* Magic number */
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
                                    <input 
                                        type="text"
                                        inputmode="numeric"
                                        id="dice-count"
                                        name="dice-count"
                                        placeholder="1"
                                        required
                                        part="dice-count-input"
                                    >
                                </label>
                
                                <label for="die-type" aria-label="Dice type">
                                    <select
                                        id="die-type"
                                        name="die-type"
                                        required
                                        part="die-type-select"
                                    >
                                        <option value="4">d4</option>
                                        <option value="6">d6</option>
                                        <option value="8">d8</option>
                                        <option value="10">d10</option>
                                        <option value="12">d12</option>
                                        <option value="20">d20</option>
                                    </select>
                                </label>
                
                                <label for="modifier" aria-label="Modifier">
                                    <input 
                                        type="text"
                                        inputmode="numeric"
                                        id="modifier"
                                        name="modifier"
                                        placeholder="+0"
                                        part="modifier-input"
                                    >
                                </label>
                            </div>
                        </fieldset>
                        
                        <button type="submit" tabindex="0" part="submit-button">
                            Generate
                        </button>
                    </slot>
                </form>

                <slot name="result-table">
                    <table id="result">
                        <thead>
                            <tr>
                                <th part="table-inline-head"></th>
                                <th part="table-inline-head" colspan="5">Hit Points</th>
                            </tr>
                            <tr>
                                <th part="table-inline-head">Hit Dice Expression</th>
                                <th part="table-inline-head">Minimum</th>
                                <th part="table-inline-head">Weak</th>
                                <th part="table-inline-head">Average</th>
                                <th part="table-inline-head">Strong</th>
                                <th part="table-inline-head">Maximum</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </slot>
            </div>
        `

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        // endregion
    }


    connectedCallback() {
        this.shadowRoot.querySelector('#hitpoint-form').addEventListener('submit', this._onSubmit.bind(this))
        this.shadowRoot.querySelector('#die-type').value = this.DEFAULT_HIT_DIE_TYPE
    }

    _onSubmit(event) {
        event.preventDefault()

        const diceCountInput = this.shadowRoot.querySelector('#dice-count')
        const dieTypeInput = this.shadowRoot.querySelector('#die-type')
        const modifierInput = this.shadowRoot.querySelector('#modifier')

        const diceCountString = diceCountInput.value
        const dieTypeString = dieTypeInput.value

        const modifierString = modifierInput.value || '0'
        const modifierDisplay = !isNaN(Number(modifierString.substring(0, 1))) ? `+${modifierString}` : modifierString

        this.shadowRoot.querySelector('#modifier').value = modifierDisplay

        if (!diceCountString || !dieTypeString) {
            return
        }

        const hitDiceExpressionForDisplay = `${diceCountString}d${dieTypeString}${modifierDisplay}`

        this.updateResults(hitDiceExpressionForDisplay, this.calculateResults(diceCountString, dieTypeString, modifierString))

        diceCountInput.value = ''
        dieTypeInput.value = this.DEFAULT_HIT_DIE_TYPE
        modifierInput.value = ''
    }

    updateResults(hitDiceExpression, results) {
        const resultsHistoryEntry = `
            <tr>
                <th class="hit-dice-expression" part="table-inline-head">${hitDiceExpression}</th>
                <td class="hp-value minimum-hp" part="table-cell">${results.minimum}</td>
                <td class="hp-value weak-hp" part="table-cell">${results.weak}</td>
                <td class="hp-value average-hp" part="table-cell">${results.average}</td>
                <td class="hp-value strong-hp" part="table-cell">${results.strong}</td>
                <td class="hp-value maximum-hp" part="table-cell">${results.maximum}</td>
            </tr>
        `

        const table = this.shadowRoot.querySelector('table#result')

        table.querySelector('tbody').insertAdjacentHTML('beforeend', resultsHistoryEntry)
    }


    calculateResults(diceCountString, dieTypeString, modifierString = '0') {
        const diceCountNumber = parseInt(diceCountString, 10)
        const dieTypeNumber = parseInt(dieTypeString, 10)
        const modifierNumber = parseInt(modifierString, 10) || 0

        if (isNaN(diceCountNumber) || isNaN(dieTypeNumber) || diceCountNumber <= 0 || dieTypeNumber <= 0) {
            throw new Error('Die type and number of dice must be positive integers.')
        }

        if (isNaN(diceCountNumber) || diceCountNumber <= 0) {
            throw new Error('Dice count number must be a positive integer')
        }

        if (isNaN(modifierNumber)) {
            throw new Error('Modifier number must be an integer')
        }

        function getDieAverage() {
            const array = Array.from({ length: Math.floor(dieTypeNumber) }, (_, i) => i + 1)
            const average = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / array.length
            return Math.round(average * 2) / 2 // Rounds to nearest 0.5
        }

        function calculateMiddle(a, b) {
            return Math.floor((a + b) / 2)
        }

        function calculateMinimum() {
            const minimum = diceCountNumber + modifierNumber
            return minimum >= 1 ? minimum : 1
        }

        const minimum = calculateMinimum()
        const average = Math.floor(diceCountNumber * getDieAverage()) + modifierNumber
        const maximum = (diceCountNumber * dieTypeNumber) + modifierNumber

        return {
            minimum,
            weak: calculateMiddle(minimum, average),
            average,
            strong: calculateMiddle(average, maximum),
            maximum
        }
    }
}

customElements.define('roll-hit-dice', RollHitDice)