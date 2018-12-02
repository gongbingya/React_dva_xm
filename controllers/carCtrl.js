var fs = require('fs');
var path = require("path");
var Car = require("../models/Car.js");
// 显示指定ID的汽车信息
exports.showCarInfo = function(req,res){
    // 得到orderId
    var orderId = req.params.orderId;
    Car.find({"id":orderId},function(err,docs){
        res.json({
            "result":docs[0]
        })
    })
}

exports.showCarImages = function(req,res){
    // 得到orderId
    var orderId = req.params.orderId;
    // 这量车的文件夹地址
    var picurl = path.resolve(__dirname,"../www/carimages/" + orderId);
    // 读取4个文件夹， readdirSync 表示同步读取文件夹里面的文件名字
    var engine = fs.readdirSync(picurl + "/engine");
    var inner = fs.readdirSync(picurl + "/inner");
    var more = fs.readdirSync(picurl + "/more");
    var view = fs.readdirSync(picurl + "/view");

    res.json({
        "images":{
            engine,
            inner,
            more,
            view
        }
    })
}

exports.showCarlike = function(req,res){
    // 得到orderId
    var orderId = req.params.orderId;
    // 先去找这个id的车的brand和series;
    Car.find({"id":orderId},function(err,docs){
        var brand = docs[0].brand;
        var series = docs[0].series;
        // 然后寻找和他一样的车
        Car.find({brand,series},function(err,docs){
            res.json({
                "results":docs
            });
        })
    })
}