let Flux = require('@4geeksacademy/react-flux-dash').default;
class PSStore extends Flux.DashStore{
    constructor(){
        super();
        
        this.state = {
            menu: []
        };
        // Or Declare an event with some imutable transformation logic
        this.addEvent("menu", (frontMenu) => {
            if(typeof(frontMenu.items) == 'undefined') return frontMenu;
            // Do something with the data before propagating the Event
            let menu = frontMenu.items.map(function(item){
                if(typeof item.children == 'undefined') item.children = [];
                return {
                    title: item.title,
                    id: item.id,
                    children: item.children.map(function(it2){
                        if(typeof it2.children == 'undefined') it2.children = [];
                        return {
                            title: it2.title,
                            id: it2.id,
                            url: it2.url,
                            children: it2.children.map(function(it3){
                                if(typeof it3.children == 'undefined') it3.children = [];
                                return {
                                    title: it3.title,
                                    id: it3.id,
                                    url: it3.url
                                };
                            })
                        };
                    })
                };
            });
            return menu;
            // [
            //     { id: 1, title: 'Vegas Summer Series', children: [
            //             { id: 2, title: 'Vegas 2018', calendar: 2978, url:'/calendar/2978' },
            //             { id: 2, title: 'Vegas 2017 (Results)', calendar: 1746, url:'/calendar/1746' }
            //         ]
            //     },
            //     { id: 3, title: 'Ft Lauderdale - Miami', children: [
            //             { id: 4, title: 'May 2018', url:'/calendar/4190', calendar: 4190 },
            //             { id: 4, title: 'August 2018', url:'/calendar/12034', calendar: 4190 },
            //         ]
            //     }
            // ]
        });
    }
}
export default new PSStore();