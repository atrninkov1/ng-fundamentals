import { Injectable } from "@angular/core";
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class AuthService{
    currentUser:IUser

    constructor(private http:HttpClient){}

    loginUser(userName: string, password: string){
        let options = {headers: new HttpHeaders({'Content-Type':'application/json'})}
        let loginInfo = { username: userName, password: password }
        return this.http.post('/api/login', loginInfo, options).pipe(tap(data => {
            this.currentUser = <IUser>data['user']
        })).pipe(catchError(err => {
            return of(false)
        }))
    }

    isAuthenticated(){
        return !!this.currentUser;
    }

    checkAuthenticationStatus(){
        this.http.get('/api/currentIdentity').subscribe(data => {
            if (data instanceof Object) {
                this.currentUser = <IUser>data
            }
        })
    }

    updateCurrentUser(firstName:string, lastName:string){
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName
        
        let options = {headers: new HttpHeaders({'Content-Type':'application/json'})}
        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser,options)
    }

    logout(){
        let options = {headers: new HttpHeaders({'Content-Type':'application/json'})}
        return this.http.post('/api/logout',{},options)
    }
}