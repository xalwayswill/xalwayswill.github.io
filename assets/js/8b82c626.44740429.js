"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5468],{71088:(n,i,e)=>{e.r(i),e.d(i,{assets:()=>o,contentTitle:()=>s,default:()=>m,frontMatter:()=>r,metadata:()=>d,toc:()=>g});var t=e(74848),a=e(28453);const r={},s=void 0,d={id:"\u968f\u7b14/ImageData-sv",title:"ImageData-sv",description:"",source:"@site/docs/\u968f\u7b14/ImageData-sv.md",sourceDirName:"\u968f\u7b14",slug:"/\u968f\u7b14/ImageData-sv",permalink:"/docs/\u968f\u7b14/ImageData-sv",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/\u968f\u7b14/ImageData-sv.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u65f6\u949f\u6811",permalink:"/docs/\u79fb\u77e5\u7f51\u8bfe\u7a0b/\u65f6\u949f\u6811"},next:{title:"base_test-sv",permalink:"/docs/\u968f\u7b14/base_test-sv"}},o={},g=[];function _(n){const i={code:"code",pre:"pre",...(0,a.R)(),...n.components};return(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{children:'//////////////////////////////////////////////////////////////////////////////////\r\n// Company: Hikvision\r\n// Engineer: xuyinghao\r\n// Create Date: 2020.09.26\r\n// Module Name: ImageDate\r\n// Description:\r\n//  This class is used to generate the iamge data for testbench\r\n//\r\n// Revision:\r\n//   Revision 0.01 - File Created\r\n//\r\n//////////////////////////////////////////////////////////////////////////////////\r\nclass ImageData;\r\n\r\n    local int image_wide;\r\n    local int image_high;\r\n    local int bit_width;\r\n    local string test_mode;\r\n    int unsigned image_datas[$];\r\n\r\n    function new(input int image_wide = 1920, input int image_high = 1080, input int bit_width = 16, input string test_mode = "monobar");\r\n        this.image_wide = image_wide;\r\n        this.image_high = image_high;\r\n        this.bit_width = bit_width;\r\n        this.test_mode = test_mode;\r\n    endfunction : new\r\n\r\n    function void get_image();\r\n        case (this.test_mode)\r\n            "colorbar": colorbar();\r\n            "monobar": monobar();\r\n            "oblique_bar": oblique_bar();\r\n            "inc_sequence": inc_sequence();\r\n        endcase\r\n    endfunction : get_image\r\n\r\n    extern local function void colorbar();\r\n\r\n    extern local function void monobar();\r\n\r\n    extern local function void oblique_bar();\r\n\r\n    extern local function void inc_sequence();\r\n\r\nendclass //IamgeData\r\n\r\nfunction void ImageData::monobar();\r\n    // This function is used to generate the monobar\r\n    int unsigned image_data = 0;\r\n\r\n    int block_wide = this.image_wide / 8;\r\n    for (int i = 0; i < this.image_high; i = i + 1) begin\r\n        for (int j = 0; j < this.image_wide; j = j + 1) begin\r\n            image_data = (j/block_wide)*2**(this.bit_width-3);\r\n            this.image_datas.push_back(image_data);\r\n        end\r\n    end\r\nendfunction\r\n\r\nfunction void ImageData::colorbar();\r\n    // This function is used to generate the two line colorbar image data\r\n    int unsigned image_datas1[];\r\n    int unsigned image_datas2[];\r\n    int block_wide;\r\n\r\n    image_datas1 = new[this.image_wide];\r\n    image_datas2 = new[this.image_wide];\r\n    image_datas1 = \'{default:0};  // image data line 2\r\n    image_datas2 = \'{default:0};  // image data line 1\r\n    block_wide = this.image_wide / 8;\r\n\r\n    for (int i = 0; i < image_high; i = i + 1) begin\r\n        for (int j = block_wide; j < image_wide; j = j + 1) begin\r\n            if(j < block_wide * 2) begin  // white\r\n                image_datas1[j] = 2**this.bit_width;\r\n                image_datas2[j] = 2**this.bit_width;\r\n            end\r\n            else if(j < block_wide * 3) begin  // red\r\n                if(j % 2 == 0) image_datas1[j] = 2**this.bit_width;\r\n            end\r\n            else if(j < block_wide * 4) begin  // green\r\n                if(j % 2 == 0) image_datas2[j] = 2**this.bit_width;\r\n                else image_datas1[j] = 2**this.bit_width;\r\n            end\r\n            else if(j < block_wide * 5) begin  // blue\r\n                if(j % 2 == 1) image_datas2[j] = 2**this.bit_width;\r\n            end\r\n            else if(j < block_wide * 6) begin  // yellow\r\n                if(j % 2 == 0) begin\r\n                    image_datas1[j] = 2**this.bit_width;\r\n                    image_datas2[j] = 2**this.bit_width;\r\n                end\r\n                else image_datas1[j] = 2**this.bit_width;\r\n            end\r\n            else if(j < block_wide * 7) begin  // magenta\r\n                if(j % 2 == 0) image_datas1[j] = 2**this.bit_width;\r\n                else image_datas2[j] = 2**this.bit_width;\r\n            end\r\n            else begin  //cyan\r\n                if(j % 2 == 0) image_datas2[j] = 2**this.bit_width;\r\n                else begin\r\n                    image_datas1[j] = 2*this.bit_width;\r\n                    image_datas2[j] = 2*this.bit_width;\r\n                end\r\n            end\r\n        end\r\n    end\r\n    this.image_datas = {image_datas1, image_datas2};\r\nendfunction\r\n\r\nfunction void ImageData::oblique_bar();\r\n    // This function is used to generate the increase data oblique monobar\r\n    int unsigned image_data = 0;\r\n\r\n    for (int i = 0; i < this.image_high; i = i + 1) begin\r\n        for (int j = 0; j < this.image_wide; j = j + 1) begin\r\n            image_data = i + j;\r\n            if (image_data >= 2**this.bit_width) begin\r\n                image_data -= 2**this.bit_width;\r\n            end\r\n            this.image_datas.push_back(image_data);\r\n        end\r\n    end\r\nendfunction\r\n\r\nfunction void ImageData::inc_sequence();\r\n    // This function is used to generate the increase data sequence\r\n    int unsigned image_data = 0;\r\n\r\n    for (int i = 0; i < this.image_high; i = i + 1) begin\r\n        for (int j = 0; j < this.image_wide; j = j + 1) begin\r\n            image_data = image_data + 1;\r\n            if (image_data == 2**this.bit_width) begin\r\n                image_data -= 2**this.bit_width;\r\n            end\r\n            this.image_datas.push_back(image_data);\r\n        end\r\n    end\r\nendfunction\n'})})}function m(n={}){const{wrapper:i}={...(0,a.R)(),...n.components};return i?(0,t.jsx)(i,{...n,children:(0,t.jsx)(_,{...n})}):_(n)}},28453:(n,i,e)=>{e.d(i,{R:()=>s,x:()=>d});var t=e(96540);const a={},r=t.createContext(a);function s(n){const i=t.useContext(r);return t.useMemo((function(){return"function"==typeof n?n(i):{...i,...n}}),[i,n])}function d(n){let i;return i=n.disableParentContext?"function"==typeof n.components?n.components(a):n.components||a:s(n.components),t.createElement(r.Provider,{value:i},n.children)}}}]);