# Roaring API
This repository provides a collection of examples for generating OpenAPI client libraries for 
[roaring.io](https://roaring.io) APIs.

This repository contains sample projects and scripts that demonstrate how to generate and use 
client libraries from our OpenAPI specifications.

For more information on our APIs, please visit [roaring.io](https://roaring.io)
or the [Roaring Developer Portal](https://app.roaring.io/v2/developer/).

> **Note:** The Java examples assume you use at least Java 17.


## About this example
Client codegeneration is done using the OpenAPI codegenerator. The
`client-codegen` folder contains a Swagger file downloaded from the
[Roaring.io Developer site](https://app.roaring.io/v2/developer/apis/se-company-overview-2.0).

The `company-info-client` folder contains a pre-generated client. How you 
manage generated code is up to you. Here it is already generated and
checked into source control.

The `company-info-app` folder contains a main class that uses the client
to retrieve company information and print it out to standard out.

The root `pom.xml` does not include `client-codegen` since that
would trigger a regeneration of the client. The client is thus
only generated when needed.

### Running the example
The main app requires a client ID and a client secret. You will at least 
need a Roaring.io Sandbox account. Signing up is free and you can
do so [in the Roaring Developer Portal](https://app.roaring.io/v2/developer/). On the page
there is a "Create sandbox account" button. You can also click the
"Sign up" button in the top right corner.

Once you have an account, you can go [API Keys](https://app.roaring.io/v2/developer/api-keys)
in the Roaring Developer Portal to get your client ID and
client secret.

You can now build and run the example:
```shell
mvn clean package
java -DclientId=<YOUR_CLIENT_ID> -DclientSecret=<YOUR_CLIENT_SECRET> -jar company-info-app/target/company-info-app-0.0.1-SNAPSHOT.jar
```

## Generating a client
Client generation is fairly straightforward and there are various
methods. You could use the OpenaAPI CLI tool or, as here, 
the OpenAPI Maven Plugin. The steps to generate a client as
demonstrated in the `client-codegen` project are as follows.

1. Download a Swagger/OpenAPI spec to a folder.
2. Add a `pom.xml` file, similar to the one in `client-codegen/pom.xml`.
   Modify the `groupId`, `artifactId`, `artifactVersion` and the `xxxPackage`
   tags to suit your project. Change the `<output>` if needed.
3. Run `mvn generate-sources`. Your client should be generated and
   ready for use.

