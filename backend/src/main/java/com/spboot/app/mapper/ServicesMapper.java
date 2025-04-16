package com.spboot.app.mapper;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.spboot.app.pojo.Services;
import org.apache.ibatis.annotations.Mapper;

@Mapper
@TableName("宠物服务")
public interface ServicesMapper extends BaseMapper<Services> {}
