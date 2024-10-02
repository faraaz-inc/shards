

export function getIngress(shardId: string) {

    const ingress = {
        apiVersion: "networking.k8s.io/v1",
        kind: "Ingress",
        metadata: {
            name: `ingress-${shardId}`,
            namespace: "shards",
            annotations: {
                "nginx.ingress.kubernetes.io/use-http2": "true", // Optional for HTTP/2 support
                "nginx.ingress.kubernetes.io/proxy-set-headers": "true", // Optional for header settings
                "nginx.ingress.kubernetes.io/websocket-services": `service-${shardId}`, // Ensure WebSocket support
                "nginx.ingress.kubernetes.io/backend-protocol": "WS" // Optional for WebSocket
            }
        },
        spec: {
            ingressClassName: "nginx",
            rules: [
                {
                    host: `${shardId}.frztech.test`,
                    http: {
                        paths: [
                            {
                                path: "/ws",
                                pathType: "Prefix",
                                backend: {
                                    service: {
                                        name: `service-${shardId}`,
                                        port: {
                                            number: 7007
                                        }
                                    }
                                },
                                annotations: {
                                    "nginx.ingress.kubernetes.io/rewrite-target": "/"
                                }
                            },
                            {
                                path: "/output",
                                pathType: "Prefix",
                                backend: {
                                    service: {
                                        name: `service-${shardId}`,
                                        port: {
                                            number:5000
                                        }
                                    }
                                },
                                annotations: {
                                    "nginx.ingress.kubernetes.io/rewrite-target": "/"
                                }
                            },
                            {
                                path: "/",
                                pathType: "Prefix",
                                backend: {
                                    service: {
                                        name: `service-${shardId}`,
                                        port: {
                                            number: 7008
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }

    return ingress;
}