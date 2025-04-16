package com.spboot.app.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.jntoo.db.DB;
import com.jntoo.db.utils.StringUtil;
import com.spboot.app.config.Configure;
import com.spboot.app.mapper.PetlnformationMapper;
import com.spboot.app.pojo.Petlnformation;
import com.spboot.app.service.PetlnformationService;
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

@Api(tags = { "宠物资讯控制器" })
@RestController
@RequestMapping("/api/petlnformation")
public class PetlnformationController {

    @Autowired
    public PetlnformationService petlnformationService;

    @ApiOperation(value = "获取全部宠物资讯", httpMethod = "GET")
    @RequestMapping("/selectAll")
    public R<List<Petlnformation>> selectAll() {
        return petlnformationService.selectAll();
    }

    @ApiOperation(value = "根据条件筛选获取管理员列表，并分页", httpMethod = "POST")
    @RequestMapping("/selectPages")
    public R selectPages(@RequestBody Map<String, Object> req) {
        return petlnformationService.selectPages(req);
    }

    @ApiOperation(value = "根据条件筛选获取发布人字段值为当前用户列表并分页", httpMethod = "POST")
    @RequestMapping("/selectPublisher")
    public R selectPublisher(@RequestBody Map<String, Object> req) {
        return petlnformationService.selectPagesPublisher(req);
    }

    @ApiOperation(value = "根据id获取信息", httpMethod = "GET")
    @RequestMapping("/findById")
    @ApiImplicitParam(name = "id", value = "宠物资讯对应的id", dataType = "Integer")
    public R findById(@RequestParam Integer id) {
        return petlnformationService.findById(id);
    }

    @ApiOperation(value = "根据id更新数据", httpMethod = "POST")
    @RequestMapping("/update")
    @ApiImplicitParam(name = "data", value = "使用json数据提交", type = "json", dataTypeClass = Petlnformation.class, paramType = "body")
    public R update(@RequestBody Map data) {
        Petlnformation post = BeanUtil.mapToBean(data, Petlnformation.class, true);
        return petlnformationService.update(post, data);
    }

    @ApiOperation(value = "插入一行数据，返回插入后的点赞", httpMethod = "POST")
    @RequestMapping("/insert")
    @ApiImplicitParam(name = "data", value = "使用json数据提交", type = "json", dataTypeClass = Petlnformation.class, paramType = "body")
    public R insert(@RequestBody Map data) {
        Petlnformation post = BeanUtil.mapToBean(data, Petlnformation.class, true);
        return petlnformationService.insert(post, data);
    }

    @ApiOperation(value = "根据id列表删除数据", httpMethod = "POST")
    @RequestMapping("/delete")
    @ApiImplicitParam(name = "id", value = "宠物资讯对应的id", type = "json", dataTypeClass = List.class)
    public R delete(@RequestBody List<Integer> id) {
        return petlnformationService.delete(id);
    }

    @ApiOperation(value = "前端详情触发后", httpMethod = "POST")
    @RequestMapping("/detailWeb")
    public R detailWeb(@RequestBody Map<String, Object> post) {
        Petlnformation map = DB.name(Petlnformation.class).find(post.get("id"));
        DB.execute("UPDATE petlnformation SET rate = rate+1 WHERE id=" + post.get("id") + "");

        return R.ok();
    }
}
