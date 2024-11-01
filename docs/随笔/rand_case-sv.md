```
`ifndef RAND_CASE__SV
`define RAND_CASE__SV

class rand_sequence extends uvm_sequence#(img_transaction);

    img_config img_conf;

    function new (string name = "rand_sequence");
        super.new(name);
    endfunction : new

    virtual task body();
        if(starting_phase != null)
            starting_phase.raise_objection(this);  // uvm 1.1
        // uvm_phase p = get_starting_phase();  // uvm 1.2
        // if(p) p.raise_objection(this);
        req = img_transaction::type_id::create("req");
        repeat(img_conf.img_high) begin
            start_item(req);
            req.img_wide = img_conf.img_wide;
            if(!req.randomize() with {req.img_data.size == img_conf.img_wide;})
                `uvm_error(get_type_name(), "randomization is failed for req");
            finish_item(req);
        end
        if(starting_phase != null)
            starting_phase.drop_objection(this);  // uvm 1.1
        // if(p) p.drop_objection(this);  // uvm 1.2
    endtask : body

    `uvm_object_utils(rand_sequence)
endclass : rand_sequence

class rand_case extends base_test;
    rand_sequence rand_seq;
    img_config img_conf;

    function new(string name = "rand_case", uvm_component parent = null);
        super.new(name, parent);
    endfunction : new

    extern virtual function void build_phase(uvm_phase phase);

    function void report_phase(uvm_phase phase);
        super.report_phase(phase);
    endfunction : report_phase
    extern virtual task main_phase(uvm_phase phase);
    `uvm_component_utils(rand_case)
endclass : rand_case

function void rand_case::build_phase(uvm_phase phase);
    super.build_phase(phase);

    if(!uvm_config_db#(img_config)::get(this, "", "img_conf", img_conf))
        `uvm_fatal("rand_case", "Image config must be set!!!");
    // uvm_config_db#(uvm_object_wrapper)::set(this,
    //                                         "env.i_agt.sqr.main_phase",
    //                                         "default_sequence",
    //                                         rand_case::type_id::get());
endfunction : build_phase

task rand_case::main_phase(uvm_phase phase);
    super.main_phase(phase);
    rand_seq = rand_sequence::type_id::create("rand_seq");
    rand_seq.img_conf = img_conf;
    // phase.raise_objection(this);
    rand_seq.starting_phase = phase;  // uvm 1.1
    // rand_seq.set_starting_phase(phase);  // uvm 1.2
    rand_seq.start(env.img_agt_i.sqr);
    // phase.drop_objection(this);
endtask : main_phase

`endif
```
