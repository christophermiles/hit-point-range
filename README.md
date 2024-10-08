A lightweight Web Component for calculating the following Hit Point values from a <a href="https://www.dndbeyond.com/sources/dnd/basic-rules-2014/monsters#HitPoints">Dungeons &amp; Dragons creature’s Hit Dice expression</a>:

- **minimum** (lowest possible Hit Die roll, plus modifier)
- **weak** (midway between minimum and average)
- **average** (as listed in the stat block)
- **strong** (midway between average and maximum)
- **maximum** (highest possible Hit Die roll, plus modifier)

## Why?

Using a creature’s average Hit Points works just fine for most combats. 

But sometimes you might want to give your <abbr title="Big Bad Evil Guy">BBEG</abbr> maximum Hit Points&nbsp;😈.

Or maybe you’re using multiple creatures of the same in a battle, and want them to have varying degrees of durability. 

Or you want to tweak a creature’s Hit Points mid-battle, but feel bad choosing a *completely* arbitrary number by fiat. (<a href="https://slyflourish.com">Mike Shea at Sly Flourish</a> has a great article on why we might want to do this at <a href="https://slyflourish.com/tweaking_monster_hit_points.html">slyflourish.com/tweaking_monster_hit_points.html</a>)