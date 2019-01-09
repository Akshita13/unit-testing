import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe('heroes component',()=>{

    let fixture:ComponentFixture<HeroesComponent>
    let mockHeroesService;
    let heroes;

    

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
                HeroComponent
            ],
            providers:[{provide:HeroService,useValue:mockHeroesService}],
            schemas:[NO_ERRORS_SCHEMA]
        })

        fixture=TestBed.createComponent(HeroesComponent);
       
    });

    it('should render each hero as hero component',()=>{
        mockHeroesService.getHeroes.and.returnValues(of(heroes));
        fixture.detectChanges();
        const heroComponentDEs=fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toBe(3);
        for(let i=0;i<heroComponentDEs.length;i++)
        expect(heroComponentDEs[i].componentInstance.hero).toBe(heroes[i]);
    });

    it('should call heroservice.deletehero method when hero component;s delete button is clicked',()=>{
        spyOn(fixture.componentInstance,'delete')
        mockHeroesService.getHeroes.and.returnValues(of(heroes));
        fixture.detectChanges();

        const heroComponent=fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponent[0].query(By.css('button')).triggerEventHandler('click',{stopPropagation:()=>{}})

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);
    })

});