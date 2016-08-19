import {Component, OnInit} from '@angular/core';
import {CaTreeService} from '../../services/ca-tree.service';
import {CaTreeNodeComponent} from './ca-tree-node/ca-tree-node.component';
import {CaTreeModel, BasicTreeNode, NodeFilter, SelectableTreeNode} from './ca-tree-node/ca-tree-model';

@Component({
  moduleId: module.id,
  selector: 'ca-tree',
  templateUrl: 'ca-tree.component.html',
  directives: [CaTreeNodeComponent],
  providers: [CaTreeService],
  styles: [`
    div {
      padding-left: 10px;
    }
  `],
  pipes: [NodeFilter]
})
export class CaTreeComponent implements OnInit {
  model: CaTreeModel;

  constructor(private caTreeService: CaTreeService) {
  }

  ngOnInit() {
    this.model = new CaTreeModel();
    this.caTreeService.getNodes().subscribe(
      (data: any) => {
        this.model.resources = data;
      }
    );
  }

  private _onNodeSelected(node: SelectableTreeNode): void {
    this._checkChildren(node);
  }

  private _checkChildren(node: SelectableTreeNode): void {
    if (node === null) {
      return;
    }
    this._checkParents(node);
    let selected: boolean = node.selected;

    //Pre-order through node-numbers
    let nrs: Array<number> = new Array<number>();
    nrs.push(node.nr);

    let nr;
    while (nrs.length > 0) {
      nr = nrs.pop();

      let children = this.model.resources.filter(res => res.parentNr === nr);
      children.forEach((child, index) => {
        // Check parents for each child
        this._checkParents(child);
        // If the first parent (node) gets selected, select each child
        child.selected = !selected;
        nrs.push(child.nr);
      });
    }
  }

  private _checkParents(node: SelectableTreeNode): void {
    console.log('checking parents for node: {name: ' + node.name + ', id: ' + node.nr + '}')
    let parentNr = node.parentNr;

    while (parentNr) {
      let parentNode: SelectableTreeNode = this.model.resources.filter(res => res.nr === parentNr)[0];
      parentNode.childSelected = !parentNode.childSelected;
      parentNr = parentNode.parentNr;
    }
  }
}
