# Web App

# Separation of Store from View

View should not have fetch operations in them. Views are not responsible for fetching. Delegate all fetch operations to store. Let views get data from the store.

# Error handling

```js
return next({
  status: 400,
  message: 'ERRCODE: description'
})
```

## ERRCODE

1. BADPARAM - bad user parameter
