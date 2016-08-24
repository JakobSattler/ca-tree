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
        this.caTreeService.getNodes().subscribe(function (data) {
            _this.model.resources = data;
        });
    };
    CaTreeComponent.prototype.onNodeSelected = function (node) {
        node.selected = !node.selected;
        this.model.checkChildren(node);
    };
    CaTreeComponent.prototype.onNodeExtended = function (node) {
        console.log(node.extended);
        console.log(node.selected);
        this.model.checkChildren(node);
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