// Simple in-memory mock DB (resets every time the server restarts)

const generations = [];

function saveGeneration(entry) {
  const id = generations.length + 1;
  const record = {
    id,
    ...entry,
    createdAt: new Date().toISOString(),
  };
  generations.push(record);
  return record;
}

function getGenerations() {
  return generations;
}

module.exports = {
  saveGeneration,
  getGenerations,
};
