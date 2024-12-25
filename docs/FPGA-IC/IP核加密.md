# IP核加密
## 简介
IP核是在电路设计中不可或缺的组成部分。通常，IP核可以从第三方提供商获得。为了保护知识产权，这部分代码需要进行保护。
正如所猜测的那样，IP核的加解密工作是有专门的标准进行规范的，目的应该是保证各个EDA工具可以正确处理相关代码。这个标准也就是IEEE Std 1735，可以从这里获得标准的PDF文档，同时每一家EDA厂商也会有自己的加密工具。

总的来说，IP核的加解密算法和大家常用的算法其实区别不大，都是综合利用了非对称加密的安全性与对称加密的效率，是比较成熟的方案，可以很方面地使用市面上已有的加密库（比如OpenSSL cyrpto library，即libcrpyto）进行加解密。具体来说：

非对称加密可以通过对公钥和私钥的区分来实现很高的安全性。EDA工具厂商可以将公钥分发给需要加密的第三方厂商，而将私钥通过各种手段隐藏在自身代码中（或者通过远程服务器进行解密），从而降低了密钥流出的风险。

对称加密则用于对代码主体的加密。考虑到EDA工具对IP核的处理速度，这里可以使用更加高效的对称加密，典型的算法是AES。考虑到对称加密的加解密密钥是一致的，可以事先使用非对称加密对密钥进行处理，进一步提升安全性。

当然，以上提到的算法只是IP核加解密的一个重要环节，标准只能解决文本级别的加解密，目的主要是避免相关代码被直接暴露。这里还可以使用其它技术手段（如代码混淆）进行更深层次的加密，这对于隐藏具体实现方式和避免逆向设计来说更为有效。

以下文章主要探讨V1（也就是等级1）的加解密，V2可以参考上面给出的标准文档。

## 加密（IEEE1735 为例）
### 准备工作
在加密IP核的时候，我们需要准备好以下内容（session key的定义可以见后文）：

* 首先最重要的当然是RTL代码，目前在标准层面支持Verilog HDL和VHDL。

* 非对称加密（用于加密session key）和对称加密（用于加密代码块）的算法需要给出，目前常用的分别是RSA（推荐大于等于2048位）和AES（128位或256位，CBC）。

* 非对称加密使用的公钥，这部分通常由EDA工具或者代码加密工具提供。在加密时，可以同时使用多个公钥，工具将会为每个公钥生成对应的session key，这些公钥可以使用keyowner等字段区分。

* 其实还有个不大明显的部分，就是如何从session key中得到对称加密使用的密钥。为了增强安全性，我们可以通过加盐等方式让session key和AES的密钥有一个特定的生成关系。我们定义相关的处理函数为f: x ↦ y，其中函数f并不要求可逆。

其中，session key是一个重要的部分，它可以保证对每个IP核或者每一个工具都生成一个专门的密钥，这可以获得以下好处：

1. 每个IP核使用的session key都可以不同，从而提升了加密的有效性。

2. **不同的RSA公钥可以用来加密同一个session key并获得不同的结果，可以避免对同一个代码块进行重复多次加密**，节省了文件的体积。

### 加密流程

1. 确定需要加密的文本部分，并将其填充到AES要求的整数倍字节（例如128位）。这里使用的填充算法应该是PKCS#7 padding，也是OpenSSL等工具默认的填充算法。

2. 生成session key，并使用函数f将其处理为AES使用的密钥。为了保证AES密钥的强度，session key最好使用较长的位数，并且可以使用加盐等方式进一步提升强度。

3. 代码加密工具读取RSA公钥，对session key进行加密，使用Base64编码以将二进制映射到ASCII字符，并将其写入到key_block中。

4. 代码加密工具读取AES密钥，对代码主体进行加密，使用Base64编码以将二进制映射到ASCII字符，并将其写入到data_block中。

可以发现，上述流程中生成的key_block和data_block是最重要的部分，分别记录了加密后的session key和代码块，而这些部分将会成为解密的关键。

## 解密
### 准备工作
在解密IP核的时候，我们需要准备好以下内容：

* key_block，记录了加密后的session key。

* data_block，记录了加密后的代码主体。

* **RSA的私钥，这个是整个环节中隐蔽性最高的部分**，一般EDA工具都会将其写入到代码的特定位置，使用时经过特殊处理获取，防止被直接泄露。

* 在加密流程中定义的处理函数f。

### 解密流程

1. 分别读取key_block和data_block，并且使用Base64解码获取实际的二进制字符。

2. 使用RSA私钥解密key_block，获得session key。

3. 使用函数f将session key处理为AES使用的密钥。

4. 使用AES解密data_block，并根据padding的数值去除padding部分，得到实际的代码块内容。

通过以上流程，我们就能从加密的IP核获得解密后的代码。在这其中，最重要的就是RSA和私钥和处理函数f，这两个部分需要在EDA工具中被重点保护。

## 工具实际使用
### VCS加密
VCS命令本身支持加密。
#### syntax
```
+putprotect+target_dir

Specifies the target directory for protected files

-autoprotect128

For Verilog and VHDL files, VCS encrypts the module port list (or UDP terminal list) along with the body of the module (or UDP).

-auto2protect128

For Verilog and VHDL files, VCS encrypts only the body of the module or UDP. It does not encrypt port lists or UDP terminal lists. This option produces a syntactically correct Verilog module or UDP header statement.

-auto3protect128

This option is similar to the -auto2protect128 option except that VCS does not encrypt parameters preceding the ports declaration in a Verilog module.

+autoprotect[file_suffix]

Creates a protected source file; all modules are encrypted.

+auto2protect[file_suffix]

Creates a protected source file that does not encrypt the port connection list in the module header; all modules are encrypted.

+auto3protect[file_suffix]

Creates a protected source file that does not encrypt the port connection list in the module header or any parameter declarations that precede the first port declaration; all modules
are encrypted.

+deleteprotected

Allows overwriting of existing files when doing source protection.
```
#### Example
`$ vcs -full64 +v2k +putprotect+builds/ +auto3protect demo.v +deleteprotected`
### Xrun加密
cadence的仿真工具也支持加密，是用xmprotec命令。
#### Example
xmprotect -language vlog -autoprotect demo.v

### DC加密
Syntax
synenc [options] file1 [file2..fileN]
-r path. SYNOPSYS root path
-o filename. wirite the encrypted output to filename; will be ignored if used for multiple input files
-ansi. put the encrypted out files in the same directory as the input files; will be ignored if used with the ‘-o’ option for single input file
-zip. compress output
-enable_macro_report. macro definition can be reported by HDL compiler
#### Example
$ /synopsys/syn/P-2019.03-SP4/linux64/syn/bin/synenc -r /synopsys/syn/P-2019.03-SP4 -ansi demo.v

### Vivado 加密
Vivado对IP代码加密方法，参考UG118文档(https://www.xilinx.com/support/documentation/sw_manuals/xilinx2017_2/ug1118-vivado-creating-packaging-custom-ip.pdf)。

先要申请license，EncryptedWriter_v2，方法参考，https://www.xilinx.com/support/answers/68071.html

#### syntax
```
encrypt [-key <arg>] -lang <arg> [-quiet] [-verbose] [-ext <arg>] <files>...
-ext option to prevent encrypt from overwriting, or make copies of your source file prior to running the encrypt command.
-key option specifies an RSA key file that includes the IEEE-1735-2014 V2 supported pragmas that provide the encryption key, define access rights, and other optional information. The key file must use the same language and extension as the source files being encrypted (VHDL, Verilog, SystemVerilog).
-lang option Specify the target language as Verilog.
```
#### Example
下面是个例子。
```
$ cat enc.tcl
encrypt -lang verilog -ext .vp -key /Vivado/2020.1/data/pubkey/xilinxt_2019_11_active.v preproc.v
$ vivado -mode batch -source enc.tcl
```

### Synplify加密
synplify支持多种加密方式。它可以直接读取synenc工具加密的文件（synplify版本需要2018）。也可以直接读取encryptP1735.pl加密的文件。下面介绍这个加密的语法。

#### syntax
`perl /synopsys/fpga/fpga201703/lib/encryptP1735 -list mylist -log 1.log`
-list。指定filelist。

### IEEE-1735加密
目前看到的只有Intel® Quartus® Prime 里面的encrypt_1735 工具能够进行IEEE1735的加密
```
encrypt_1735 [-h | --help[=<option|topic>] | -v]
encrypt_1735 <other options>

Options:
--------
	-?
	-f <argument file>
	-h
	--256_bit[=<value>]
	--help[=<option|topic>]
	--language=<verilog | systemverilog| vhdl>
	--lower_priority
	--of=<some_file>
	--quartus
	--simulation[=<aldec | cadence | mentor | synopsys (comma delimited)>]
	--tcl_jou_file=<[tcl_jou_filename=]on|off>
	--tcl_log_file=<[tcl_log_filename=]on|off>
```
* Verilog/SystemVerilog Encryption Pragma（第三方工具）：
```
`pragma protect key_keyowner="Intel Corporation"
`pragma protect data_method="aes128-cbc"
`pragma protect key_method="rsa"
`pragma protect key_keyname="Intel-FPGA-Quartus-RSA-1"
`pragma protect key_public_key
<encrypted session key>

`pragma protect begin
`pragma protect end
```
* VHDL Encryption Pragma（第三方工具）：
```
`protect key_keyowner = “Intel Corporation”
`protect data_method="aes128-cbc"
`protect key_method = “rsa”
`protect key_keyname = “Intel-FPGA-Quartus-RSA-1”
`protect key_block
<Encrypted session key>
```
