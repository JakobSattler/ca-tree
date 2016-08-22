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

export class CaTreeModel {
  resources: Array<SelectableTreeNode>;

  constructor() {
  }

  getNode(nr: number): BasicTreeNode {
    let result = this.resources.filter(res => res.nr === nr);
    if (result.length === 1) {
      return result[0];
    } else {
      return null;
    }
  }

  removeNode(nr: number): void {
    let deleteIndex = this.resources.indexOf(this.getNode(nr) as SelectableTreeNode);
    this.resources.splice(deleteIndex, 1);
  }

  isNodeLeaf(node: BasicTreeNode): boolean {
    return this.resources.filter(res => res.parentNr === node.nr).length === 0;
  }

  deleteNode(node: BasicTreeNode): void {
    let delIndex: number;
    delIndex = this.resources.indexOf(this.resources.filter(res => res.nr === node.nr)[0]);
    this.resources.splice(delIndex, 1);
  }

  addNode(res: SelectableTreeNode): void {
    this.resources.push(res);
  }

  getNewID(): number {
    var max = Math.max.apply(Math, this.resources.map(function (res) {
      return res.nr;
    }));
    return max + 1;
  }

  public checkChildren(node: SelectableTreeNode): void {
    let showedNodes = this.resources.filter(res => res.extended || this.getNode(res.parentNr).extended);
    let selected: boolean = node.selected;

    //Pre-order through node-numbers
    let nrs: Array<number> = new Array<number>();
    nrs.push(node.nr);

    let nr;
    while (nrs.length > 0) {
      nr = nrs.pop();

      (this.getNode(nr) as SelectableTreeNode).selected = !selected;
      this.checkParents(this.getNode(nr) as SelectableTreeNode, showedNodes);
      let children = showedNodes.filter(res => res.parentNr === nr);
      for (let child of children) {
        nrs.push(child.nr);
      }
    }
  }

  public checkParents(node: SelectableTreeNode, showedNodes: SelectableTreeNode[]): void {
    let parentNr = node.nr;

    node.childSelected = !node.childSelected;
    while (parentNr) {
      let parentNode: SelectableTreeNode = showedNodes.filter(res => res.nr === parentNr)[0];
      if (node.selected && !parentNode.childSelected) {
        parentNode.childSelected = true;
      } else if (!node.selected && !(this.areChildrenSelected(parentNode, showedNodes))) {
        parentNode.childSelected = false;
      }
      parentNr = parentNode.parentNr;
    }
  }

  public areChildrenSelected(node: SelectableTreeNode, showedNodes: SelectableTreeNode[]): boolean {
    if (node === null) {
      return;
    }
    //Pre-order through node-numbers
    let nodes: Array<SelectableTreeNode> = new Array<SelectableTreeNode>();
    nodes.push(node);

    while (nodes.length > 0) {
      node = nodes.pop();

      let children = showedNodes.filter(res => res.parentNr === node.nr);
      for (let child of children) {
        if (child.selected) {
          return true;
        }
        nodes.push(child);
      }
    }
    return false;
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
