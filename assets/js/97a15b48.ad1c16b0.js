"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7356],{36735:(r,e,n)=>{n.r(e),n.d(e,{assets:()=>l,contentTitle:()=>p,default:()=>f,frontMatter:()=>s,metadata:()=>o,toc:()=>a});var t=n(74848),i=n(28453);const s={},p=void 0,o={id:"script/filelist",title:"filelist",description:"",source:"@site/docs/script/filelist.md",sourceDirName:"script",slug:"/script/filelist",permalink:"/docs/script/filelist",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/script/filelist.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"alias\u95ee\u9898",permalink:"/docs/script/alias\u95ee\u9898"},next:{title:"makefile",permalink:"/docs/script/makefile"}},l={},a=[];function u(r){const e={code:"code",pre:"pre",...(0,i.R)(),...r.components};return(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:"#!/usr/bin/env python3\r\n#-*- coding: utf-8 -*-\r\nimport os\r\nimport re\r\nimport argparse\r\n\r\n\r\n\"\"\"\r\nExpand the filelist for EDA tool\r\n\"\"\"\r\n\r\n#!/usr/bin/env python3\r\n# -*- coding: utf-8 -*-\r\n\r\nimport os\r\nimport re\r\nimport argparse\r\n\r\n\r\ndef expand_filelist(fp_input, fp_output, dict_fl, hier, mode):\r\n    \"\"\"\r\n    Expand the filelist for EDA tool\r\n    \"\"\"\r\n    for line in open(fp_input):\r\n        prog_com = re.compile(r\"\\/\\/.*\")\r\n        prog_v = re.compile(r\"\\s*(.*\\.vp|.*\\.vh|.*\\.v\\.e|.*\\.v|.*\\.svp|.*\\.sv\\.e|.*\\.svh|.*\\.sv)\\s*\"\r\n        prog_f = re.compile(r\"\\s*-f\\s*(.*\\.f)\\s*\")\r\n        prog_y = re.compile(r\"\\s*-y\\s*.*\")\r\n        prog_i = re.compile(r\"\\s*\\+incdir.*\")\r\n        prog_d = re.compile(r\"\\s*\\+define.*\")\r\n        if mode == \"syn\":\r\n            hier = 0\r\n        if prog_com.search(line):\r\n            if mode != \"syn\":\r\n                fp_output.write(2*hier*' '+line)\r\n        elif prog_v.search(line):\r\n            result = os.path.expandvars(prog_v.search(line).group(1))\r\n            # prog_n = re.compile(r\"\\/*(\\w*)(\\.v|\\.svh|\\.sv)\")\r\n            # file_name = prog_n.search(result).group(1)\r\n            # if the same filename with different file path, donot remove this file, leave it to ead tool to detect\r\n            if result in dict_fl['verilog']:  # FIXME\r\n                # warning_msg = \"Warning: {0} is conflicted with {1}\".format(\r\n                #    file_name, result)\r\n                # print(f\"\\033[{31}m{warning_msg}\\n\\033[0m\")\r\n                if mode != 'syn':\r\n                    fp_output.write(r'//'+2*hier*' '+result+'\\n')\r\n            else:\r\n                dict_fl['verilog'].append(result)\r\n                fp_output.write(2*hier*' '+result+'\\n')\r\n        elif prog_f.search(line):\r\n            result = os.path.expandvars(prog_f.search(line).group(1))\r\n            if result in dict_fl['filelist']:\r\n                if mode != 'syn':\r\n                    fp_output.write(\r\n                        2*hier*' '+'// excape the duplicate filelist {0} \\n'.format(result))\r\n            else:\r\n                if mode != 'syn':\r\n                    fp_output.write(2*hier*' '+r\"// expand \" + result + '\\n')\r\n                dict_fl['filelist'].append(result)\r\n                expand_filelist(result, fp_output, dict_fl, hier+1, mode)\r\n        elif prog_y.search(line):\r\n            result = os.path.expandvars(prog_y.search(line).group(0))\r\n            if result not in dict_fl['y']:\r\n                dict_fl['y'].append(result)\r\n                fp_output.write(2*hier*' ' + result + '\\n')\r\n        elif prog_i.search(line):\r\n            result = os.path.expandvars(prog_i.search(line).group(0))\r\n            if result not in dict_fl['incdir']:\r\n                dict_fl['incdir'].append(result)\r\n                fp_output.write(2*hier*' ' + result + '\\n')\r\n        elif prog_d.search(line):\r\n            result = prog_y.search(line).group(0)\r\n            if result not in dict_fl['define']:\r\n                dict_fl['define'].append(result)\r\n                fp_output.write(2*hier*' ' + result + '\\n')\r\n\r\n\r\ndef expd_fl(fp_input, fp_output, mode):\r\n    dict_fl = {\r\n        'verilog': [],\r\n        'filelist': [],\r\n        'y': [],\r\n        'incdir': [],\r\n        'define': [],\r\n    }\r\n    hier = 0\r\n    with open(fp_output, 'w') as fp_output:\r\n        expand_filelist(fp_input, fp_output, dict_fl, hier, mode)\r\n\r\nif __name__ == \"__main__\":\r\n    version = 'r0p1'\r\n    author = 'yinghao.xu'\r\n    parser = argparse.ArgumentParser(\r\n        prog='filelist',\r\n        description='Python script for expanding the filelist. Version: {0}, author: {1}'.format(\r\n            version, author)\r\n    )\r\n    parser.add_argument(\r\n        '-i', '--input', type=str, default='filelist.f', help='Input filelist')\r\n    parser.add_argument('-o', '--output', type=str, default='all.f',\r\n                        help='Output path')\r\n    parser.add_argument('-m', '--mode', default='sim', choices=['sim', 'syn'],\r\n                        help='sim: with comment, syn: without commnet')\r\n    args = parser.parse_args()\r\n\r\n    input_file = os.path.abspath(os.path.expandvars(args.input))\r\n    output_file = os.path.abspath(os.path.expandvars(args.output))\r\n    print(input_file)\r\n    print(output_file)\r\n    expd_fl(input_file, output_file, args.mode)\n"})})}function f(r={}){const{wrapper:e}={...(0,i.R)(),...r.components};return e?(0,t.jsx)(e,{...r,children:(0,t.jsx)(u,{...r})}):u(r)}},28453:(r,e,n)=>{n.d(e,{R:()=>p,x:()=>o});var t=n(96540);const i={},s=t.createContext(i);function p(r){const e=t.useContext(s);return t.useMemo((function(){return"function"==typeof r?r(e):{...e,...r}}),[e,r])}function o(r){let e;return e=r.disableParentContext?"function"==typeof r.components?r.components(i):r.components||i:p(r.components),t.createElement(s.Provider,{value:e},r.children)}}}]);