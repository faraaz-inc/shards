import Editor from "@monaco-editor/react";
import { File } from "../utils/file-manager";
import { Socket } from "socket.io-client";

export const Code = ({ selectedFile, socket }: { selectedFile: File | undefined, socket: Socket }) => {
  if (!selectedFile)
    return null

  const code = selectedFile.content
  let language = selectedFile.name.split('.').pop()

  if (language === "js" || language === "jsx")
    language = "javascript";
  else if (language === "ts" || language === "tsx")
    language = "typescript"
  else if (language === "py" )
    language = "python"
  else if (language === "cpp")
    language = "c++"

    function debounce(func: (value: string) => void, wait: number) {
      let timeout: number;
      return (value: string) => {
        clearTimeout(timeout);
        //@ts-ignore
        timeout = setTimeout(() => {
          func(value);
        }, wait);
      };
    }

  return (
      <div className="w-full ">
        <div className="text-gray-400">
          Playground
        </div>
        <Editor
          height="650px"
          language={language}
          value={code}
          theme="vs-dark"
          //@ts-ignore
          onChange={debounce((value) => {
            // Should send diffs, for now sending the whole file
            // PR and win a bounty!
            socket.emit("updateContent", { path: selectedFile.path, content: value });
          }, 500)}
        />
      </div>
  )
}