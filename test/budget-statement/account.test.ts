import { reducer } from '../../src/budget-statement';
import { createBudgetStatement } from '../../src/budget-statement/custom/utils';
import {
    addAccount,
    deleteAccount,
    updateAccount,
} from '../../src/budget-statement/gen';

describe('Budget Statement account reducer', () => {
    it('should add account', async () => {
        const state = createBudgetStatement();
        const newState = reducer(
            state,
            addAccount([
                {
                    address: 'eth:0xb5eB779cE300024EDB3dF9b6C007E312584f6F4f',
                    name: 'Grants Program',
                },
            ])
        );
        expect(newState.data.accounts).toStrictEqual([
            {
                address: 'eth:0xb5eB779cE300024EDB3dF9b6C007E312584f6F4f',
                name: 'Grants Program',
                lineItems: [],
            },
        ]);
        expect(state.data.accounts).toStrictEqual([]);
    });

    it('should update account', async () => {
        let state = createBudgetStatement();
        state = reducer(
            createBudgetStatement(),
            addAccount([
                {
                    address: 'eth:0xb5eB779cE300024EDB3dF9b6C007E312584f6F4f',
                    name: 'Grants Program',
                },
            ])
        );
        const newState = reducer(
            state,
            updateAccount([
                {
                    address: 'eth:0xb5eB779cE300024EDB3dF9b6C007E312584f6F4f',
                    name: 'Incubation',
                },
            ])
        );
        expect(newState.data.accounts[0].name).toBe('Incubation');
        expect(state.data.accounts[0].name).toBe('Grants Program');
    });

    it('should delete account', async () => {
        let state = createBudgetStatement();
        state = reducer(
            state,
            addAccount([
                {
                    address: 'eth:0xb5eB779cE300024EDB3dF9b6C007E312584f6F4f',
                    name: 'Grants Program',
                },
            ])
        );
        const newState = reducer(
            state,
            deleteAccount(['eth:0xb5eB779cE300024EDB3dF9b6C007E312584f6F4f'])
        );
        expect(newState.data.accounts.length).toBe(0);
        expect(state.data.accounts.length).toBe(1);
    });
});