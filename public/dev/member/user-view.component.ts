//Angular
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouteSegment, OnActivate } from '@angular/router';

//User
import { UserService } from "./user.service";
import { User } from './user';

//Firebase
declare var firebase: any;

import { ObjectToArrayPipe } from '../pipes/object-to-array.pipe'

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: "user-view",
    templateUrl: "/dev/member/user-view.component.html",
    directives: [CORE_DIRECTIVES],
    providers: [UserService, ObjectToArrayPipe, ToastsManager]
})

export class UserViewComponent implements OnActivate {
    user: User;
   
    constructor(private _userService: UserService, private _router: Router, private _routeSegment: RouteSegment, private _objectToArrayPipe : ObjectToArrayPipe, private _toastr: ToastsManager) { }

    routerOnActivate(current: RouteSegment) {
        let id = current.parameters['id'];
        this._userService.getUser(id).subscribe(data => this.user = data, error => console.log(error))
        
    }

    deleteUser() {
        let id = this._routeSegment.getParam('id');
        this._userService.deleteUser(id);
        this._router.navigate(['/Home/Member']);
        this._toastr.success('User deleted')
    }

    setUser(username, role) {
        let id = this._routeSegment.getParam('id');
        this._userService.setUser(id, username, role);
        this._router.navigate(['/Home/Member']);
        this._toastr.success('modifications saved');
    }
}
