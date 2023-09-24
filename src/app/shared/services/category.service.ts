import { Injectable } from '@angular/core';
import {Category} from "../models/category";
import {DataService} from "./data-service.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DataService<Category>{
  constructor(http: HttpClient) {
    super(http);
    this.basePath = 'http://localhost:3000/categories';
  }
}
