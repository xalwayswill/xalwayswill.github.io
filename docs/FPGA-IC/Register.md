### Reference
[设计里如何实现UVM寄存器模型](https://aijishu.com/a/1060000000328459)

### 寄存器类型
![](Register.assets\23495115-5c2404a2eec9454d.png)

| Type | Description |
| - | - |
|”RO”|	W: no effect, R: no effect| 
|”RW”|	W: as-is, R: no effect |
|”RC” |	W: no effect, R: clears all bits |
|”RS”|	W: no effect, R: sets all bits|
|”WRC”|	W: as-is, R: clears all bits|
|”WRS”|	W: as-is, R: sets all bits|
|”WC”|	W: **clears all bits**, R: no effect|
|”WS”|	W: sets all bits, R: no effect|
|”WSRC”|	W: sets all bits, R: clears all bits|
|”WCRS”|	W: clears all bits, R: sets all bits|
|”W1C”|	W: 1/0 clears/no effect on **matching bit**, R: no effect|
|”W1S”|	W: 1/0 sets/no effect on matching bit, R: no effect|
|”W1T”|	W: 1/0 toggles/no effect on matching bit, R: no effect|
|”W0C”|	W: 1/0 no effect on/clears matching bit, R: no effect|
|”W0S”|	W: 1/0 no effect on/sets matching bit, R: no effect|
|”W0T”|	W: 1/0 no effect on/toggles matching bit, R: no effect|
|”W1SRC”|	W: 1/0 sets/no effect on matching bit, R: clears all bits|
|”W1CRS”|	W: 1/0 clears/no effect on matching bit, R: sets all bits|
|”W0SRC”|	W: 1/0 no effect on/sets matching bit, R: clears all bits|
|”W0CRS”|	W: 1/0 no effect on/clears matching bit, R: sets all bits|
|”WO”|	W: as-is, R: error|
|”WOC”|	W: clears all bits, R: error|
|”WOS”|	W: sets all bits, R: error|
|”W1”|	W: first one after HARD reset is as-is, other W have no effects, R: no effect|
|”WO1”|	W: first one after HARD reset is as-is, other W have no effects, R: error|
|”NOACCESS”|	W: no effect, R: no effect|
### 实现
* W1C:
`d = (wr_en ? (q & ~wdata) : q) | hw_set` where hw_set has priority
`d = wr_en ? ((q | hw_set) & ~wdata) : (q | hw_set)` where wdata has priority
