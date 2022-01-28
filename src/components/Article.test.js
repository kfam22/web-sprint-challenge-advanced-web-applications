import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

const testArticle = {
    id: '1lje1l3',
    headline: 'fake news',
    createdOn: '012822',
    author:'jk rowling',
    image: 134,
    summary: 'is magic fake news?',
    body: 'crookshanks bludger Marauder’s Map Prongs sunshine daisies butter mellow Ludo Bagman. Beaters gobbledegook N.E.W.T., Honeydukes eriseD inferi Wormtail. Mistletoe dungeons' 
}

const testArticle2 = {
    id: '4eajfg8',
    headline: 'harry potter ipsum',
    createdOn: '012822',
    author:'',
    image: 134,
    summary: 'words from harry potter',
    body: 'Owl Emporium expecto patronum floo powder duel. Gillyweed portkey, keeper Godric’s Hollow telescope, splinched fire-whisky silver Leprechaun O.W.L. stroke the spine.' 
}

test('renders component without errors', ()=> {
    render(<Article article={testArticle}/>)
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={testArticle}/>)

    const headline = screen.queryByTestId('headline');
    const author = screen.queryByTestId('author');

    expect(headline).toBeInTheDocument();
    expect(author).toBeInTheDocument();

});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={testArticle2}/>)

    const AP = screen.queryByText(/associated press/i);
    
    expect(AP).toBeInTheDocument();
});

test('executes handleDelete when the delete button is pressed', ()=> {
    const handleDelete = jest.fn();
    render(<Article article={testArticle} handleDelete={handleDelete}/>)

    const deleteBtn = screen.queryByTestId('deleteButton');
    userEvent.click(deleteBtn);
   
    expect(handleDelete).toBeCalled();
});

//Task List: 
//1. Complete all above tests. Create test article data when needed.