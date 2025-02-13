```
ARMISP_DEFS ?= 
ARMISP_ARGS ?= 

ARMISP_DEFS += SRAM_NUM=$(SRAM_NUM)
ARMISP_DEFS += MAX_HSIZE=$(MAX_HSIZE)
ARMISP_DEFS += PIPE_MODE=$(PIPE_MODE)

ARMISP_ARGS += seed=$(SEED)
ARMISP_ARGS += debug=$(DEBUG)
ARMISP_ARGS += dump=$(DUMP)

all: vcs

clean:
    rm -rf *.vf sim* INCA_libs *.log novas* *.fsdb ip_isp* dut_out dump_files *.history xcelium.d csrc *.key *.daidir verdiLog

all: vlog compile

vlog:
    vlogan -full64 -sverilog \
    -debug_access+all -debug_region+cell \
    -kdb -lca +v2k -timescale=1ns/1ps -l vcs_vlog.log -f $(FLIST) \
    $(addprefix +define+, $(ARMISP_DEFS))

compile:
    vcs +vcs+lic+wait -sverilog -l vcs_compile.log -full64 \
    /apps/eda/installs/Synopsys/vcs/S-2021.09-SP2/etc/uvm-1.2/src/dpi/uvm_dpi.cc -CFLAGS -DVCS \
    -Mupdate +vcs+flush+all -debug_access+all -debug_region+cell -kdb -lca \
    -timescale=1ns/1ps -top $(TOP) \
    -assert api -assert api_event +err+20 -ignore initializer_driver_checks \
    $(addprefix +define+, $(ARMISP_DEFS))

vcs:
    vcs -sverilog -l vcs_compile.log -full64 \
    /apps/eda/installs/Synopsys/vcs/S-2021.09-SP2/etc/uvm-1.2/src/dpi/uvm_dpi.cc -CFLAGS -DVCS \
    -Mupdate +vcs+flush+all \
    -debug_access+all -debug_region+cell -kdb \
    -timescale=1ns/1ps  -top $(TOP) \
    -assert api -assert api_event \
    -f $(FLIST) -o simv \
    +delay_model_zero \
    $(addprefix +define+, $(ARMISP_DEFS))


comp:
    vcs \
    -sverilog \
    +systemverilogext+.sv+.svh \
    +verilog2001ext+.v \
    +libext+.v \
    -timescale=1ns/10ps \
    -debug_all+pp+fsdb \
    -top $(TOP) \
    -f $(FLIST) \
    -full64 \
    -lca \
    +notimingcheck \
    +nospecify \
    -l comp.log \
    -CFLAGS -DVCS \
    +vcs+fsdbon \
    $(addprefix +define+, $(ARMISP_DEFS))


sim:
    simv -l run.log \
    $(addprefix +, $(ARMISP_ARGS))

#verdi:
#    verdi -top $(TOP) -ssf $(FSDB_FILE) -f $(FLIST)&

verdi:
    verdi -ssf $(FSDB_FILE) -dbdir simv.daidir -rcFile $HOME/novas.rc &

.PHONY vlog compile vcs verdi sim
```
