---
title: "The Graph: Hasura for the Ethereum Blockchain"
hero_image: giraffe.jpg
tags: graphql,blockchain,ethereum
published: 06-13-2021
description: The Graph is a dApp service that generates GraphQL APIs from the Ethereum blockchain.
---

## The Problem

In the scope of an app's functionality, querying and sorting data are oftentimes some of the most expensive operations. These expenses are compounded when the data being queried isn't stored on a database, but a blockchain. Minimizing the frequency of querying data, while ensuring as little data as possible is returned while still meeting the needs of each query, is essential to maintaining the sustainability of a project. This is especially true regarding queries of the Ethereum blockchain, given the [volatility](https://read.chirpsy.rodeo/share/60c62848e8fda5.23240907) and [spikes](https://ycharts.com/indicators/ethereum_average_gas_price) of gas fees throughout the network's history.

Many readers may be familiar with Hasura: the Dockerized service that watches a database and auto-generates a GraphQL API to match that database's schema.

[GraphQL](https://graphql.org/) is a typed API query language that allows for specific data to be fetched in a single request.

```javascript
type Artist {
  id: number
  name: string
  style: string
  birthplace: string
}

type Art {
  id: number
  name: string
  artist: Artist
  dateCreated: Date
}

// GraphQL query looks like this:
query {
  artist {
    name
    art {
      name
    }
  }
}

// ... and returns this:
[
  {
    name: "Salvador Dali",
    art: {
      { name: "The Persistence of Memory" },
      { name: "Galatea of the Spheres" },
      { name: "Swans Reflecting Elephants" }
    }
  },
  {
    name: "Pablo Picasso",
    art: [
      { name: "The Weeping Woman" },
      { name: "Guernica" },
      { name: "Girl Before a Mirror" }
    ]
  }
]
```

Compare this with the architecture of a [REST](https://restfulapi.net/) query, which requires data to be fetched gradually through multiple requests.

```javascript
const artistsReq = await fetch("/api/artists");
// The dev must fetch the entire 'Artist' object for each artist,
// not just the artist's name
const { data: artists } = artistsReq;

const allArt = await Promise.all(
  artists.map(async (artist) => {
    const artReq = await fetch(`/api/art/${artist.id}}`);
    // Once again, the query fetches the entire object instead of just
    // the desired information
    const { data: art } = artReq;

    return art;
  })
);
```

It's easy to imagine how (financially) expensive REST queries can become when dealing with complicated smart contracts on the Ethereum blockchain (during times of high gas fees).

## The Solution

### Enter: The Graph Network (TGN)

TGN is an app similar to Hasura that, instead of mapping centralized databases, generates GraphQL APIs from the Ethereum blockchain. It indexes data by using application-specific "subgraphs" created by dApp developers. These subgraphs specify which data on the blockchain should be queried, and what structure the returned data should take.

As opposed to using a [proof of work](https://ethereum.org/en/developers/docs/consensus-mechanisms/pow/) or [proof of stake](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/) algorithm to secure TGN, a novel proof of index algorithm is utilized. This means that validators are rewarded GRT (the network's native token) based on the accuracy of the subgraph indexes they produce (along with the accuracy of all transactions involved). The integrity of the subgraphs submitted to TGN is ensured by subgraph developers, consumers, and community members alike. The curation of subgraphs is incentivized by GRT rewards (and taxation) that is dependent upon the quality of the subgraphs submitted.

Despite bearing the moniker "dApp" (decentralized app), The Graph is currently a centrally hosted service. The developers and community behind it are already working towards making TGN fully decentralized. This is actually the case for many dApps today, which require centralized teams or infrastructure in order to be properly maintained, at least in the beginning stages of each project. This is not a sign of the developers bearing a sinister motive, like planning a rug pull. It's an indicator of the immense technological innovation happening in the space. Usually, developers either haven't yet figured out how to decentralize novel tech, or lack the capital to do so.

As old tech is revitalized and new tech made possible by blockchain technology, the ability to fully decentralize the broad palette of ideas being brought forth becomes a feat unto itself - a feat which The Graph's community is clearly rising to. Actions taken by The Graph developers include the creation of the Graph Foundation, and [the subsequent move](https://thegraph.com/blog/inaugurating-council-and-grants) towards being governed by a DAO (decentralized autonomous organization).

Popular dApps that use The Graph to process blockchain queries include some of the biggest names in the Defi space today: Uniswap, Decentraland, and Synthetix. The service offered by The Graph Protocol is a huge advancement for Defi DX (developer experience) and definitely reduces the cost associated with developing, testing, and deploying dApps. Improved DX also lowers the barrier of entry for potential dApp developers. This allows increasingly innovate ideas to manifest as the technology is made accessible to a wider population of devs. The Graph is a relatively young project (their move towards decentralization began in [December of 2020](https://libredd.it/r/thegraph/comments/l0t81p/welcome_to_the_official_subreddit_for_the_graph/)) and it has the potential to radically change the dApp space for the better for years to come.

---

Note: This article was written entirely out of interest in the protocol. I did not receive any endorsement, paid or otherwise.
