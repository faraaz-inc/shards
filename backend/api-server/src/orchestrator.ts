import * as k8s from "@kubernetes/client-node";
import { BASE_REPO, getManifest } from "./manifests";

export class Orchestrator {
    static instance: Orchestrator;
    kc: k8s.KubeConfig;
    k8sApi: k8s.CoreV1Api;
    pods: string[] = [];


    constructor() {
        this.kc = new k8s.KubeConfig();
        this.kc.loadFromDefault();
        this.k8sApi = this.kc.makeApiClient(k8s.CoreV1Api);
    }

    public static getInstance() {
        if(!this.instance)
            this.instance = new Orchestrator();
        return this.instance;
    }

    async createPod(slug: string, language: string) {
        switch (language) {
            case "nodejs":
                try {
                    const pod = getManifest(`${BASE_REPO}:base-nodejs`, slug);
                    const createPodRes = await this.k8sApi.createNamespacedPod("shards", pod);
                    console.log("Pod created");
                    this.pods.push(createPodRes.body.metadata?.name as string);

                    return {
                        msg: "Pod created succesfully",
                        podName: createPodRes.body.metadata?.name
                    }
                }
                catch(err) {
                    console.log(err);
                    return {
                        msg: "Error while creating pod"
                    }

                }
        }
    }

    async deletePod(podName: string) {
        try {
            const deletePodRes = await this.k8sApi.deleteNamespacedPod(podName, "shards");
            const podIndex = this.pods.findIndex(pod => pod === podName);
            this.pods.splice(podIndex, 1);
            console.log(`Pod ${podName} deleted`);
            return {
                msg: `Pod ${podName} deleted succesfully`
            }
        }
        catch(err) {
            console.log(err);
            return {
                msg: "error deleting pod"
            }
        }
    }
    
}