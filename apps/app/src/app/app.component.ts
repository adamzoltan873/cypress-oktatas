import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'cypress-oktatas-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';

  getAllResponse: any;
  getDetail: any;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('/getAll').subscribe(rs => {
      this.getAllResponse = rs;
      console.log(rs);
    })
    
  }

  getDetails(id: any) {
    this.httpClient.get('/get/'+id).subscribe(rs => {
      this.getDetail = rs;
      console.log(rs);
    })
  }
}
