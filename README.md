# SSV Rewards Claim UI

A standalone, open-source, UI for claiming SSV Mainnet Incentives rewards. It will also support the Lido Vaults Initiative when launched. Works with WalletConnect, allows anyone to claim with a different wallet to their rewards address, and works on mobile.

## Usage

The UI is deployed at [ssvrewards.com](https://ssvrewards.com).

Any wallet can be used to claim rewards on behalf of another address. This is a feature of the [rewards contract](https://etherscan.io/address/0xe16d6138B1D2aD4fD6603ACdb329ad1A6cD26D9f#code) and is not specific to this UI.

Without connecting a wallet you can still view the rewards available for a given address by entering it in the input field.

If rewards are available for the address, the UI will display the rewards available and the claimable amount. If the address has no rewards available, the UI will display a message indicating that there are no rewards available for the address.

To claim rewards, connect a wallet and sign the transaction. The rewards will be claimed to the connected wallet address (if that address has rewards available) or to the address entered in the address input field (if that address has rewards available).

All of the values used (contract addresses, Merkle proofs, etc.) can be found in the [public/data](public/data) directory and are updated manually when the rewards contract is updated using a PR.

## Installation

### Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/EridianAlpha/ssv-rewards-claim-ui.git
```

### Create an Environment File

Create an `.env` file in the root of the project based on the `.env.example` file:

```bash
# Required
NEXT_PUBLIC_JSON_RPC=...

# Optional
NEXT_PUBLIC_WALLETCONNECT_ID=...  # Needed if you want to use WalletConnect: https://docs.walletconnect.com/cloud/relay
```

### Install Dependencies

Install the dependencies using the following command:

```bash
yarn
```

### Deployment

### Development Commands

This section explains the available scripts in the `package.json` file and their usage during development.

- `yarn dev`  
  This command starts the development server using the `node server.js` script. Use this command during development to see live updates as you make changes to the project.

- `yarn lint`  
  This command checks the code quality and adherence to coding standards using the `next lint` command. It is recommended to run this command before committing changes to ensure code consistency and maintainability.

### Update Dependencies

To update all dependencies to their latest versions, run the following command:

```bash
# Update all dependencies to their latest versions
yarn upgrade --latest

# Update specific dependencies to their latest versions in interactive mode
yarn upgrade-interactive --latest
```

## Production

### Production Commands

This section explains the available scripts in the `package.json` file and their usage during production deployments.

- `yarn build`  
  This command builds the static site for production using the `next build` command. It generates an optimized build of the site that is suitable for deployment.

- `yarn export`  
  This command exports the static site for production using the `next export` command. It generates an optimized build of the site that is suitable for deployment. The exported site is saved in the `out` directory.

- `yarn start`  
  This command first runs `yarn build` to generate an optimized build of the site and then starts the production server using the `next start` command. Use this command to test the site in a production-like environment locally.

## Bugs and Feature Requests

If you encounter any bugs or have a feature request, please open an issue on GitHub. To help us resolve the issue, please provide the following information:

### Bugs

- A detailed description of the bug.
- Steps to reproduce the bug.
- Expected behavior and actual behavior.
- Screenshots, if possible, and any additional context or information that may help us resolve the bug.
- If you have a solution, suggestion, or code change, please submit a pull request.

### Feature Requests

- For feature requests, questions, or feedback, please open an issue.
- For security issues or general inquiries, please contact [Eridian](https://eridianalpha.com) privately.

## Authors

- [Eridian](https://eridianalpha.com)

## License

[MIT](https://choosealicense.com/licenses/mit/)
