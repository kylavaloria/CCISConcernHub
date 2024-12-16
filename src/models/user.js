class User {
    constructor(rawData) {
        Object.assign(this, rawData);
    }

    // Mock method to simulate fetching user data from the database
    static async findByEmail(email) {
        const MOCK_DATABASE = [
            {
                username: 'kflmorcillos',
                email: 'kflmorcillos@gmail.com',
                roles: ['student'],
                department: 'Department of Computer Science',
                studentNumber: '2022-XXXXX-MN-X',
            },
            {
                username: 'kylafranchezkalmorcillos',
                email: 'kylafranchezkalmorcillos@iskolarngbayan.pup.edu.ph',
                roles: ['admin'],
                department: 'Department of Computer Science',
                studentNumber: '2022-XXXXX-MN-X',
                assignedCategories: ['Complaints', 'Inquiries'],
            },
            {
                username: 'fionamorcillos41',
                email: 'fionamorcillos41@gmail.com',
                roles: ['student', 'admin'],
                department: 'Department of Computer Science',
                studentNumber: '2022-XXXXX-MN-X',
                assignedCategories: ['Complaints', 'Inquiries'],
            }
        ];
        const userData = MOCK_DATABASE.find(user => user.email === email);

        if (userData) {
            return new User(userData);
        } else {
            throw new Error('User not found in the database');
        }
    }

    isStudent() {
        return this.roles.includes('student');
    }

    isAdmin() {
        return this.roles.includes('admin');
    }
}

export default User;
