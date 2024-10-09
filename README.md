A [web component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) for calculating the following Hit Point values from a [Dungeons &amp; Dragons creature’s Hit Dice expression](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/monsters#HitPoints):

- **minimum** (lowest possible Hit Die roll, plus modifier)
- **weak** (midway between minimum and average)
- **average** (as listed in the stat block)
- **strong** (midway between average and maximum)
- **maximum** (highest possible Hit Die roll, plus modifier)

## Why?

Using a creature’s average Hit Points works just fine for most combats. 

But sometimes you might want to give your <abbr title="Big Bad Evil Guy">BBEG</abbr> (Big Bad Evil Guy) maximum Hit Points&nbsp;😈.

Or maybe you’re using multiple creatures of the same in a battle, and want them to have varying degrees of durability. 

Or you want to tweak a creature’s Hit Points mid-battle ([Mike Shea at Sly Flourish explains why we might want to do this](https://slyflourish.com/tweaking_monster_hit_points.html)), but don’t feel comfortably choosing a *completely* arbitrary number. 

## Features

### Results table

Each time you calculate Roll Hit Dices from a Hit Dice expression, the results get appended to a table below the form:

| Hit Dice Expression | Minimum | Weak   | Average | Strong | Maximum |
|---------------------|---------|--------|---------|--------|---------|
| 2d8+6               | 8       | 11     | 15      | 18     | 22      | 
| 8d10+40             | 48      | 66     | 84      | 102    | 120     | 
| 33d20+330           | 363     | 519    | 676     | 833    | 990     | 

These results are from an Orc, Gelatinous Cube and Tarrasque respectively.

## Browser compatibility

- Chrome: 86+
- Firefox: 85+
- Safari: 14.1+
- Edge (Chromium): 86+

## Demo

### Run locally (requires `npm` and `npx`)

To see the component in action, run:

```shell
npm run serve
```

## Styling the component

By default, the component uses `revert` on most of its CSS declarations to fall back to the styling applied to its parent component. 

You can tweak these values by setting certain custom properties [developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) on `<roll-hit-dice>` in your stylesheet.

```
--base-font-family
--base-font-size
--button-appearance
--button-background-color
--button-border
--button-border-radius
--button-color
--button-focus-outline
--button-focus-outline-offset
--button-font-family
--button-font-size
--button-padding-block
--button-padding-inline
--input-appearance
--input-border-block-end
--input-border-block-start
--input-border-inline-end
--input-border-inline-start
--input-focus-outline
--input-focus-outline-offset
--input-font-family
--input-font-size
--input-padding-block
--input-padding-inline
--select-appearance
--select-background-color
--select-border
--select-border-radius
--select-focus-outline
--select-focus-outline-offset
--select-font-family
--select-font-size
--select-padding-block
--select-padding-inline
--table-cell-border
--table-inline-head-border
--table-stripe-color
```

To set input borders, for example, you could do the following:

```html
<head>
    <!-- ... -->
    <style>
        roll-hit-dice {
            --input-border-color: black;
            --input-border-block-start: 
                3px solid var(--input-border-color);
            --input-border-block-end: 
                3px solid var(--input-border-color);
            --input-border-inline-start: 
                3px solid var(--input-border-color);
            --input-border-inline-end: 
                3px solid var(--input-border-color);
        }
    </style>
</head>

<body>
    <roll-hit-dice></roll-hit-dice>
    
    <script type="module" src="main.js"></script>
</body>
```

For styling that isn’t covered by the CSS properties, you can pierce the component’s Shadow DOM and target the following elements:

- The dice count `<input>`
- The die type `<select>`
- The modifier `<input>`
- The submit `<button>`
- `<td>` elements
- `<th>` elements

```html
<style>
    roll-hit-dice::part(dice-count-input) {
        /* Your styling here */
    }
    roll-hit-dice::part(die-type-select) {
        /* Your styling here */
    }
    roll-hit-dice::part(modifier-input) {
        /* Your styling here */
    }
    roll-hit-dice::part(submit-button) {
        /* Your styling here */
    }
    roll-hit-dice::part(table-cell) {
        /* Your styling here */
    }
    roll-hit-dice::part(table-heading-inline) {
        /* Your styling here */
    }
</style>
```

### Examples

For theming and styling examples, run `npm run serve` and navigate to the `/examples` directory.