"use strict";
require('rxjs/add/operator/map');
var CaTreeNodeModel = (function () {
    function CaTreeNodeModel(name, nr, children) {
        this.childSelected = false;
        this.name = name;
        this.nr = nr;
        this.children = new Array();
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var c = children_1[_i];
            this.children.push(new CaTreeNodeModel(c.name, c.nr, c.children));
        }
    }
    return CaTreeNodeModel;
}());
exports.CaTreeNodeModel = CaTreeNodeModel;
//# sourceMappingURL=ca-tree-node-model.js.map