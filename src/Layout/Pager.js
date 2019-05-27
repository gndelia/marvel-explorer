import React from 'react';
import './Pager.css';

const calculateNumberOfPages = (total, pageSize) => Math.ceil(total / pageSize);

const Pager = props => {
  const { paging } = props;

  const onPreviousPage = () => {
    if (paging.currentPage === 1) {
      return;
    }
    props.onNavigateToPage({
      ...paging,
      currentPage: paging.currentPage - 1,
    });
  };

  const onNextPage = () => {
    const maxNumberOfPages = calculateNumberOfPages(paging.total, paging.pageSize);
    const nextPage = paging.currentPage + 1;
    if (nextPage > maxNumberOfPages) {
      return;
    }
    props.onNavigateToPage({
      ...paging,
      currentPage: nextPage,
    });
  };

  const onFirstPage = () => props.onNavigateToPage({ ...paging, currentPage: 1 });

  const onLastPage = () => props.onNavigateToPage({
    ...paging,
    currentPage: calculateNumberOfPages(paging.total, paging.pageSize)
  });
  const numberOfPages = calculateNumberOfPages(paging.total, paging.pageSize);
  return (
    <div className="pager-container">
      <button className="btn first-page-button" onClick={onFirstPage}>&#60;&#60;</button>
      <button className="btn previous-page-button" onClick={onPreviousPage}>&#60;</button>
      <span className="viewing-text">Viewing page {paging.currentPage} of {numberOfPages}</span>
      <button className="btn next-page-button" onClick={onNextPage}>&#62;</button>
      <button className="btn last-page-button" onClick={onLastPage}>&#62;&#62;</button>
      <span className="total-superheroes-text">Total number of superheroes: {paging.total}</span>
    </div>
  );
};

export default Pager;
