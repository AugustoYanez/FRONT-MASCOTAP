import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Provee el módulo de pruebas para HttpClient
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            loggedIn: () => of(true),  // Mockea el método que AuthGuard puede utilizar
            setRedirectUrl: () => {}  // Mockea el método de AuthService
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')  // Mockea el método de Router
          }
        }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

});
