import {Component, OnInit} from 'angular2/core';
import {FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';
import {Router, Location, CanActivate} from 'angular2/router';

import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';
import {Md5} from 'ts-md5/dist/md5';

import {UserService} from '../common/service/user.service';
import {User} from '../common/user';

@Component({
    selector: 'profile',
    templateUrl: 'app/profile/profile.component.html',
    styleUrls: ['app/profile/profile.component.css'],
    directives: [FORM_DIRECTIVES]
})
@CanActivate(() => tokenNotExpired())
export class ProfileComponent implements OnInit {
	
	connectedUser: User;
	gravatarId: string;
	private profileForm: ControlGroup;

	constructor(fb: FormBuilder, private router: Router, private location: Location, private userService: UserService) {
		this.profileForm = fb.group({
			name: ['', Validators.required],
            email: ['', Validators.required]
        });
	}

	ngOnInit() {
		console.log('on init connected home');
		let userToCreate: User = new User({ name: 'testAngular4', email: 'angular@test5.com' });
		userToCreate.password = 'test';
        this.userService.getConnectedUser().subscribe(user => {
			this.connectedUser = user;
			this.gravatarId = this.getGravatarId(user.email);
		});
        /*this.userService.create(userToCreate).subscribe(user2 => {
			console.log('user created with id : ' + user2.id);
			user2.email = 'modified@test.com';
			this.userService.update(user2).subscribe(() => {
				console.log('user updated with email :');
				this.userService.getById(user2.id).subscribe(modifiedUser => {
					console.log(modifiedUser.email);
					this.userService.changePassword(user2.id, 'pass').subscribe(() => {
						console.log('password change done');
						this.userService.deleteById(user2.id).subscribe(() => {
							console.log('user deleted');
						});
					});
				});
			});
		});*/
    }

    updateUser(value: any): void {
		let userToUpdate: User = new User(value);
		userToUpdate.id = this.connectedUser.id;
		this.userService.update(userToUpdate)
			.subscribe(
			() => this.router.navigate(['../Profile']),
			(error) => console.error(error) //TODO better handling of the error
			);
    }

    getGravatarId(email: string): string {
		return Md5.hashStr(email);
    }

}