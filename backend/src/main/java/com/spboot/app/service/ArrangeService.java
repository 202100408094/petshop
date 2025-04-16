package com.spboot.app.service;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.lang.PatternPool;
import cn.hutool.core.lang.Validator;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.jntoo.db.DB;
import com.jntoo.db.utils.Convert;
import com.jntoo.db.utils.StringUtil;
import com.spboot.app.mapper.ArrangeMapper;
import com.spboot.app.pojo.Arrange;
import com.spboot.app.utils.*;
import java.io.File;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.util.*;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class ArrangeService {

    // 获取数据库操作类mapper
    @Resource
    private ArrangeMapper mapper;

    /**
     *  根据id 获取一行数据
     */
    public R<Arrange> findById(Integer id) {
        return R.success(mapper.selectById(id));
    }

    /**
     *  根据Wrapper 对象进行数据筛选
     */
    public R<List<Arrange>> selectAll(Wrapper<Arrange> query) {
        return R.success(mapper.selectList(query));
    }

    /**
     *  直接筛选所有数据
     */
    public R<List<Arrange>> selectAll() {
        QueryWrapper<Arrange> wrapper = Wrappers.query();
        wrapper.orderByDesc("id");
        return selectAll(wrapper);
    }

    /**
     *  根据map 条件筛选数据
     *
     */
    public R selectAll(Map<String, Object> map) {
        // 获取筛选数据
        SelectPage selectPage = new SelectPage(map, 10, "id", "DESC");
        // 将提交的参数转换成 mybatisplus 的QueryWrapper 筛选数据对象，执行动态查询
        QueryWrapper<Arrange> wrapper = mapToWrapper(map);
        // 设置排序
        wrapper.orderBy(true, selectPage.isAsc(), selectPage.getOrderby());
        return selectAll(wrapper);
    }

    /**
     *  根据map 条件筛选数据并分页
     *
     */
    public R selectPages(Map<String, Object> map) {
        // 获取筛选数据
        SelectPage selectPage = new SelectPage(map, 10, "id", "DESC");
        // 将提交的参数转换成 mybatisplus 的QueryWrapper 筛选数据对象，执行动态查询
        QueryWrapper<Arrange> wrapper = mapToWrapper(map);
        // 设置排序
        wrapper.orderBy(true, selectPage.isAsc(), selectPage.getOrderby());
        // 设置分页数据
        Page page = new Page(selectPage.getPage(), selectPage.getPagesize());
        return selectPages(wrapper, page);
    }

    /**
     *  根据map 条件筛选userss字段等于session.username的数据并分页
     *
     */
    public R selectPagesUserss(Map<String, Object> map) {
        // 获取前端给到列表基础参数
        SelectPage selectPage = new SelectPage(map, 10, "id", "DESC");
        // 将map参数转换为mybatis-plus的QueryWrapper类
        QueryWrapper<Arrange> wrapper = mapToWrapper(map);
        // 设置为当前角色
        wrapper.eq("userss", SessionFactory.getUsername());
        wrapper.orderBy(true, selectPage.isAsc(), selectPage.getOrderby());
        Page page = new Page(selectPage.getPage(), selectPage.getPagesize());
        return selectPages(wrapper, page);
    }

    /**
     *   将提交的参数转换成 mybatisplus 的QueryWrapper 筛选数据对象
     */
    public QueryWrapper<Arrange> mapToWrapper(Map<String, Object> map) {
        // 创建 QueryWrapper 对象
        QueryWrapper<Arrange> wrapper = Wrappers.query();

        String where = " 1=1 ";
        // 以下是判断搜索框中是否有输入内容，判断是否前台是否有填写相关条件，符合则写入sql搜索语句

        // 判断URL 参数reservationid是否大于0
        if (!StringUtil.isNullOrEmpty(map.get("reservationid")) && Convert.toInt(map.get("reservationid")) > 0) {
            // 大于0 则写入条件
            wrapper.eq("reservationid", map.get("reservationid"));
        }

        if (!StringUtil.isNullOrEmpty(map.get("title"))) {
            wrapper.like("title", map.get("title"));
        }
        if (!StringUtil.isNullOrEmpty(map.get("numbers"))) {
            wrapper.like("numbers", map.get("numbers"));
        }
        if (!StringUtil.isNullOrEmpty(map.get("type"))) {
            wrapper.eq("type", map.get("type"));
        }
        if (!StringUtil.isNullOrEmpty(map.get("numberss"))) {
            wrapper.like("numberss", map.get("numberss"));
        }
        if (!StringUtil.isNullOrEmpty(map.get("times_start"))) {
            wrapper.ge("times", map.get("times_start"));
        }
        if (!StringUtil.isNullOrEmpty(map.get("times_end"))) {
            wrapper.le("times", map.get("times_end"));
        }
        if (!StringUtil.isNullOrEmpty(map.get("number1"))) {
            wrapper.like("number1", map.get("number1"));
        }

        if (map.containsKey("session_name")) {
            wrapper.eq(map.get("session_name").toString(), SessionFactory.getUsername());
        }

        wrapper.apply(where);
        return wrapper;
    }

    public R selectPages(QueryWrapper<Arrange> wrapper, IPage page) {
        Map result = new HashMap();
        result.put("lists", mapper.selectPage(page, wrapper));

        return R.success(result);
    }

    /**
     * 插入用户数据
     * @param entityData 插入的对象
     * @param post 提交的数据
     * @return 是否处理成功
     */
    public R insert(Arrange entityData, Map post) {
        // 判断是否有填写安排时间。
        if (StringUtil.isNullOrEmpty(post.get("times"))) {
            return R.error("请填写安排时间");
        }
        // 判断是否有填写服务人员。
        if (StringUtil.isNullOrEmpty(post.get("staff"))) {
            return R.error("请填写服务人员");
        }

        Info.handlerNullEntity(entityData);

        entityData.setId(null);
        mapper.insert(entityData);
        if (entityData.getId() != null) {
            Integer charuid = entityData.getId();
            DB.execute(
                "UPDATE reservation SET state = '待服务', number1 = '" +
                post.get("number1") +
                "', names = '" +
                post.get("names") +
                "', date = '" +
                post.get("times") +
                "' WHERE id='" +
                post.get("reservationid") +
                "'"
            );

            return findById(entityData.getId());
        } else {
            return R.error("插入错误");
        }
    }

    /**
     * 根据id进行更新服务安排数据
     * @param entityData 更新的数据
     * @param post 提交的数据
     * @return 是否处理成功
     */
    public R<Object> update(Arrange entityData, Map post) {
        // 判断是否有填写安排时间。
        if (StringUtil.isNullOrEmpty(post.get("times"))) {
            return R.error("请填写安排时间");
        }
        // 判断是否有填写服务人员。
        if (StringUtil.isNullOrEmpty(post.get("staff"))) {
            return R.error("请填写服务人员");
        }

        mapper.updateById(entityData);

        return R.success(mapper.selectById(entityData.getId()));
    }

    /**
     * 根据 id列表 删除
     * @param ids  id 列表值
     * @return 是否成功
     */
    public R<Object> delete(List<Integer> ids) {
        try {
            for (Integer id : ids) {
                delete(id);
            }
            return R.success("操作成功");
        } catch (Exception e) {
            return R.error("操作失败");
        }
    }

    /**
     * 根据 id 删除
     * @param id  id 列表值
     * @return 是否成功
     */
    public R<Object> delete(Integer id) {
        try {
            mapper.deleteById(id);

            return R.success("操作成功");
        } catch (Exception e) {
            return R.error("操作失败");
        }
    }
}
