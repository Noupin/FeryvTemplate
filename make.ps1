Write-Host "Are you in the _template directory AND running as admin? (y/n)"
$answer = Read-Host
if ($answer -ne "y") {
  Write-Host "Please run this script from the _template directory."
  exit
}

if ($args.Count -gt 0) {
  $name = $args[0]
}
else {
  $name = Read-Host -Prompt "Enter the project name"
}

# Lowercase version
$dashedName = $name.ToLower().Replace(" ", "-")
# Title Case version
$culture = [System.Globalization.CultureInfo]::CurrentCulture
$titlecaseName = $culture.TextInfo.ToTitleCase($name.ToLower())
$mobileName = $titlecaseName.Replace(" ", "")
Write-Host "Working with names: $dashedName and $titlecaseName"


$readmeContent = @"
# Feryv: $titlecaseName Application

## Setting up new environment

- cd src
- npm i -g yarn
- yarn 
"@
$packageContent = @"
{
  "name": "feryv-$dashedName",
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
"@
$gitignoreContent = @"
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
# It is recommended to not store the screenshots in the git repo. Instead, use fastlane to re-generate the
# screenshots whenever they are needed.
# For more information about the recommended setup visit:
# https://docs.fastlane.tools/best-practices/source-control/

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
"@

$backendReadmeContent = @"
# $titlecaseName Backend

Description

## Microservices Layout

### Example Microservice

Description.
"@
$backendDockerComposeContent = @"
version: "3.8"
services:
  feryv-$dashedName-example-microservice:
    build: ./example-microservice
    ports:
      - "3001:${PORT}"
    environment:
      - NODE_ENV=production
      - PORT=${PORT}
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

"@

$backendMicroserviceDockerfileContent = @"
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

# Your application's default port
EXPOSE $PORT

# Adjust this command according to your build output directory and main file
CMD ["node", "dist/index.js"]
"@
$backendMicroserviceNodemonContent = @"
{
  "watch": ["./src"],
  "ext": "ts,json",
  "exec": "npm run start",
  "ignore": ["src/assets/*-spec.json"]
}
"@
$backendMicroservicePackageContent = @"
{
  "name": "feryv-$dashedName-example-microservice",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "ts-node src/index.ts",
    "dev": "nodemon src/index.ts",
    "build": "tsc -p tsconfig.json",
    "serve": "node dist/index.js"
  },
  "dependencies": {
    "feryv-$dashedName-common": "0.0.1",
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

"@
$backendMicroserviceReadmeContent = @"
# Example Microservice

Get Postgres Docker:

- `docker pull postgres`

Build Docker:

- `docker build -t feryv-$dashedName-example-microservice:latest .`

Run Docker:

- `docker run --name feryv-$dashedName-example-microservice-container -p 3001:3001 feryv-$dashedName-example-microservice`
- `docker run --name postgres-container -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres`
"@
$backendMicroserviceTSConfigContent =@"
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
    "**/*.ts",
  ],
  "exclude": ["node_modules"]
}

"@

mkdir ../"$titlecaseName"
Set-Location ../$titlecaseName
mkdir src
$readmeContent | Out-File -FilePath README.md -Force 
$packageContent | Out-File -FilePath package.json -Force
$gitignoreContent | Out-File -FilePath .gitignore -Force
Write-Host "Created project $titlecaseName and base level folders and files."

mkdir src/backend
$backendReadmeContent | Out-File -FilePath src/backend/README.md -Force
$backendDockerComposeContent | Out-File -FilePath src/backend/docker-compose.yaml -Force
mkdir src/backend/example-microservice
$backendMicroserviceDockerfileContent | Out-File -FilePath src/backend/example-microservice/Dockerfile -Force
$backendMicroserviceNodemonContent | Out-File -FilePath src/backend/example-microservice/nodemon.json -Force
$backendMicroservicePackageContent | Out-File -FilePath src/backend/example-microservice/package.json -Force
$backendMicroserviceReadmeContent | Out-File -FilePath src/backend/example-microservice/README.md -Force
$backendMicroserviceTSConfigContent | Out-File -FilePath src/backend/example-microservice/tsconfig.json -Force
mkdir src/backend/example-microservice/src
Copy-Item -Path "../_template/src/backend/example_microservice/src/*" -Destination "src/backend/example-microservice/src" -Recurse -Force
mkdir src/backend/example-microservice/test
Write-Host "Created backend microservice examples base level folders and files."

npx create-react-app $dashedName --template typescript
Rename-Item -Path "$dashedName" -NewName "web"
Write-Host "Created web application."

npx react-native init $mobileName --template react-native-template-typescript
Rename-Item -Path "$mobileName" -NewName "mobile"
Write-Host "Created mobile application."