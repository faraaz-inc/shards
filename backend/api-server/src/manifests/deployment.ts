
export const BASE_REPO = "faraazinc/shards";

export function getDeploymentManifest(image: string, shardId: string) {
    const deployment = {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
            name: shardId,
            labels: {
                app: shardId
            },
            namespace: "shards"
        },
        spec: {
            replicas: 2,
            selector: {
                matchLabels: {
                    app: shardId
                }
            },
            template: {
                metadata: {
                    labels: {
                        app: shardId
                    }
                },
                spec: {
                    containers: [
                        {
                            name: shardId,
                            image: image,
                            ports: [
                                {
                                    containerPort: 3000
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
    return deployment;
}