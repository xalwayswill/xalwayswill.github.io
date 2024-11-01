Reference：
[1] Beyond Color Difference: Residual Interpolation for Color Image Demosaicking
The two main types of demosaicing artifacts are usually named false colors and zipper effect. False colors are evident color errors which arise near the object boundaries, whereas zipper effect artifacts manifest as “on-off” patterns and are caused by an erroneous interpolation across edges. As it is disclosed in [3], a well performing demosaicing technique has to exploit two types of correlation: spatial correlation and spectral correlation.
[2] https://blog.csdn.net/weixin_44690935/article/details/119251618
[3] **Gradient based threshold free color filter array interpolation(GBTF)**
伪彩色：出现物体边界等高频部分
拉链效应：由于跨越图像边缘进行插值导致（应该沿边缘方向插值）
空间相关性和光谱相关性

为何先插值G，因为G分量有更多的采样数据，之前zk用的是color difference的方式，通过插值R-G与B-G，最后叠加到G分量上得到最终的RB值，基本原理是**色差恒定理论**（对于完整的RGB通道而言，相邻像素的色差或者色差比是比较接近的，目的是把颜色通道之间的相关性信息引入颜色插值算法）。
ASR的算法在插值G分量时，有一个GL和GH，GL就是低通插值，通过周围G分量平均，GH实际就是通过边缘方向进行的插值，通过局部方差（R or B - G分量的方差，感觉主要应该是判断图像的饱和度，饱和度高的部分插值要注意），水平垂直方向梯度（RB和G分量混合计算），以及四个方向上对应颜色通道相减得到的平均差值，以及如果中心像素周围有超大像素值需要对局部方差进行处理，使其靠近水平垂直方向的平均位置。
[1]中使用了一种residual interpolation的方法，同样是先插值G分量，然后利用插值后的G分量作为Guide来插值R分量，得到tentative estimate 的R分量，再用tentative的R减去插值前的R，得到Residuals with minimized laplacian，在对residuals进行插值后，叠加到tentative estimate R上，得到最终的R，为什么是用laplacian能量，在对一副正常图像求解邻域平方和的意义不够突出，但当图像是梯度图或者细节图的时候，其意义就很明显了，能够增强细节
Our hypothesis for the RI is that if image interpolation is performed in a domain with a smaller Laplacian energy, its accuracy is improved

参考文献[2]中使用的边缘检测方法是一个 5\*3（垂直边缘检测）或者3\*5（水平边缘检测）的窗口内部进行检测。
如果水平方向上梯度比垂直方向梯度大Th ，表明在该点存在水平边缘；如果垂直方向上梯度比水平方向梯度大 Th ，表明在该点存在垂直边缘；不然，该点在平滑区域。
