// Generate mock data
const users = [];
const designations = ['Manager', 'Developer', 'Designer', 'Tester'];

for (let i = 1; i <= 100; i++) {
  users.push({
    id: i,
    name: `John Doe ${i}`,
    age: 30,
    designation: designations[Math.floor(Math.random() * designations.length)],
    image: `https://placehold.co/40x40?text=${i}`,
  });
}

export const getMockUsers = ({ limit = 10, page = 1, search = '' }) => {
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedUsers,
    totalItems: filteredUsers.length,
    totalPages: Math.ceil(filteredUsers.length / limit),
    hasNext: page < Math.ceil(filteredUsers.length / limit),
    hasPrevious: page > 1,
    currentPage: page,
    limit,
    search,
  };
};

export default users;
