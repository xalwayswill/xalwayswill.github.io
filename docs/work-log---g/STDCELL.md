[Standard Cells in ASIC Design | Standard Cells in VLSI](https://teamvlsi.com/2020/05/standard-cells-in-asic-design-standard-cells-in-vlsi.html)

**Standard cells are well defined and pre-characterized cells used in ASIC (Application Specific  Integrated Circuit) Design flow as basic building blocks. All these cells are equal in height and can easily fit into the standard cell row. Standards cells are highly reusable and save lots of ASIC design time.**

* Standard Cell Layout
**All the Standard cells are in equal in height and varying width**. Main characteristics of a standard cell have been explained with the help of the following figure.

* Tracks in standard cells:
Track can be defined as a line on which metal layers are drawn. A track means one M1 Pitch. Height of Standard cell is generally measured in term of no. of tracks inside it. like a 6T standard cell means that the height of the standard cell is 6 Track of M1. An example of 13T standard cell is given below in figure-5.
Generally, there are various sets of standard cell library having different track size of standard cells. Depending on the use of ASIC, track height a standard library has selected. There are generally three sets of standard cell library characterized as small transistor standard cell, large transistors standard cell and medium transistor standard cell. An example for 6T, 12T and 9T size standard cells are shown below.
Small transistor standard cells are used for high-density design and these cells having low power consumption. Large transistors standard cells large area but having very good performance. Medium transistors standard cells have a balance between large transistors and small transistors. So there is a tradeoff between area/power vs performance. A comparison has been shown below in figure-7.

Standard cell的高度一般用track的数量来定义的，即这个cell高度中有能包含多少track，一般用Metal 1 layer的track来定义，6.5T代表可以包含6.5条track，最小的单位就是0.5T，这个是由于有时候中间有接触孔导致会多占据半个track的大小。
同一个库的stdcell高度都是一致的，长度可以不一致c30,c40什么的，宽度越大速度越快但是面积越大，长度越大速度越慢，漏电越小
