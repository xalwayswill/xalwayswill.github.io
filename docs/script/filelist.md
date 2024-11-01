```
#!/usr/bin/env python3
#-*- coding: utf-8 -*-
import os
import re
import argparse


"""
Expand the filelist for EDA tool
"""

#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import argparse


def expand_filelist(fp_input, fp_output, dict_fl, hier, mode):
    """
    Expand the filelist for EDA tool
    """
    for line in open(fp_input):
        prog_com = re.compile(r"\/\/.*")
        prog_v = re.compile(r"\s*(.*\.vp|.*\.vh|.*\.v\.e|.*\.v|.*\.svp|.*\.sv\.e|.*\.svh|.*\.sv)\s*"
        prog_f = re.compile(r"\s*-f\s*(.*\.f)\s*")
        prog_y = re.compile(r"\s*-y\s*.*")
        prog_i = re.compile(r"\s*\+incdir.*")
        prog_d = re.compile(r"\s*\+define.*")
        if mode == "syn":
            hier = 0
        if prog_com.search(line):
            if mode != "syn":
                fp_output.write(2*hier*' '+line)
        elif prog_v.search(line):
            result = os.path.expandvars(prog_v.search(line).group(1))
            # prog_n = re.compile(r"\/*(\w*)(\.v|\.svh|\.sv)")
            # file_name = prog_n.search(result).group(1)
            # if the same filename with different file path, donot remove this file, leave it to ead tool to detect
            if result in dict_fl['verilog']:  # FIXME
                # warning_msg = "Warning: {0} is conflicted with {1}".format(
                #    file_name, result)
                # print(f"\033[{31}m{warning_msg}\n\033[0m")
                if mode != 'syn':
                    fp_output.write(r'//'+2*hier*' '+result+'\n')
            else:
                dict_fl['verilog'].append(result)
                fp_output.write(2*hier*' '+result+'\n')
        elif prog_f.search(line):
            result = os.path.expandvars(prog_f.search(line).group(1))
            if result in dict_fl['filelist']:
                if mode != 'syn':
                    fp_output.write(
                        2*hier*' '+'// excape the duplicate filelist {0} \n'.format(result))
            else:
                if mode != 'syn':
                    fp_output.write(2*hier*' '+r"// expand " + result + '\n')
                dict_fl['filelist'].append(result)
                expand_filelist(result, fp_output, dict_fl, hier+1, mode)
        elif prog_y.search(line):
            result = os.path.expandvars(prog_y.search(line).group(0))
            if result not in dict_fl['y']:
                dict_fl['y'].append(result)
                fp_output.write(2*hier*' ' + result + '\n')
        elif prog_i.search(line):
            result = os.path.expandvars(prog_i.search(line).group(0))
            if result not in dict_fl['incdir']:
                dict_fl['incdir'].append(result)
                fp_output.write(2*hier*' ' + result + '\n')
        elif prog_d.search(line):
            result = prog_y.search(line).group(0)
            if result not in dict_fl['define']:
                dict_fl['define'].append(result)
                fp_output.write(2*hier*' ' + result + '\n')


def expd_fl(fp_input, fp_output, mode):
    dict_fl = {
        'verilog': [],
        'filelist': [],
        'y': [],
        'incdir': [],
        'define': [],
    }
    hier = 0
    with open(fp_output, 'w') as fp_output:
        expand_filelist(fp_input, fp_output, dict_fl, hier, mode)

if __name__ == "__main__":
    version = 'r0p1'
    author = 'yinghao.xu'
    parser = argparse.ArgumentParser(
        prog='filelist',
        description='Python script for expanding the filelist. Version: {0}, author: {1}'.format(
            version, author)
    )
    parser.add_argument(
        '-i', '--input', type=str, default='filelist.f', help='Input filelist')
    parser.add_argument('-o', '--output', type=str, default='all.f',
                        help='Output path')
    parser.add_argument('-m', '--mode', default='sim', choices=['sim', 'syn'],
                        help='sim: with comment, syn: without commnet')
    args = parser.parse_args()

    input_file = os.path.abspath(os.path.expandvars(args.input))
    output_file = os.path.abspath(os.path.expandvars(args.output))
    print(input_file)
    print(output_file)
    expd_fl(input_file, output_file, args.mode)
```
