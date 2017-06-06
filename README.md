# PGRTSPM
Procedural Generation through Recursive Triple-Store Pattern Matching

An implementation of some of the ideas in [Rogelio E. Cardona-Rivera and Chris Martens' talk on Procedural Narrative Generation](https://youtu.be/k2rgzZ2WXKo).

All state is stored in a triple-store; this means that all information is stored as an entity, an attribute of that entity, and the value of that attribute of that entity.  For example:

- car-color-red
- hero-location-cave

Rules define:

- A set of conditions which existing objects must meet for the rule to execute.
- A list of new objects to create.
- A list of changes to make to the existing/new objects.

Additionally, global objects may be defined which exist from the start.

An example file, which defines:

- A living room.
- A kitchen.
- A dining room.
- A spider.

```
Create Living-Room
Create Kitchen
Create Dining-Room

Create Spider
```

Next, we put the spider in the living room:

```
Set Spider Location To Kitchen
```

Now, let's link the rooms together.
To do this, we'll create objects which connect two rooms.
Here, we create a pair of objects connecting the living room and kitchen together (one for each direction) and another pair connecting the kitchen and dining room.

```
Create Stairs-A
Set Stairs-A From-Room To Kitchen
Set Stairs-A To-Room To Living-Room

Create Stairs-B
Set Stairs-B From-Room To Living-Room
Set Stairs-B To-Room To Kitchen

Create Door-A
Set Door-A From-Room To Kitchen
Set Door-A To-Room To Dining-Room

Create Door-B
Set Door-B From-Room To Dining-Room
Set Door-B To-Room To Kitchen
```

Now, let's create a rule which allows the spider to wander from room to room.

```
Rule Wander
When Wanderer Location Is Link From-Room
Set Wanderer Location To Link To-Room
End
```

In the initial state, this rule can match in two different ways:

- Wanderer = Spider, Link = Stairs-A.
- Wanderer = Spider, Link = Door-A.

A match will be picked at random, changing Spider's Location to Living-Room in the first case, and Dining-Room in the second case.

The rules will then be re-evaluated based on that new state.

Let's create another object:

```
Create Biscuit
Set Biscuit Location To Dining-Room
```

If we run the game now, something a little weird will happen.
Biscuit meets all criteria needed to be a Wanderer in the rule we just created!
This means that both the Spider and Biscuit will roam the three rooms at random.

We need a way of distinguishing what can wander.
For this, create a new object, and give Spider a reference to it:

```
Create Actor
Set Spider Type To Actor
```

Now, update the rule so that only Actors can wander:

```
Rule Wander
When Wanderer Type Is Actor
And Wanderer Location Is Link From-Room
Set Wanderer Location To Link To-Room
End
```

Now, only Spider, and not Biscuit, can move between rooms.

So let's add another rule, so that on finding Biscuit, Spider can eat:

```
Create Food
Create Crumbs
Set Biscuit Type To Food

Rule Eat
When Eater Type Is Actor
And Eaten Type Is Food
And Eater Location Is Eaten Location
Set Eaten Type To Crumbs
End
```

When Spider wanders into Dining-Room, there is an equal probability that it will eat Biscuit or exit via Door-B to Kitchen.

Let's create another thing Spider can eat.

```
Create Cake
Set Cake Type To Food
```

Now, Spider will eventually find and eat both Foods.

However, Spider isn't very hungry.  In fact, just the one meal will do!

Let's make some changes to the Eat rule so that:

- We record against the Eater that they have eaten something.
- The Eater will not eat again if they have previously eaten something.

```
Rule Eat
When Eater Type Is Actor
And Eater HasEaten Is Nothing
And Eaten Type Is Food
And Eater Location Is Eaten Location
Set Eaten Type To Crumbs
And Eater HasEaten To Eaten
End
```

Everything which has not yet been set is Nothing.

Once Spider HasEaten is set, this rule no longer applies; as such, Spider will only eat one thing.

Let's add some food Spider will not eat.  Spider has a sweet tooth and won't eat veggies.

```
Create Broccoli
Set Broccoli Type To Food

Set Spider Hates To Broccoli
```

We can check that two things are NOT equal like so:

```
Rule Eat
When Eater Type Is Actor
And Eater HasEaten Is Nothing
And Eaten Type Is Food
And Eater Location Is Eaten Location
And Eater Hates Is Not Eaten
Set Eaten Type To Crumbs
And Eater HasEaten To Eaten
End
```

Now, Spider will only Eat things which are not Broccoli.
