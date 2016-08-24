"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ca_tree_service_1 = require('../../services/ca-tree.service');
var ca_tree_node_component_1 = require('./ca-tree-node/ca-tree-node.component');
var ca_tree_mvc_model_1 = require('./ca-tree-node/ca-tree-mvc-model');
var CaTreeComponent = (function () {
    function CaTreeComponent(caTreeService) {
        this.caTreeService = caTreeService;
    }
    CaTreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = new ca_tree_mvc_model_1.CaTreeMvcModel();
        //load root + next level to show proper icon
        this.caTreeService.getNodes().subscribe(function (data) {
            var _loop_1 = function(d1) {
                _this.model.resources.push(d1);
                for (var _i = 0, _a = data.filter(function (res) { return res.parentNr === d1.nr; }); _i < _a.length; _i++) {
                    var d2 = _a[_i];
                    _this.model.resources.push(d2);
                }
            };
            for (var _b = 0, _c = data.filter(function (res) { return !res.parentNr; }); _b < _c.length; _b++) {
                var d1 = _c[_b];
                _loop_1(d1);
            }
        });
    };
    CaTreeComponent.prototype.onNodeSelected = function (node) {
        node.selected = !node.selected;
        this.model.checkChildren(node);
    };
    CaTreeComponent.prototype.onNodeExtended = function (node) {
        this.loadChildren(node);
        node.extended = !node.extended;
    };
    CaTreeComponent.prototype.loadChildren = function (node) {
        var _this = this;
        //load children + next level to load proper icon
        this.caTreeService.getNodes().subscribe(function (data) {
            var _loop_2 = function(d1) {
                if (!_this.model.containsNode(d1)) {
                    _this.model.resources.push(d1);
                }
                for (var _i = 0, _a = data.filter(function (res) { return res.parentNr === d1.nr; }); _i < _a.length; _i++) {
                    var d2 = _a[_i];
                    if (!_this.model.containsNode(d2)) {
                        _this.model.resources.push(d2);
                    }
                }
            };
            for (var _b = 0, _c = data.filter(function (res) { return res.parentNr === node.nr; }); _b < _c.length; _b++) {
                var d1 = _c[_b];
                _loop_2(d1);
            }
        });
    };
    CaTreeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ca-tree',
            templateUrl: 'ca-tree.component.html',
            directives: [ca_tree_node_component_1.CaTreeNodeComponent],
            providers: [ca_tree_service_1.CaTreeService],
            styles: ["\n    div {\n      padding-left: 10px;\n    }\n  "],
            pipes: [ca_tree_mvc_model_1.NodeFilter]
        })
    ], CaTreeComponent);
    return CaTreeComponent;
}());
exports.CaTreeComponent = CaTreeComponent;
//# sourceMappingURL=ca-tree.component.js.map