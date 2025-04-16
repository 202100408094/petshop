package com.spboot.app.mapper;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.spboot.app.pojo.Link;
import org.apache.ibatis.annotations.Mapper;

@Mapper
@TableName("友情链接")
public interface LinkMapper extends BaseMapper<Link> {}
