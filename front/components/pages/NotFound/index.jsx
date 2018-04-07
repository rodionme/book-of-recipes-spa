import React from 'react';
import './style.css';
import Page from '../../layouts/Page';


export default function NotFound() {
  return (
    <Page title="404 | Book of Recipes" noSearch>
      <main className="main-content">
        <h2>Not Found</h2>
      </main>
    </Page>
  );
}
