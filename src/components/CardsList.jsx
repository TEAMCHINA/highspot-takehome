import { useEffect, useRef, useState} from 'react';
import { fetchCards } from '../services/esoLegendsService';

import { CardListHeader } from './CardListHeader';
import { Card } from './Card';

const styles = {
  cardsContainer: {
    minHeight: "1500px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "flex-start",
  },
}

export const CardsList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [noMoreResults, setNoMoreResults] = useState(false);
  const [searchNameText, setSearchNameText] = useState(null);
  const [submittedSearchOptions, setSubmittedSearchOptions] = useState({});
  const loader = useRef(null);

  // This is a hack to force the page to the top before unloading so that subsequent reloads don't break our paging:
  window.onbeforeunload = () => {
    window.scrollTo({
      top: 0
    });
  }

  // Create an observer attached to the "load more" div (at the bottom of the page)
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver(
      handleObserver,
      options
    );
  
    if (loader.current)
    {
      observer.observe(loader.current);
    }
  }, []);

  // Handles what to do when the observer fires the callback indicating that the loader is in the
  // viewport.
  // In this case, we can just increment the current page number.
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  }

  // Gets the cards for the current page and appends it to the current collection.
  useEffect(() => {
    const getCards = async () => {
      setLoading(true);
      const fetchedCards = await fetchCards(currentPage, submittedSearchOptions);
      if (fetchedCards.length > 0)
      {
        const newCards = [...cards, ...fetchedCards];
        setCards(newCards);
      } else {
        setNoMoreResults(true);
      }
      setLoading(false);
    }

    getCards();
  },
  // eslint complains that "cards" is not included in the dependency list, but it should not be since this hook modifies the "cards" collection.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [currentPage, submittedSearchOptions]);

  const handleSearchSubmit = event => {
    event.preventDefault();
    // Reset the state of the page which will trigger a new lookup
    setSubmittedSearchOptions({ name: searchNameText })
    setCards([]);
    setCurrentPage(1);
  }

  const handleSearchNameChange = event => {
    const target = event.target;
    var value = target.value;
    setSearchNameText(value);
  }

  return (
    <div>
      <CardListHeader
        loading={loading}
        handleSearchNameChange={handleSearchNameChange}
        handleSearchSubmit={handleSearchSubmit} />

      <div style={styles.cardsContainer}>
        {cards.map(cardData => (
          <Card cardData={cardData} key={cardData.id} />
        ))}
      </div>

      {!noMoreResults && (
        <div
          ref={loader}>
          Loading More...
        </div>
      )}
    </div>
  );
}
