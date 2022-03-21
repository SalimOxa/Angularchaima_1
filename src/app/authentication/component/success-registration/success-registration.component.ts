import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';


@Component({
  selector: 'app-success-registration',
  templateUrl: './success-registration.component.html',
  styleUrls: ['./success-registration.component.css']
})
export class SuccessRegistrationComponent implements OnInit {
  codeConfirmation: any;

  constructor(private router: Router, private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.codeConfirmation = this.route.snapshot.params.codeConfirmation;
    console.log('codeConfirmation' + this.codeConfirmation);
    this.authenticationService.confirmAccountEmail(this.codeConfirmation).subscribe(
      (res) => {
        console.log('confirm');
        this.router.navigateByUrl('/register')
      },
      (error) => {
        console.log('NotConfirmed');

      }
    );
  }

}
