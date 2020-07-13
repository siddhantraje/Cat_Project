import { Component, OnInit } from '@angular/core';
import { Cat } from 'src/app/models/cat.model';
import { CatService } from 'src/app/services/cat.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  showMore: boolean = false; // at start the value of showMore will be false, so that if we click, then it will show more images
  id: number; // to fetch the cats using category ids

  cacheSub: Subscription; //the variable will be used the unsubscribe the  being fetched 
  //       if we clicked the the stop loading more images button 

  catsByCategory: Cat[] = []; // initialising the empty array of Category 
  errCatsByCategory: string | any;

  constructor(private catService: CatService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => {
      //any time when the params value changes, this function will be called (not only on start)
      this.showMore = false;
      this.catsByCategory = [];
      this.id = params['id'];
      return this.catService.getCatsUsingCategory(params['id'], 10); // return with cats with mentioned category id(from params) and limit 10
    }))
      .subscribe(cats => this.catsByCategory = <Cat[]>cats, error => this.errCatsByCategory = error); // assign the fetched cats to the array
  }

  fetchCatsUsingCategoryOnScroll() {
    this.cacheSub = this.catService.getCatsUsingCategory(this.id, 1)// fetch cats with category id 
                                                                    // and fetch only 1 cat(actually it will return an array of cats with length 1)
      .subscribe(cats => {
        if (this.showMore)// if showMore is true, then only push the cat in array, or else unsubscribe the subscription
          this.catsByCategory.push(cats[0]);
        else
          this.cacheSub.unsubscribe;
      }
        , error => {
          this.errCatsByCategory = error
        });
    // }
  }

  showMoreImages() {
    // whenever showMore button is clicked, this method is invoked and it will enable user to fetch any number of images of cat of that category
    this.showMore = true;
    for (let i = 0; i < 6; i++)// to fetch at least 6 more images so that windows inner height will be filled and 
         this.fetchCatsUsingCategoryOnScroll(); //  user will be able to scroll
     
    window.onscroll = () => {
      // whenever user will hit scroll to bottom, the fetchCatsUsingCategoryOnScroll() should get invoked 
      // to get a cat and push it in the array and display on the screen
      //  and this should only work when the value of showMore is true
      
      if ((window.innerHeight + window.scrollY + 1) >= document.body.offsetHeight && (this.showMore))
        this.fetchCatsUsingCategoryOnScroll();
    };
  }

  stopLoadingMoreImages() {
    // whenever stop loading images button is clicked, this method will be invoked, to turn the value of showMore to false
    this.showMore = false; 
  }

}
