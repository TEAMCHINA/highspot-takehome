const serviceRoot = "https://api.elderscrollslegends.io/v1";
const pageSize = 20;

export const fetchCards = async (pageNumber, searchQuery) => {
  let url = `${serviceRoot}/cards/?page=${pageNumber}&pageSize=${pageSize}`;

  if (!!searchQuery && !!searchQuery.name) {
    url = `${url}&name=${searchQuery.name}`;
  }

  var response = await fetch(url);
  var data = await response.json();

  return data?.cards;
}