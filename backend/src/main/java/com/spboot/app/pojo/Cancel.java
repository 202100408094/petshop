package com.spboot.app.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jntoo.db.DB;
import java.io.Serializable;
import java.util.*;

@TableName("cancel")
public class Cancel implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Integer id;

    private Integer progressid;

    private String orders;

    private Double money;

    private String address;

    private String phone;

    private String fullname;

    private String userss;

    private String reason;

    private String addtime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getProgressid() {
        return progressid;
    }

    public void setProgressid(Integer progressid) {
        this.progressid = progressid == null ? 0 : progressid;
    }

    public String getOrders() {
        return orders;
    }

    public void setOrders(String orders) {
        this.orders = orders == null ? "" : orders.trim();
    }

    public List<Cancelmerchbill> getMerchbillList() {
        return DB.name(Cancelmerchbill.class).where("cancelid", id).order("id asc").select();
    }

    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money == null ? 0.0f : money;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? "" : address.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? "" : phone.trim();
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname == null ? "" : fullname.trim();
    }

    public String getUserss() {
        return userss;
    }

    public void setUserss(String userss) {
        this.userss = userss == null ? "" : userss.trim();
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason == null ? "" : reason.trim();
    }

    public String getAddtime() {
        return addtime;
    }

    public void setAddtime(String addtime) {
        this.addtime = addtime == null ? "" : addtime.trim();
    }
}
