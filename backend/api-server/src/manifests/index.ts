
export const BASE_REPO = "faraazinc/shards";

export function getManifest(image: string, slug: string) {
    const pod = {
        metadata: {
            name: slug
        },
        spec: {
            containers: [{
                name: slug,
                image
            }]
        }
    }
    return pod;
}