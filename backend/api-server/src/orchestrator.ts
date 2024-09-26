

export class Orchestrator {
    static instance: Orchestrator;

    public static getInstance() {
        if(!this.instance)
            this.instance = new Orchestrator();
        return this.instance;
    }

    async createPod(slug: string, language: string) {
        
    }

}