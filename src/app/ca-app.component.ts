import {Component} from '@angular/core';
import {CaTreeComponent} from './components/ca-tree/ca-tree.component';

@Component({
  moduleId: module.id,
  selector: 'ca-app',
  templateUrl: 'ca-app.component.html',
  directives: [CaTreeComponent]
})
export class AppComponent {

}
