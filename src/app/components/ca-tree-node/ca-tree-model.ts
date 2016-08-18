import 'rxjs/add/operator/map';
import {CaTreeNodeModel} from './ca-tree-node-model';

export interface BasicTreeNode {
  name: String;
  nr: number;
  children: Array<BasicTreeNode>;
}

export interface CheckboxTreeNode extends BasicTreeNode {
  selected: boolean;
  childSelected: boolean;
}

export class CaTreeModel {
  resources: Array<BasicTreeNode>;

  constructor() {
    this.resources = new Array<CaTreeNodeModel>();
  }
}
