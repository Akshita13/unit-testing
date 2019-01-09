import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('hero service', () => {

    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service: HeroService
    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HeroService,
                { provide: MessageService, useValue: mockMessageService }]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);
    });

    describe('getHero', () => {
        it('should call get with correct url', () => {
            service.getHero(3).subscribe();
            const req = httpTestingController.expectOne('api/heroes/3');
            req.flush({ id: 3, name: 'dsad', strength: 4 });
            httpTestingController.verify();
        });
    })
})