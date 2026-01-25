# backend

# h2 console
http://localhost:8080/h2-console/

# frontend
cd corner

rm frontend

npm install -g @angular/cli

ng version

# create project with standalone structure
ng new frontend --routing --style=css --standalone

# without zone.js
zoneless: y

cd frontend

ng serve



# add angular material
ng add @angular/material



# create page records (feature model)
ng generate component features/records/pages/records --standalone

# create model
ng generate interface core/models/records --type=model

# add record service
ng g s features/records/services/record

# add record-form component
ng generate component features/records/pages/add-record/components/record-form

# create page record-categories
ng generate component features/record-categories/pages/record-categories --standalone

# add record-categories service
ng g s features/record-categories/services/record-category

# create model
ng generate interface core/models/record-category --type=model


# create page measurement-units
ng generate component features/measurement-units/pages/measurement-units --standalone

# add record-categories service
ng g s features/measurement-units/services/measurement-unit

# create model
ng generate interface core/models/measurement-unit --type=model

# dry-run and skip-tests
ng g c features/measurement-units/pages/measurement-units-asyncpipe --dry-run --skip-tests=true


# reinstall dependencies
rm -rf node_modules
rm package-lock.json
npm cache clean --force
npm install




