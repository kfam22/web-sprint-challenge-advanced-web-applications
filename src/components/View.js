import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Article from './Article';
import EditForm from './EditForm';
import axiosWithAuth from '../utils/axiosWithAuth';

const View = (props) => {
    const [articles, setArticles] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState();

    useEffect(()=>{
        axiosWithAuth().get('/articles')
        .then(res=>{
            setArticles(res.data);
        })
        .catch(err=>{
            console.error(err);
        })
    }, [])

    const handleDelete = (id) => {
        axiosWithAuth().delete(`articles/${id}`)
        .then(res=>{
            setArticles(res.data);
        })
        .catch(err=>{
            console.error(err);
        })
    }

    const handleEdit = (article) => {
        axiosWithAuth().put(`/articles/${article.id}`, article)
        .then(res=>{
            setArticles(res.data);
            setEditing(false);
        })
        .catch(err=>{
            console.error(err);
        })
    }

    const handleEditSelect = (id)=> {
        setEditing(true);
        setEditId(id);
    }

    const handleEditCancel = ()=>{
        setEditing(false);
    }

    return(<ComponentContainer>
        <HeaderContainer>View Articles</HeaderContainer>
        <ContentContainer flexDirection="row">
            <ArticleContainer>
                {
                    articles.map(article => {
                        return <ArticleDivider key={article.id}>
                            <Article key={article.id} article={article} handleDelete={handleDelete} handleEditSelect={handleEditSelect}/>
                        </ArticleDivider>
                    })
                }
            </ArticleContainer>
            
            {
                editing && <EditForm editId={editId} handleEdit={handleEdit} handleEditCancel={handleEditCancel}/>
            }
        </ContentContainer>
    </ComponentContainer>);
}

export default View;

// * [X] In `View.js`, complete `handleDelete` so that a http request is made that deletes the article with the included id. After successfully deleting the article on the api, update local state to reflect these changes.

// * [X] `editId` is passed into the `EditForm` component. In `EditForm.js`, make a http request on mount to get the article with the id `editId`. Save the result in state.

// * [ X In `View.js`, complete `handleEdit` so that a http request is made that updates the passed in article. Set the editing state to false when the request is complete. After successfully deleting the article on the api, update local state to reflect these changes.

//Task List:
//1. [X]Build and import axiosWithAuth module in the utils.
//2. [X]When the component mounts, make an http request that adds all articles to state.
//3. [X]Complete handleDelete method. It should make a request that delete the article with the included id.
//4. Complete handleEdit method. It should make a request that updates the article that matches the included article param.


const Container = styled.div`
    padding: 0.5em;
`
const HeaderContainer = styled.h1`
    border-bottom: solid black 2px;
    padding: 1em;
    margin:0;
    font-size: 1.5em;
    background: black;
    color: white;
`

const ArticleDivider = styled.div`
    border-bottom: 1px solid black;
    padding: 1em;
`

const ComponentContainer = styled.div`
    display:flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection};
`

const ArticleContainer = styled.div`
    background: grey;
`;