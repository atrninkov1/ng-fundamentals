import{
    EventListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventListResolver,
    EventResolver
} from './events/index'

import { Routes } from '@angular/router'
import { Error404Component } from './errors/404.component';
import { CreateSessionComponent } from './events/event-details/create-session.component';

export const appRoutes:Routes = [
    {path: 'events', component: EventListComponent, resolve: {events:EventListResolver}},
    {path: 'events/new', component: CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent']},
    {path: 'events/:id', component: EventDetailsComponent,
    resolve: {event:EventResolver}},
    {path: '', redirectTo: '/events', pathMatch: 'full'},
    {path:'404', component: Error404Component},
    {path: 'user', loadChildren: './user/user.module#UserModule'},
    {path: 'events/session/new', component: CreateSessionComponent}
]