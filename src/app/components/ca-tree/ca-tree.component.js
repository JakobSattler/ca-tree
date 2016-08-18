"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ca_tree_service_1 = require('../../services/ca-tree.service');
var ca_tree_node_component_1 = require('../ca-tree-node/ca-tree-node.component');
var ca_tree_model_1 = require('../ca-tree-node/ca-tree-model');
var ca_tree_node_model_1 = require('../ca-tree-node/ca-tree-node-model');
var CaTreeComponent = (function () {
    function CaTreeComponent(treeService) {
        this.treeService = treeService;
    }
    CaTreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = new ca_tree_model_1.CaTreeModel();
        this.treeService.getNodes().subscribe(function (data) {
            console.log('data: ' + data);
            _this.model.resources = data;
            console.log('resources: ' + _this.model.resources);
            console.log(typeof _this.model.resources);
            //this.parseData(data);
        });
    };
    CaTreeComponent.prototype.parseData = function (data) {
        //console.log(node.name);
        //for (let n of node.children) {
        //  this.checkChildren(n);
        //}
        //
        //if (data == null) {
        //  return;
        //}
        //let nodes: CaTreeNodeModel[] = [];
        //nodes.push(node);
        //
        //while (nodes.length > 0) {
        //  node = nodes[nodes.length - 1];
        //  nodes.splice(nodes.length - 1, 1);
        //  console.log(node.name);
        //  for (let n of node.children) {
        //    nodes.push(n);
        //  }
        //}
        var nodes = [];
        nodes.push(new ca_tree_node_model_1.CaTreeNodeModel(data.name, data.nr, data.children));
        console.log(nodes);
        while (nodes.length > 0) {
            data = nodes[nodes.length - 1];
            nodes.splice(nodes.length - 1, 1);
            console.log(data.name);
            for (var _i = 0, _a = data.children; _i < _a.length; _i++) {
                var n = _a[_i];
                nodes.push(n);
            }
        }
        //while(nodes.length > 0){
        //  data = nodes.pop();
        //  console.log(data.name);
        //  for(let n of data.children){
        //    data.children.push(new CaTreeNodeModel(n.name, n.nr, null));
        //    nodes.push(n);
        //  }
        //}
    };
    CaTreeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ca-tree',
            templateUrl: 'ca-tree.component.html',
            directives: [ca_tree_node_component_1.CaTreeNodeComponent],
            providers: [ca_tree_service_1.CaTreeService],
            styles: ["\n    div {\n      padding-left: 10px;\n    }\n  "]
        })
    ], CaTreeComponent);
    return CaTreeComponent;
}());
exports.CaTreeComponent = CaTreeComponent;
//# sourceMappingURL=ca-tree.component.js.map