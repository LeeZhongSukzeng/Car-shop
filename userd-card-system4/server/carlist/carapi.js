// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('./cardb');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

router.get('/api/carlist/getcarlist', async(req, res) => {
    let ret = await models.carModel.findOne({
        typeId: req.query.typeid
    });
    res.send(ret);
})

router.get('/api/carlist/createAccount', async(req, res) => {
    let carList = [{
        typeId: req.query.typeid,
        typeName: req.query.typename
    }]
    let itemarry = await models.carModel.
    models.carModel.insertMany(carList, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }

    })
});

module.exports = router;