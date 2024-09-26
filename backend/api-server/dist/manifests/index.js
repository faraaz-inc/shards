"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_REPO = void 0;
exports.getManifest = getManifest;
exports.BASE_REPO = "faraazinc/shards";
function getManifest(image, slug) {
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
    };
    return pod;
}
