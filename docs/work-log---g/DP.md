## 1. Link Training
   * CR_DONE会根据 TPS1 码型的识别以及 PHY 的 CDR_READY 信号去判断，如果CR_DONE训练失败会根据Sink端ADJUST_REQUEST_LANEx_y去调整voltage swing或者pre-emphasis（协议要求两个相加不能大于3），当volatage swing达到最大值或者其AUX_ACK达到次数考虑降低link_rate重新训练
   * EQ_DONE 会在CR_DONE的训练基础上去判断，失败时会判断是否还有lane的CR_DONE保持着，如果有就在此基础上降低lane数重新CR training，否则就降低速率并调整到满足带宽要求的lane数重新进行CR training。
   * 感觉CR阶段更优先考虑增加voltage swing或者降低link rate，因为时钟没有锁定和干扰关系不大，很可能就是链路跑不到对应频率，EQ阶段则是考虑优先降低lane数，因为CR_DONE表示速率是能跑断，但是可能因为lane数过多导致串扰过大，降低lane数能够有效减少串扰
