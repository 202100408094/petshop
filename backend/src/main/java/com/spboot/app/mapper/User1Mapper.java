package com.spboot.app.mapper;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.spboot.app.pojo.User1;
import org.apache.ibatis.annotations.Mapper;

@Mapper
@TableName("用户")
public interface User1Mapper extends BaseMapper<User1> {}
