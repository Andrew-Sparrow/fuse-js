export const createElementHTML = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const getFilteredCards = (cards, filterValue) => {
  return cards.filter((card) => {
    return card.title.toLowerCase().includes(filterValue);
  });
};
