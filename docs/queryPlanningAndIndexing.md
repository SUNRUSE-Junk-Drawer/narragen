# Query planning and indexing

Although selecting rules and entities at complete random would find matches,
and likely work well with small datasets, with larger datasets and complex
rules, this would not scale.

To get good iteration speed, rules can be statically analyzed to generate query
plans and an optimized database structure ahead of time.

To use a relatively complex rule from the readme as an example:

```
When Eater Type Is Actor              # A
And Eater HasEaten Is Nothing         # B
And Eaten Type Is Food                # C
And Eater Location Is Eaten Location  # D
And Eater Hates Is Not Eaten          # E
```

Writing this manually, one solution would be to use an inverted index to find
all things in the same Location (D).  This would then be split off between
finding things which are Eater (A/B) and Eaten (C), both of which would use
forward index look-ups.  These two sets would then be re-combined, applying rule
E to ensure that the combination is valid.

Another solution would be to first find sets of Eater (A) and Eaten (C) using
inverted index look-ups.  Eater would then be refined using forward index
look-ups (B).  Forward would then be used to find the location

Both solutions are valid, but would have vastly different performance
characteristics depending upon the data to hand.  If there were very few
distinct Locations with large numbers of entities referencing them, the first
solution would not gain much by doing step D first, and would spend quite some
time filtering down the set of entities into Eater and Eaten (and discarded).

On the other hand, with a large number of distinct Locations with very few
entities per Location (but the same overall count), finding Eater and Eaten with
the same Location would require the creation of a temporary inverted index to
keep runtime non-exponential.
