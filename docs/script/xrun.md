```
#!/usr/bin/env python3

import os
import sys
import subprocess
import argparse
import shutil
from string import Template
from filelist import expd_fl


def find_dir_path(root_path, target_dir):
    """
    find the path of each design folder
    """
    dir_path = ""
    hit = False
    list_dirs = os.walk(root_path)
    for root, dirs, files in list_dirs:
        for dir in dirs:
            if dir.upper() == target_dir.upper():
                dir_path = os.path.join(root, dir)
                hit = True
                break
        if hit == True:
            break

    if hit == False:
        print("GRUN-Error: Cann't find the design folder, please check the design name!!!")
        sys.exit()

    return dir_path


def set_flow_dir_map():
    """
    Set the dir mapping of each flow
    """

    flow_dir_map = {
        "lint": "spyglass",
        "cdc": "spyglass",
        "sg": "spyglass",
        "dft": "spyglass",
        "dc": "dc",
        "fm": "formal",
        "pt": "primetime",
        "ptpx": "primetime",
        "vcs": "vcs",
        "xrun": "xrun"
    }
    return flow_dir_map


def check_cfg(flow, design, flow_dir_map):
    """
    Check the exists of config files for each flow
    """
    pass  # TODO: Wait for later update


def copy_folder(src, dst):
    """
    Copy all files and folder under the src to dst folder
    """
    print("GRUN-Info: Copy {0} to {1}".format(src, dst))
    if os.path.exists(src):
        for file in os.listdir(src):
            src_file_path = os.path.join(src, file)
            dst_file_path = os.path.join(dst, file)
            if os.path.isdir(src_file_path):
                if os.path.exists(dst_file_path):
                    shutil.rmtree(dst_file_path)
                shutil.copytree(src_file_path, dst_file_path)
                print("Copytree "+src_file_path+dst_file_path)
            else:
                shutil.copy(src_file_path, dst_file_path)
    else:
        print("GRUN-Error: Path {0} not exist.".format(src))

    print("GRUN-Info: Copy done.")


def set_flow_env(out_dir_path, design, top, design_path, flow, tag, flow_dir_map, flow_root_path):
    """
    Create the folder and setup the environment of each flow
    the work folder is naming according to the top name not design
    """

    check_cfg(flow, design, flow_dir_map)
    print(60*'=')
    print('GRUN-Info: Begin to copy the scripts of {0}'.format(flow))

    out_dir_path = os.path.join(out_dir_path, flow, top, tag)
    print("GRUN-Info: Delete the folder {0}".format(out_dir_path))
    if os.path.exists(out_dir_path):
        shutil.rmtree(out_dir_path)
    os.makedirs(out_dir_path)

    # copy the filelist to outdir
    fl_dir_path = os.path.join(design_path, 'filelist')
    shutil.copytree(fl_dir_path, os.path.join(out_dir_path, 'filelist'))

    # copy the common flow scripts to outdir
    flow_dir_path = os.path.join(flow_root_path, flow_dir_map[flow])
    copy_folder(flow_dir_path, out_dir_path)

    # copy the design setup and local config to outdir
    design_flow_path = os.path.join(design_path, 'qc', flow_dir_map[flow])
    copy_folder(design_flow_path, out_dir_path)

    # for dc
    if flow == 'dc':
        if os.path.exists(os.path.join(out_dir_path, 'input', 'sdc')):
            shutil.rmtree(os.path.join(out_dir_path, 'input', 'sdc'))
        shutil.copytree(os.path.join(design_path, 'qc', 'sdc'),
                        os.path.join(out_dir_path, 'input', 'sdc'))
        shutil.copy(os.path.join(design_path, 'filelist', design.lower()+r'_syn.f'),
                    os.path.join(out_dir_path, 'input', design.lower()+r'_syn.f'))
        # expand the filelist
        expd_fl(os.path.join(out_dir_path, 'input', design.lower()+r'_syn.f'),
                os.path.join(out_dir_path, 'input', 'filelist'), 'syn')
        shutil.move(os.path.join(out_dir_path, 'input', 'sdc', design+r'.sdc'),
                    os.path.join(out_dir_path, 'input', 'sdc', design+r'.func.sdc'))

    # Auto set the design top
    new_line = ''
    new_file = ''
    with open(os.path.join(out_dir_path, r'run.sh'), 'r') as f:
        for line in f.readlines():
            print(line)
            new_line = line.replace('{TOP}', top)
            new_line = new_line.replace('{DESIGN}', design)
            new_file += new_line
    with open(os.path.join(out_dir_path, r'run.sh'), 'w') as f:
        f.write(new_file)

    print('GRUN-Info: The scripts of {0} is copied done.'.format(flow))
    print('GRUN-Info: The flow work folder is {0}'.format(out_dir_path))
    print(60*'=')


def run_phase(design, top, tag, out_dir_path, design_path, flow_root_path, flow_dir_map, flow):
    """
    The main run phase of each flow
    """
    out_dir_path = os.path.join(out_dir_path, flow, top, tag)
    os.chdir(out_dir_path)
    cmd = {
        "lint": "./run.sh lint",
        "cdc": "./run.sh cdc",
        "sg": "./run.sh sg",
        "dft": "./run.sh",  # FIXME:
        "dc": "./run.sh",
        "fm": "formal",  # FIXME:
        "pt": "primetime",  # FIXME:
        "ptpx": "./run.sh",  # FIXME:
        "vcs": "./run.sh",
        "xrun": "./run.sh"
    }
    subprocess.run(cmd[flow], shell=True)
    print(60*"=")
    print("The flow running result is in {0}".format(out_dir_path))
    print(60*"=")


def init_design(design, flow_root_path):
    """
    This function used to create the initial design folder.
    """
    cwd_path = os.getcwd()
    init_path = os.path.join(flow_root_path, 'init', 'demo')
    design_path = os.path.join(cwd_path, design)
    shutil.copytree(init_path, design_path)

    # rename the init folder
    d = {'{DEMO_FILELIST}': os.path.join(design_path, 'filelist', design+r'_syn.f'),
         '{DEMO_SGDC_FILE}': os.path.join(design_path, 'qc', 'spyglass', 'sgdc', design+r'.sgdc'),
         '{DEMO_LINT_WAIVE_FILE}': os.path.join(design_path, 'qc', 'spyglass', 'waive', design+'_lint.awl'),
         '{DEMO_CDC_WAIVE_FILE}': os.path.join(design_path, 'qc', 'spyglass', 'waive', design+'_cdc.awl')}

    for root, dirs, files in os.walk(os.path.join(cwd_path, design)):
        for file in files:
            new_line = ''
            new_file = ''
            with open(os.path.join(root, file), 'r') as f:
                for line in f.readlines():
                    new_line = line
                    for key, value in d.items():
                        new_line = new_line.replace(key, value)
                    new_file += new_line
            with open(os.path.join(root, file), 'w') as f:
                f.write(new_file)
            if 'demo' in file:  # TODO: not robust, if the word in filenema inculde demo but not full match
                new_name = file.replace('demo', design)
                os.rename(os.path.join(root, file),
                          os.path.join(root, new_name))
    gprint("GRUN-Info: The design path is {0}.".format(os.path.join(cwd_path, design)))
    gprint("GRUN-Info: The init of {0} is done.".format(design))
    gprint(60*"=")


if __name__ == "__main__":
    version = 'r0p1'
    Author = 'Yinghao.Xu'
    parser = argparse.ArgumentParser(
        prog="grun",
        description='python script for running the eda flow, such as Spyglass, DesignCompiler and so on \n version: {0}, Author:{1}'.format(
            version, Author)
    )
    parser.add_argument('flows', type=str,
                        nargs='+',
                        choices=['lint', 'cdc', 'sg', 'dft', 'dc', 'fm', 'pt',
                                 'ptpx', 'vcs', 'xrun', 'init'],
                        help="""
                        This script support the following flows:
                            lint: use Spyglass to run lint check.
                            cdc:  use Spyglass to run cdc check.
                            sg:   run Spyglass with GUI.
                            dft:  use Spyglass to run dft check.
                            dc:   use DesignCompiler to run synthesis.
                            fm:   use Formality to run formal compare.
                            pt:   run primetime for timing analysis.
                            ptpx: use PrimeTime to run power analysis.
                            vcs:  use vcs to compile the design.
                            xrun: use xcelium to compile the design.
                            init: create the initial design floder in current path.
                        """)  # TODO: support run multi flow once time???
    parser.add_argument('top', type=str,
                        help="""
                        The top name of the design, if you want to run the flow for submodules under the design, \
                        use dot as separator to connect the top and submodule, such as design.top')
                        """)
    parser.add_argument('-tag', type=str, default="normal",
                        help="The tag of this run, if you don't want to overwrite the last run folder, set this to different string")
    parser.add_argument('-nr', '--norun',
                        help="Assert this parameter to just set up the flow environment, but not run the flow.",
                        action='store_true')
    parser.add_argument('-outdir', type=str,
                        default=os.path.join(os.getenv("PROJ_HOME", default=""), "work"))
    args = parser.parse_args()

    top_split = args.top.split(".")

    if len(top_split) == 1:
        top = top_split[0]
        design = top.lower()
    elif len(top_split) == 2:
        design = top_split[0].lower()
        top = top_split[1]
    else:
        print(
            "GRUN-Error: Invalid input parameter of top, must be top_name or top_name.submodule!!!")
        sys.exit()
    de_path = os.getenv("DEPATH", default="")
    if de_path == "":
        print("GRUN-Error: Can not find the environment of DEPATH, please source the prj.env!!!")
        sys.exit()

    flow_dir_map = set_flow_dir_map()
    flow_root_path = os.path.join(de_path, "flows")
    print("GRUN-Info: The DEPATH is {0}".format(de_path))
    print("GRUN-Info: The flow path is {0}".format(flow_root_path))

    for flow in args.flows:
        if flow == 'init':
            init_design(design, flow_root_path)
            sys.exit()

    design_path = find_dir_path(os.path.join(de_path, "src"), design)
    print("GRUN-Info: The design path is {0}".format(design_path))

    for flow in args.flows:
        if flow not in flow_dir_map:
            print("GRUN-Error: Invalid flow to run, please check the input parameter!!!")
            sys.exit()

        out_dir_path = os.path.join(os.path.expandvars(args.outdir))
        set_flow_env(out_dir_path, design, top, design_path,
                     flow, args.tag, flow_dir_map, flow_root_path)
        if args.norun:
            pass
        else:
            run_phase(design, top, args.tag, out_dir_path, design_path,
                      flow_root_path, flow_dir_map, flow)

```
