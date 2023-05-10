import { hashKey } from '../../../document/utils';
import {
    AddVestingAction,
    DeleteVestingAction,
    UpdateVestingAction,
} from '../../gen/vesting/types';
import { BudgetStatementDocument, Vesting } from '../types';

const sortVesting = (a: Vesting, b: Vesting) => (a.date < b.date ? -1 : 1);

export const addVestingOperation = (
    state: BudgetStatementDocument,
    action: AddVestingAction
) => {
    state.data.vesting.push(
        ...action.input.vesting.map(input => ({
            ...input,
            key: input.key ?? hashKey(),
            date: input.date ?? '',
            amount: input.amount ?? '',
            amountOld: input.amountOld ?? input.amount ?? '',
            comment: input.comment ?? '',
            currency: input.currency ?? '',
            vested: input.vested ?? false,
        }))
    );
    state.data.vesting.sort(sortVesting);
};

export const updateVestingOperation = (
    state: BudgetStatementDocument,
    action: UpdateVestingAction
) => {
    action.input.vesting.forEach(input => {
        const index = state.data.vesting.findIndex(v => v.key === input.key);
        if (index === -1) {
            return;
        }
        const vesting = state.data.vesting[index];
        state.data.vesting[index] = {
            ...vesting,
            ...input,
            amount: input.amount ?? vesting.amount,
            amountOld: input.amountOld ?? vesting.amountOld,
            comment: input.comment ?? vesting.comment,
            currency: input.currency ?? vesting.currency,
            date: input.date ?? vesting.date,
            vested: input.vested ?? vesting.vested,
        };
    });
    state.data.vesting.sort(sortVesting);
};

export const deleteVestingOperation = (
    state: BudgetStatementDocument,
    action: DeleteVestingAction
) => {
    state.data.vesting = state.data.vesting.filter(
        vesting => !action.input.vesting.includes(vesting.key)
    );
};