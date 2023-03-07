import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

export default function CategoriesInNav({data, key}) {
    const renderTree = (nodes) => (
        <TreeItem key={nodes.link + JSON.stringify(key)} nodeId={nodes.link} label={nodes.name}>
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
            sx={{height: 110, flexGrow: 1, maxWidth: 700}}
        >
            {data.map((d) => (
                <>
                {renderTree(d)}
                </>
            ))}
        </TreeView>
    );
}