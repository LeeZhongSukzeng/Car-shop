// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('./tousudb');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

router.get('/api/tousu/gettousulist', async(req, res) => {
    let ret = await models.tousuModel.find();
    res.send(ret);
});

router.get('/api/tousu/createtousu', async(req, res) => {
    let tousuList = [{
        danhao: req.query.danhao, //订单号
        tscontent: req.query.tscontent, //投诉内容
        tstime: req.query.tstime, //投诉时间
        user: req.query.user, //投诉人
        fbtime: req.query.fbtime //发布时间
    }];
    models.tousuModel.insertMany(tousuList, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
});
// 删除
router.get('/api/tousu/deltousu', async (req, res) => {
    models.tousuModel.remove({ _id: req.query._id })
        .then((data) => {
            res.send({ err: 0, msg: 'del ok', data: null })
        })
        .catch((err) => {
            res.send({ err: -1, msg: err._message, data: null })
        })
})
module.exports = router;