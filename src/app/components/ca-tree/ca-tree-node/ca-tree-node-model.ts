import 'rxjs/add/operator/map';

export interface BasicTreeNode {
  name: String;
  nr: number;
  children: Array<BasicTreeNode>;
}

export interface CheckboxTreeNode extends BasicTreeNode {
  selected: boolean;
  childSelected: boolean;
}

export class CaTreeNodeModel {
  name: String;
  nr: number;
  children: Array<CaTreeNodeModel>;
  selected: boolean;
  childSelected: boolean = false;

  constructor(name: String, nr: number, children: Array<CaTreeNodeModel>) {
    this.name = name;
    this.nr = nr;
    this.children = new Array<CaTreeNodeModel>();
    for (let c of children){
      this.children.push(new CaTreeNodeModel(c.name, c.nr, c.children));
    }
  }
}
