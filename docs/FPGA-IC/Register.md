### Reference
[设计里如何实现UVM寄存器模型](https://aijishu.com/a/1060000000328459)

RO：Read Only
RW：Read Write
WC：写1复位整个寄存器，W1C写1只清空当前filed
W1C: Write 1 to Clear itself and the value 1 will not be written to the field actually, read this field always as 0
W1T: Write 1 to Toggle; If the bit in the written value is a 1, the corresponding bit in the field is inverted. Otherwise, the field is not affected.
W1CA: Write 1 to clear all fields except reserved; If this bit is written as “1”, the all field except reserved will be set to its reset value. Besides, read this field always as 0.
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
