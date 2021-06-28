import { GetUserGroups, IsInGroup } from './user.helper'

describe('User Helper Functions', () => {
    const user = {
        'https://catkin.dev/permissions': [
            {
                group: 'group1'
            },
            {
                group: 'group2'
            }
        ]
    }

    describe('GetUserGroups', () => {
        it('Should return an array of the user groups', async () => {
            const result = GetUserGroups(user);
            expect(result).toStrictEqual(['group1', 'group2']);
        });
    });

    describe('IsInGroup', () => {

        it('Should return return true when user is in group', async () => {
            const result = IsInGroup(user, 'group1');
            expect(result).toBe(true);
        });

        it('Should return return false when user is not in group', async () => {
            const result = IsInGroup(user, 'groupx');
            expect(result).toBe(false);
        });
    });

});