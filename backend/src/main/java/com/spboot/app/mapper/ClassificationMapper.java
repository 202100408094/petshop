package com.spboot.app.mapper;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.spboot.app.pojo.Classification;
import org.apache.ibatis.annotations.Mapper;

@Mapper
@TableName("资讯分类")
public interface ClassificationMapper extends BaseMapper<Classification> {}
