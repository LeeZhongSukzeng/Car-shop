// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('./yydb');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
//获取
router.get('/api/getyy', async(req, res) => {
    // 通过模型去查找数据库
    let ret = await models.yyModel.find();
    res.send(ret);
});

router.get('/api/yylist/createYy', async(req, res) => {
    let yylist = [{
        id: 1,
        username: req.query.username,
        phone: req.query.phone,
        yytime: req.query.yytime,
        sqtime: req.query.sqtime
    }]
    models.yyModel.insertMany(yylist, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }

    })
});
// 删除
router.get('/api/delyy', (req, res) => {
    models.yyModel.remove({ _id: req.query._id })
        .then((data) => {
            res.send({ err: 0, msg: 'del ok', data: null })
        })
        .catch((err) => {
            res.send({ err: -1, msg: err._message, data: null })
        })
})

module.exports = router;