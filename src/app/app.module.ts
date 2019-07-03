import { BrowserModule } from '@angular/platform-browser'
import { NgModule, Component } from '@angular/core'

import{
  EventListComponent, 
  EventThumbnailComponent, 
  EventService, 
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  SessionListComponent,
  DurationPipe
} from './events/index'
import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/navbar.component'
import { TOASTR_TOKEN, Toastr, JQ_TOKEN, CollapsibleWellComponent, SimpleModalComponent, ModalTriggerDirective } from './common/index'
import { RouterModule } from '@angular/router'
import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'
import { AuthService } from './user/auth.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CreateSessionComponent } from './events/event-details/create-session.component'

let toastr:Toastr = window['toastr']
let jQuery = window['$']

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EventsAppComponent,
    EventListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective
  ],
  providers:[EventService, 
             {provide: TOASTR_TOKEN, useValue: toastr}, 
             {provide: JQ_TOKEN, useValue: jQuery}, 
             EventRouteActivator, 
             EventListResolver,
             AuthService,
             {
               provide: 'canDeactivateCreateEvent', 
               useValue: checkDirtyState}],
               bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent){
  if(component.isDirty)
    return window.confirm('You have not saved this event do you really want to cancel')
  return true;
}