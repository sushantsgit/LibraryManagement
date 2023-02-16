function generateRandomISBN() {
  const isbn = Math.floor(Math.random() * 1000000000000);
  return `${isbn}`;
}

module.exports = {
  generateRandomISBN,
};
