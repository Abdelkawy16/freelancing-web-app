import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // fields
  public userData :any= null
  public isAuthed = false
  public isFreelancer = false
  public isAdmin = false
  public isClient = false
  apiMainUrl = 'http://localhost:3000'
  // methods
  constructor(private _http: HttpClient) {

  }
  getNews(): Observable<any> {
    return this._http.get('https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=de831464e1964348bea50f3dc7a85dd0')
  }
  registerUser(data: any): Observable<any> {
    return this._http.post(`${this.apiMainUrl}/register`, data)
  }
  loginUser(data: any): Observable<any> {
    return this._http.post(`${this.apiMainUrl}/login`, data)
  }
  profile(): Observable<any> {
    return this._http.get(`${this.apiMainUrl}/profile`)
  }
  addJob(data: any): Observable<any> {
    return this._http.post(`${this.apiMainUrl}/job/add`, data)
  }
  getMyJobs(): Observable<any> {
    return this._http.get(`${this.apiMainUrl}/job/myJobs`)
  }
  getAllJobs(): Observable<any> {
    return this._http.get(`${this.apiMainUrl}/job`)
  }
  addImg(file: any): Observable<any> {
    return this._http.post(`${this.apiMainUrl}/addImg`, file)
  }
  logout():Observable<any>{
    return this._http.get(`${this.apiMainUrl}/logout`)
  }
  delJob(id:any):Observable<any>{
    return this._http.delete(`${this.apiMainUrl}/job/del/${id}`)
  }
  applyJob(id:any, data:any):Observable<any>{
    return this._http.post(`${this.apiMainUrl}/job/applyJob/${id}`, data)
  }
  delMyAccount():Observable<any>{
    return this._http.delete(`${this.apiMainUrl}/del/account`)
  }
  addInfo(data:any):Observable<any>{
    return this._http.post(`${this.apiMainUrl}/addInfo`, data)
  }
  editProfile(data:any):Observable<any>{
    return this._http.patch(`${this.apiMainUrl}/editProfile`, data)
  }
  getUsers():Observable<any>{
    return this._http.get(`${this.apiMainUrl}/getUsers`)
  }
  delUserByAdmin(id:any):Observable<any>{
    return this._http.delete(`${this.apiMainUrl}/del/user/${id}`)
  }
  delJobByAdmin(id:any):Observable<any>{
    return this._http.delete(`${this.apiMainUrl}/del/job/${id}`)
  }
  getJobById(id:any):Observable<any>{
    return this._http.get(`${this.apiMainUrl}/job/${id}`)
  }
  acceptOffer(jobId:any, offerId:any):Observable<any>{
    return this._http.get(`${this.apiMainUrl}/job/acceptOffer/${jobId}/${offerId}`)
  }
  getUser(id:any):Observable<any>{
    return this._http.get(`${this.apiMainUrl}/user/${id}`)
  }
}