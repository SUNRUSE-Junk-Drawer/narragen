# `narragen` [![Continuous Integration](https://github.com/jameswilddev/narragen/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/narragen/actions) [![License](https://img.shields.io/github/license/jameswilddev/narragen.svg)](https://github.com/jameswilddev/narragen/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fnarragen.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fnarragen?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

Procedural narrative generation through recursive triple-store pattern matching.

## Concept

An implementation of some of the ideas in [Rogelio E. Cardona-Rivera and Chris Martens' talk on Procedural Narrative Generation](https://youtu.be/k2rgzZ2WXKo).

All state is stored in a triple-store; this means that all information is stored
as an entity, an attribute of that entity, and the value of that attribute of
that entity.  For example:

- car-color-red
- hero-location-cave

Rules look for patterns in the data, and can make changes to it based on those
patterns:

```
            .---------------------.
            |        Rule         |
.------.    |---------.-----------|
| Data | -> | Pattern | Effect(s) |
'------'    '---------'-----------'
    ^._____________________.'
```

The pattern is a graph of things which are related, such as:

```
eater hasEaten -> nothing (constant)
      type -----> actor (constant)
      location -> place
                    ^
eaten location -----'
      type -----> food (constant)
```

Then, a set of assignments to make to the things matched in the pattern:

```
eater hasEaten
  .--------'
  v
eaten type -> crumbs (constant)
```

This allows for a set of simple rules to be produced, which can be applied at
random to procedurally generate data.

## Example script

The definition of a basic environment; three entities describing rooms, which
are linked by entities describing doors and stairs (in pairs denoting opposite
directions):

```
# Create a global which represents "nothing".
global nothing

# Create attributes which can be used to define the origin and destination room of a passage, which default to the above nothing.
attribute fromRoom nothing
attribute toRoom nothing

# Create three rooms.
global livingRoom
global kitchen
global diningRoom

# Link the rooms with passages.
global stairsA
  fromRoom kitchen
  toRoom livingRoom

global stairsB
  fromRoom livingRoom
  toRoom kitchen

global doorA
  fromRoom kitchen
  toRoom diningRoom

global doorB
  fromRoom diningRoom
  toRoom kitchen
```

This could be illustrated as:

```
      livingRoom <--.
                     |
  stairsA toRoom ---'|
 .------- fromRoom   |
|                    |
| stairsB fromRoom -'
|.------- toRoom
|
 '--> kitchen <-----.
                     |
  doorA fromRoom ---'|
 .----- toRoom       |
|                    |
| doorB toRoom -----'
|.----- fromRoom
|
 '--> diningRoom
```

Next, a spider is added to the kitchen:

```
global nothing

attribute fromRoom nothing
attribute toRoom nothing

global livingRoom
global kitchen
global diningRoom

global stairsA
  fromRoom kitchen
  toRoom livingRoom

global stairsB
  fromRoom livingRoom
  toRoom kitchen

global doorA
  fromRoom kitchen
  toRoom diningRoom

global doorB
  fromRoom diningRoom
  toRoom kitchen


attribute location nothing

global spider
  location kitchen
```

The graph now looks like this:

```
      livingRoom <--.
                     |
  stairsA toRoom ---'|
 .------- fromRoom   |
|                    |
| stairsB fromRoom -'
|.------- toRoom       spider location -.
|                                        |
 '--> kitchen <------.------------------'
                     |
  doorA fromRoom ---'|
 .----- toRoom       |
|                    |
| doorB toRoom -----'
|.----- fromRoom
|
 '--> diningRoom
```

Next, a rule is written to allow the spider to wander between rooms:

```
global nothing

attribute fromRoom nothing
attribute toRoom nothing

global livingRoom
global kitchen
global diningRoom

global stairsA
  fromRoom kitchen
  toRoom livingRoom

global stairsB
  fromRoom livingRoom
  toRoom kitchen

global doorA
  fromRoom kitchen
  toRoom diningRoom

global doorB
  fromRoom diningRoom
  toRoom kitchen

attribute location nothing

global spider
  location kitchen


# Define a rule, with its name.
rule wander

  # These are "locals" - parameters to the rule.
  # No two locals will refer to the same entity when a rule matches.
  wanderer passage

# This is a condition which must pass for the rule to execute.
when
  wanderer location is passage fromRoom

# This applies a change to the entities matched.
set
  wanderer location to passage toRoom
```

This rule, in the default state, has two possible applications:

| possibility | wanderer | passage | wanderer location therefore |
|-------------|----------|---------|-----------------------------|
| a           | spider   | doorA   | diningRoom                  |
| b           | spider   | stairsA | livingRoom                  |

Graph of possibility a:

```
      livingRoom <--.
                     |
  stairsA toRoom ---'|
 .------- fromRoom   |
|                    |
| stairsB fromRoom -'
|.------- toRoom       spider location -.
|                                        |
 '--> kitchen <------.                   |
                     |                   |
  doorA fromRoom ---'|                   |
 .----- toRoom       |                   |
|                    |                   |
| doorB toRoom -----'                    |
|.----- fromRoom                         |
|                                        |
 '--> diningRoom <----------------------'
```

Graph of possibility b:

```
      livingRoom <---.------------------.
                     |                   |
  stairsA toRoom ---'|                   |
 .------- fromRoom   |                   |
|                    |                   |
| stairsB fromRoom -'                    |
|.------- toRoom       spider location -'
|
 '--> kitchen <-----.
                     |
  doorA fromRoom ---'|
 .----- toRoom       |
|                    |
| doorB toRoom -----'
|.----- fromRoom
|
 '--> diningRoom
```

Repeatedly applying this pattern will see the spider randomly wander between the
three locations.

Addition of another object:

```
global nothing

attribute fromRoom nothing
attribute toRoom nothing

global livingRoom
global kitchen
global diningRoom

global stairsA
  fromRoom kitchen
  toRoom livingRoom

global stairsB
  fromRoom livingRoom
  toRoom kitchen

global doorA
  fromRoom kitchen
  toRoom diningRoom

global doorB
  fromRoom diningRoom
  toRoom kitchen

attribute location nothing

global spider
  location kitchen

rule wander
  wanderer passage
when
  wanderer location is passage fromRoom
set
  wanderer location to passage toRoom

global biscuit
  location livingRoom
```

With the current rule set, there is nothing in the current "wander" rule which
excludes said entity; it fulfils all necessary criteria for it to run.
Something must be added to distinguish the two, and the "wander" rule amended to check for it:

```
global nothing

attribute fromRoom nothing
attribute toRoom nothing

global livingRoom
global kitchen
global diningRoom

global stairsA
  fromRoom kitchen
  toRoom livingRoom

global stairsB
  fromRoom livingRoom
  toRoom kitchen

global doorA
  fromRoom kitchen
  toRoom diningRoom

global doorB
  fromRoom diningRoom
  toRoom kitchen

attribute location nothing

attribute type nothing

global character

global spider
  location kitchen
  type character

rule wander
  wanderer passage
when
  wanderer location is passage fromRoom
  and wanderer type is character
set
  wanderer location to passage toRoom

global biscuit
  location livingRoom
```

A new rule to allow interaction between characters and food:

```
global nothing

attribute fromRoom nothing
attribute toRoom nothing

global livingRoom
global kitchen
global diningRoom

global stairsA
  fromRoom kitchen
  toRoom livingRoom

global stairsB
  fromRoom livingRoom
  toRoom kitchen

global doorA
  fromRoom kitchen
  toRoom diningRoom

global doorB
  fromRoom diningRoom
  toRoom kitchen

attribute location nothing

attribute type nothing

global character
global food
global crumbs

global spider
  location kitchen
  type character

rule wander
  wanderer passage
when
  wanderer location is passage fromRoom
  and wanderer type is character
set
  wanderer location to passage toRoom

global biscuit
  location livingRoom
  type food

rule eat
  eater eaten
when
  eater type is character
  and eaten type is foot
  and eater location is eaten location
set
  eaten type to crumbs
```

Here, multiple rules must work together to produce an effect; the spider must
"wander" into the livingRoom, then, as both the "wander" and "eat" rules would
match, there is a chance it may eat the biscuit or exit back to the kitchen.

It will only eat the biscuit once, as after, its type will no longer be "food".

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fnarragen.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fnarragen?ref=badge_large)
