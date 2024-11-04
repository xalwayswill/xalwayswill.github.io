### Good RTL Coding Practice
The unwanted affects of X semantics can be reduced by following some RTL coding guidelines, including:
1. For if statements:
a) Never use if statements in combinatorial logic (use case or ternary ? instead), because if is X-optimism(interpretation of X will take just one if/case branch when many should be considered)
b) Only use if statements for sequential elements (e.g. flip-flop with asynchronous reset)
c) **Add X-checking assertions to a clock-gating enables in sequential logic**, e.g. if (enable)
2. For casex and casez statements:
a) Never use casex (it’s far too dangerous)
b) Avoid casez if possible (Z-wildcard doesn’t propagate X’s and it’s hard to translate to VHDL)
3. For case statements:
a) Always add a default line (to avoid X-Latching)
b) Only use the default to assign X’s (to avoid X-Optimism)
c) Never use explicit X’s in case-items
d) Cover all reachable 2-state values with case-items
e) Avoid using case for one-hot multiplexers on a critical path (use sum-of-products instead, Boolean Algebra)
4. Reduce the number of reachable X’s:
a) Discourage the widespread use of X-assignments as synthesis don’t-cares
b) Consider pre-minimizing essential don’t-care X’s prior to RTL verification (see section 7.2)
c) Avoid flip-flops that are not reset (only exception should be for large datapath registers)
5. Avoid synthesis/simulation specific workarounds that change semantics:
a) Never use full_case or parallel_case synthesis pragmas
b) Avoid translate_off/on pragmas that change RTL simulations (e.g. for casez X-propagation)
When you cannot follow these rules for any reason, e.g. complexity or legacy, use X-checking assertions and formal
property checking to verify the RTL.
