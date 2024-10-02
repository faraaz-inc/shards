
export function getServiceManifest(shardId: string) {

    const service = {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
            name: `service-${shardId}`,
            namespace: "shards"
        },
        spec: {
            selector: {
                app: shardId
            },
            ports: [
                {
                    name: "websocket",
                    protocol: "TCP",
                    port: 7007,
                    targetPort: 7007
                },
                {
                    name: "socketio",
                    protocol: "TCP",
                    port: 7008,
                    targetPort: 7008
                },
                {
                    name: "output",
                    protocol: "TCP",
                    port: 5000,
                    targetPort: 5000
                },
            ],
            type: "ClusterIP"
        }
    }

    return service;
}