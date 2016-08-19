"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ca_tree_service_1 = require('../../../services/ca-tree.service');
var ca_tree_model_1 = require('./ca-tree-model');
//
//export class TreeNode {
//  name: String;
//  nr: number;
//  children: Array<TreeNode>;
//  selected: boolean;
//  childSelected: boolean = false;
//
//  constructor(name: String, nr: number, children: Array<TreeNode>) {
//    this.name = name;
//    this.nr = nr;
//    if (children == null) {
//      this.children = new Array<TreeNode>();
//    } else {
//      this.children = children;
//    }
//  }
//}
var CaTreeNodeComponent = (function () {
    function CaTreeNodeComponent(treeService) {
        this.treeService = treeService;
        this.extended = false;
        this.paddingPerLevel = 10;
        this.changing = false;
        this.classString = 'http://www.iconarchive.com/download/i83780/pelfusion/flat-folder/Close-Folder.ico';
        this.nodeSelected = new core_1.EventEmitter();
    }
    CaTreeNodeComponent.prototype.ngOnInit = function () {
        this.changing = false;
        this.extended = false;
    };
    CaTreeNodeComponent.prototype.ngAfterViewChecked = function () {
        if (this.changing) {
            this.nodeTextInput.nativeElement.focus();
        }
    };
    CaTreeNodeComponent.prototype.extend = function () {
        this.node.extended = !this.node.extended;
    };
    CaTreeNodeComponent.prototype.getPadding = function () {
        return this.paddingPerLevel * this.level + 'px';
    };
    CaTreeNodeComponent.prototype.onNodeSelected = function () {
        this.nodeSelected.emit(this.node);
        console.log('selected');
    };
    CaTreeNodeComponent.prototype.changePic = function () {
        if (!(this.classString = prompt('Change Pic', 'change pic here'))) {
            this.classString = 'http://www.iconarchive.com/download/i83780/pelfusion/flat-folder/Close-Folder.ico';
        }
        ;
    };
    CaTreeNodeComponent.prototype.editNode = function () {
        this.changing = true;
    };
    CaTreeNodeComponent.prototype.addNode = function () {
    };
    CaTreeNodeComponent.prototype.onKeyDown = function (event) {
        //handle text change if source of event is nodeTextInput-element
        if (event.srcElement === this.nodeTextInput.nativeElement) {
            if (event.keyCode === 13) {
                this.saveNodeChange();
            }
        }
    };
    CaTreeNodeComponent.prototype.saveNodeChange = function () {
        this.nodeTextInput.nativeElement.blur();
        this.node.name = this.nodeTextInput.nativeElement.value;
        this.changing = false;
    };
    CaTreeNodeComponent.prototype.deleteNode = function () {
    };
    __decorate([
        core_1.Input()
    ], CaTreeNodeComponent.prototype, "model");
    __decorate([
        core_1.Input()
    ], CaTreeNodeComponent.prototype, "level");
    __decorate([
        core_1.Input()
    ], CaTreeNodeComponent.prototype, "node");
    __decorate([
        core_1.Input()
    ], CaTreeNodeComponent.prototype, "classString");
    __decorate([
        core_1.Output()
    ], CaTreeNodeComponent.prototype, "nodeSelected");
    __decorate([
        core_1.ViewChild('nodeTextInput')
    ], CaTreeNodeComponent.prototype, "nodeTextInput");
    __decorate([
        core_1.ViewChild('nodeText')
    ], CaTreeNodeComponent.prototype, "nodeText");
    CaTreeNodeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'co-tree-node',
            templateUrl: 'ca-tree-node.component.html',
            styleUrls: ['ca-tree-node.component.css'],
            directives: [CaTreeNodeComponent],
            providers: [ca_tree_service_1.CaTreeService],
            pipes: [ca_tree_model_1.NodeFilter]
        })
    ], CaTreeNodeComponent);
    return CaTreeNodeComponent;
}());
exports.CaTreeNodeComponent = CaTreeNodeComponent;
//# sourceMappingURL=ca-tree-node.component.js.map