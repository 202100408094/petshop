package com.spboot.app.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.jntoo.db.DB;
import com.jntoo.db.utils.StringUtil;
import com.spboot.app.config.Configure;
import com.spboot.app.mapper.Float1Mapper;
import com.spboot.app.pojo.Float1;
import com.spboot.app.service.Float1Service;
import com.spboot.app.utils.R;
import com.spboot.app.utils.SessionFactory;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Api(tags = { "轮播图控制器" })
@RestController
@RequestMapping("/api/float1")
public class Float1Controller {

    @Autowired
    public Float1Service float1Service;

    @ApiOperation(value = "获取全部轮播图", httpMethod = "GET")
    @RequestMapping("/selectAll")
    public R<List<Float1>> selectAll() {
        return float1Service.selectAll();
    }

    @ApiOperation(value = "根据条件筛选获取管理员列表，并分页", httpMethod = "POST")
    @RequestMapping("/selectPages")
    public R selectPages(@RequestBody Map<String, Object> req) {
        return float1Service.selectPages(req);
    }

    @ApiOperation(value = "根据id获取信息", httpMethod = "GET")
    @RequestMapping("/findById")
    @ApiImplicitParam(name = "id", value = "轮播图对应的id", dataType = "Integer")
    public R findById(@RequestParam Integer id) {
        return float1Service.findById(id);
    }

    @ApiOperation(value = "根据id更新数据", httpMethod = "POST")
    @RequestMapping("/update")
    @ApiImplicitParam(name = "data", value = "使用json数据提交", type = "json", dataTypeClass = Float1.class, paramType = "body")
    public R update(@RequestBody Map data) {
        Float1 post = BeanUtil.mapToBean(data, Float1.class, true);
        return float1Service.update(post, data);
    }

    @ApiOperation(value = "插入一行数据，返回插入后的点赞", httpMethod = "POST")
    @RequestMapping("/insert")
    @ApiImplicitParam(name = "data", value = "使用json数据提交", type = "json", dataTypeClass = Float1.class, paramType = "body")
    public R insert(@RequestBody Map data) {
        Float1 post = BeanUtil.mapToBean(data, Float1.class, true);
        return float1Service.insert(post, data);
    }

    @ApiOperation(value = "根据id列表删除数据", httpMethod = "POST")
    @RequestMapping("/delete")
    @ApiImplicitParam(name = "id", value = "轮播图对应的id", type = "json", dataTypeClass = List.class)
    public R delete(@RequestBody List<Integer> id) {
        return float1Service.delete(id);
    }
}
