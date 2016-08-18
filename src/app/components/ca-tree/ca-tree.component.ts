import {Component, OnInit} from '@angular/core';
import {CaTreeService} from '../../services/ca-tree.service';
import {CaTreeNodeComponent} from '../ca-tree-node/ca-tree-node.component';
import {CaTreeModel, BasicTreeNode} from '../ca-tree-node/ca-tree-model';
import {CaTreeNodeModel} from '../ca-tree-node/ca-tree-node-model';

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
  `]
})
export class CaTreeComponent implements OnInit {
  model: CaTreeModel;

  constructor(private treeService: CaTreeService) {
  }

  ngOnInit() {
    this.model = new CaTreeModel();

    this.treeService.getNodes().subscribe(
      (data: BasicTreeNode[]) => {
        console.log('data: ' + data);
        this.model.resources = data;
        console.log('resources: ' + this.model.resources);
        console.log(typeof this.model.resources);
        //this.parseData(data);
      }
    );
  }

  parseData(data) {
    //console.log(node.name);
    //for (let n of node.children) {
    //  this.checkChildren(n);
    //}
    //
    //if (data == null) {
    //  return;
    //}

    //let nodes: CaTreeNodeModel[] = [];
    //nodes.push(node);
    //
    //while (nodes.length > 0) {
    //  node = nodes[nodes.length - 1];
    //  nodes.splice(nodes.length - 1, 1);
    //  console.log(node.name);
    //  for (let n of node.children) {
    //    nodes.push(n);
    //  }
    //}

    let nodes: CaTreeNodeModel[] = [];
    nodes.push(new CaTreeNodeModel(data.name, data.nr, data.children));
    console.log(nodes);
    while(nodes.length > 0){
      data = nodes[nodes.length -1 ];
      nodes.splice(nodes.length -1, 1);
      console.log(data.name);
      for(let n of data.children) {
        nodes.push(n);
      }
    }

    //while(nodes.length > 0){
    //  data = nodes.pop();
    //  console.log(data.name);
    //  for(let n of data.children){
    //    data.children.push(new CaTreeNodeModel(n.name, n.nr, null));
    //    nodes.push(n);
    //  }
    //}
  }

  //onNodeSelected(selectedNode: CaTreeNodeModel) {
  //  if (selectedNode.selected) {
  //    this.treeService.nodeUnselected(selectedNode, this.rootNode);
  //  } else if (!selectedNode.selected) {
  //    this.treeService.nodeSelected(selectedNode, this.rootNode);
  //  }
  //}


}
