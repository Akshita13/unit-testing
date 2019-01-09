import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { Component, Input } from "@angular/core";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe('heroes component',()=>{

    let fixture:ComponentFixture<HeroesComponent>
    let mockHeroesService;
    let heroes;

    
@Component({
    selector: 'app-hero',
    template:'<div></div>'
    
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }
    beforeEach(()=>{

        heroes=[
            {id:1,name:'hnfv',strength:4},
            {id:2,name:'hnfv',strength:4},
            {id:3,name:'hnfv',strength:4}
        ]
        mockHeroesService=jasmine.createSpyObj(['addHero','deleteHero','getHeroes'])
        TestBed.configureTestingModule({
            declarations:[
                HeroesComponent,
                FakeHeroComponent
            ],
            providers:[{provide:HeroService,useValue:mockHeroesService}],
            //schemas:[NO_ERRORS_SCHEMA]
        })

        fixture=TestBed.createComponent(HeroesComponent);

    });


    it(' should set correctly from service',()=>{
        mockHeroesService.getHeroes.and.returnValue(of(heroes));
        fixture.detectChanges();
        expect(fixture.componentInstance.heroes.length).toBe(3);
    })

    it('should have correct number of li elements',()=>{
        mockHeroesService.getHeroes.and.returnValue(of(heroes));
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    })
})