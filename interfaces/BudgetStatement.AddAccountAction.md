[@acaldas/document-model-libs](../README.md) / [Exports](../modules.md) / [BudgetStatement](../modules/BudgetStatement.md) / AddAccountAction

# Interface: AddAccountAction

[BudgetStatement](../modules/BudgetStatement.md).AddAccountAction

Defines the basic structure of an action.

## Hierarchy

- [`Action`](../modules/Document.md#action)

  ↳ **`AddAccountAction`**

## Table of contents

### Properties

- [input](BudgetStatement.AddAccountAction.md#input)
- [type](BudgetStatement.AddAccountAction.md#type)

## Properties

### input

• **input**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accounts` | [`AccountInput`](../modules/BudgetStatement.md#accountinput)[] |

#### Overrides

Action.input

#### Defined in

[budget-statement/gen/account/types.ts:10](https://github.com/acaldas/document-model-libs/blob/f53b317/src/budget-statement/gen/account/types.ts#L10)

___

### type

• **type**: ``"ADD_ACCOUNT"``

#### Overrides

Action.type

#### Defined in

[budget-statement/gen/account/types.ts:9](https://github.com/acaldas/document-model-libs/blob/f53b317/src/budget-statement/gen/account/types.ts#L9)
