import {Component, EventEmitter, Output} from "@angular/core";
import {SearchService} from "./search.service";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})

export class SearchComponent {
  keywords: string = '';
  @Output() setData = new EventEmitter();
  constructor(private service: SearchService) {
  }

  search(): void {
    if (this.keywords?.length < 1) {
      alert('请输入城市名称！');
      return;
    }
    this.setData.emit(null);
    this.service.getWeather({
      city: this.keywords
    }).subscribe(res => {
      this.setData.emit(res);
    }, error => {
      this.setData.emit(null);
    });
  }
}
