package com.spboot.app.mapper;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.spboot.app.pojo.Staff;
import org.apache.ibatis.annotations.Mapper;

@Mapper
@TableName("员工")
public interface StaffMapper extends BaseMapper<Staff> {}
