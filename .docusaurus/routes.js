import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'b2f'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/authors',
    component: ComponentCreator('/blog/authors', '0b7'),
    exact: true
  },
  {
    path: '/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/blog/authors/all-sebastien-lorber-articles', '4a1'),
    exact: true
  },
  {
    path: '/blog/authors/yangshun',
    component: ComponentCreator('/blog/authors/yangshun', 'a68'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', '89a'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', '9ad'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', 'e9f'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '704'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', '858'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '299'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '00d'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', 'd2b'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '3f6'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '2b3'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '3a9'),
            routes: [
              {
                path: '/docs/category/tutorial---basics',
                component: ComponentCreator('/docs/category/tutorial---basics', '20e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/tutorial---extras',
                component: ComponentCreator('/docs/category/tutorial---extras', '9ad'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/8B10B编码',
                component: ComponentCreator('/docs/FPGA-IC/8B10B编码', '6b2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/AHB',
                component: ComponentCreator('/docs/FPGA-IC/AHB', '3da'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/APB',
                component: ComponentCreator('/docs/FPGA-IC/APB', 'e81'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/AXI4简记',
                component: ComponentCreator('/docs/FPGA-IC/AXI4简记', '924'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/Coding-style',
                component: ComponentCreator('/docs/FPGA-IC/Coding-style', 'd4e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/common-lib',
                component: ComponentCreator('/docs/FPGA-IC/common-lib', 'f23'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/CRC生成-LFSR电路',
                component: ComponentCreator('/docs/FPGA-IC/CRC生成-LFSR电路', '501'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/DC简明教程',
                component: ComponentCreator('/docs/FPGA-IC/DC简明教程', '4cc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/DDR3-简记',
                component: ComponentCreator('/docs/FPGA-IC/DDR3-简记', '85a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/DesignWire',
                component: ComponentCreator('/docs/FPGA-IC/DesignWire', '2bd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/ECC校验【转载】',
                component: ComponentCreator('/docs/FPGA-IC/ECC校验【转载】', '6a1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/FIFO设计',
                component: ComponentCreator('/docs/FPGA-IC/FIFO设计', 'c54'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/FPGA内部结构',
                component: ComponentCreator('/docs/FPGA-IC/FPGA内部结构', '27c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/gotcha',
                component: ComponentCreator('/docs/FPGA-IC/gotcha', '100'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/High-Speed-Links-Circuits-and-Systems',
                component: ComponentCreator('/docs/FPGA-IC/High-Speed-Links-Circuits-and-Systems', '6e6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/IC设计常用文件及格式介绍',
                component: ComponentCreator('/docs/FPGA-IC/IC设计常用文件及格式介绍', 'c74'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/LUT实现逻辑功能',
                component: ComponentCreator('/docs/FPGA-IC/LUT实现逻辑功能', 'cfd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/memory-compiler',
                component: ComponentCreator('/docs/FPGA-IC/memory-compiler', '453'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/notepad++调用VIVADO语法检测工具进行verilog语法检测',
                component: ComponentCreator('/docs/FPGA-IC/notepad++调用VIVADO语法检测工具进行verilog语法检测', '0f6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/PTPX',
                component: ComponentCreator('/docs/FPGA-IC/PTPX', 'a49'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/QuestaSim-仿真VIVADO-IP',
                component: ComponentCreator('/docs/FPGA-IC/QuestaSim-仿真VIVADO-IP', 'c62'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/RAM-三种模式',
                component: ComponentCreator('/docs/FPGA-IC/RAM-三种模式', 'c4e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/Register',
                component: ComponentCreator('/docs/FPGA-IC/Register', '216'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/SPI四种工作模式',
                component: ComponentCreator('/docs/FPGA-IC/SPI四种工作模式', '454'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/STA',
                component: ComponentCreator('/docs/FPGA-IC/STA', 'b2c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/Systen-Cache',
                component: ComponentCreator('/docs/FPGA-IC/Systen-Cache', '11b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/VALID-READY-handshake',
                component: ComponentCreator('/docs/FPGA-IC/VALID-READY-handshake', 'efd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/Valid-Ready打拍-TODO：自己整理下',
                component: ComponentCreator('/docs/FPGA-IC/Valid-Ready打拍-TODO：自己整理下', '112'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/VCS-仿真-VIVADO-IP',
                component: ComponentCreator('/docs/FPGA-IC/VCS-仿真-VIVADO-IP', 'cba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/VCS+Verdi仿真环境的设置及Makefile文件编写',
                component: ComponentCreator('/docs/FPGA-IC/VCS+Verdi仿真环境的设置及Makefile文件编写', 'a76'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/仲裁器-TODO：自己整理下',
                component: ComponentCreator('/docs/FPGA-IC/仲裁器-TODO：自己整理下', '16e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/低功耗相关',
                component: ComponentCreator('/docs/FPGA-IC/低功耗相关', '64b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/原型验证(Prototyping)',
                component: ComponentCreator('/docs/FPGA-IC/原型验证(Prototyping)', '075'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/双调排序Bitonic-Sort',
                component: ComponentCreator('/docs/FPGA-IC/双调排序Bitonic-Sort', '1d9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/后端',
                component: ComponentCreator('/docs/FPGA-IC/后端', '3c2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/器件工艺相关',
                component: ComponentCreator('/docs/FPGA-IC/器件工艺相关', 'c96'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/基础知识',
                component: ComponentCreator('/docs/FPGA-IC/基础知识', 'a46'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/异步FIFO',
                component: ComponentCreator('/docs/FPGA-IC/异步FIFO', '9c3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/总线跨4K处理',
                component: ComponentCreator('/docs/FPGA-IC/总线跨4K处理', '7b9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/直方图统计',
                component: ComponentCreator('/docs/FPGA-IC/直方图统计', 'ff4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/跨时钟域(CDC)',
                component: ComponentCreator('/docs/FPGA-IC/跨时钟域(CDC)', '897'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/门控时钟',
                component: ComponentCreator('/docs/FPGA-IC/门控时钟', '0a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/除法运算',
                component: ComponentCreator('/docs/FPGA-IC/除法运算', '211'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FPGA-IC/高级ASIC芯片综合',
                component: ComponentCreator('/docs/FPGA-IC/高级ASIC芯片综合', 'd3d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/save this to git code reponsitories/2021-01-27',
                component: ComponentCreator('/docs/save this to git code reponsitories/2021-01-27', '3a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/save this to git code reponsitories/2021-03-26',
                component: ComponentCreator('/docs/save this to git code reponsitories/2021-03-26', 'b27'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/save this to git code reponsitories/2021-03-26-2',
                component: ComponentCreator('/docs/save this to git code reponsitories/2021-03-26-2', '246'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/save this to git code reponsitories/2021-07-21',
                component: ComponentCreator('/docs/save this to git code reponsitories/2021-07-21', 'b2a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/alias问题',
                component: ComponentCreator('/docs/script/alias问题', 'e44'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/CSH',
                component: ComponentCreator('/docs/script/CSH', '64e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/filelist',
                component: ComponentCreator('/docs/script/filelist', 'f8b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/makefile',
                component: ComponentCreator('/docs/script/makefile', '6c4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/print_color',
                component: ComponentCreator('/docs/script/print_color', '01a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/python-argparse-----命令行选项、参数和子命令解析器',
                component: ComponentCreator('/docs/script/python-argparse-----命令行选项、参数和子命令解析器', 'fec'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/Python-参数解析模块-sys，getopt，argparse',
                component: ComponentCreator('/docs/script/Python-参数解析模块-sys，getopt，argparse', '005'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/Python-常用库记录',
                component: ComponentCreator('/docs/script/Python-常用库记录', '0b9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/Python-错误打印',
                component: ComponentCreator('/docs/script/Python-错误打印', '730'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/python及SV读取bin文件',
                component: ComponentCreator('/docs/script/python及SV读取bin文件', '9f7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/python处理二进制文件',
                component: ComponentCreator('/docs/script/python处理二进制文件', '0eb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/Python常用函数',
                component: ComponentCreator('/docs/script/Python常用函数', '6e8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/sed-cat-awk-grep-wc-及应用',
                component: ComponentCreator('/docs/script/sed-cat-awk-grep-wc-及应用', 'a96'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/TCL',
                component: ComponentCreator('/docs/script/TCL', '12f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/verdi-license',
                component: ComponentCreator('/docs/script/verdi-license', '2f6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/Verilog_module_instance',
                component: ComponentCreator('/docs/script/Verilog_module_instance', 'ec7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/xrun',
                component: ComponentCreator('/docs/script/xrun', 'f79'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/定义解释器',
                component: ComponentCreator('/docs/script/定义解释器', 'b2d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/正则表达式',
                component: ComponentCreator('/docs/script/正则表达式', '61e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/script/简单仿真编译及verdi环境',
                component: ComponentCreator('/docs/script/简单仿真编译及verdi环境', '3f2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/System-Verilog/Assertion',
                component: ComponentCreator('/docs/System-Verilog/Assertion', '29c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/System-Verilog/DPI',
                component: ComponentCreator('/docs/System-Verilog/DPI', '85e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/System-Verilog/Gotcha',
                component: ComponentCreator('/docs/System-Verilog/Gotcha', 'e4b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/System-Verilog/OOP相关',
                component: ComponentCreator('/docs/System-Verilog/OOP相关', '970'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/System-Verilog/Program',
                component: ComponentCreator('/docs/System-Verilog/Program', '2fd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/System-Verilog/Randomization',
                component: ComponentCreator('/docs/System-Verilog/Randomization', '6e9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/System-Verilog/Systemverilog-运行时传递参数',
                component: ComponentCreator('/docs/System-Verilog/Systemverilog-运行时传递参数', 'c84'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/System-Verilog/UVM实战',
                component: ComponentCreator('/docs/System-Verilog/UVM实战', 'a7d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/System-Verilog/VCS解组合逻辑环死锁',
                component: ComponentCreator('/docs/System-Verilog/VCS解组合逻辑环死锁', '61f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/System-Verilog/任务、函数',
                component: ComponentCreator('/docs/System-Verilog/任务、函数', 'f1d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/System-Verilog/接口',
                component: ComponentCreator('/docs/System-Verilog/接口', '4f4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/System-Verilog/数据类型',
                component: ComponentCreator('/docs/System-Verilog/数据类型', '7f4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/System-Verilog/线程、进程及通信',
                component: ComponentCreator('/docs/System-Verilog/线程、进程及通信', '9f5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/System-Verilog/线程和通信',
                component: ComponentCreator('/docs/System-Verilog/线程和通信', '10a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/System-Verilog/虚函数',
                component: ComponentCreator('/docs/System-Verilog/虚函数', '3dd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/docs/tutorial-basics/congratulations', '458'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/docs/tutorial-basics/create-a-blog-post', '108'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/docs/tutorial-basics/create-a-document', '8fc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/docs/tutorial-basics/create-a-page', '951'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/docs/tutorial-basics/deploy-your-site', '4f5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/docs/tutorial-basics/markdown-features', 'b05'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/docs/tutorial-extras/manage-docs-versions', '978'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/docs/tutorial-extras/translate-your-site', 'f9a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---arm-china/2023-08-15',
                component: ComponentCreator('/docs/work-log---arm-china/2023-08-15', 'f7a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---arm-china/Clock-gating-units-level',
                component: ComponentCreator('/docs/work-log---arm-china/Clock-gating-units-level', '53e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---arm-china/Exp-Golomb-指数哥伦布编码',
                component: ComponentCreator('/docs/work-log---arm-china/Exp-Golomb-指数哥伦布编码', 'be5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---arm-china/IP-XACT',
                component: ComponentCreator('/docs/work-log---arm-china/IP-XACT', 'c71'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---arm-china/LSC',
                component: ComponentCreator('/docs/work-log---arm-china/LSC', 'f9b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---arm-china/PCE',
                component: ComponentCreator('/docs/work-log---arm-china/PCE', 'f74'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---arm-china/RNR-WAVELET中的优化',
                component: ComponentCreator('/docs/work-log---arm-china/RNR-WAVELET中的优化', 'b32'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---arm-china/SDE优化',
                component: ComponentCreator('/docs/work-log---arm-china/SDE优化', '395'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---arm-china/synthesis',
                component: ComponentCreator('/docs/work-log---arm-china/synthesis', '17a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---arm-china/YNR-优化',
                component: ComponentCreator('/docs/work-log---arm-china/YNR-优化', 'e10'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---arm-china/YUV2RGB',
                component: ComponentCreator('/docs/work-log---arm-china/YUV2RGB', 'cf2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---arm-china/为何当时demosaic对hblank有要求，不能实现0-hblank',
                component: ComponentCreator('/docs/work-log---arm-china/为何当时demosaic对hblank有要求，不能实现0-hblank', '2a5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---arm-china/在5-5窗中搜索最大值和最小值',
                component: ComponentCreator('/docs/work-log---arm-china/在5-5窗中搜索最大值和最小值', '69b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---arm-china/面积记录',
                component: ComponentCreator('/docs/work-log---arm-china/面积记录', 'f3f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---g/2024-09-24',
                component: ComponentCreator('/docs/work-log---g/2024-09-24', '16a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---g/ptpx',
                component: ComponentCreator('/docs/work-log---g/ptpx', '80d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---g/SDC相关',
                component: ComponentCreator('/docs/work-log---g/SDC相关', '6e9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---g/算法调试过程中的问题',
                component: ComponentCreator('/docs/work-log---g/算法调试过程中的问题', '40f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---g/综合Flow',
                component: ComponentCreator('/docs/work-log---g/综合Flow', '0ae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---g/综合问题',
                component: ComponentCreator('/docs/work-log---g/综合问题', '732'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/work-log---g/设计问题',
                component: ComponentCreator('/docs/work-log---g/设计问题', '433'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/功能安全/低功耗相关',
                component: ComponentCreator('/docs/功能安全/低功耗相关', 'f63'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/3DLUT',
                component: ComponentCreator('/docs/图像处理/3DLUT', '13d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/5A',
                component: ComponentCreator('/docs/图像处理/5A', '2ed'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/Architecture',
                component: ComponentCreator('/docs/图像处理/Architecture', 'cae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/bicubic',
                component: ComponentCreator('/docs/图像处理/bicubic', '785'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/de-noise',
                component: ComponentCreator('/docs/图像处理/de-noise', '7cf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/demosaic',
                component: ComponentCreator('/docs/图像处理/demosaic', '04f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/Dither',
                component: ComponentCreator('/docs/图像处理/Dither', 'ceb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/DPF',
                component: ComponentCreator('/docs/图像处理/DPF', 'fa1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/RGB2YUV-and-YUV2RGB',
                component: ComponentCreator('/docs/图像处理/RGB2YUV-and-YUV2RGB', '725'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/RGBIR-sensor',
                component: ComponentCreator('/docs/图像处理/RGBIR-sensor', '9c6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/RNR',
                component: ComponentCreator('/docs/图像处理/RNR', '55a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/sharpen',
                component: ComponentCreator('/docs/图像处理/sharpen', 'd68'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/乱七八糟',
                component: ComponentCreator('/docs/图像处理/乱七八糟', '358'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/去紫边',
                component: ComponentCreator('/docs/图像处理/去紫边', '3ff'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/图像色域空间',
                component: ComponentCreator('/docs/图像处理/图像色域空间', 'fe0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/图像预处理校正简介',
                component: ComponentCreator('/docs/图像处理/图像预处理校正简介', '1c4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/小波变换',
                component: ComponentCreator('/docs/图像处理/小波变换', '81f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/图像处理/常见分辨率',
                component: ComponentCreator('/docs/图像处理/常见分辨率', 'fea'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/开发工具/Graphviz---绘制图形网络',
                component: ComponentCreator('/docs/开发工具/Graphviz---绘制图形网络', '14a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/开发工具/office使用',
                component: ComponentCreator('/docs/开发工具/office使用', '957'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/接口协议/CameraLink',
                component: ComponentCreator('/docs/接口协议/CameraLink', '757'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/接口协议/SLVS-EC接口',
                component: ComponentCreator('/docs/接口协议/SLVS-EC接口', '4a3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/接口协议/SPI',
                component: ComponentCreator('/docs/接口协议/SPI', '578'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/（转载）CentOS查看程序、进程的依赖库的方法',
                component: ComponentCreator('/docs/环境配置/（转载）CentOS查看程序、进程的依赖库的方法', 'e5b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/（转载）Linux动态链接库-so文件的创建与使用',
                component: ComponentCreator('/docs/环境配置/（转载）Linux动态链接库-so文件的创建与使用', 'e74'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/Anaconda-配置多环境',
                component: ComponentCreator('/docs/环境配置/Anaconda-配置多环境', '27d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/csh配置',
                component: ComponentCreator('/docs/环境配置/csh配置', 'eeb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/C语言第三方库的使用',
                component: ComponentCreator('/docs/环境配置/C语言第三方库的使用', '90d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/git',
                component: ComponentCreator('/docs/环境配置/git', 'f3a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/Linux下工具license占用情况查询',
                component: ComponentCreator('/docs/环境配置/Linux下工具license占用情况查询', '204'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/Linux下的环境变量',
                component: ComponentCreator('/docs/环境配置/Linux下的环境变量', '57a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/Linux查看Redhat版本',
                component: ComponentCreator('/docs/环境配置/Linux查看Redhat版本', 'd5a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/Linux设置环境变量',
                component: ComponentCreator('/docs/环境配置/Linux设置环境变量', 'b00'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/Linux非root下安装tmux',
                component: ComponentCreator('/docs/环境配置/Linux非root下安装tmux', '76b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/TMUX',
                component: ComponentCreator('/docs/环境配置/TMUX', 'c13'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/vcs+verdi',
                component: ComponentCreator('/docs/环境配置/vcs+verdi', '652'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/vimrc',
                component: ComponentCreator('/docs/环境配置/vimrc', '650'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/VIM使用技巧',
                component: ComponentCreator('/docs/环境配置/VIM使用技巧', '118'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/vim插件',
                component: ComponentCreator('/docs/环境配置/vim插件', 'd39'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/VSCode启用右键扩展',
                component: ComponentCreator('/docs/环境配置/VSCode启用右键扩展', 'a09'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/zsh-tmux-vim',
                component: ComponentCreator('/docs/环境配置/zsh-tmux-vim', 'e01'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/环境配置/启用Windows图片查看器',
                component: ComponentCreator('/docs/环境配置/启用Windows图片查看器', '375'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/移知网课程/AMBA-APB-AHB-AXI',
                component: ComponentCreator('/docs/移知网课程/AMBA-APB-AHB-AXI', 'a24'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/移知网课程/DDR',
                component: ComponentCreator('/docs/移知网课程/DDR', '52b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/移知网课程/MCU设计相关',
                component: ComponentCreator('/docs/移知网课程/MCU设计相关', 'b65'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/移知网课程/Memory系统',
                component: ComponentCreator('/docs/移知网课程/Memory系统', '7a6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/移知网课程/NIC-400',
                component: ComponentCreator('/docs/移知网课程/NIC-400', '5e2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/移知网课程/中断系统',
                component: ComponentCreator('/docs/移知网课程/中断系统', 'e9e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/移知网课程/基础知识',
                component: ComponentCreator('/docs/移知网课程/基础知识', 'c46'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/移知网课程/时钟树',
                component: ComponentCreator('/docs/移知网课程/时钟树', '1ee'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/base_test-sv',
                component: ComponentCreator('/docs/随笔/base_test-sv', 'a0d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/filelist-py',
                component: ComponentCreator('/docs/随笔/filelist-py', 'ea2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/image_display-py',
                component: ComponentCreator('/docs/随笔/image_display-py', 'bac'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/ImageData-sv',
                component: ComponentCreator('/docs/随笔/ImageData-sv', 'ba9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/img_agent-sv',
                component: ComponentCreator('/docs/随笔/img_agent-sv', '571'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/img_config-sv',
                component: ComponentCreator('/docs/随笔/img_config-sv', '29e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/img_driver-sv',
                component: ComponentCreator('/docs/随笔/img_driver-sv', '912'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/img_env-sv',
                component: ComponentCreator('/docs/随笔/img_env-sv', '862'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/img_if-sv',
                component: ComponentCreator('/docs/随笔/img_if-sv', 'd51'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/img_model-sv',
                component: ComponentCreator('/docs/随笔/img_model-sv', 'bb1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/img_monitor-sv',
                component: ComponentCreator('/docs/随笔/img_monitor-sv', '2ca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/img_pkg-sv',
                component: ComponentCreator('/docs/随笔/img_pkg-sv', '5a6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/img_scoreboard-sv',
                component: ComponentCreator('/docs/随笔/img_scoreboard-sv', '67b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/img_sequencer-sv',
                component: ComponentCreator('/docs/随笔/img_sequencer-sv', 'd0c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/img_transaction-sv',
                component: ComponentCreator('/docs/随笔/img_transaction-sv', 'b7c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/rand_case-sv',
                component: ComponentCreator('/docs/随笔/rand_case-sv', '5e9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/tb-sv',
                component: ComponentCreator('/docs/随笔/tb-sv', '1e5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/test_img_case-sv',
                component: ComponentCreator('/docs/随笔/test_img_case-sv', 'e19'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/随笔/void--',
                component: ComponentCreator('/docs/随笔/void--', '502'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/面试题目记录/为什么使用与非门而不是或非门进行逻辑面积评估？',
                component: ComponentCreator('/docs/面试题目记录/为什么使用与非门而不是或非门进行逻辑面积评估？', '6d2'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
