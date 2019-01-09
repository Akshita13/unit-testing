
import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe('heroes component',()=>{
    let component:HeroesComponent;
    let hero;
    let mockHeroService;

    beforeEach(()=>{
        hero=[
            {id:1,name:'hnfv',strength:4},
            {id:2,name:'hnfv',strength:4},
            {id:3,name:'hnfv',strength:4}
        ]

        mockHeroService= jasmine.createSpyObj(['getHeroes','addHero','deleteHero']); 

        component=new HeroesComponent(mockHeroService)
    })

describe('delete',()=>
{
    it('should remove hero',()=>{
        mockHeroService.deleteHero.and.returnValue(of(true))
        
        component.heroes=hero;
        component.delete(hero[2]);

        expect(component.heroes.length).toBe(2);
    })

    it('should remove deleteHero',()=>{
        mockHeroService.deleteHero.and.returnValue(of(true));
        
        component.heroes=hero;
        component.delete(hero[2]);

        expect(mockHeroService.deleteHero).toHaveBeenCalledWith(hero[2]);
    })
})
})