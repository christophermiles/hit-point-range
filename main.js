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
                    text-align: left;
                }
            </style>
            
            <div>
                <form id="hitpoint-form">
                    <slot name="form-content">
                        <label for="dice-number">Number of dice: </label>
                        <input type="number" id="dice-number" name="dice-number" placeholder="eg. 4">
                        
                        <label for="dice-type">Dice type: </label>
                        <select name="dice-type">
                            <option value="4">d4</option>
                            <option value="6">d6</option>
                            <option value="8">d8</option>
                            <option value="10">d10</option>
                            <option value="12">d12</option>
                            <option value="20">d20</option>
                        </select>
                        
                        <label for="bonus">Bonus: </label>
                        <input type="number" id="bonus" name="bonus" placeholder="eg. +4">
                        
                        <button type="submit">Calculate</button>
                    </slot>
                </form>

                <div id="result">
                    <slot name="result-table">
                        <!-- Default table structure -->
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Minimum</td>
                                    <td id="min-hp">&mdash;</td>
                                </tr>
                                <tr>
                                    <td>Weak</td>
                                    <td id="weak-hp">&mdash;</td>
                                </tr>
                                <tr>
                                    <td>Average</td>
                                    <td id="avg-hp">&mdash;</td>
                                </tr>
                                <tr>
                                    <td>Strong</td>
                                    <td id="strong-hp">&mdash;</td>
                                </tr>
                                <tr>
                                    <td>Maximum</td>
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
