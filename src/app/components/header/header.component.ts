import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CatService } from 'src/app/services/cat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: Category[];
  errCategories: string | any;

  constructor(private catService: CatService) { }

  ngOnInit() {
    this.fetchAllCategories();
  }

  //method to fetch all the categories of the cats.
  // this method is called so that categories will be available as routerLink in the NavBar dropdown of the Images by categories
  fetchAllCategories() {
    this.catService.getCategories().subscribe(categories => {
      this.categories = <Category[]>categories; // assigning the fetched data from service to the global variable 
    }, error => {
      this.errCategories = error
    });
  }

}
