import * as k8s from "@kubernetes/client-node";
import { getPodmanifest } from "./manifests/pod";
import { getServiceManifest } from "./manifests/service";
import { getIngress } from "./manifests/ingress";

export class Orchestrator {
    static instance: Orchestrator;
    kc: k8s.KubeConfig;
    k8sApi: k8s.CoreV1Api;
    k8sNetApi: k8s.NetworkingV1Api;
    pods: string[] = [];
    svcs: string[] = [];
    ingresses: string[] = [];


    constructor() {
        this.kc = new k8s.KubeConfig();
        this.kc.loadFromDefault();
        this.k8sApi = this.kc.makeApiClient(k8s.CoreV1Api);
        this.k8sNetApi = this.kc.makeApiClient(k8s.NetworkingV1Api);
    }

    public static getInstance() {
        if(!this.instance)
            this.instance = new Orchestrator();
        return this.instance;
    }

    //create new pod
    async createPod(shardId: string) {
        try {
            const pod = getPodmanifest(shardId);
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
            throw new Error("Error while creating pod")

        }
    }


    //create service
    async createService(shardId: string) {
        try {
            const service = getServiceManifest(shardId);
            const response = await this.k8sApi.createNamespacedService("shards", service);
            console.log("Pod's service created");
            this.svcs.push(response.body.metadata?.name as string);

            return {
                msg: "Pod created succesfully"
            }
        }
        catch(err) {
            console.log("Error while creating service");
            console.log(err);
            throw new Error("Error while creating service");
        }
    }

    //create ingress
    async createIngress(shardId: string) {
        try {
            const ingress = getIngress(shardId);
            const response = await this.k8sNetApi.createNamespacedIngress("shards", ingress);
            console.log("Ingress created");
            this.ingresses.push(response.body.metadata?.name as string);
        }
        catch(err) {
            console.log("Error while creating ingress");
            console.log(err);
            throw new Error("Error while creating ingress");
        }
    }

    //delete pod by name and its associated service and ingress
    async deletePod(shardId: string) {
        try {
            //delete pod
            const deletePodRes = await this.k8sApi.deleteNamespacedPod(shardId, "shards");
            const podIndex = this.pods.findIndex(pod => pod === shardId);
            this.pods.splice(podIndex, 1);
            console.log(`Pod ${shardId} deleted`);

            //delete service
            const deleteSvcRes = await this.k8sApi.deleteNamespacedService(`service-${shardId}`, "shards");
            const svcIndex = this.svcs.findIndex(svc => svc === `service-${shardId}`);
            this.svcs.splice(svcIndex, 1);
            console.log("service deleted");

            //delete ingress
            const deleteIngressRes = await this.k8sNetApi.deleteNamespacedIngress(`ingress-${shardId}`, "shards");
            const ingIndex = this.ingresses.findIndex(ing => ing === `ingress-${shardId}`);
            this.ingresses.splice(ingIndex, 1);
            console.log("Ingress deleted");

            return {
                msg: `Pod ${shardId} deleted succesfully`
            }
        }
        catch(err) {
            console.log(err);
            throw new Error("Error while deleting");
        }
    }
    
}