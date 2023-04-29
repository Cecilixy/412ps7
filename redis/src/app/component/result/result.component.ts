import {Component, Input} from "@angular/core";

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent {
  isRedis: boolean = false;
  _data: any;
  @Input() set data(val: any) {
    this.isRedis = val?.isRedis;
    this._data = val?.data;
  }
  get data(): any {
    return this._data;
  }
  constructor() {
  }
}
