class RollHitDice extends HTMLElement {
    DEFAULT_HIT_DIE_TYPE = '8'

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        // region Template
        const template = document.createElement('template')
        template.innerHTML = `
            <style>
                :host {
                    --color-grey: #6B7280;
                    --color-blue: #2563EB;
                    --color-black: #171717;
                    --color-white: white;
                    --base-font-size: 1rem;
                    --base-font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; /* See https://github.com/system-fonts/modern-font-stacks#monospace-code */
                    --base-text-color: var(--color-black);
                    --base-focus-color: var(--color-blue);
                    --input-padding-block: 0.25ch;
                    --input-padding-inline: 0.5ch;
                    --input-border-color: var(--color-black);
                    --input-border-block-start: 1px solid transparent;
                    --input-border-block-end: 1px solid var(--input-border-color, black);
                    --input-border-inline-start: 1px solid transparent;
                    --input-border-inline-end: 1px solid transparent;
                    --input-border-radius: 0;
                    --input-focus-outline: 1px solid var(--base-focus-color);
                    --input-focus-outline-offset: -1px;
                    --select-font-size: var(--base-font-size);
                    --select-padding-block: 0.25ch;
                    --select-padding-inline: 0.5ch;
                    --select-border-color: var(--color-black);
                    --select-background-color: none;
                    --select-border-radius: 0;
                    --select-focus-outline: 1px solid var(--base-focus-color);
                    --select-focus-outline-offset: 0;
                    --button-font-size: var(--input-font-size, 1rem);
                    --button-border: none;
                    --button-background-color: var(--color-black, black);
                    --button-color: var(--color-white, white);
                    --button-padding-block: 0.5ch;
                    --button-padding-inline: 1ch;
                    --button-border-radius: 0;
                    --button-focus-outline: 1px solid var(--base-focus-color);
                    --button-focus-outline-offset: 0;
                    --table-stripe-color: #F5F5F4;
                }
                
                input, select, button {
                    all: unset;
                    font-size: inherit;
                    font-family: inherit;
                }
                
                input {
                    padding-block: var(--input-padding-block);
                    padding-inline: var(--input-padding-inline);
                    border-block-start: var(--input-border-block-start);
                    border-block-end: var(--input-border-block-end);
                    border-inline-start: var(--input-border-inline-start);
                    border-inline-end: var(--input-border-inline-end);
                }

                select {
                    cursor: pointer;
                    padding-block: var(--select-padding-block);
                    padding-inline: var(--select-padding-inline);
                    border: var(--select-border);
                    background-color: var(--select-background-color);
                    border-radius: var(--select-border-radius);
                }
                
                button {
                    padding-block: var(--button-padding-block);
                    padding-inline: var(--button-padding-inline);
                    background-color: var(--button-background-color);
                    color: var(--button-color);
                    border: var(--button-border);
                    border-radius: var(--button-border-radius);
                }
                
                input:focus-visible {
                    outline: var(--input-focus-outline);
                    outline-offset: var(--input-focus-outline-offset);
                }

                select:focus-visible {
                    outline: var(--select-focus-outline);
                    outline-offset: var(--select-focus-outline-offset);
                }

                button:focus-visible {
                    outline: var(--button-focus-outline);
                    outline-offset: var(--button-focus-outline-offset);
                }
                
                #container {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    align-items: center;
                    font-family: var(--base-font-family);
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
                    font-size: inherit;
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
                    border: 1px solid var(--color-black);
                    padding: 0.25rem 1ch;
                    text-align: center;
                }
                table#result tbody tr:nth-child(even) th,
                table#result tbody tr:nth-child(even) td {
                    background-color: var(--table-stripe-color);
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
                                <th part="table-head-inline"></th>
                                <th part="table-head-inline" colspan="5">Hit Points</th>
                            </tr>
                            <tr>
                                <th part="table-head-inline">Hit Dice Expression</th>
                                <th part="table-head-inline">Minimum</th>
                                <th part="table-head-inline">Weak</th>
                                <th part="table-head-inline">Average</th>
                                <th part="table-head-inline">Strong</th>
                                <th part="table-head-inline">Maximum</th>
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
                <th class="hit-dice-expression" part="table-head-inline">${hitDiceExpression}</th>
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