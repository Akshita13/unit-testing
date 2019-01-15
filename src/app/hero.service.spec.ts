import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse, HttpClient, HttpHeaders } from "@angular/common/http";
import { Hero } from "./hero";


describe('hero service', () => {

    //let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service: HeroService;
    let expectedHeroes:Hero[];
     let httpClient:HttpClient;
    beforeEach(() => {

       
       // mockMessageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HeroService,
            MessageService
              ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);
        httpClient = TestBed.get(HttpClient);
        expectedHeroes = [
            { id: 1, name: 'A' },
            { id: 2, name: 'B' },
           ] as Hero[];
    });

    describe('getHeroes', () => {
       

        
        it('should call getHeroes once',()=>{
            service.getHeroes().subscribe(
                // heroes => expect(heroes).toEqual(expectedHeroes, 'should return expected heroes')
                
              );
        
              // HeroService should have made one request to GET heroes from expected URL
              const req = httpTestingController.expectOne(service.heroesUrl);
              expect(req.request.method).toEqual('GET');
        
              // Respond with the mock heroes
              req.flush(expectedHeroes);
            
        });

        it('should be OK returning no heroes',()=>{
            service.getHeroes().subscribe(
                heroes=>expect(heroes.length).toEqual(0,'should return empty array')
            );

            const req=httpTestingController.expectOne(service.heroesUrl);
            req.flush([]);
        })

     
    


        });

        describe('gethero',()=>{
             
            it('should call get with correct url', () => {

            service.getHero(2).subscribe(
              //  heroes => expect(heroes).toEqual(expectedHeroes[1], 'should return expected heroes')
            );
            const req = httpTestingController.expectOne('api/heroes/2');
            req.flush(expectedHeroes);
            httpTestingController.verify();

            });
        })


       
    });

