
export const BASE_REPO = "faraazinc/shards:latest";

export function getPodmanifest(shardId: string) {
    const pod = {
        apiVersion: "v1",
        kind: "Pod",
        metadata: {
            name: shardId,
            labels: {
                app: shardId
            },
            namespace: "shards"
        },
        spec: {
            containers: [
                {
                    name: shardId,
                    image: "faraazinc/shards:latest",
                    ports: [
                        { containerPort: 7007 },
                        { containerPort: 7008 },
                        { containerPort: 5000 }
                    ]
                }
            ]
        }
    }

    
    return pod;
}