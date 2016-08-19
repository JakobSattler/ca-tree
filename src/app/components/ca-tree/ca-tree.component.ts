import {Component, OnInit} from '@angular/core';
import {CaTreeService} from '../../services/ca-tree.service';
import {CaTreeNodeComponent} from './ca-tree-node/ca-tree-node.component';
import {CaTreeModel, BasicTreeNode, NodeFilter} from './ca-tree-node/ca-tree-model';
import {CaTreeNodeModel} from './ca-tree-node/ca-tree-node-model';

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

  constructor(private treeService: CaTreeService) {
  }

  ngOnInit() {
    this.model = new CaTreeModel();
    this.treeService.getNodes().subscribe(
      (data: BasicTreeNode[]) => {
        this.model.resources = data;
      }
    );
  }

  //onNodeSelected(selectedNode: CaTreeNodeModel) {
  //  if (selectedNode.selected) {
  //    this.treeService.nodeUnselected(selectedNode, this.model.resources);
  //  } else if (!selectedNode.selected) {
  //    this.treeService.nodeSelected(selectedNode, this.model.resources);
  //  }
  //}

}
