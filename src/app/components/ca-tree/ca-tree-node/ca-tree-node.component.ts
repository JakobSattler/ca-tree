import {
  Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked,
  Inject, forwardRef
} from '@angular/core';
import {CaTreeService} from '../../../services/ca-tree.service';
import {BasicTreeNode, CaTreeModel, NodeFilter} from './ca-tree-model';
import {CaTreeComponent} from '../ca-tree.component';



@Component({
  moduleId: module.id,
  selector: 'co-tree-node',
  templateUrl: 'ca-tree-node.component.html',
  styleUrls: ['ca-tree-node.component.css'],
  directives: [CaTreeNodeComponent],
  providers: [CaTreeService],
  pipes: [NodeFilter]
})
export class CaTreeNodeComponent implements AfterViewChecked {

  paddingPerLevel: number = 10;
  changing: boolean = false;

  @Input()
  model: CaTreeModel;

  @Input()
  level: number;

  @Input()
  node: BasicTreeNode;

  @Input()
  imgURLClose: String = 'http://plainicon.com/dboard/userprod/2800_a1826/prod_thumb/plainicon.com-44945-128px.png';
  imgURLOpen: String = 'https://freeiconshop.com/files/edd/folder-open-solid.png';

  @Output()
  nodeSelected: EventEmitter<BasicTreeNode> = new EventEmitter<BasicTreeNode>();

  @Output()
  nodeExtended: EventEmitter<BasicTreeNode> = new EventEmitter<BasicTreeNode>();

  @ViewChild('nodeTextInput')
  nodeTextInput: ElementRef;

  constructor(@Inject(forwardRef(() => CaTreeComponent)) private _caTreeComponent: CaTreeComponent) {
  }

  ngAfterViewChecked(): void {
    if (this.node.changing) {
      this.nodeTextInput.nativeElement.focus();
    }
  }

  onNodeExtended(): void {
    this.node.extended = !this.node.extended;
    this.nodeExtended.emit(this.node);
  }

  getPadding(): String {
    return this.paddingPerLevel * this.level + 'px';
  }

  onNodeSelected(): void {
    this.nodeSelected.emit(this.node);
    console.log('selected ' + this.node.name);
  }

  changePic(): void {
    let newPic = prompt("Change Pic for Open", "");
    console.log(newPic);
    if (newPic) {
      this.imgURLClose = newPic;
    }
    newPic = prompt("Change Pic for Close", "");
    console.log(newPic);
    if (newPic) {
      this.imgURLOpen = newPic;
    }
  }

  editNode(): void {
    //this.changing = true;
    this.node.changing = true;
  }

  addNode(): void {
    if (!this.node.extended) {
      this.node.extended = true;
    }

    let node = {
      name: '',
      nr: this.model.getNewID(),
      parentNr: this.node.nr,
      extended: false,
      changing: true,
      selected: false,
      childSelected: false
    };

    this.model.addNode(node);
  }

  onKeyDown(event): void {
    ////handle text change if source of event is nodeTextInput-element
    //if (event.srcElement === this.nodeTextInput.nativeElement) {
    //  if (event.keyCode === 13) {
    //    this.saveNodeChange();
    //  }
    //}
  }

  saveNodeChange(): void {
    this.nodeTextInput.nativeElement.blur();
    this.node.changing = false;
    console.log('saving ' + this.node.name);
    if (this.nodeTextInput.nativeElement.value !== '') {
      this.node.name = this.nodeTextInput.nativeElement.value;
    } else if (this.node.name === '') {
      this.model.removeNode(this.node);
    }
  }

  removeNode(): void {
    this.model.removeNode(this.node);
  }
}
