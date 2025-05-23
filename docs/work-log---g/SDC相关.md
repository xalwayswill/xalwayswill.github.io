# Timing Constrain and Optimization
### Reference
\[1\] [Synopsys® Timing Constraints and Optimization User Guide](https://iccircle.com/static/upload/img20240131000241.pdf)

### How to perform timing check between asynchronous clock domains
If two clock domains are asynchronous and you have applied set_false_path between these two clocks, no timing checks can be performed. Also, if you have defined a clock group with asynchronous clocks using the set_clock_groups command with the -asynchronous option, by default the tool cannot perform a timing check. But if you use the -allow_paths option with the set_clock_groups command, timing check can be performed.
To control the data path delay between the registers from asynchronous clock domains:
Specify the asynchronous clock domains such that the timing check is possible. So, the asynchronous clock domains should be specified with the set_clock_groups constraint, not with the set_false_path constraint.
Select appropriate SDC constraints to restrict the combinational delay. So, the set_clock_groups constraint should be specified with the -asynchronous and -allow_paths options, as depicted in the following example:
set_clock_groups -asynchronous -group [get_clocks clk1] -group [get_clocks clk2] -allow_paths
After enabling timing check on the domain crossing paths, use the set_max_delay timing constraint with the -combinational_from_to option to specify the maximum delay allowed on this path segment.
```
# Style 1: delay constraint using clock references
set_max_delay -from [get_clocks clk1] -to [get_clocks clk2] -combinational_from_to

# Style 2: delay constraint using references to registers at clock domain crossing
set_max_delay -from <clock pin of source register FF1/CK> -to <data pin of destination register FF2/D> -combinational_from_to
```
**The -combinational_from_to option guarantees the following:**

Only the combinational path delay check is performed at the clock domain crossing.
Removes clock latencies from the delay computation.
Removes setup/hold constraint of the capture register from the delay computation.
Note: Append the -path_exceptions all option to the report_timing command to diagnose the max delay constraint applied on the path

**To summarize:**

Use set_clock_groups -asynchronous -allow_paths for asynchronous clock specification.
Use set_max_delay -combinational_from_to for path delay specification.


### set_data_check
Setup and hold checks can also be applied between any two arbitrary data Pins, neither of which is a clock.
Distinction with respect to the setup check：
* The data to data setup check is performed on **the same edge** as the **launch** edge
* Unlike a normal setup check of a flip-flop, where the capture clock edge is normally one cycle away from the launch clock edge
