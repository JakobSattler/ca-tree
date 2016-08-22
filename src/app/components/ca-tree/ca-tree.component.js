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
var ca_tree_model_1 = require('./ca-tree-node/ca-tree-model');
var CaTreeComponent = (function () {
    function CaTreeComponent(caTreeService) {
        this.caTreeService = caTreeService;
    }
    CaTreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = new ca_tree_model_1.CaTreeModel();
        this.caTreeService.getNodes().subscribe(function (data) {
            _this.model.resources = data;
        });
    };
    CaTreeComponent.prototype._onNodeSelected = function (node) {
        this._checkChildren(node);
    };
    CaTreeComponent.prototype._checkChildren = function (node) {
        var _this = this;
        if (node === null) {
            return;
        }
        this._checkParents(node);
        var selected = node.selected;
        //Pre-order through node-numbers
        var nrs = new Array();
        nrs.push(node.nr);
        var nr;
        while (nrs.length > 0) {
            nr = nrs.pop();
            var children = this.model.resources.filter(function (res) { return res.parentNr === nr; });
            children.forEach(function (child, index) {
                child.selected = !selected;
                // Check parents for each child
                _this._checkParents(child);
                nrs.push(child.nr);
            });
        }
    };
    CaTreeComponent.prototype._checkParents = function (node) {
        //console.log('checking parents for node: {name: ' + node.name + ', id: ' + node.nr + '}');
        var parentNr = node.parentNr;
        node.childSelected = !node.childSelected;
        while (parentNr) {
            var parentNode = this.model.resources.filter(function (res) { return res.nr === parentNr; })[0];
            //console.log('parent: {name: ' + parentNode.name + ', id: ' + parentNode.nr + '}');
            if (node.selected && !parentNode.childSelected) {
                parentNode.childSelected = true;
            }
            else if (!node.selected && this.model.resources.filter(function (res) { return res.nr === parentNr && res.selected; }).length === 0) {
                parentNode.childSelected = false;
            }
            //parentNode.childSelected = !parentNode.childSelected;
            parentNr = parentNode.parentNr;
        }
    };
    CaTreeComponent.prototype._areChildrenSelected = function (node) {
        if (node === null) {
            return;
        }
        //Pre-order through node-numbers
        var nodes = new Array();
        nodes.push(node);
        while (nodes.length > 0) {
            node = nodes.pop();
            var children = this.model.resources.filter(function (res) { return res.parentNr === node.nr; });
            children.forEach(function (child, index) {
                if (child.selected) {
                    return true;
                }
                nodes.push(child);
            });
        }
        return false;
    };
    CaTreeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ca-tree',
            templateUrl: 'ca-tree.component.html',
            directives: [ca_tree_node_component_1.CaTreeNodeComponent],
            providers: [ca_tree_service_1.CaTreeService],
            styles: ["\n    div {\n      padding-left: 10px;\n    }\n  "],
            pipes: [ca_tree_model_1.NodeFilter]
        })
    ], CaTreeComponent);
    return CaTreeComponent;
}());
exports.CaTreeComponent = CaTreeComponent;
//# sourceMappingURL=ca-tree.component.js.map