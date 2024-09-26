
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
                    protocol: "TCP",
                    port: 3000,
                    targetPort: 3000
                }
            ],
            type: "ClusterIP"
        }
    }
}