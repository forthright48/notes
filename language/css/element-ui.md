# Element UI

## Table

```pug
el-table(:data="getUserFields")
  el-table-column(prop="any-object-key" label="Label it whatever you want")
  el-table-column
    template(slot-scope="scope")
      /* Access using scope.row */
      fa-icon.vertical-middle(:name="scope.row.icon")


// DATA
getUserFields() {
  return [{
    feature: 'Email',
    icon: 'envelope',
    value: this.user.email
  }]
}
```
