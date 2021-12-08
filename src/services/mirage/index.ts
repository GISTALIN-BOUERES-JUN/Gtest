import { createServer, Factory, Model } from 'miragejs'
import faker, { fake } from 'faker'
import { request } from 'http'

type Email = {
user: string;
email: string;
created_at: string;
content: string;
subject: string;
type: string

}

export function makeServer(){
    const server = createServer ({
        models: {
            email: Model.extend<Partial<Email>>({})
        },

        /*
        factories: {
            email: Factory.extend ({
                id(i: number) {
                    return `id ${i+1}`
                },
                user(){
                    return (faker.name.firstName() + ' ' + faker.name.lastName())
                },

                email() {
                    return faker.internet.email().toLocaleLowerCase();
                },
                createdAt() {
                    return faker.date.recent(10).toLocaleString();
                },
                subject() {
                    return faker.lorem.sentences(1);
                },
                content() {
                    return faker.lorem.paragraphs(2);
                },
                type() {
                    return "inbox";
                },
                
            })

        }, */

        seeds(server){
            server.db.loadData({
                emails: [
                    {
                        user: "Larissa",
email: "larissa@oi",
created_at: new Date(),
content: "Oi oi oi",
subject: "abcd",
type: "sent",
                    },
                    
                ],
            })

        }, 
        
        routes() {
            this.namespace = 'api';
            this.timing = 750;

            this.get('/emails', () => {
                return this.schema.all('email');
            } )


            this.post('/emails', (schema, request) =>{
                const data = JSON.parse(request.requestBody)
                return schema.create('email', data)
            })

            this.passthrough()

        }
    })

    return server;
}