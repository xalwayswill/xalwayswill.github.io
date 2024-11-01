```
`timescale 1 ns / 1 ps
module file_read();

string file_path;
int fp;
logic [7:0] pix_data_l;  // bin文件中2byte为一个数据，低字节在前，高字节在后
logic [7:0] pix_data_h;
logic [15:0] pix_data;
logic [15:0] mem [5120];
initial begin
    $display("HELLO");
    file_path = "../src/Bright_data.bin";
    fp = $fopen(file_path, "rb");
    repeat(10) begin
        $fread(pix_data_l, fp);
        $fread(pix_data_h, fp);
        pix_data = {pix_data_h, pix_data_l};
        $display(pix_data);
    end
    $fclose(fp);
    $stop();
end

endmodule
```
```
# -*- coding: utf-8 -*-
#python
import numpy as np
import cv2
import struct
import os
import matplotlib.pyplot as plt

IMG_WIDE = 5120
IMG_HIGH = 100

def img_read(file_path):
    img_data = np.zeros((IMG_HIGH, IMG_WIDE), dtype = np.uint16)
    img_line = []
    size = os.path.getsize(file_path)
    with open(file_path, "rb") as fp:
        for i in range(size//2):
            data_tmp = fp.read(2)  # read 2 bytes
            pix_data = struct.unpack('h', data_tmp)  # bin 文件中两个byte为一个数，高低byte颠倒，unpack之后直接转换为十进制数，且byte顺序为正确的
            # print(img_data_hex)
            img_line.append(pix_data)

    img_line = np.array(img_line, dtype=np.uint16).reshape(1, IMG_WIDE)
    img_data = img_data + img_line # broadcast
    # cv2.imshow("data before mprnuc", img_data)
    # cv2.waitKey(0)
    cv2.imwrite(file_path.replace(r".bin", r".jpg"), img_data)
    return img_line

if __name__ == "__main__":
    file_path = r"src/Bright_data.bin"
    img_data = img_read(file_path)
    file_path = r"src/Bright_data_out.bin"
    img_data_mprnuc = img_read(file_path)

    ind = range(IMG_WIDE)
    linelist = plt.plot(ind, img_data[0], ind, img_data_mprnuc[0])
    plt.setp(linelist)
    # plt.plot(ind, img_line[0])
    axes = plt.gca()
    axes.set_xlim([0,IMG_WIDE])
    axes.set_ylim([2**10,2**12])
    plt.show()
```
