```
#! usr/bin/python
# -*- coding: utf-8 -*-
import numpy as np
import cv2

config = []
with open(r"vsim/config.txt", 'r') as fp:
    for line in fp:
        config.append(int(line.strip('\n')))

img_wide_full = config[0]
img_high_full = config[1]
CHAN_NUM = 1
# CHAN_NUM = config[2]
COLOR_TYPE = config[3] # 0: mono, 1: color
TEST_MODE = config[4]  # 0: vector monobar, 1: vector colorbar 4: oblique bar
subs_col_rate = 2**config[5]
subs_row_rate = 2**config[6]
bin_col_rate = 2**config[7]
bin_row_rate = 2**config[8]
BAYER_TYPE = config[9] # 0: GR 1:RG 2:GB 3:BG
FRAME_NUM = config[10]
IMG_WIDE = img_wide_full//subs_col_rate//bin_col_rate
IMG_HIGH = img_high_full//subs_row_rate//bin_row_rate*FRAME_NUM

print("Image wide is " + str(IMG_WIDE))
print("Image high is " + str(IMG_HIGH))
print("Frame number is " + str(FRAME_NUM))

file_path = "vsim/data"
chan = [[] for j in range(CHAN_NUM)]
for i in range(CHAN_NUM):
    with open(file_path + str(i) + r".dat", 'r') as fp:
        for line in fp:
            chan[i].append(int(line.strip('\n')))

chan_np = np.zeros((IMG_HIGH, IMG_WIDE//CHAN_NUM, CHAN_NUM), dtype=np.uint16)
for i in range(CHAN_NUM):
    chan_np[:,:,i] = np.array(chan[i], dtype=np.uint16).reshape(IMG_HIGH, IMG_WIDE//CHAN_NUM)

image = np.zeros((IMG_HIGH, IMG_WIDE), dtype=np.uint16)
for i in range(CHAN_NUM):
    image[:, i::CHAN_NUM] = chan_np[:,:,i]

if(TEST_MODE == 1 and COLOR_TYPE == 1):
    if(BAYER_TYPE == 0):
        image = cv2.cvtColor(image, cv2.COLOR_BayerGR2RGB)
    elif(BAYER_TYPE == 1):
        image = cv2.cvtColor(image, cv2.COLOR_BayerRG2RGB)
    elif(BAYER_TYPE == 2):
        image = cv2.cvtColor(image, cv2.COLOR_BayerGB2RGB)
    elif(BAYER_TYPE == 3):
        image = cv2.cvtColor(image, cv2.COLOR_BayerBG2RGB)

cv2.imshow("test image", image)
cv2.waitKey(0)
cv2.imwrite("vsim/test_image.jpg", image//256)
```
