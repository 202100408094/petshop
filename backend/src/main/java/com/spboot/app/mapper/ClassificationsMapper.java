package com.spboot.app.mapper;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.spboot.app.pojo.Classifications;
import org.apache.ibatis.annotations.Mapper;

@Mapper
@TableName("商品分类")
public interface ClassificationsMapper extends BaseMapper<Classifications> {}
