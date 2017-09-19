import { Component, OnInit } from '@angular/core';
import { GiphyService } from '../giphy.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
   private offset = 0;
   private perPage = 12;
   public results: any;
   public gifs: Array<any> = [];
   public isLoading: boolean =  true;
  //  offset and perPage will be used to manage pagination
  // results will be used to store the response from the server

  constructor(private giphyService: GiphyService) { }

   getTrendingGifs(offset, limit){
     this.giphyService.getTrendingGifs(offset, limit).subscribe(
       (data) => {
         this.results = data;
         this.gifs = this.gifs.concat(this.results.data);
         this.isLoading = false;
       },
       (err) => console.log("Opps,", err),
       () => console.log('Response', this.results)
     )
   }

   getMore() {
     this.isLoading = true;
     this.offset = this.offset + this.perPage;
     this.getTrendingGifs(this.offset, this.perPage);
   }


  ngOnInit() {
    this.getTrendingGifs(this.offset, this.perPage);
  }



}
