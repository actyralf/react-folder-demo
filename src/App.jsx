import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TreeView, { flattenTree } from "react-accessible-treeview";
import { v4 as uuid } from "uuid";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

const rootFolderId = uuid();
const initialFolderId = uuid();

const initialData = [
  {
    id: rootFolderId,
    name: "Root",
    isFolder: true,
    children: [initialFolderId],
    parent: null,
  },
  {
    id: initialFolderId,
    name: "Root",
    isFolder: true,
    children: [],
    parent: rootFolderId,
  },
];

function App() {
  const [folders, setFolders] = useState(initialData);

  function addElement({ parent, id, name, isFolder }) {
    const newId = uuid();
    const newElement = {
      id: newId,
      name,
      isFolder,
      parent: parent.id,
      children: [],
    };
    const newFolders = folders.map((folder) => {
      if (folder.id === parent.id) {
        return {
          ...folder,
          children: [...folder.children, newId],
        };
      } else {
        return folder;
      }
    });
    console.log([...newFolders, newElement]);
    setFolders([...newFolders, newElement]);
    console.log("Add");
  }
  return (
    <>
      <TreeView
        data={folders}
        className="basic"
        aria-label="basic example tree"
        nodeRenderer={({ element, getNodeProps, level }) => (
          <div
            {...getNodeProps()}
            style={{ paddingLeft: 20 * (level - 1), display: "flex" }}
          >
            <p>{element.name} </p>
            {element.isFolder && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const newId = uuid();
                    const newName = uniqueNamesGenerator({
                      dictionaries: [adjectives, colors, animals],
                    });
                    addElement({
                      id: newId,
                      parent: element,
                      name: newName,
                      isFolder: true,
                    });
                  }}
                >
                  Add Folder
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const newId = uuid();
                    const newName = uniqueNamesGenerator({
                      dictionaries: [adjectives, colors, animals],
                    });
                    addElement({
                      id: newId,
                      parent: element,
                      name: newName,
                      isFolder: false,
                    });
                  }}
                >
                  Add File
                </button>
              </>
            )}
          </div>
        )}
      />
      <p>{JSON.stringify(folders)}</p>
    </>
  );
}

export default App;
