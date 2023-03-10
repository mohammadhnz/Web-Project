import React, {useEffect, useState} from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import categories from "./static/categoriesWithChild.json"
export default function Test() {
    const [selectedNode, setSelectedNode] = useState({});
    const [selectedRoot, setSelectedRoot] = useState({});

    useEffect(() => {
        // This will be called for each new value of selectedNode, including the initial empty one
        // Here is where you can make your API call
        console.log("selectedNode", selectedNode);
        console.log("selectedRoo", selectedRoot);
    }, [selectedNode, selectedRoot]);

    const handleChange = (event, nodeId) => {
        categories.categories.forEach((treeRoot) => {
            if (treeRoot.id === nodeId) {
                setSelectedRoot(treeRoot);
                setSelectedNode(treeRoot);
                return
            }

            handleSelectedNode(treeRoot.childNodes, treeRoot, nodeId);
        });
    };

    const handleSelectedNode = (childNodes, treeRoot, nodeId) => {
        if (!childNodes) {
            return;
        }

        for (let i = 0; i < childNodes.length; i++) {
            let childNode = childNodes[i];
            if (childNode.id === nodeId) {
                setSelectedRoot(treeRoot);
                setSelectedNode(childNode);
                return;
            }

            handleSelectedNode(childNode.childNodes || [], treeRoot, nodeId);
        }
    };

    const displayTreeView = (treeViewArray) => {
        if (!treeViewArray) {
            return null;
        }
        return treeViewArray.map((treeViewItem) => {
            return (
                <TreeItem
                    key={treeViewItem.link}
                    nodeId={`${treeViewItem.link}`}
                    label={treeViewItem.title}
                >
                    {displayTreeView(treeViewItem.childNodes)}
                </TreeItem>
            );
        });
    };

    return (
        <>
            This is the selectedNode: {selectedNode?.title}
            <TreeView
                onNodeSelect={handleChange}
                sx={{height: 240, flexGrow: 1, maxWidth: 800, overflowY: "auto"}}
            >
                {displayTreeView(categories.categories)}
            </TreeView>
        </>
    );
};
