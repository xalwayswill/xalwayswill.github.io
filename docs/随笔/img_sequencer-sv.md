```
`ifndef IMG_SEQUENCER__SV
`define IMG_SEQUENCER__SV

class img_sequencer extends uvm_sequencer #(img_transaction);

    function new(string name, uvm_component parent);
        super.new(name, parent);
    endfunction : new

    `uvm_component_utils(img_sequencer)
endclass : img_sequencer

`endif
```
