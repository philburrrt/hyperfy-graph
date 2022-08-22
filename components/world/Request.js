import React, { useEffect, useState } from 'react'
import { useEngine, useEth } from 'hyperfy'

export default function Request() {
  const engine = useEngine()
  const eth = useEth()

  const [status, setStatus] = useState('Click image to request')
  const [response, setResponse] = useState(null)

  useEffect(() => {
    return engine.onAction(async (action, ...args) => {
      if (action === 'request') {
        const address = args[0]
        setStatus(`Recieved request from ${address.slice(0, 5)}...`)
        try {
          await engine
            .http({
              url: 'https://api.thegraph.com/subgraphs/name/graphprotocol/graph-network-mainnet',
              method: 'POST',
              data: {
                query: `
              query MyQuery {
                  subgraphs(first:50, orderBy: createdAt, orderDirection: desc, where:{signalledTokens_gt: 0, currentVersion_not: null}) {
                    id
                    displayName
                    image
                    signalledTokens
                    unsignalledTokens      
                    currentVersion {
                      id
                      subgraphDeployment {
                        id
                      }
                    }
                  }
                }`,
              },
            })
            .then(res => {
              console.log(res)
              setResponse(JSON.stringify(res.data, null, 2))
            })
        } catch (e) {
          console.log(e)
          console.log('request failed')
        }
      }
    })
  }, [])

  async function call(e) {
    const { address } = e.avatar
    if (!address) return setStatus('Please connect your wallet')
    engine.dispatch('request', address)
    console.log('dispatched request')
  }

  return (
    <>
      <box
        size={[1, 1, 1]}
        position={[0, 0, -4]}
        //onClick={() => console.log(color)}
      />
      <image
        src="https://api.thegraph.com/ipfs/api/v0/cat?arg=QmQQdjnzdPEY3nuwSvLr3Wgy4gdyAwHE59UqgFsEdKE4ht"
        //src=data.subgraphs[0].image
        position={[1, 1, -4]}
        //onClick={() => console.log(color)}
        onClick={call}
      />
      <text
        value={status}
        position={[1, 2, -4]}
        color="white"
        bgColor="black"
        padding={0.1}
        bgRadius={0.1}
      />
      <text
        value={response}
        position={[1, 10, -10]}
        color="white"
        bgColor="black"
        padding={0.1}
        bgRadius={0.1}
      />
    </>
  )
}
