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

vcs: clean comp sim
	
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

verdi:
	verdi -top $(TOP) -ssf $(FSDB_FILE) -f $(FLIST)&

.PHONY vcs verdi xrun
```
