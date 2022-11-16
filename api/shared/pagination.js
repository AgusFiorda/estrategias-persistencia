const getPagination = (page, size) => {
  page--;
  //cantidad de artículos a buscar
  const limit = size ? +size : 3;
  //cantidad de elementos a omitir
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, items, totalPages, currentPage };
};

module.exports = { getPagination, getPagingData };
