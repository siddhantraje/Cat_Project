import { Injectable } from '@angular/core';

// to interact with the API
import { HttpClient } from '@angular/common/http';

// to operate the data after fetching data from API using HttpClient
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// importing the models required for this service to run
import { Cat } from '../models/cat.model';
import { Category } from '../models/category.model';

// for error handling , like network or API fetching issue
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  randomCatUrl: string = "https://api.thecatapi.com/v1/images/search";
  categoriesUrl: string = "https://api.thecatapi.com/v1/categories";

  constructor(private http: HttpClient, // to interact with the API
    private processHTTPMsgService: ProcessHTTPMsgService //To handle error that might occur due to network or URL issue
  ) { }

  // method to fetch the randomCat from the URL and give only one (i.e first cat of the array)
  getRandomCat(): Observable<Cat> {
    return this.http.get<Cat[]>(this.randomCatUrl).pipe(map(cats => cats[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));//To handle error that might occur due to network or URL issue
  }

  // method to fetch all the categories of the cats
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
      .pipe(catchError(this.processHTTPMsgService.handleError));//To handle error that might occur due to network or URL issue
  }

  // method to fetch only the cats of a particular category and limit to how much cats to fetch
  // the category can be identified by category id and the limit using limit
  getCatsUsingCategory(id: number, limit: number): Observable<Cat[]> {
    let searchCategoryUrl: string = `${this.randomCatUrl}?category_ids=${id}&limit=${limit}`;
    return this.http.get<Cat[]>(searchCategoryUrl)
      .pipe(catchError(this.processHTTPMsgService.handleError));//To handle error that might occur due to network or URL issue
  }
}
