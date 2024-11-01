[https://teakki.com/p/57dbd22615d9b5b717807303](https://teakki.com/p/57dbd22615d9b5b717807303)

##1. 利用ldd查看可执行程序的依赖库
```
[root@~]# ldd /usr/local/php/bin/php 
    linux-vdso.so.1 =>  (0x00007fff753f5000) 
    libcrypt.so.1 => /lib64/libcrypt.so.1 (0x00000031f4600000) 
    librt.so.1 => /lib64/librt.so.1 (0x000000311ee00000) 
    libmysqlclient.so.18 => /usr/local/mysql/lib/libmysqlclient.so.18 (0x00007f767b422000) 
    libmcrypt.so.4 => /usr/lib64/libmcrypt.so.4 (0x00007f767b1ef000) 
    libiconv.so.2 => /usr/local/lib/libiconv.so.2 (0x00007f767af0a000) 
    libcurl.so.4 => /usr/lib64/libcurl.so.4 (0x0000003519800000) 
    libm.so.6 => /lib64/libm.so.6 (0x00000031f2200000) 
    libdl.so.2 => /lib64/libdl.so.2 (0x00000031f1600000) 
    libnsl.so.1 => /lib64/libnsl.so.1 (0x00000031f3a00000) 
    libxml2.so.2 => /usr/lib64/libxml2.so.2 (0x00000031f8a00000) 
    libz.so.1 => /usr/local/lib/libz.so.1 (0x00007f767acf2000) 
    libssl.so.10 => /usr/lib64/libssl.so.10 (0x000000311c600000) 
    libcrypto.so.10 => /usr/lib64/libcrypto.so.10 (0x00000031f7600000) 
    libpthread.so.0 => /lib64/libpthread.so.0 (0x000000311ce00000) 
    libc.so.6 => /lib64/libc.so.6 (0x00000031f0e00000) 
    libresolv.so.2 => /lib64/libresolv.so.2 (0x00000031f3200000) 
    libfreebl3.so => /lib64/libfreebl3.so (0x00000031f4e00000) 
    /lib64/ld-linux-x86-64.so.2 (0x00000031f0a00000) 
    libidn.so.11 => /lib64/libidn.so.11 (0x00000031f7e00000) 
    libldap-2.4.so.2 => /lib64/libldap-2.4.so.2 (0x000000351c000000) 
    libgssapi_krb5.so.2 => /lib64/libgssapi_krb5.so.2 (0x000000311f200000) 
    libkrb5.so.3 => /lib64/libkrb5.so.3 (0x000000311e200000) 
    libk5crypto.so.3 => /lib64/libk5crypto.so.3 (0x00000031f7200000) 
    libcom_err.so.2 => /lib64/libcom_err.so.2 (0x000000311e600000) 
    libssl3.so => /usr/lib64/libssl3.so (0x000000351b800000) 
    libsmime3.so => /usr/lib64/libsmime3.so (0x000000351bc00000) 
    libnss3.so => /usr/lib64/libnss3.so (0x000000351a800000) 
    libnssutil3.so => /usr/lib64/libnssutil3.so (0x000000351a400000) 
    libplds4.so => /lib64/libplds4.so (0x000000351ac00000) 
    libplc4.so => /lib64/libplc4.so (0x000000351b400000) 
    libnspr4.so => /lib64/libnspr4.so (0x000000351b000000) 
    libssh2.so.1 => /usr/lib64/libssh2.so.1 (0x0000003519c00000) 
    liblber-2.4.so.2 => /lib64/liblber-2.4.so.2 (0x000000351a000000) 
    libsasl2.so.2 => /usr/lib64/libsasl2.so.2 (0x00000031f8200000) 
    libkrb5support.so.0 => /lib64/libkrb5support.so.0 (0x00000031f7a00000) 
    libkeyutils.so.1 => /lib64/libkeyutils.so.1 (0x00000031f6e00000) 
    libselinux.so.1 => /lib64/libselinux.so.1 (0x00000031f2600000)
```
注：ldd通过调用动态链接器来获取可执行程序的依赖库，但是并不推荐在未知的可执行程序上执行业ldd来获取其依赖库，因为部分版本的ldd会直接通过调用该可执行程序来获取其依赖库，这存在安全风险。
##2. 利用pmap工具查询未知的可执行程序的依赖库
```
[root@~]# objdump -p /usr/local/php/bin/php |grep NEEDED 
  NEEDED               libcrypt.so.1 
  NEEDED               librt.so.1 
  NEEDED               libmysqlclient.so.18 
  NEEDED               libmcrypt.so.4 
  NEEDED               libiconv.so.2 
  NEEDED               libcurl.so.4 
  NEEDED               libm.so.6 
  NEEDED               libdl.so.2 
  NEEDED               libnsl.so.1 
  NEEDED               libxml2.so.2 
  NEEDED               libz.so.1 
  NEEDED               libssl.so.10 
  NEEDED               libcrypto.so.10 
  NEEDED               libpthread.so.0 
  NEEDED               libc.so.6 
  NEEDED               libresolv.so.2
```
##3. 利用pmap查看正在运行时的进程的依赖库
利用pldd工具既可以获取进程的内存映射信息，也可以获取进程的依赖共享库信息：
```
[root@~/software/pldd]# ps -ef|grep php-fpm 
root     26534     1  0  2014 ?        00:01:34 php-fpm: master process (/usr/local/php-5.3.29/etc/php-fpm.conf) 
nobody   26535 26534  0  2014 ?        00:00:04 php-fpm: pool www           
nobody   26536 26534  0  2014 ?        00:00:05 php-fpm: pool www           
root     30510 30324  0 00:39 pts/0    00:00:00 grep php-fpm 
[root@~/software/pldd]# pmap 26534 |head  
26534:   php-fpm: master process (/usr/local/php-5.3.29/etc/php-fpm.conf) 
0000000000400000  10452K r-x--  /usr/local/php-5.3.29/sbin/php-fpm 
0000000001035000     76K rw---  /usr/local/php-5.3.29/sbin/php-fpm 
0000000001048000    104K rw---    [ anon ] 
0000000002a65000   3448K rw---    [ anon ] 
000000311c600000    388K r-x--  /usr/lib64/libssl.so.1.0.1e 
000000311c661000   2048K -----  /usr/lib64/libssl.so.1.0.1e 
000000311c861000     16K r----  /usr/lib64/libssl.so.1.0.1e 
000000311c865000     28K rw---  /usr/lib64/libssl.so.1.0.1e 
000000311ce00000     92K r-x--  /lib64/libpthread-2.12.so
```
