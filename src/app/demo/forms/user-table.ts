import {
  SimpleFormBuilder,
  SimpleTable,
  TypedFormControl,
  TypedNumberFormControl,
} from '@gaplo917/angular-typed-forms'

interface UserTableType {
  id: TypedFormControl<string | null>
  username: TypedFormControl<string | null>
  birth: TypedFormControl<Date | null>
  isStudent: TypedFormControl<boolean>
  age?: TypedNumberFormControl<number | null>
  // nested form
  addresses: SimpleTable<{
    address1: TypedFormControl<string | null>
    address2: TypedFormControl<string | null>
    address3: TypedFormControl<string | null>
  }>
}

/**
 * SimpleTable is equivalent to TypedFormArray<TypedFormGroup<UserTableType>> but with more pre-defined API
 */
export class UserTable extends SimpleTable<UserTableType> {
  constructor(private fb: SimpleFormBuilder) {
    super({
      constructRow: (index: number) =>
        fb.form({
          id: fb.control(String('ID-' + index)),
          username: fb.control(null),
          birth: fb.control(null),
          isStudent: fb.control<boolean>(false),
          addresses: fb.table({
            constructRow: () =>
              fb.form({
                address1: fb.control(null),
                address2: fb.control(null),
                address3: fb.control(null),
              }),
            size: 1,
          }),
        }),
      size: 2,
    })
  }
}
