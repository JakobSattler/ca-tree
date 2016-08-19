"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('rxjs/add/operator/map');
var core_1 = require('@angular/core');
var CaTreeModel = (function () {
    function CaTreeModel() {
    }
    CaTreeModel.prototype.hasParent = function (node) {
        return !(!node.parentNr);
    };
    CaTreeModel.prototype.isNodeLeaf = function (node) {
        return this.resources.filter(function (res) { return res.parentNr == node.nr; }).length == 0;
    };
    return CaTreeModel;
}());
exports.CaTreeModel = CaTreeModel;
var NodeFilter = (function () {
    function NodeFilter() {
    }
    NodeFilter.prototype.transform = function (items, field, value) {
        if (!items)
            return [];
        return items.filter(function (it) { return it[field] == value; });
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
//# sourceMappingURL=ca-tree-model.js.map