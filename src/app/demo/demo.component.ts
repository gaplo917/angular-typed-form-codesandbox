import { Component, OnInit } from "@angular/core";
import { TypedFormBuilder } from "@gaplo917/angular-typed-forms";
import { UserTable } from "./forms/user-table";

@Component({
  selector: "app-demo",
  templateUrl: "./demo.component.html",
  styleUrls: ["./demo.component.css"]
})
export class DemoComponent implements OnInit {
  userTable: UserTable;

  constructor(private fb: TypedFormBuilder) {
    this.userTable = new UserTable(fb);
    this.userTable.valueChanges.subscribe(console.log);
  }

  ngOnInit(): void {}

  trackByIndex(index: number) {
    return index;
  }

  fullSync() {
    // fullSync requires strict type match of the value you input
    // this method will use the values to sync the controls
    // internally match the numbers of control before use `FormArray.setValue`
    this.userTable.fullSync([
      {
        id: "42e6f1fe-93bd-4993-ab1b-ebaec9ee8d10",
        username: "Gary",
        birth: new Date("2000-01-01"),
        isStudent: false,
        // because `age` is optional in the definition
        // age: 1,
        addresses: [
          {
            address1: "HK",
            address2: "Earth",
            address3: ""
          }
        ]
      }
    ]);

    // uncomment the this following codes to see the type check error
    // this.userTable.fullSync([
    //   {
    //     id: "42e6f1fe-93bd-4993-ab1b-ebaec9ee8d10",
    //     username: "Gary",
    //     birth: new Date("2000-01-01"),
    //     isStudent: false,
    //     addresses: [
    //       {
    //         address1: "HK",
    //         address2: "Earth",
    //       }
    //     ]
    //   }
    // ]);
  }

  partialSync() {
    // partialSync only require Partial<T>, but it will also sync them number of controls
    // this method will use the values to sync the controls
    // internally match the numbers of control before use `FormArray.patchValue`
    this.userTable.partialSync([
      {
        id: "42e6f1fe-93bd-4993-ab1b-ebaec9ee8d10",
        username: "Gary"
      }
    ]);

    // uncomment the this following codes to see the type check error
    // this.userTable.partialSync([
    //   {
    //     id: "42e6f1fe-93bd-4993-ab1b-ebaec9ee8d10",
    //     username: "Gary",
    //     somethingNotExist: "not exist"
    //   }
    // ]);
  }

  reset() {
    this.userTable.reset();
  }

  generateItems1(count: number) {
    const items = new Array(count).fill({
      id: "42e6f1fe-93bd-4993-ab1b-ebaec9ee8d10",
      username: "Gary",
      birth: new Date("2000-01-01"),
      isStudent: false,
      addresses: [
        {
          address1: "HK",
          address2: "Earth",
          address3: ""
        }
      ]
    });

    // Note: this will trigger full re-render
    this.userTable.fullSync([...this.userTable.value, ...items]);
  }

  generateItems2(count: number) {
    const items = new Array(count).fill({
      id: "42e6f1fe-93bd-4993-ab1b-ebaec9ee8d10",
      username: "Gary",
      birth: new Date("2000-01-01"),
      isStudent: false,
      addresses: [
        {
          address1: "HK",
          address2: "Earth",
          address3: ""
        }
      ]
    });

    const len = this.userTable.length;

    // Note: this only render on each row
    for (let i = 0; i < count; i++) {
      this.userTable.appendRow();
      this.userTable.rowAt(len + i).setValue(items[i]);
    }
  }
}
