var { Users } = require('./users.js');
const expect = require('expect');

describe('Users', () => {
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '1234',
            name: 'Avinash',
            room: 'Office_Fans'
        }
        var res = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
});