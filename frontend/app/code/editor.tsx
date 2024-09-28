import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/external/components/sidebar";
import { Code } from "../components/external/editor/code";
import styled from "@emotion/styled";
import { File, buildFileTree, RemoteFile } from "../components/external/utils/file-manager";
import { FileTree } from "../components/external/components/fileTree";
import { Socket } from "socket.io-client";

// credits - https://codesandbox.io/s/monaco-tree-pec7u
export const Editor = ({
    files,
    onSelect,
    selectedFile,
    socket,
    fetchRootContents
}: {
    files: RemoteFile[];
    onSelect: (file: File) => void;
    selectedFile: File | undefined;
    socket: Socket;
    fetchRootContents: () => void
}) => {
  const rootDir = useMemo(() => {

    return buildFileTree(files);

  }, [files]);

  useEffect(() => {
      // onSelect(rootDir.files[0])
      
      if(!selectedFile)
        fetchRootContents();
      
  }, [])

  return (
    <div>
      <Main>
        <Sidebar>
          <FileTree
            rootDir={rootDir}
            selectedFile={selectedFile}
            onSelect={onSelect}
          />
        </Sidebar>
        <Code socket={socket} selectedFile={selectedFile} />
      </Main>
    </div>
  );
};

const Main = styled.main`
  display: flex;
`;