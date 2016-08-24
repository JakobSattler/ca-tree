"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('rxjs/add/operator/map');
var core_1 = require('@angular/core');
var CaTreeMvcModel = (function () {
    function CaTreeMvcModel() {
    }
    CaTreeMvcModel.prototype.getNode = function (nr) {
        var result = this.resources.filter(function (res) { return res.nr === nr; });
        if (result.length === 1) {
            return result[0];
        }
        else {
            return null;
        }
    };
    CaTreeMvcModel.prototype.removeNode = function (node) {
        //Pre-order through node-numbers
        var nrs = new Array();
        nrs.push(node.nr);
        var nr;
        while (nrs.length > 0) {
            nr = nrs.pop();
            var deleteIndex = this.resources.indexOf(this.getNode(nr));
            this.resources.splice(deleteIndex, 1);
            var children = this.resources.filter(function (res) { return res.parentNr === nr; });
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var child = children_1[_i];
                nrs.push(child.nr);
            }
        }
    };
    CaTreeMvcModel.prototype.isNodeLeaf = function (node) {
        return this.resources.filter(function (res) { return res.parentNr === node.nr; }).length === 0;
    };
    CaTreeMvcModel.prototype.addNode = function (res) {
        this.resources.push(res);
    };
    CaTreeMvcModel.prototype.getNewID = function () {
        var max = Math.max.apply(Math, this.resources.map(function (res) {
            return res.nr;
        }));
        return max + 1;
    };
    CaTreeMvcModel.prototype.checkChildren = function (node) {
        var _this = this;
        var showedNodes = this.resources.filter(function (res) { return res.extended || (_this.getNode(res.parentNr) != null && _this.getNode(res.parentNr).extended); });
        var selected = node.selected;
        //Pre-order through node-numbers
        var nrs = new Array();
        nrs.push(node.nr);
        var nr;
        while (nrs.length > 0) {
            nr = nrs.pop();
            this.getNode(nr).selected = selected;
            this.checkParents(this.getNode(nr), showedNodes);
            var children = showedNodes.filter(function (res) { return res.parentNr === nr; });
            for (var _i = 0, children_2 = children; _i < children_2.length; _i++) {
                var child = children_2[_i];
                nrs.push(child.nr);
            }
        }
    };
    CaTreeMvcModel.prototype.checkParents = function (node, showedNodes) {
        var parentNr = node.nr;
        node.childSelected = !node.childSelected;
        console.log(parentNr);
        while (parentNr) {
            var parentNode = this.getNode(parentNr);
            if (parentNode != null) {
                if (node.selected && !parentNode.childSelected) {
                    parentNode.childSelected = true;
                }
                else if (!node.selected && !(this.areChildrenSelected(parentNode, showedNodes))) {
                    parentNode.childSelected = false;
                }
                parentNr = parentNode.parentNr;
            }
            else {
                parentNr = null;
            }
        }
    };
    CaTreeMvcModel.prototype.areChildrenSelected = function (node, showedNodes) {
        if (node === null) {
            return;
        }
        //Pre-order through node-numbers
        var nodes = new Array();
        nodes.push(node);
        while (nodes.length > 0) {
            node = nodes.pop();
            var children = showedNodes.filter(function (res) { return res.parentNr === node.nr; });
            for (var _i = 0, children_3 = children; _i < children_3.length; _i++) {
                var child = children_3[_i];
                if (child.selected) {
                    return true;
                }
                nodes.push(child);
            }
        }
        return false;
    };
    return CaTreeMvcModel;
}());
exports.CaTreeMvcModel = CaTreeMvcModel;
var NodeFilter = (function () {
    function NodeFilter() {
    }
    NodeFilter.prototype.transform = function (items, field, value) {
        if (!items) {
            return [];
        }
        return items.filter(function (it) { return it[field] === value; });
    };
    NodeFilter = __decorate([
        core_1.Pipe({
            name: 'nodefilter',
            pure: false
        }),
        core_1.Injectable()
    ], NodeFilter);
    return NodeFilter;
}());
exports.NodeFilter = NodeFilter;
//# sourceMappingURL=ca-tree-mvc-model.js.map