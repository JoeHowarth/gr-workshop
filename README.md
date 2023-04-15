# gr-workshop
Wormhole Generic Relayer Demo

## Quick Start
```bash
yarn

# If you haven't installed foundry:
# curl -L https://foundry.paradigm.xyz | bash

# confirm you have an wallet funded with Fuji Avax and Celo Alfajores 
# at EVM_PRIVATE_KEY

# deploy the contracts to the chains configured in ts-scripts/config.json
# also cross-registers contracts with each other 
yarn deploy 

# increment the counter on wormhole chainId 6 (Avax) 
# and request a message to all other registered chains
yarn increment -c 6 

# observe the counter propogates to all connected chains 🎉🎉
yarn read 
```
