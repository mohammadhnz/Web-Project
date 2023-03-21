import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {useState} from "react";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
import axios from "axios";

export default function CategoriesInNav(props) {
    const {data, key, isHome, setProductData} = props
    const navigate = useNavigate();

    const getProductData = (categoryId) => {
        axios({
            method: 'get',
            url: 'https://bd90-31-56-230-17.eu.ngrok.io/product/list',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },
            params:{
                category_id: categoryId,
            }
        }).then(function (response) {
            console.log("category in Nav response", response);
            setProductData(response.data.items)
        }).catch(function (error) {
            console.log(error);
        });
    }


    const sendCategoryData = async (e) => {
        console.log(e.currentTarget.value)
        if (isHome) {
            console.log("is home")
            // TODO: send request
            getProductData(e.currentTarget.value)
            // TODO: redirect
        } else {
            console.log("not home")
            console.log(setProductData)
            // TODO: send request
            getProductData(e.currentTarget.value)
            // TODO: use setProductData
        }
    }
    const renderTree = (nodes) => (
        <TreeItem key={nodes.id + JSON.stringify(key)} nodeId={nodes.id}
                  label={
                      <Button value={nodes.category_id} onClick={sendCategoryData} style={{
                          color: "#3f3031",
                          textColor: "#ff0039"
                      }}>{nodes.name}</Button>
                  }>
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
            sx={{height: 110, flexGrow: 1, maxWidth: 700, zIndex: 1}}
        >
            {data.map((d) => (
                <>
                    {renderTree(d)}
                </>
            ))}
        </TreeView>
    );
}