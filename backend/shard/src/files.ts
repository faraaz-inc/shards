import { readdirSync, readFile } from "fs";
import { join } from "path";


export async function fetchDir(path: string) {

    return new Promise((resolve, reject) => {
        const files = readdirSync(path, { withFileTypes: true });

        resolve(files.map(file => ({
            name: file.name,
            path: join(path, file.name),
            type: file.isDirectory() ? "dir" : "file" 
        })));
    })
}

export async function readFromFile(file: string) {

    return new Promise((resolve, reject) => {
        readFile(file, "utf-8", (err, data) => {
            if(err)
                reject(err);
            else
                resolve(data);
        })
    })
}