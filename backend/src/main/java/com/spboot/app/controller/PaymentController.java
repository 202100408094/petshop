package com.spboot.app.controller;

import com.alibaba.fastjson.JSON;
import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.jntoo.db.DB;
import com.spboot.app.pojo.*;
import com.spboot.app.utils.Base64Utils;
import com.spboot.app.utils.JwtTokenUtils;
import com.spboot.app.utils.R;
import io.swagger.annotations.Api;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = { "支付" })
@RestController
@RequestMapping("/api")
public class PaymentController {

    @Resource
    HttpServletRequest request;

    /**
     * 处理支付
     * @return String
     */
    @RequestMapping("/payment")
    public String payment() {
        String id, biao;
        if (request.getParameter("out_trade_no") != null) {
            String[] out_trade_no = request.getParameter("out_trade_no").split("\\-");
            id = out_trade_no[2];
            biao = out_trade_no[1];
        } else {
            id = request.getParameter("id");
            biao = request.getParameter("biao");
        }

        String sql = "update " + biao + " set iszf='是' where id='" + id + "'";
        DB.execute(sql);
        if ("progress".equals(biao)) {
            Progress order = DB.name(Progress.class).find(id);
            DB.execute("UPDATE progress SET state = '待发货' WHERE id='" + order.getId() + "'");

            DB.execute("UPDATE goods AS s, progressmerchbill AS ds SET s.volume = s.volume+ds.quantity WHERE s.id=ds.goodsid AND ds.progressid='"+order.getId()+"'");

            DB.execute("UPDATE goods AS s, progressmerchbill AS ds SET s.inventory = s.inventory-ds.quantity WHERE s.id=ds.goodsid AND ds.progressid='"+order.getId()+"'");
        }

        if ("reservation".equals(biao)) {
            Reservation order = DB.name(Reservation.class).find(id);
            DB.execute("UPDATE reservation SET state = '待安排' WHERE id='" + order.getId() + "'");
        }

        if (request.getParameter("out_trade_no") != null) {
            return "<script>\n" + "    window.opener.postMessage(\"payment-success\" , \"*\");\n" + "    window.close();\n" + "</script>";
        }

        return JSON.toJSONString(R.success("ok"));
    }
}
