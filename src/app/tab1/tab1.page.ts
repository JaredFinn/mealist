import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  recipes = [
    {
      title: 'Beeria Tacos',
      calories: '',
      fats: '',
      sodium: '',
      proteins: '',
      image: '/assets/tacos.jpg'
    },
    {
      title: 'Baked Ziti',
      calories: '',
      fats: '',
      sodium: '',
      proteins: '',
      image: '/assets/baked-ziti.jpg'
    },
    {
      title: 'Berry French Toast',
      calories: '',
      fats: '',
      sodium: '',
      proteins: '',
      image: '/assets/berry-french-toast.jpg'
    },
    {
      title: 'Steak & Potatoes',
      calories: '',
      fats: '',
      sodium: '',
      proteins: '',
      image: '/assets/steak-potatoes.jpg'
    }
  ];

  slideOpts = {
    slidesPerView: 2,
    loop: true,
    centeredSlides: true,
    freeMode: true,
  };

}
