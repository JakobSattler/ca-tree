"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
/**
 * Used to get data using HTTP and to (un)check nodes
 */
var CaTreeService = (function () {
    //nodeChange: Subject<CaTreeNode> = new Subject<CaTreeNode>();
    function CaTreeService(http) {
        this.http = http;
    }
    CaTreeService.prototype.getNodes = function () {
        return this.http.get('./organisations_flat.json').map(function (res) { return res.json(); });
    };
    /**
     * Calls checkChildren() and checkParents() using the given node
     *
     * @param selectedNode The selected node
     * @param rootNode
     */
    CaTreeService.prototype.nodeSelected = function () {
        //if (selectedNode.children.length > 0) {
        //  selectedNode.childSelected = true;
        //}
        //console.log(selectedNode);
        //this.checkChildren(selectedNode);
        //this.selectedNode = selectedNode;
        //
        //this.checkParents(rootNode);
        //this.checkChildrenIt(rootNode);
    };
    /**
     * Calls uncheckChildren() and uncheckParents() using the given node
     *
     * @param selectedNode The selected node
     * @param rootNode
     */
    CaTreeService.prototype.nodeUnselected = function () {
        //if (selectedNode.children.length > 0) {
        //  selectedNode.childSelected = false;
        //}
        //console.log(selectedNode);
        //this.checkChildren(selectedNode);
        //this.selectedNode = selectedNode;
        //this.uncheckParents(rootNode);
    };
    /**
     * Check (if unchecked) or uncheck (if checked) all children of the given node
     *
     * @param node The selected node
     */
    CaTreeService.prototype.checkChildren = function (node) {
        node.selected = !node.selected;
        console.log(node.name);
        for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
            var n = _a[_i];
            this.checkChildren(n);
        }
    };
    CaTreeService.prototype.checkChildrenIt = function (node) {
        if (node == null) {
            return;
        }
        //let nodes: CaTreeNodeModel[] = [];
        // nodes.push(node);
        //
        // while (nodes.length > 0) {
        //   node = nodes[nodes.length - 1];
        //   nodes.splice(nodes.length - 1, 1);
        //   console.log(node.name);
        //   for (let n of node.children) {
        //     nodes.push(n);
        //   }
        // }
    };
    /**
     * Check all parents of the variable "selectedNode"
     *
     * @param node Should be rootNode
     */
    CaTreeService.prototype.checkParents = function (node) {
        for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
            var n = _a[_i];
            n.childSelected = this.checkParents(n);
            if (n === this.selectedNode) {
                return true;
            }
        }
    };
    /**
     * Uncheck all parents of the variable "selectedNode"
     *
     * @param node Should be rootNode
     */
    CaTreeService.prototype.uncheckParents = function (node) {
        for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
            var n = _a[_i];
            if (n === this.selectedNode) {
                node.childSelected = false;
            }
            this.uncheckParents(n);
        }
    };
    CaTreeService = __decorate([
        core_1.Injectable()
    ], CaTreeService);
    return CaTreeService;
}());
exports.CaTreeService = CaTreeService;
//# sourceMappingURL=ca-tree.service.js.map