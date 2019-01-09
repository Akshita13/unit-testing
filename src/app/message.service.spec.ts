import { MessageService } from "./message.service";

describe('message service',()=>{
    let messageService:MessageService;

    beforeEach(()=>{
        messageService= new MessageService();
    })

    it('should be no message',()=>{
        expect(messageService.messages.length).toBe(0);
    }
    )

    it('should add message when add method called',()=>{

        messageService.add('abc');

        expect(messageService.messages.length).toBe(1);
    })
})