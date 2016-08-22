"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var ca_tree_service_1 = require('../../../services/ca-tree.service');
var ca_tree_model_1 = require('./ca-tree-model');
var ca_tree_component_1 = require('../ca-tree.component');
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
    function CaTreeNodeComponent(_caTreeComponent) {
        this._caTreeComponent = _caTreeComponent;
        this.extended = false;
        this.paddingPerLevel = 10;
        this.changing = false;
        this.classStringClose = 'http://www.iconarchive.com/download/i83780/pelfusion/flat-folder/Close-Folder.ico';
        this.classStringOpen = 'https://freeiconshop.com/files/edd/folder-open-solid.png';
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
        console.log('selected ' + this.node.name);
    };
    CaTreeNodeComponent.prototype.changePic = function () {
        var newPic = prompt("Change Pic for Open", "");
        console.log(newPic);
        if (newPic) {
            this.classStringOpen = newPic;
        }
        newPic = prompt("Change Pic for Close", "");
        console.log(newPic);
        if (newPic) {
            this.classStringClose = newPic;
        }
    };
    CaTreeNodeComponent.prototype.editNode = function () {
        this.changing = true;
    };
    CaTreeNodeComponent.prototype.addNode = function () {
        var node = {
            name: "Neuer Child",
            nr: this.model.getNewID(),
            parentNr: this.node.nr,
            extended: false,
            selected: false,
            childSelected: false
        };
        this.model.addResource(node);
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
    CaTreeNodeComponent.prototype.deleteNode = function (node) {
        var _this = this;
        if (node === null) {
            return;
        }
        //Pre-order through node-numbers
        var nrs = new Array();
        nrs.push(node.nr);
        var nr;
        var _loop_1 = function() {
            nr = nrs.pop();
            var children = this_1.model.resources.filter(function (res) { return res.parentNr === nr; });
            children.forEach(function (child, index) {
                var deleteIndex = children.indexOf(child);
                _this.model.resources.splice(deleteIndex, 1);
                nrs.push(child.nr);
            });
            var deleteIndex = children.indexOf(this_1.model.resources.filter(function (res) { return res.nr === nr; })[0]);
            this_1.model.resources.splice(deleteIndex, 1);
        };
        var this_1 = this;
        while (nrs.length > 0) {
            _loop_1();
        }
        console.log(this.model.resources);
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
    ], CaTreeNodeComponent.prototype, "classStringClose");
    __decorate([
        core_1.Output()
    ], CaTreeNodeComponent.prototype, "nodeSelected");
    __decorate([
        core_1.ViewChild('nodeTextInput')
    ], CaTreeNodeComponent.prototype, "nodeTextInput");
    CaTreeNodeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'co-tree-node',
            templateUrl: 'ca-tree-node.component.html',
            styleUrls: ['ca-tree-node.component.css'],
            directives: [CaTreeNodeComponent],
            providers: [ca_tree_service_1.CaTreeService],
            pipes: [ca_tree_model_1.NodeFilter]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return ca_tree_component_1.CaTreeComponent; })))
    ], CaTreeNodeComponent);
    return CaTreeNodeComponent;
}());
exports.CaTreeNodeComponent = CaTreeNodeComponent;
//# sourceMappingURL=ca-tree-node.component.js.map