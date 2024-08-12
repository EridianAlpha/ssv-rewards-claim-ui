# SSV Rewards Claim UI

A standalone, open-source, UI for claiming SSV Mainnet Incentives rewards and will also support the Lido Vaults Initiative when launched. Works with Wallet Connect and allows anyone to claim with a different wallet to their rewards address, and it works on mobile.

## Installation

Create a `.env` file in the root of the project based on the `.env.example` file:

```bash
JSON_RPC_URL=...
NEXT_PUBLIC_JSON_RPC=...
```

Install the dependencies using the following command:

```bash
yarn
```

### Development Commands

This section explains the available scripts in the `package.json` file and their usage during development.

-   `yarn dev`<br/>
    This command starts the development server using the `node server.js` script. Use this command during development to see live updates as you make changes to the project.

-   `yarn lint`<br/>
    This command checks the code quality and adherence to coding standards using the `next lint` command. It is recommended to run this command before committing changes to ensure code consistency and maintainability.

## Production

### Production Commands

This section explains the available scripts in the `package.json` file and their usage during production deployments.

-   `yarn build`<br/>
    This command builds the static site for production using the `next build` command. It generates an optimized build of the site that is suitable for deployment.

-   `yarn export`<br/>
    This command exports the static site for production using the `next export` command. It generates an optimized build of the site that is suitable for deployment. The exported site is saved in the `out` directory.

-   `yarn start`<br/>
    This command first runs `yarn build` to generate an optimized build of the site and then starts the production server using the `next start` command. Use this command to test the site in a production-like environment locally.

## License

[MIT](https://choosealicense.com/licenses/mit/)
