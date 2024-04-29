#!/bin/bash

# Prompt user and get response
echo "Are you in the _template directory AND running as admin? (y/n)"
read answer

# Check answer
if [ "$answer" != "y" ]; then
  echo "Please run this script from the _template directory."
  exit 1
fi

# Check for command line argument
if [ $# -gt 0 ]; then
  name="$1"
else
  echo "Enter the project name:"
  read name
fi

# Convert name to lowercase and replace spaces with dashes
dashedName=$(echo "$name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
# Convert name to title case and remove spaces for mobileName
titlecaseName=$(echo "$name" | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2));}1')
mobileName=$(echo "$titlecaseName" | tr -d ' ')

echo "Working with names: $dashedName and $titlecaseName"

# Here document for setting variable values
readmeContent=$(cat <<EOF
# Feryv: ${titlecaseName} Application

## Setting up new environment

- cd src
- npm i -g yarn
- yarn 
EOF
)

packageContent=$(cat <<EOF
{
  "name": "feryv-${dashedName}",
  "version": "0.0.1",
  "main": "index.js",
  "license": "MIT",
  "private": true,
  "workspaces": {
    "packages": [
      "src/web",
      "src/mobile",
      "src/backend/*"
    ],
    "nohoist": [
      "**/react-native",
      "**/react-native/**",
      "**/@react-native-community",
      "**/@react-native-community/**"
    ]
  }
}
EOF
)

gitignoreContent=$(cat <<EOF
**/node_modules

# OSX
#
.DS_Store

# Xcode
#
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
ios/.xcode.env.local

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml
*.hprof
.cxx/
*.keystore
!debug.keystore

# node.js
#
node_modules/
npm-debug.log
yarn-error.log

# fastlane
#
**/fastlane/report.xml
**/fastlane/Preview.html
**/fastlane/screenshots
**/fastlane/test_output

# Bundle artifact
*.jsbundle

# Ruby / CocoaPods
**/ios/Pods/
**/vendor/bundle/

# Temporary files created by Metro to check the health of the file watcher
.metro-health-check*

# testing
**/coverage
EOF
)

backendReadmeContent=$(cat <<EOF
# ${titlecaseName} Backend

Description

## Microservices Layout

### Microservice Service 1

Description.
EOF
)

backendDockerComposeContent=$(cat <<EOF
version: "3.8"
services:
  feryv-${dashedName}-microservice-1:
    build: ./microservice-1
    ports:
      - "3001:\${PORT}"
    environment:
      - NODE_ENV=production
      - PORT=\${PORT}
  postgres:
    image: postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: mysecretpassword # Change this to a secure password
      POSTGRES_DB: mydatabase # Optional: Specify a database to be created
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data: # This will persist your database data

networks:
  backend-network:
EOF
)

backendMicroservice1DockerfileContent=$(cat <<EOF
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Build the TypeScript app
RUN npm run build

# ENV Vars
ENV PORT 3001

# Your applications default port
EXPOSE \$PORT

# Adjust this command according to your build output directory and main file
CMD ["node", "dist/index.js"]
EOF
)

backendMicroservice1NodemonContent=$(cat <<EOF
{
  "watch": ["./src"],
  "ext": "ts,json",
  "exec": "npm run start",
  "ignore": ["src/assets/*-spec.json"]
}
EOF
)

backendMicroservice1PackageContent=$(cat <<EOF
{
  "name": "feryv-${dashedName}-microservice-1",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "ts-node src/index.ts",
    "dev": "nodemon src/index.ts",
    "build": "tsc -p tsconfig.json",
    "serve": "node dist/index.js"
  },
  "dependencies": {
    "feryv-${dashedName}-common": "0.0.1",
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.11",
    "@types/node": "^20.10.5",
    "@types/supertest": "^6.0.2",
    "body-parser": "^1.20.2",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "class-validator-jsonschema": "^5.0.0",
    "express": "^4.18.2",
    "jest": "^29.7.0",
    "reflect-metadata": "^0.2.1",
    "routing-controllers": "^0.10.4",
    "routing-controllers-openapi": "^4.0.0",
    "supertest": "^6.3.3",
    "swagger-ui-express": "^5.0.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  },
  "devDependencies": {
    "@types/swagger-ui-express": "^4.1.6",
    "express-oas-generator": "^1.0.46",
    "nodemon": "^3.0.2"
  }
}
EOF
)

backendMicroservice1ReadmeContent=$(cat <<EOF
# Microservice 1

Get Postgres Docker:

- \`docker pull postgres\`

Build Docker:

- \`docker build -t feryv-${dashedName}-microservice-1:latest .\`

Run Docker:

- \`docker run --name feryv-${dashedName}-microservice-1-container -p 3001:3001 feryv-${dashedName}-microservice-1\`
- \`docker run --name postgres-container -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres\`
EOF
)

backendMicroservice1TSConfigContent=$(cat <<EOF
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "**/*.ts"
  ],
  "exclude": ["node_modules"]
}
EOF
)

# Create directory and navigate into it
mkdir -p "../$titlecaseName"
cd "../$titlecaseName"

# Create directories
mkdir -p src
mkdir -p src/backend
mkdir -p src/backend/microservice-1
mkdir -p src/backend/microservice-1/src
mkdir -p src/backend/microservice-1/test

# Write contents to files
echo "$readmeContent" > README.md
echo "$packageContent" > package.json
echo "$gitignoreContent" > .gitignore
echo "Created project $titlecaseName and base level folders and files."

# Backend specific content
echo "$backendReadmeContent" > src/backend/README.md
echo "$backendDockerComposeContent" > src/backend/docker-compose.yaml

# Microservice 1 specific content
echo "$backendMicroservice1DockerfileContent" > src/backend/microservice-1/Dockerfile
echo "$backendMicroservice1NodemonContent" > src/backend/microservice-1/nodemon.json
echo "$backendMicroservice1PackageContent" > src/backend/microservice-1/package.json
echo "$backendMicroservice1ReadmeContent" > src/backend/microservice-1/README.md
echo "$backendMicroservice1TSConfigContent" > src/backend/microservice-1/tsconfig.json

# Copy template files
cp -r "../_template/src/backend/microservice_1/src/." "src/backend/microservice_1/src/"

echo "Created backend microservice examples base level folders and files."

# Create React app and rename it
npx create-react-app "$dashedName" --template typescript
mv "$dashedName" "web"
echo "Created web application."

# Create React Native app and rename it
npx react-native init "$mobileName" --template react-native-template-typescript
mv "$mobileName" "mobile"
echo "Created mobile application."
