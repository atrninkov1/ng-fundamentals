import {Component} from '@angular/core'
import { AuthService } from '../user/auth.service';
import { ISession, EventService } from '../events';
import { $ } from 'protractor';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styles:[`
    .nav.navbar-nav {font-size:15px;}
    #searchForm {margin-right:100px;}
    @media (max-width:1200px) {#searchForm {display:none;}}
    li > a.active {color: #F97924;}
    `]})
export class NavBarComponent{

    searchTerm:string = ""
    foundSessions: ISession[]
    locations:string[]

    constructor(private auth:AuthService, private eventService:EventService){
        console.log('constructor')
    }

    searchSessions(searchTerm){
        this.eventService.searchSessions(searchTerm).subscribe(sessions => {this.foundSessions = sessions})
        this.eventService.getLocations().subscribe(locations => {this.locations = locations})
        console.log(this.locations)
    }
}