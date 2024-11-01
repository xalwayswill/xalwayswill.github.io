```
//////////////////////////////////////////////////////////////////////////////////
// Company: Hikvision
// Engineer: xuyinghao
// Create Date: 2020.09.26
// Module Name: ImageDate
// Description:
//  This class is used to generate the iamge data for testbench
//
// Revision:
//   Revision 0.01 - File Created
//
//////////////////////////////////////////////////////////////////////////////////
class ImageData;

    local int image_wide;
    local int image_high;
    local int bit_width;
    local string test_mode;
    int unsigned image_datas[$];

    function new(input int image_wide = 1920, input int image_high = 1080, input int bit_width = 16, input string test_mode = "monobar");
        this.image_wide = image_wide;
        this.image_high = image_high;
        this.bit_width = bit_width;
        this.test_mode = test_mode;
    endfunction : new

    function void get_image();
        case (this.test_mode)
            "colorbar": colorbar();
            "monobar": monobar();
            "oblique_bar": oblique_bar();
            "inc_sequence": inc_sequence();
        endcase
    endfunction : get_image

    extern local function void colorbar();

    extern local function void monobar();

    extern local function void oblique_bar();

    extern local function void inc_sequence();

endclass //IamgeData

function void ImageData::monobar();
    // This function is used to generate the monobar
    int unsigned image_data = 0;

    int block_wide = this.image_wide / 8;
    for (int i = 0; i < this.image_high; i = i + 1) begin
        for (int j = 0; j < this.image_wide; j = j + 1) begin
            image_data = (j/block_wide)*2**(this.bit_width-3);
            this.image_datas.push_back(image_data);
        end
    end
endfunction

function void ImageData::colorbar();
    // This function is used to generate the two line colorbar image data
    int unsigned image_datas1[];
    int unsigned image_datas2[];
    int block_wide;

    image_datas1 = new[this.image_wide];
    image_datas2 = new[this.image_wide];
    image_datas1 = '{default:0};  // image data line 2
    image_datas2 = '{default:0};  // image data line 1
    block_wide = this.image_wide / 8;

    for (int i = 0; i < image_high; i = i + 1) begin
        for (int j = block_wide; j < image_wide; j = j + 1) begin
            if(j < block_wide * 2) begin  // white
                image_datas1[j] = 2**this.bit_width;
                image_datas2[j] = 2**this.bit_width;
            end
            else if(j < block_wide * 3) begin  // red
                if(j % 2 == 0) image_datas1[j] = 2**this.bit_width;
            end
            else if(j < block_wide * 4) begin  // green
                if(j % 2 == 0) image_datas2[j] = 2**this.bit_width;
                else image_datas1[j] = 2**this.bit_width;
            end
            else if(j < block_wide * 5) begin  // blue
                if(j % 2 == 1) image_datas2[j] = 2**this.bit_width;
            end
            else if(j < block_wide * 6) begin  // yellow
                if(j % 2 == 0) begin
                    image_datas1[j] = 2**this.bit_width;
                    image_datas2[j] = 2**this.bit_width;
                end
                else image_datas1[j] = 2**this.bit_width;
            end
            else if(j < block_wide * 7) begin  // magenta
                if(j % 2 == 0) image_datas1[j] = 2**this.bit_width;
                else image_datas2[j] = 2**this.bit_width;
            end
            else begin  //cyan
                if(j % 2 == 0) image_datas2[j] = 2**this.bit_width;
                else begin
                    image_datas1[j] = 2*this.bit_width;
                    image_datas2[j] = 2*this.bit_width;
                end
            end
        end
    end
    this.image_datas = {image_datas1, image_datas2};
endfunction

function void ImageData::oblique_bar();
    // This function is used to generate the increase data oblique monobar
    int unsigned image_data = 0;

    for (int i = 0; i < this.image_high; i = i + 1) begin
        for (int j = 0; j < this.image_wide; j = j + 1) begin
            image_data = i + j;
            if (image_data >= 2**this.bit_width) begin
                image_data -= 2**this.bit_width;
            end
            this.image_datas.push_back(image_data);
        end
    end
endfunction

function void ImageData::inc_sequence();
    // This function is used to generate the increase data sequence
    int unsigned image_data = 0;

    for (int i = 0; i < this.image_high; i = i + 1) begin
        for (int j = 0; j < this.image_wide; j = j + 1) begin
            image_data = image_data + 1;
            if (image_data == 2**this.bit_width) begin
                image_data -= 2**this.bit_width;
            end
            this.image_datas.push_back(image_data);
        end
    end
endfunction
```
