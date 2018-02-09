const expect = require('chai').expect;

const {Users} = require('./users');

describe('Users', () => {

    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'peter',
            room: 'Node Course'
        }];
    })

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id:'123',
            name:'peter',
            room:'The Office Fan'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).to.deep.equal([user]);
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).to.deep.equal(['Mike','peter']);
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).to.equal(userId);
        expect(users.users.length).to.equal(2);
    });

    it('should not remove user', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).to.not.exist;
        expect(users.users.length).to.equal(3);
    });


    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).to.equal(userId);
    });

    it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).to.not.exist;
    });
});