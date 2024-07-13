import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

// Import your authentication service here (if needed)

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { } // Add any logic for checking authentication here (if using a separate service)

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
      
      const isAdmin = localStorage.getItem('isAdminLoggedIn');

      if (isAdmin) {
        return true;
      } else {
        return this.redirectToLogin();
      }
  }

  private redirectToLogin(): UrlTree {
    return this.router.parseUrl('/login'); // Replace with your login route
  }
}
