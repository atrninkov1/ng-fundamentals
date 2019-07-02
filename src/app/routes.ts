import{
    EventListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver
} from './events/index'

import { Routes } from '@angular/router'
import { Error404Component } from './errors/404.component';

export const appRoutes:Routes = [
    {path: 'events', component: EventListComponent, resolve: {events:EventListResolver}},
    {path: 'events/new', component: CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent']},
    {path: 'events/:id', component: EventDetailsComponent,
    canActivate: [EventRouteActivator]},
    {path: '', redirectTo: '/events', pathMatch: 'full'},
    {path:'404', component: Error404Component},
    {path: 'user', loadChildren: './user/user.module#UserModule'}
]