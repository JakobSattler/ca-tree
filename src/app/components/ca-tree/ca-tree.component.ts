import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {CaTreeService} from '../../services/ca-tree.service';
import {CaTreeNodeComponent} from './ca-tree-node/ca-tree-node.component';
import {CaTreeMvcModel, BasicTreeNode, NodeFilter, SelectableTreeNode} from './ca-tree-node/ca-tree-mvc-model';
//import * as _ from 'lodash';

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

  constructor(private _caTreeService: CaTreeService) {
  }

  ngOnInit(): void {
    this.model = new CaTreeMvcModel();
    //load root + next level to show proper icon
    this._caTreeService.getNodes().subscribe(
      (data: any) => {
        for (let d1 of data.filter(res => !res.parentNr)) {
          this.model.resources.push(d1);
          for (let d2 of data.filter(res => res.parentNr === d1.nr)) {
            this.model.resources.push(d2);
          }
        }
      }
    );
  }

  public onNodeSelected(node: SelectableTreeNode): void {
    node.selected = !node.selected;
    this.model.checkChildren(node);
  }

  public onNodeExtended(node: SelectableTreeNode): void {
    this.loadChildren(node);
    if (!this.model.isNodeLeaf(node)) {
      node.extended = !node.extended;
    }
  }

  loadChildren(node: BasicTreeNode) {
    //load children + next level to load proper icon
    this._caTreeService.getNodes().subscribe(
      (data: any) => {
        for (let d1 of data.filter(res => res.parentNr === node.nr)) {
          if (!this.model.containsNode(d1)) {
            this.model.resources.push(d1);
          }
          for (let d2 of data.filter(res => res.parentNr === d1.nr)) {
            if (!this.model.containsNode(d2)) {
              this.model.resources.push(d2);
            }
          }
        }
      }
    )
  }

}
