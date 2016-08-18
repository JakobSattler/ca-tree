import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import {CaTreeService} from '../../services/ca-tree.service';
import {CaTreeNodeModel} from './ca-tree-node-model';

//
//export class TreeNode {
//  name: String;
//  nr: number;
//  children: Array<TreeNode>;
//  selected: boolean;
//  childSelected: boolean = false;
//
//  constructor(name: String, nr: number, children: Array<TreeNode>) {
//    this.name = name;
//    this.nr = nr;
//    if (children == null) {
//      this.children = new Array<TreeNode>();
//    } else {
//      this.children = children;
//    }
//  }
//}

@Component({
  moduleId: module.id,
  selector: 'co-tree-node',
  templateUrl: 'ca-tree-node.component.html',
  styleUrls: ['ca-tree-node.component.css'],
  directives: [CaTreeNodeComponent],
  providers: [CaTreeService]
})
export class CaTreeNodeComponent implements OnInit, AfterViewChecked {

  extended: boolean = false;
  paddingPerLevel: number = 10;
  changing: boolean = false;

  @Input()
  level: number;

  @Input()
  node: CaTreeNodeModel;

  @Input()
  classString: String = 'http://www.iconarchive.com/download/i83780/pelfusion/flat-folder/Close-Folder.ico';

  @Output()
  nodeSelected = new EventEmitter();

  @ViewChild('nodeTextInput')
  nodeTextInput: ElementRef;

  @ViewChild('nodeText')
  nodeText: ElementRef;

  constructor(private treeService: CaTreeService) {
  }

  ngOnInit() {
    this.changing = false;
    this.extended = false;
  }

  ngAfterViewChecked() {
    if (this.changing) {
      this.nodeTextInput.nativeElement.focus();
    }
  }

  extend() {
    this.extended = !this.extended;

  }

  getPadding() {
    return this.paddingPerLevel * this.level + 'px';
  }

  onNodeSelected() {
    this.nodeSelected.emit(this.node);
  }

  changePic() {

    if (!(this.classString = prompt("Change Pic", "change pic here"))) {
      this.classString = 'http://www.iconarchive.com/download/i83780/pelfusion/flat-folder/Close-Folder.ico';
    }
    ;
  }

  editNode() {
    this.changing = true;
  }

  addNode() {
    let node: CaTreeNodeModel = new CaTreeNodeModel("test", 1283934, null);
    console.log(node);
    this.node.children.push(node);
  }

  onKeyDown(event) {
    //handle text change if source of event is nodeTextInput-element
    if (event.srcElement == this.nodeTextInput.nativeElement) {
      if (event.keyCode == 13) {
        this.saveNodeChange();
      }
    }

  }

  saveNodeChange() {
    this.nodeTextInput.nativeElement.blur();
    this.node.name = this.nodeTextInput.nativeElement.value;
    this.changing = false;
  }

  deleteNode() {

    if (this.node.children.length > 0) {
      alert("Delete");
    }
  }

}
