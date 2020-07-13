import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CatService } from 'src/app/services/cat.service';
import { Router } from '@angular/router';
import { Cat } from 'src/app/models/cat.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  errCategories: string | any;

  catOfEachCategory: Cat[];
  errCatOfEachCategory: string | any;
  constructor(private catService: CatService) { }

  ngOnInit() {
    // Initialising both the array with empty array
    this.categories = [];
    this.catOfEachCategory = [];

    // calling method to fetch all the categories of cats
    this.fetchAllCategories();
    // window.addEventListener('scroll', () => {
      window.onscroll = () => {
// Styles that need to change for the User interface on Scroll
let showOnScroll = document.querySelector<HTMLElement>('#showOnScroll');
let categoriesTextH1 = document.querySelector<HTMLElement>('#categoriesTextH1');
let categoriesTextP = document.querySelector<HTMLElement>('#categoriesTextP');

if( window.scrollY <= 100 && showOnScroll ){
  showOnScroll.style.opacity = `0`;
  categoriesTextH1.style.opacity = `0`;
  categoriesTextP.style.opacity = `0`;
  categoriesTextP.style.transform = `translateY(-10vh)`
}      
else if(showOnScroll) {
  showOnScroll.style.opacity = `${window.scrollY / 400}`;
  categoriesTextH1.style.transform = `translateX(${20 - window.scrollY / 20}vw)`;
  categoriesTextH1.style.opacity = `${window.scrollY / 400 - 0.25}`;
  if (window.scrollY > 400) {
    categoriesTextH1.style.transform = `translateX(0vw)`;
    categoriesTextP.style.opacity = `${window.scrollY/400 - 1}`
    categoriesTextP.style.transform = `translateY(${window.scrollY/20 - 30}vh)`
            if(window.scrollY > 600){
              categoriesTextP.style.transform = `translateY(0vh)`
            }                  
  }

}
      }
      
    

  }

  // method to fetch all the categories of cats
  fetchAllCategories() {
    this.catOfEachCategory = [];
    this.catService.getCategories().subscribe(categories => {
      this.errCategories = '';
      this.categories = <Category[]>categories; //Assigning the whole data to this.categories(global array)
      this.fetchCatOfEachCategory(this.categories);
    }, error => {
      this.errCategories = error
    });
  }

  // method to get one random cat of each category to show them as a button to navigate to their images of that particular category
  fetchCatOfEachCategory(categories: Category[]) {
    categories.map(category => {
      this.catService.getCatsUsingCategory(category.id, 1)
        .subscribe(cats => {
          this.errCatOfEachCategory = '';
          // getting cats of a particular category and pushing the first cat of that array to catOfEachCategory[]
          this.catOfEachCategory.push(<Cat>cats[0]);
        },
          error => this.errCatOfEachCategory = error)
    })
  }

}
