import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Directive, Input } from "@angular/core";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

@Directive({
    selector:'[routerLink]',
    host:{'(click)':'onClick()'}
})

export class routerLinkDirectiveStub{
    @Input('routerLink') linkParams:any; 
    navigatedTo:any=null;

    onClick()
    {
        this.navigatedTo=this.linkParams
    }
}
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
                HeroComponent,
                routerLinkDirectiveStub
            ],
            providers:[{provide:HeroService,useValue:mockHeroesService}],
           // schemas:[NO_ERRORS_SCHEMA]
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

    it('should call heroservice.deletehero method when hero component`s delete button is clicked',()=>{
        spyOn(fixture.componentInstance,'delete')

        /**
         * get sample data using mock
         */
        mockHeroesService.getHeroes.and.returnValues(of(heroes));
        fixture.detectChanges();

        const heroComponent=fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponent[0].query(By.css('button')).triggerEventHandler('click',{stopPropagation:()=>{}})

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);
    });

    it('shoud add new hero to hero list when add button is clicked',()=>{

        
        /**
         * get sample data using mock
         */
        mockHeroesService.getHeroes.and.returnValues(of(heroes));
        fixture.detectChanges();


        const name='abc';
        mockHeroesService.addHero.and.returnValues(of({id:4,name:name,strength:3}))
        const inputElement=fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton=fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value=name;
        addButton.triggerEventHandler('click',null)

        fixture.detectChanges();
    //    const heroText= fixture.debugElement.query(By.css('ul')).nativeElement.textCotent;

    //     expect(heroText).toContain(name);

    expect(fixture.nativeElement.querySelector('ul').textContent).toContain(name)
    });

    it('should have correct route on first hero',()=>{
        mockHeroesService.getHeroes.and.returnValues(of(heroes));
        fixture.detectChanges();
        const heroComponents=fixture.debugElement.queryAll(By.directive(HeroComponent));

        let routerLink=heroComponents[0].query(By.directive(routerLinkDirectiveStub))
        .injector.get(routerLinkDirectiveStub)

        heroComponents[0].query(By.css('a')).triggerEventHandler('click',null);

        expect(routerLink.navigatedTo).toBe('/detail/1')
    })

});