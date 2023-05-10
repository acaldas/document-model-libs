import {
    AddAccountAction,
    DeleteAccountAction,
    UpdateAccountAction,
} from '../../gen/account/types';
import { BudgetStatementDocument } from '../types';
import { createAccount } from '../utils';

export const addAccountOperation = (
    state: BudgetStatementDocument,
    action: AddAccountAction
): BudgetStatementDocument => {
    return {
        ...state,
        data: {
            ...state.data,
            accounts: [
                ...(state.data.accounts ?? []),
                ...action.input.accounts.map(createAccount),
            ],
        },
    };
};

export const updateAccountOperation = (
    state: BudgetStatementDocument,
    action: UpdateAccountAction
): BudgetStatementDocument => {
    return {
        ...state,
        data: {
            ...state.data,
            accounts: state.data.accounts.map(account => {
                const accountUpdate = action.input.accounts.find(
                    a => a.address === account.address
                );
                return {
                    ...account,
                    lineItems: accountUpdate?.lineItems ?? account.lineItems,
                    name: accountUpdate?.name ?? account.name,
                };
            }),
        },
    };
};

export const deleteAccountOperation = (
    state: BudgetStatementDocument,
    action: DeleteAccountAction
): BudgetStatementDocument => {
    return {
        ...state,
        data: {
            ...state.data,
            accounts: state.data.accounts.filter(
                account =>
                    !action.input.accounts.find(
                        address => address === account.address
                    )
            ),
        },
    };
};