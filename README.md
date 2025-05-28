### use this to generate migration files
```
  npm run migration:generate migrations/migration-name
```

### use this to run migration at local
```
  npm run migration:run
```

### use this to drop schema
```
  npm run migration:drop
```

### use to revert
```
  npm run migration:revert
```

### create new module
```
  nest generate res module-name
```

### run backend on aws
```
npm run build

pm2 delete student-backend

pm2 start dist/src/main.js --name student-backend --watch --watch-delay 1000
```