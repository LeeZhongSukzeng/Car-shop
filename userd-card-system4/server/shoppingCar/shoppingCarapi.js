// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('./shoppingCardb');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
//获取
router.get('/api/getShopCar', async(req, res) => {
    // 通过模型去查找数据库
    let ret = await models.shopcarModel.find();
    res.send(ret);
});
router.get('/api/delShopCar', async(req, res) => {
    models.shopcarModel.remove({ _id: req.query._id })
        .then((data) => {
            res.send({ err: 0, msg: 'del ok', data: null })
        })
        .catch((err) => {
            res.send({ err: -1, msg: err._message, data: null })
        })
});
router.get('/api/addshopcar', async(req, res) => {
    let shopcarlist = [{
        id: req.query.id,
        pinpai: req.query.pinpai,
        color: req.query.color,
        year: req.query.year,
        leixing: req.query.leixing,
        yuanjia: req.query.yuanjia,
        xianjia: req.query.xianjia,
        decs: req.query.decs,
        imgUrl: req.query.imgUrl
    }]
    models.shopcarModel.insertMany(shopcarlist, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }

    })
});

module.exports = router;