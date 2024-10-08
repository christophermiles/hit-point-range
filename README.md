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

Each time you calculate Hit Point ranges from a Hit Dice expression, the results get appended to a table below the form:

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

<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="index.html">
  </template>
</custom-element-demo>
```
-->

### Run locally (requires `npm` and `npx`)

To see the component in action, run:

```shell
npm run serve
```

## Styling the component

The form elements used in this component have somewhat opinionated styling in terms of borders and focus states.

You can tweak these values (and many others) by setting certain custom properties [developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) on `<hit-point-spread>` in your stylesheet.

```
--color-grey
--color-blue
--color-black
--color-white
--base-font-size
--base-font-family
--base-text-color
--base-focus-color
--input-padding-block
--input-padding-inline
--input-border-color
--input-border-block-start
--input-border-block-end
--input-border-inline-start
--input-border-inline-end
--input-border-radius
--input-focus-outline
--input-focus-outline-offset
--select-font-size
--select-padding-block
--select-padding-inline
--select-border-color
--select-background-color
--select-border-radius
--select-focus-outline
--select-focus-outline-offset
--button-font-size
--button-border
--button-background-color
--button-color
--button-padding-block
--button-padding-inline
--button-border-radius
--button-focus-outline
--button-focus-outline-offset
--table-stripe-color
```

For example, the inputs have only a bottom border (of `1px`) by default. To extend the border to the whole input and increase the `border-width` to `2px`, you could do the following:

```html
<head>
    <!-- ... -->
    <style>
        hit-point-spread {
            --input-border-block-start: 
                2px solid var(--input-border-color);
            --input-border-block-end: 
                2px solid var(--input-border-color);
            --input-border-inline-start: 
                2px solid var(--input-border-color);
            --input-border-inline-end: 
                2px solid var(--input-border-color);
        }
    </style>
</head>

<body>
    <hit-point-spread></hit-point-spread>
    
    <script type="module" src="main.js"></script>
</body>
```

Or you (should be able to?) define your own new CSS custom property and use that:

```html
<style>
    hit-point-spread {
        --input-border: 
            2px solid var(--input-border-color);
        --input-border-block-start: var(--input-border);
        --input-border-block-end: var(--input-border);
        --input-border-inline-start: var(--input-border);
        --input-border-inline-end: var(--input-border);
    }
</style>
```

For styling that isn’t covered by the CSS properties,you can pierce the component’s Shadow DOM and target the following elements:

- The dice count `<input>`
- The die type `<select>`
- The modifier `<input>`
- The submit `<button>`
- `<td>` elements
- `<th>` elements

For example, to reset all the form elements, `<th>` elements and `<td>` elements in the component to whatever styling would be applied to these elements by your existing stylesheets:

```html
<style>
    hit-point-spread::part(dice-count-input),
    hit-point-spread::part(die-type-select),
    hit-point-spread::part(modifier-input),
    hit-point-spread::part(submit-button),
    hit-point-spread::part(table-cell),
    hit-point-spread::part(table-heading-inline) {
        all: revert;
    }
</style>
```

### Examples

For more examples, run `npm run serve` and navigate to the `/examples` directory.