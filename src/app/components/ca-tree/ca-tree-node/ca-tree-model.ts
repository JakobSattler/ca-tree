import 'rxjs/add/operator/map';
import {Injectable, Pipe} from '@angular/core';

export interface BasicTreeNode {
  name: String;
  nr: number;
  parentNr: number;
  extended: boolean;
}

export interface SelectableTreeNode extends BasicTreeNode {
  selected: boolean;
  childSelected: boolean;
}

export interface CheckboxTreeNode extends BasicTreeNode {
  selected: boolean;
  childSelected: boolean;
}

export class CaTreeModel {
  resources: Array<SelectableTreeNode>;
  resourcesArray: Array<BasicTreeNode>;

  constructor() {
  }

  hasParent(node: BasicTreeNode): boolean {
    return !(!node.parentNr);
  }

  isNodeLeaf(node: BasicTreeNode): boolean {
    return this.resources.filter(res => res.parentNr === node.nr).length === 0;
  }

  deleteNode(node: BasicTreeNode)
  {
    let delIndex:number;

    delIndex = this.resources.indexOf(this.resources.filter(res => res.nr === node.nr)[0]);
    this.resources.splice(delIndex,1);
  }
}

@Pipe({
  name: 'nodefilter',
  pure: false
})
@Injectable()
export class NodeFilter {
  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    return items.filter(it => it[field] === value);
  }
}
