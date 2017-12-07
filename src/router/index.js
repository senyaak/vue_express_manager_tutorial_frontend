"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
//pages
var Authentication_1 = require("./../components/pages/Authentication/Authentication");
vue_1["default"].use(vue_router_1["default"]);
exports["default"] = new vue_router_1["default"]({
    routes: [
        {
            path: "/login",
            name: "Authentication",
            component: Authentication_1["default"]
        }
    ]
});
