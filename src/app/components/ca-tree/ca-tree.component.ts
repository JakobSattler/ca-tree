import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {CaTreeService} from '../../services/ca-tree.service';
import {CaTreeNodeComponent} from './ca-tree-node/ca-tree-node.component';
import {CaTreeMvcModel, BasicTreeNode, NodeFilter, SelectableTreeNode} from './ca-tree-node/ca-tree-mvc-model';

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
  model: CaTreeMvcModel;

  constructor(private caTreeService: CaTreeService) {
  }

  ngOnInit(): void {
    this.model = new CaTreeMvcModel();
    this.caTreeService.getNodes().subscribe(
      (data: any) => {
        this.model.resources = data;
      }
    );
  }

  public onNodeSelected(node: SelectableTreeNode): void {
    node.selected = !node.selected;
    this.model.checkChildren(node);
  }

  public onNodeExtended(node: SelectableTreeNode): void {
    console.log(node.extended);
    console.log(node.selected);
    this.model.checkChildren(node);
  }


}
