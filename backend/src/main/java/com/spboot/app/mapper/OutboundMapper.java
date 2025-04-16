package com.spboot.app.mapper;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.spboot.app.pojo.Outbound;
import org.apache.ibatis.annotations.Mapper;

@Mapper
@TableName("用品出库")
public interface OutboundMapper extends BaseMapper<Outbound> {}
