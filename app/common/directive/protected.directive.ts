import {Directive, OnInit, OnDestroy} from 'angular2/core';
import {AuthService} from '../service/auth.service';
import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";

@Directive({
    selector: '[protected]'
})
export class ProtectedDirective implements OnInit, OnDestroy {
    private sub:any = null;

    constructor(private authService:AuthService, private router:Router, private location:Location) { }

    ngOnInit() {
        if (!this.authService.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigate(['Login']);
        }

        this.sub = this.authService.subscribe((val) => {
            if (!val.authenticated) {
                this.location.replaceState('/');
                this.router.navigate(['Login']);
            }
        });
    }

    ngOnDestroy() {
        if (this.sub != null) {
            this.sub.unsubscribe();
        }
    }
}