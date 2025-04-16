package com.spboot.app.mapper;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.spboot.app.pojo.Pet;
import org.apache.ibatis.annotations.Mapper;

@Mapper
@TableName("宠物信息")
public interface PetMapper extends BaseMapper<Pet> {}
