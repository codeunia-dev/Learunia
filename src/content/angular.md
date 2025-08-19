# Angular Framework Cheatsheet

## Getting Started

### Installation & Setup
```bash
# Install Angular CLI
npm install -g @angular/cli

# Create new project
ng new my-app
cd my-app

# Serve the application
ng serve

# Build for production
ng build --prod

# Generate components, services, etc.
ng generate component my-component
ng generate service my-service
ng generate module my-module
ng generate guard my-guard
ng generate pipe my-pipe
ng generate directive my-directive
```

### Project Structure
```
src/
├── app/
│   ├── components/
│   ├── services/
│   ├── models/
│   ├── guards/
│   ├── pipes/
│   ├── directives/
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.module.ts
│   └── app-routing.module.ts
├── assets/
├── environments/
├── styles.css
└── main.ts
```

## Components

### Basic Component
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent implements OnInit {
  title = 'My Component';
  count = 0;
  items: string[] = ['Item 1', 'Item 2', 'Item 3'];

  constructor() { }

  ngOnInit(): void {
    console.log('Component initialized');
  }

  increment(): void {
    this.count++;
  }

  addItem(item: string): void {
    this.items.push(item);
  }
}
```

### Component Template
```html
<!-- my-component.component.html -->
<div class="component-container">
  <h2>{{ title }}</h2>
  
  <!-- Property binding -->
  <p [innerHTML]="title"></p>
  
  <!-- Event binding -->
  <button (click)="increment()">Count: {{ count }}</button>
  
  <!-- Two-way binding -->
  <input [(ngModel)]="title" placeholder="Enter title">
  
  <!-- Conditional rendering -->
  <div *ngIf="count > 0">
    Count is greater than 0
  </div>
  
  <div *ngIf="count > 5; else lowCount">
    High count!
  </div>
  <ng-template #lowCount>
    <div>Low count</div>
  </ng-template>
  
  <!-- List rendering -->
  <ul>
    <li *ngFor="let item of items; let i = index; trackBy: trackByIndex">
      {{ i + 1 }}: {{ item }}
    </li>
  </ul>
  
  <!-- Switch statement -->
  <div [ngSwitch]="count">
    <p *ngSwitchCase="0">Zero</p>
    <p *ngSwitchCase="1">One</p>
    <p *ngSwitchDefault>Many</p>
  </div>
</div>
```

### Component Styles
```css
/* my-component.component.css */
.component-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.component-container h2 {
  color: #333;
  margin-bottom: 15px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}
```

## Data Binding

### Interpolation
```typescript
// Component
export class DataBindingComponent {
  message = 'Hello Angular';
  user = { name: 'John', age: 30 };
  
  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }
}
```

```html
<!-- Template -->
<p>{{ message }}</p>
<p>{{ user.name }} is {{ user.age }} years old</p>
<p>Current time: {{ getCurrentTime() }}</p>
<p>{{ 2 + 3 }}</p>
<p>{{ message.toUpperCase() }}</p>
```

### Property Binding
```html
<!-- Bind to HTML attributes -->
<img [src]="imageUrl" [alt]="imageAlt">
<button [disabled]="isDisabled">Click me</button>
<div [class.active]="isActive">Dynamic class</div>
<div [style.color]="textColor">Colored text</div>

<!-- Bind to component properties -->
<input [value]="inputValue" [placeholder]="placeholderText">

<!-- Multiple class binding -->
<div [ngClass]="{
  'active': isActive,
  'disabled': isDisabled,
  'large': isLarge
}">Multiple classes</div>

<!-- Multiple style binding -->
<div [ngStyle]="{
  'color': textColor,
  'font-size': fontSize + 'px',
  'background-color': backgroundColor
}">Styled element</div>
```

### Event Binding
```html
<!-- Basic events -->
<button (click)="onClick()">Click me</button>
<input (keyup)="onKeyUp($event)" (blur)="onBlur()">
<form (submit)="onSubmit($event)">

<!-- Event with parameters -->
<button (click)="onButtonClick('param1', $event)">Click with params</button>

<!-- Custom events -->
<app-child (customEvent)="onCustomEvent($event)"></app-child>
```

```typescript
// Component methods
onClick(): void {
  console.log('Button clicked');
}

onKeyUp(event: KeyboardEvent): void {
  console.log('Key pressed:', event.key);
}

onSubmit(event: Event): void {
  event.preventDefault();
  console.log('Form submitted');
}

onButtonClick(param: string, event: Event): void {
  console.log('Param:', param, 'Event:', event);
}
```

### Two-Way Binding
```html
<!-- Basic two-way binding -->
<input [(ngModel)]="name" placeholder="Enter name">
<p>Hello {{ name }}!</p>

<!-- Custom two-way binding -->
<app-custom-input [(value)]="customValue"></app-custom-input>
```

```typescript
// For ngModel, import FormsModule in app.module.ts
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
  // ...
})
export class AppModule { }
```

## Directives

### Structural Directives
```html
<!-- *ngIf -->
<div *ngIf="condition">Shown when condition is true</div>
<div *ngIf="user; else noUser">
  Welcome {{ user.name }}
</div>
<ng-template #noUser>
  <div>No user found</div>
</ng-template>

<!-- *ngFor -->
<ul>
  <li *ngFor="let item of items; let i = index; let first = first; let last = last">
    {{ i }}: {{ item }}
    <span *ngIf="first">(First)</span>
    <span *ngIf="last">(Last)</span>
  </li>
</ul>

<!-- *ngSwitch -->
<div [ngSwitch]="selectedTab">
  <div *ngSwitchCase="'home'">Home content</div>
  <div *ngSwitchCase="'about'">About content</div>
  <div *ngSwitchDefault>Default content</div>
</div>
```

### Attribute Directives
```html
<!-- ngClass -->
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">
<div [ngClass]="classNames">
<div ngClass="static-class">

<!-- ngStyle -->
<div [ngStyle]="{'color': textColor, 'font-size': fontSize}">
<div [ngStyle]="styleObject">

<!-- Built-in attribute directives -->
<div [class.active]="isActive">
<div [style.color]="textColor">
<div [attr.data-id]="itemId">
```

### Custom Directive
```typescript
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight = '';
  @Input() defaultColor = 'yellow';

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string | null) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

```html
<!-- Usage -->
<p appHighlight="lightblue">Hover over me!</p>
<p [appHighlight]="'lightgreen'" defaultColor="pink">Custom highlight</p>
```

## Services & Dependency Injection

### Basic Service
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/data`);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/data`, data);
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/data/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/data/${id}`);
  }
}
```

### Using Services in Components
```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html'
})
export class DataListComponent implements OnInit {
  data: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;
    
    this.dataService.getData().subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load data';
        this.loading = false;
        console.error(error);
      }
    });
  }

  createItem(newItem: any): void {
    this.dataService.create(newItem).subscribe({
      next: (created) => {
        this.data.push(created);
      },
      error: (error) => {
        console.error('Failed to create item:', error);
      }
    });
  }
}
```

### Service with State Management
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private usersSubject = new BehaviorSubject<User[]>([]);

  currentUser$ = this.currentUserSubject.asObservable();
  users$ = this.usersSubject.asObservable();

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }

  addUser(user: User): void {
    const users = this.usersSubject.value;
    this.usersSubject.next([...users, user]);
  }

  updateUser(updatedUser: User): void {
    const users = this.usersSubject.value;
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index >= 0) {
      users[index] = updatedUser;
      this.usersSubject.next([...users]);
    }
  }

  removeUser(userId: string): void {
    const users = this.usersSubject.value;
    this.usersSubject.next(users.filter(u => u.id !== userId));
  }
}
```

## Routing

### Basic Routing Setup
```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### Navigation
```html
<!-- app.component.html -->
<nav>
  <a routerLink="/home" routerLinkActive="active">Home</a>
  <a routerLink="/about" routerLinkActive="active">About</a>
  <a routerLink="/contact" routerLinkActive="active">Contact</a>
  <a [routerLink]="['/user', userId]">User Profile</a>
</nav>

<router-outlet></router-outlet>
```

```typescript
// Programmatic navigation
import { Router, ActivatedRoute } from '@angular/router';

export class NavigationComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToUser(userId: string): void {
    this.router.navigate(['/user', userId]);
  }

  navigateWithQueryParams(): void {
    this.router.navigate(['/products'], { 
      queryParams: { category: 'electronics', page: 1 } 
    });
  }

  navigateRelative(): void {
    this.router.navigate(['../sibling'], { relativeTo: this.route });
  }
}
```

### Route Parameters & Query Parameters
```typescript
// Reading route parameters
export class UserDetailComponent implements OnInit {
  userId: string;
  queryParams: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Route parameters
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });

    // Query parameters
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
    });

    // Alternative: snapshot (for one-time reading)
    this.userId = this.route.snapshot.params['id'];
    this.queryParams = this.route.snapshot.queryParams;
  }
}
```

### Route Guards
```typescript
// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

// Usage in routes
const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];
```

## Forms

### Template-Driven Forms
```html
<!-- template-driven-form.component.html -->
<form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
  <div>
    <label for="name">Name:</label>
    <input 
      type="text" 
      id="name" 
      name="name" 
      [(ngModel)]="user.name" 
      #name="ngModel"
      required
      minlength="2">
    
    <div *ngIf="name.invalid && name.touched" class="error">
      <div *ngIf="name.errors?.['required']">Name is required</div>
      <div *ngIf="name.errors?.['minlength']">Name must be at least 2 characters</div>
    </div>
  </div>

  <div>
    <label for="email">Email:</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      [(ngModel)]="user.email" 
      #email="ngModel"
      required
      email>
    
    <div *ngIf="email.invalid && email.touched" class="error">
      <div *ngIf="email.errors?.['required']">Email is required</div>
      <div *ngIf="email.errors?.['email']">Invalid email format</div>
    </div>
  </div>

  <button type="submit" [disabled]="userForm.invalid">Submit</button>
</form>
```

```typescript
// template-driven-form.component.ts
export class TemplateDrivenFormComponent {
  user = {
    name: '',
    email: ''
  };

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Form submitted:', this.user);
    }
  }
}
```

### Reactive Forms
```typescript
// reactive-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

export class ReactiveFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18)]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
      }),
      hobbies: this.fb.array([])
    });
  }

  get hobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  addHobby(): void {
    this.hobbies.push(this.fb.control('', Validators.required));
  }

  removeHobby(index: number): void {
    this.hobbies.removeAt(index);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach(field => {
      const control = this.userForm.get(field);
      control?.markAsTouched();
    });
  }

  // Getter methods for easy access in template
  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
  get age() { return this.userForm.get('age'); }
}
```

```html
<!-- reactive-form.component.html -->
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" formControlName="name">
    <div *ngIf="name?.invalid && name?.touched" class="error">
      <div *ngIf="name?.errors?.['required']">Name is required</div>
      <div *ngIf="name?.errors?.['minlength']">Name must be at least 2 characters</div>
    </div>
  </div>

  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" formControlName="email">
    <div *ngIf="email?.invalid && email?.touched" class="error">
      <div *ngIf="email?.errors?.['required']">Email is required</div>
      <div *ngIf="email?.errors?.['email']">Invalid email format</div>
    </div>
  </div>

  <div formGroupName="address">
    <h3>Address</h3>
    <input type="text" placeholder="Street" formControlName="street">
    <input type="text" placeholder="City" formControlName="city">
    <input type="text" placeholder="Zip Code" formControlName="zipCode">
  </div>

  <div formArrayName="hobbies">
    <h3>Hobbies</h3>
    <div *ngFor="let hobby of hobbies.controls; let i = index">
      <input type="text" [formControlName]="i" placeholder="Hobby">
      <button type="button" (click)="removeHobby(i)">Remove</button>
    </div>
    <button type="button" (click)="addHobby()">Add Hobby</button>
  </div>

  <button type="submit" [disabled]="userForm.invalid">Submit</button>
</form>
```

### Custom Validators
```typescript
// custom-validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static forbiddenName(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    };
  }

  static passwordMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      
      if (!password || !confirmPassword) {
        return null;
      }
      
      return password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
    };
  }
}
```

## HTTP Client

### Basic HTTP Operations
```typescript
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<User>(url, user, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUser(id: number): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return new Observable(observer => observer.next([]));
    }
    
    const params = new HttpParams().set('q', term);
    return this.http.get<User[]>(this.apiUrl, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}
```

### HTTP Interceptors
```typescript
// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthorizationToken();
    
    if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authReq);
    }
    
    return next.handle(req);
  }
}

// Register in app.module.ts
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
```

## Observables & RxJS

### Basic Observable Usage
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, BehaviorSubject, interval } from 'rxjs';
import { map, filter, take, takeUntil } from 'rxjs/operators';

export class ObservableComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Basic observable
    const observable = new Observable(observer => {
      observer.next('Hello');
      observer.next('World');
      observer.complete();
    });

    observable.subscribe({
      next: value => console.log(value),
      error: error => console.error(error),
      complete: () => console.log('Complete')
    });

    // Interval observable with operators
    interval(1000)
      .pipe(
        map(value => value * 2),
        filter(value => value % 4 === 0),
        take(5),
        takeUntil(this.destroy$)
      )
      .subscribe(value => console.log(value));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Common RxJS Operators
```typescript
import { 
  map, filter, tap, switchMap, mergeMap, 
  combineLatest, debounceTime, distinctUntilChanged,
  catchError, retry, finalize
} from 'rxjs/operators';
import { of, throwError } from 'rxjs';

// Transformation operators
source$.pipe(
  map(value => value * 2),
  filter(value => value > 10),
  tap(value => console.log('Debug:', value))
);

// Combination operators
combineLatest([observable1$, observable2$])
  .pipe(
    map(([val1, val2]) => val1 + val2)
  );

// Flattening operators
searchTerm$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.searchService.search(term))
);

// Error handling
dataSource$.pipe(
  catchError(error => {
    console.error('Error occurred:', error);
    return of([]); // Return fallback value
  }),
  retry(3),
  finalize(() => console.log('Operation completed'))
);
```

## Component Communication

### Parent to Child (@Input)
```typescript
// child.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div>
      <h3>{{ title }}</h3>
      <p>Count: {{ count }}</p>
      <ul>
        <li *ngFor="let item of items">{{ item }}</li>
      </ul>
    </div>
  `
})
export class ChildComponent {
  @Input() title: string = '';
  @Input() count: number = 0;
  @Input() items: string[] = [];
}
```

```html
<!-- parent.component.html -->
<app-child 
  [title]="parentTitle" 
  [count]="parentCount" 
  [items]="parentItems">
</app-child>
```

### Child to Parent (@Output)
```typescript
// child.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <button (click)="sendMessage()">Send Message</button>
    <button (click)="sendData()">Send Data</button>
  `
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();
  @Output() dataEvent = new EventEmitter<{id: number, name: string}>();

  sendMessage(): void {
    this.messageEvent.emit('Hello from child!');
  }

  sendData(): void {
    this.dataEvent.emit({id: 1, name: 'John'});
  }
}
```

```html
<!-- parent.component.html -->
<app-child 
  (messageEvent)="receiveMessage($event)"
  (dataEvent)="receiveData($event)">
</app-child>
```

```typescript
// parent.component.ts
export class ParentComponent {
  receiveMessage(message: string): void {
    console.log('Received message:', message);
  }

  receiveData(data: {id: number, name: string}): void {
    console.log('Received data:', data);
  }
}
```

### Template Reference Variables
```html
<!-- parent.component.html -->
<app-child #childRef></app-child>
<button (click)="childRef.someMethod()">Call Child Method</button>
<p>Child property: {{ childRef.someProperty }}</p>
```

### ViewChild and ViewChildren
```typescript
// parent.component.ts
import { Component, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

export class ParentComponent implements AfterViewInit {
  @ViewChild(ChildComponent) child!: ChildComponent;
  @ViewChildren(ChildComponent) children!: QueryList<ChildComponent>;

  ngAfterViewInit(): void {
    // Access child component
    console.log(this.child.someProperty);
    this.child.someMethod();

    // Access multiple children
    this.children.forEach(child => {
      child.someMethod();
    });
  }
}
```

## Pipes

### Built-in Pipes
```html
<!-- String pipes -->
<p>{{ message | uppercase }}</p>
<p>{{ message | lowercase }}</p>
<p>{{ message | titlecase }}</p>

<!-- Number pipes -->
<p>{{ price | currency:'USD':'symbol':'1.2-2' }}</p>
<p>{{ percentage | percent:'1.0-2' }}</p>
<p>{{ largeNumber | number:'1.0-0' }}</p>

<!-- Date pipes -->
<p>{{ today | date:'short' }}</p>
<p>{{ today | date:'yyyy-MM-dd' }}</p>
<p>{{ today | date:'fullDate' }}</p>

<!-- JSON pipe -->
<pre>{{ object | json }}</pre>

<!-- Async pipe -->
<p>{{ observable$ | async }}</p>
<ul>
  <li *ngFor="let item of items$ | async">{{ item }}</li>
</ul>

<!-- Slice pipe -->
<p>{{ longText | slice:0:100 }}</p>
<ul>
  <li *ngFor="let item of (items | slice:0:5)">{{ item }}</li>
</ul>
```

### Custom Pipe
```typescript
// truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, ellipsis: string = '...'): string {
    if (!value) return '';
    
    if (value.length <= limit) {
      return value;
    }
    
    return value.substring(0, limit) + ellipsis;
  }
}
```

```html
<!-- Usage -->
<p>{{ longText | truncate:100:'...' }}</p>
<p>{{ description | truncate:50 }}</p>
```

## Lifecycle Hooks

### Component Lifecycle
```typescript
import { 
  Component, OnInit, OnDestroy, OnChanges, 
  AfterViewInit, AfterContentInit, SimpleChanges 
} from '@angular/core';

export class LifecycleComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
    // Called when input properties change
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    // Called once after component initialization
    // Good place for initialization logic
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
    // Called after content projection
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    // Called after view initialization
    // Good place to access ViewChild elements
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    // Called before component destruction
    // Good place for cleanup (unsubscribe, clear timers)
  }
}
```

## Testing

### Unit Testing Component
```typescript
// component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './my.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Test Title');
  });

  it('should increment count on button click', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.count).toBe(1);
  });
});
```

### Unit Testing Service
```typescript
// service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch users', () => {
    const mockUsers = [
      { id: 1, name: 'John', email: 'john@example.com' },
      { id: 2, name: 'Jane', email: 'jane@example.com' }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
```

## Best Practices

1. **Use OnPush Change Detection** for better performance
2. **Unsubscribe from Observables** to prevent memory leaks
3. **Use TrackBy functions** in *ngFor for better performance
4. **Lazy load modules** for better initial load time
5. **Use environment files** for configuration
6. **Follow Angular Style Guide** for consistent code
7. **Use Angular CLI** for scaffolding and building
8. **Implement proper error handling** throughout the app
9. **Use TypeScript strictly** with proper typing
10. **Write unit tests** for components and services
