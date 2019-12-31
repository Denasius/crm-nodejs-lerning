import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Category} from "./interface";

@Injectable({
	providedIn: 'root'
})

export class CategoriesService{
	constructor(private http: HttpClient){}

	fetch(): Observable<Category[]>{
		return this.http.get<Category[]>('/api/category')
	}
}