"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orchestrator = void 0;
const k8s = __importStar(require("@kubernetes/client-node"));
const manifests_1 = require("./manifests");
class Orchestrator {
    constructor() {
        this.pods = [];
        this.kc = new k8s.KubeConfig();
        this.kc.loadFromDefault();
        this.k8sApi = this.kc.makeApiClient(k8s.CoreV1Api);
    }
    static getInstance() {
        if (!this.instance)
            this.instance = new Orchestrator();
        return this.instance;
    }
    createPod(slug, language) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            switch (language) {
                case "nodejs":
                    try {
                        const pod = (0, manifests_1.getManifest)(`${manifests_1.BASE_REPO}:base-nodejs`, slug);
                        const createPodRes = yield this.k8sApi.createNamespacedPod("shards", pod);
                        console.log("Pod created");
                        this.pods.push((_a = createPodRes.body.metadata) === null || _a === void 0 ? void 0 : _a.name);
                        return {
                            msg: "Pod created succesfully",
                            podName: (_b = createPodRes.body.metadata) === null || _b === void 0 ? void 0 : _b.name
                        };
                    }
                    catch (err) {
                        console.log(err);
                        return {
                            msg: "Error while creating pod"
                        };
                    }
            }
        });
    }
}
exports.Orchestrator = Orchestrator;
