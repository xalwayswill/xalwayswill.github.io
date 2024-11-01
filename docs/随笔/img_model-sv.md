```
`ifndef IMG_MODEL__SV
`define IMG_MODEL__SV

class img_model extends uvm_component;  // uvm_component

    uvm_blocking_get_port #(img_transaction) port;
    uvm_analysis_port #(img_transaction) ap;

    function new(string name, uvm_component parent);
        super.new(name, parent);
    endfunction : new

    extern function void build_phase(uvm_phase phase);
    extern virtual task main_phase(uvm_phase phase);

    `uvm_component_utils(img_model)

endclass : img_model

function void img_model::build_phase(uvm_phase phase);
    super.build_phase(phase);
    port = new("port", this);
    ap = new("ap", this);
endfunction : build_phase

task img_model::main_phase(uvm_phase phase);
    img_transaction tr;
    img_transaction new_tr;
    super.main_phase(phase);
    while(1) begin
        port.get(tr);
        new_tr = new("new_tr");
        new_tr.copy(tr);
        `uvm_info("img_mdoel", "get one transaction, copy and print it:", UVM_LOW)
        new_tr.print();
        ap.write(new_tr);
    end
endtask : main_phase

`endif
```
