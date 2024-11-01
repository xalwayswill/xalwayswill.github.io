lmstat -help
lmstat - Copyright (c) 1989-2015 Flexera Software LLC. All Rights Reserved.
usage: lmstat
        [-a]                  (display everything)
        [-asec]               (display everything in HH:MM:SS format)
        [-c license_file]     (use "license_file" as license file)
        [-f [feature_name]]   (list usage info about specified (or all) feature(s))
        [-i [feature_name]]   (list info about specified (or all) feature(s) from
                               the increment line in the license file)
        [-lm]                 (display status of license manager)
        [-S [DAEMON]]         (display all users of DAEMONs licenses)
        [-s [server_name]]    (display status of all license files on server node(s))
        [-t timeout_value]    (set connection timeout to "timeout_value")
        [-v]                  (display FLEXlm version, revision, and patch)
        [-vd]                 (display status of vendor daemon)
        [-old]                (allow communications with an old server that
                               uses communications version 1.2 or earlier)
        [-help]               (prints this message)

### 查看Genus license
`lmstat -a -c "5280@szc-lic01:5280@szc-lic02:5280@szc-lic03" -f Genus_Synthesis`

### 查看Magillem license
`lmstat -a -c "7000@szc-lic01" -f MDS_magillem`
