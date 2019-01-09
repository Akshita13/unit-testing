import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";


describe('hero component',()=>{

    let fixture:ComponentFixture<HeroComponent>;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
            schemas:[NO_ERRORS_SCHEMA]
        })
       fixture = TestBed.createComponent(HeroComponent)
      
    });

    it('should have correct hero',()=>{
        fixture.componentInstance.hero={id:1,name:'dfg',strength:4}

        expect(fixture.componentInstance.hero.name).toBe('dfg')
    }) 

    it('should render hero name in anchor tag',()=>{
        fixture.componentInstance.hero={id:1,name:'dfg',strength:4}
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('dfg')
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('dfg');
    })
})