import {Component, OnInit} from '@angular/core';
import {CaTreeService} from '../../services/ca-tree.service';
import {CaTreeNodeComponent} from './ca-tree-node/ca-tree-node.component';
import {CaTreeModel, BasicTreeNode, NodeFilter} from './ca-tree-node/ca-tree-model';

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

  onNodeSelected(selectedNode: BasicTreeNode): void {
    let children = this.model.resources.filter(res => res.parentNr === selectedNode.nr);
    for (let child of children) {
      child.selected = true;
    }
  }

}
