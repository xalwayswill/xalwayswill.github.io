```
`ifndef IMG_TRANSACTION__SV
`define IMG_TRANSACTION__SV

class img_transaction extends uvm_sequence_item;
    rand bit [`IMG_DATA_WIDTH-1:0] img_data[];
    int img_wide;

    constraint img_data_cons {
        img_data.size == img_wide;
    }

    `uvm_object_utils_begin(img_transaction)
        `uvm_field_int(img_wide, UVM_ALL_ON)
        `uvm_field_array_int(img_data, UVM_ALL_ON)
    `uvm_object_utils_end

    function new (string name = "img_transaction");
        super.new(name);
    endfunction : new

endclass : img_transaction

`endif
```
