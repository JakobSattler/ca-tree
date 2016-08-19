import 'rxjs/add/operator/map';
import {CaTreeNodeModel} from './ca-tree-node-model';
import {Injectable, Pipe} from '@angular/core';

export interface BasicTreeNode {
  name: String;
  nr: number;
  parentNr: number;
  extended: boolean;
}

export interface CheckboxTreeNode extends BasicTreeNode {
  selected: boolean;
  childSelected: boolean;
}

export class CaTreeModel {
  resources: Array<BasicTreeNode>;

  constructor() {
  }


  hasParent(node: BasicTreeNode): boolean {
    return !(!node.parentNr);
  }

  isNodeLeaf(node: BasicTreeNode): boolean {
    return this.resources.filter(res => res.parentNr == node.nr).length == 0;
  }
}

@Pipe({
  name: 'nodefilter',
  pure: false
})
@Injectable()
export class NodeFilter {
  transform(items: any[], field : string, value : string): any[] {
    if (!items) return [];
    return items.filter(it => it[field] == value);
  }
}
