package com.spboot.app.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jntoo.db.DB;
import java.io.Serializable;
import java.util.*;

@TableName("progress")
public class Progress implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Integer id;

    private String orders;

    private Double money;

    private String address;

    private String phone;

    private String fullname;

    private String notes;

    private String userss;

    private String state;

    private String addtime;
    private String iszf;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getShipmentCount() {
        return DB.name("shipment").where("progressid", id).count();
    }

    public Long getSignforCount() {
        return DB.name("signfor").where("progressid", id).count();
    }

    public Long getCancelCount() {
        return DB.name("cancel").where("progressid", id).count();
    }

    public String getOrders() {
        return orders;
    }

    public void setOrders(String orders) {
        this.orders = orders == null ? "" : orders.trim();
    }

    public List<Progressmerchbill> getMerchbillList() {
        return DB.name(Progressmerchbill.class).where("progressid", id).order("id asc").select();
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

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes == null ? "" : notes.trim();
    }

    public String getUserss() {
        return userss;
    }

    public void setUserss(String userss) {
        this.userss = userss == null ? "" : userss.trim();
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state == null ? "" : state.trim();
    }

    public String getAddtime() {
        return addtime;
    }

    public void setAddtime(String addtime) {
        this.addtime = addtime == null ? "" : addtime.trim();
    }

    public String getIszf() {
        return iszf;
    }

    public void setIszf(String iszf) {
        this.iszf = iszf == null ? "" : iszf.trim();
    }
}
