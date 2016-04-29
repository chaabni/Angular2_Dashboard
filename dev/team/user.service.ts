import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import {FirebaseService} from "../login/firebase.service";

import {User} from './user';

@Injectable()

////  retourne l equipe de maniere assynchrone

export class UserService {

  constructor(private _firebaseService: FirebaseService, private _http: Http) {}
    
    
    createUser(username: string, role: string) {
        //console.log('function create');
        const body = JSON.stringify({ username: username, role: role});

        return this._http.post('https://blazing-inferno-9370.firebaseio.com/user.json', body)
            .map(response => response.json());
    }
    
    getUsers(): Observable<User[]> {
        return this._http.get('https://blazing-inferno-9370.firebaseio.com/user.json')
            .map(res => {
                let data = res.json();
                let result: Array<User> = [];
                Object.keys(data).forEach(function (key) {
                    let postObject: User;
                    postObject = { id: key, username: data[key].username, role: data[key].role};
                    result.push(postObject);
                })
                return result
            })
    }
    
     
     
}