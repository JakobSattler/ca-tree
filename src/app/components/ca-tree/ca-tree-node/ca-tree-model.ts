import 'rxjs/add/operator/map';
import {Injectable, Pipe} from '@angular/core';

export interface BasicTreeNode {
  name: String;
  nr: number;
  parentNr: number;
  extended: boolean;
}

export interface SelectableTreeNode extends BasicTreeNode{
  selected: boolean;
  childSelected: boolean;
}

export class CaTreeModel {
  resources: Array<SelectableTreeNode>;

  constructor() {
  }

  hasParent(node: BasicTreeNode): boolean {
    return !(!node.parentNr);
  }

  isNodeLeaf(node: BasicTreeNode): boolean {
    return this.resources.filter(res => res.parentNr === node.nr).length === 0;
  }

  getNewID(): number
  {
    var max = Math.max.apply(Math, this.resources.map(function (res) {
      return res.nr;
    }));
    return max+1;
  }

  public addResource(res: SelectableTreeNode ){
    this.resources.push(res);
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
