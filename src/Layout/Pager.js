import React from 'react';
import './Pager.css';

const Pager = props => {
  const { paging } = props;

  const onPreviousPage = () => props.onNavigateToPage({
    ...paging,
    currentPage: paging.currentPage - 1
  });

  const onNextPage = () => props.onNavigateToPage({
    ...paging,
    currentPage: paging.currentPage + 1
  });

  const onFirstPage = () => props.onNavigateToPage({ ...paging, currentPage: 1 });

  const onLastPage = () => props.onNavigateToPage({ ...paging, currentPage: paging.numberOfPages });

  return (
    <div className="pager-container">
      <button className="btn first-page-button" onClick={onFirstPage}>&#60;&#60;</button>
      <button className="btn previous-page-button" onClick={onPreviousPage}>&#60;</button>
      <span className="viewing-text">Viewing page {paging.currentPage} of {paging.numberOfPages}</span>
      <button className="btn next-page-button" onClick={onNextPage}>&#62;</button>
      <button className="btn last-page-button" onClick={onLastPage}>&#62;&#62;</button>
      <span className="total-superheroes-text">Total number of superheroes: {paging.total}</span>
    </div>
  );
};

export default Pager;