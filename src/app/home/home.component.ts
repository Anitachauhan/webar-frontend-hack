import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Products, Product } from '../shared/models/hack.model';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  product: Product;
  industry: string;
  category: string;
  private sub;
  showCategory: any = false;
  subCategories: any[]
  categories: any[] = [
    {
      name: 'Furniture',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/furniture.png',
      industry: 'Furniture'
    },
    {
      name: 'Fashion',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/fashion.png',
      industry: 'Fashion'
    },
    {
      name: 'Machinery',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/machinery.png',
      industry: 'Machinery'
    },
    // {
    //   name: 'Sports',
    //   img: 'https://tulanedigcontent.blob.core.windows.net/sporjo-dataset/Messi.png',
    //   industry: 'Sports'
    // }

  ];

  subCategoriesFurniture: any[] = [
    {
      name: 'Rack',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/rack.png'
    },
    {
      name: 'Table',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/table.png'
    },
    {
      name: 'Sofa',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/sofa.png'
    },
    {
      name: 'Chair',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/chair.png'
    },
    {
      name: 'Lamp',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/lamp.png'
    }
  ]

  subCategoriesFashion: any[] = [
    {
      name: 'Menswear',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/menswear.png'
    },
    {
      name: 'Handbags',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/handbag.png'
    },
    {
      name: 'Footwear',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/footwear.png'
    },
    {
      name: 'Womenswear',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/womenswear.png'
    }
  ]

  // subCategoriesFood: any[] = [

  //   {
  //     name: 'Bakery',
  //     img: 'https://tulanedigcontent.blob.core.windows.net/sporjo-dataset/icons-all/bakery.png'
  //   },
  //   {
  //     name: 'Pizza',
  //     img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/pizza.png'
  //   },
  //   {
  //     name: 'Barbeque',
  //     img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/barbeque.png'
  //   },
  //   {
  //     name: 'Meal',
  //     img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/meal.png'
  //   }

  // ]
  subCategoriesMachinery: any[] = [

    {
      name: 'Printer',
      img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/printer.png'
    }

  ]
  // subCategoriesSports: any[] = [

  //   {
  //     name: 'Ball',
  //     img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/ball.png'
  //   },
  //   {
  //     name: 'Shoe',
  //     img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/footwear.png'
  //   },
  //   {
  //     name: 'Trophy',
  //     img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/trophy.png'
  //   },
  //   {
  //     name: 'Bat',
  //     img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/bat.png'
  //   },   
  //   {
  //     name: 'Headwear',
  //     img: 'https://rndlabcdn.azureedge.net/sporjo-dataset/icons-all/headwear.png'
  //   }

  // ]


  loading = false;
  productPageCounter = 1;
  additionalLoading = false;


  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
  ) { }

  public screenWidth: any;
  public screenHeight: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.loading = true;

    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = res;
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
    }, 500);

    //Hack Products API Call
    this.subCategories = this.subCategoriesFurniture
    this.showCategory = false;
    this.getIndustry()
    this.getCategory()
    this.load()


  }

  showMoreProducts(): void {
    this.additionalLoading = true;
    this.productPageCounter = this.productPageCounter + 1;
    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = [...this.products, ...res];
          this.additionalLoading = false;
        },
        (err) => {
          console.log(err);
          this.additionalLoading = false;
        }
      );
    }, 500);
  }
  load = () => {
    //    this.sub = this.productService.getProducts('https://web-ar-middleware.azurewebsites.net/api/v1/Furniture/getAll')
    //         .subscribe(res => {
    //             this.products = res.Products;     
    //             console.log(this.products)    
    //         })
    if (this.category == "all") {
      console.log("inside if")
      console.log("home page",`http://localhost:5000/api/v1/` + this.industry + '/getAll')
      this.sub = this.productService.getProducts(environment.apiUrl + this.industry + '/getAll').subscribe(
        res => {
          this.products = res.Products;

        })
    }
    else {
      console.log("inside else")
      var query = environment.apiUrl + this.industry + '/' + this.category + '/getAll'
      console.log(query)
      this.sub = this.productService.getProducts(query).subscribe(
        res => {
          this.products = res.Products;
          // console.log(this.products)
        })
    }
  };

  getIndustry() {
    if (this.route.params !== null) {
      // console.log("inside if")
      this.route.params.subscribe(res => {
        if (res.industry != null) {
          this.industry = res.industry
        }
        else {
          console.log("inside default merch")
          this.industry = "Furniture"
        }
        console.log(this.industry)
      })
    }
  }
  getCategory() {
    if (this.route.params !== null) {
      this.route.params.subscribe(res => {
        if (res.category != null) {
          console.log("setting category")
          this.category = res.category
        }
        else {
          this.category = "all"
        }

      })
    }
  }
  getCategoriesByIndustry(industry) {
    console.log("industry", industry)
    if (industry == "Furniture") {
      console.log("inside furniture")
      this.subCategories = this.subCategoriesFurniture;
    }
    else if (industry == "Fashion") {
      console.log("inside fashion")
      this.subCategories = this.subCategoriesFashion;
    }
    // else if (industry == "Food") {
    //   console.log("inside food")
    //   this.subCategories = this.subCategoriesFood;
    // }
    else if (industry == "Machinery") {
      this.subCategories = this.subCategoriesMachinery;
    }
    // else if (industry == "Sports") {
    //   this.subCategories = this.subCategoriesSports;
    // }
  }
  industrySelect(industry, category) {
    this.showCategory = true;
    this.industry = industry;
    this.category = category;
    this.getCategoriesByIndustry(industry)
    this.load()
  }
  categorySelect(category) {
    this.category = category;
    this.load()
  }
}
