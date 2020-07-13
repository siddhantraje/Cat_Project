import { Component, OnInit } from '@angular/core';
import { Cat } from 'src/app/models/cat.model';
import { CatService } from 'src/app/services/cat.service';

@Component({
  selector: 'app-random-cat',
  templateUrl: './random-cat.component.html',
  styleUrls: ['./random-cat.component.css']
})
export class RandomCatComponent implements OnInit {

  randomCat: Cat;
  errRandomCat: string | any;

  constructor(private catService: CatService) { }

  ngOnInit() {
    this.randomCat = null;
    this.changeCat();
  }

  // this method is called when user clicks change button, To fetch another random cat
  changeCat() {
    this.catService.getRandomCat().subscribe(cat => {
      this.randomCat = <Cat>cat; //get a random cat and assign it to the randomCat variable, which is used in the template
    }, error => {
      this.errRandomCat = error;
    })
  }

}
