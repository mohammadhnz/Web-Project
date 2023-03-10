import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {useState} from "react";
import {Link as RouterLink} from 'react-router-dom';

export default function CategoriesInNav({data, key}) {
    const renderTree = (nodes) => (
        <TreeItem key={nodes.link + JSON.stringify(key)} nodeId={nodes.link}
                  label={<RouterLink to={nodes.link} style={{ textDecoration: 'none', color: "#3f3031", textColor: "#ff0039" }}>{nodes.name}</RouterLink>}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    return (
        <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon/>}
            sx={{height: 110, flexGrow: 1, maxWidth: 700, zIndex:1}}
        >
            {data.map((d) => (
                <>
                    {renderTree(d)}
                </>
            ))}
        </TreeView>
    );
}