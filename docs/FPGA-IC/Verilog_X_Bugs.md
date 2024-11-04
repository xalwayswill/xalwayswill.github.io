## 7 How To Avoid Dangerous X’s
This section describes how to overcome problems related to X (after they have been identified and analyzed using
techniques described in section 6).

### 7.1 Good RTL Coding Practice
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

### 7.2 Removing Reachable Don't-Care X-assignments

### 7.3 Replacing X-Insertion with Assertions
You should never insert X’s into your code to see if they cause problems. Instead, add assertions to your RTL to act
as exception handlers – to raise an error for an unexpected event. Note that X’s do not stress RTL simulations with
both possible values – instead, only one path will be evaluated!

### 7.4 Enabling X-Propagation

### 7.5 Avoiding Un-Initialized Registers
Where possible, reset your registers (this avoids X-initialization issues and helps to validate and formally verify your
design). The exception is for large datapath registers, where the cost of routing a reset is not acceptable.

### 7.6 Future: System Verilog and Verilog 2xxx
The SystemVerilog language proposed by Accellera has lots of interesting features that could overcome problems
associated with X-semantics, including:
1. Several 2-state datatypes (e.g. bit, byte, int) that have defined semantics (as opposed to modes specific to a
particular simulator).
2. Qualifiers for selection (case/if) statements, called unique and priority, to clearly define their
semantics for both synthesis and simulation (unlike synthesis pragmas).
3. Assertions that are an intrinsic part of the design language itself, rather than an afterthought or a toolspecific assertion language or library.

## 9 Top-Ten Recommendations
This section reiterates the recommendations made throughout this document.
Recommendation 1: Even if all RTL simulations pass, a don’t-care should be considered to be a
don’t-know unless it’s proven to be unreachable.
Recommendation 2: Always start an equivalence checker in the strict 2-State Equality comparison
mode (the default settings of the tool can miss bugs).
Recommendation 3: If a comparison fails with strict 2-State Equality but passes with 2-State
Consistency, the pass is acceptable provided you can prove that all X’s causing
differences are unreachable (i.e. the failures are false negatives).
Recommendation 4: RTL Verilog vs. translated RTL VHDL should be equivalence checked using 2-
State Equality (to ensure that the don’t-care space is identical).
Recommendation 5: Never use casex statements as they are just too dangerous, and avoid casez
whenever possible.
Recommendation 6: Use automatic property checking to prove that an X is unreachable, or interactive
property checking to prove that the X is not stored in a register.
Recommendation 7: Use automatic property checking to investigate code coverage reports.
Recommendation 8: For one-hot logic on a critical path, write the RTL directly in a sum-of-products
form (rather than case) and add a one-hot assertion checker.
Recommendation 9: Avoid using if statements, as they optimistically interpret X’s. Instead use
ternary (i.e. conditional ?) operators or priority-encoded case statements.
Recommendation 10: For case statements, cover all reachable 2-state values with case-items and
always add a default (but only use it to assign X’s, to avoid X-Optimism)
