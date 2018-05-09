class TournamentStore{
    constructor(){
        this.state = {
            
        };
    }
    getTournaments(slug){
        if(typeof this.state[slug] == 'undefined') return null;
        else return this.state[slug];
    }
    setTournaments(slug, data){
        this.state[slug] = data;
    }
}
export default new TournamentStore();