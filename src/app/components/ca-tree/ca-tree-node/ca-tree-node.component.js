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
var ca_tree_mvc_model_1 = require('./ca-tree-mvc-model');
var ca_tree_component_1 = require('../ca-tree.component');
var CaTreeNodeComponent = (function () {
    function CaTreeNodeComponent(_caTreeComponent) {
        this.paddingPerLevel = 10;
        this.imgURLClose = 'http://plainicon.com/dboard/userprod/2800_a1826/prod_thumb/plainicon.com-44945-128px.png';
        this.imgURLOpen = 'https://freeiconshop.com/files/edd/folder-open-solid.png';
        this.nodeSelected = new core_1.EventEmitter();
        this.nodeExtended = new core_1.EventEmitter();
        this.caTreeComponent = _caTreeComponent;
    }
    CaTreeNodeComponent.prototype.ngAfterViewChecked = function () {
        if (this.node.changing) {
            this.nodeTextInput.nativeElement.focus();
        }
    };
    CaTreeNodeComponent.prototype.onNodeExtended = function () {
        this.nodeExtended.emit(this.node);
    };
    CaTreeNodeComponent.prototype.getPadding = function () {
        return this.paddingPerLevel * this.level + 'px';
    };
    CaTreeNodeComponent.prototype.onNodeSelected = function () {
        this.nodeSelected.emit(this.node);
    };
    CaTreeNodeComponent.prototype.changePic = function () {
        var newPic = prompt("Change Pic for Open", "");
        if (newPic) {
            this.imgURLClose = newPic;
        }
        newPic = prompt("Change Pic for Close", "");
        if (newPic) {
            this.imgURLOpen = newPic;
        }
    };
    //
    // changePic(): void {
    //
    //
    // }
    CaTreeNodeComponent.prototype.editNode = function () {
        this.node.changing = true;
    };
    CaTreeNodeComponent.prototype.addNode = function () {
        this.node.extended = true;
        var node = {
            name: '',
            nr: this.model.getNewID(),
            parentNr: this.node.nr,
            extended: false,
            changing: true,
            selected: false,
            childSelected: false
        };
        this.model.addNode(node);
    };
    CaTreeNodeComponent.prototype.finishNodeChange = function () {
        this.nodeTextInput.nativeElement.blur();
        this.node.changing = false;
        if (this.nodeTextInput.nativeElement.value !== '') {
            this.node.name = this.nodeTextInput.nativeElement.value;
        }
        else if (this.node.name === '') {
            this.model.removeNode(this.node);
        }
    };
    CaTreeNodeComponent.prototype.removeNode = function () {
        this.model.removeNode(this.node);
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
    ], CaTreeNodeComponent.prototype, "imgURLClose");
    __decorate([
        core_1.Output()
    ], CaTreeNodeComponent.prototype, "nodeSelected");
    __decorate([
        core_1.Output()
    ], CaTreeNodeComponent.prototype, "nodeExtended");
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
            pipes: [ca_tree_mvc_model_1.NodeFilter]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return ca_tree_component_1.CaTreeComponent; })))
    ], CaTreeNodeComponent);
    return CaTreeNodeComponent;
}());
exports.CaTreeNodeComponent = CaTreeNodeComponent;
//# sourceMappingURL=ca-tree-node.component.js.map