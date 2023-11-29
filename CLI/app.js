async function getStratzGqlApiToken() {
    try {
        const response = await fetch("./definitely_not_my_api_key_lmao_xd.json");
        const data = await response.json();

        return data.STRATZ_GRAPHQL_API_KEY;
    } catch (error) {
        console.error("Error getting Stratz GraphQL API token:", error);
    }
}

async function getGQLData(graphqlQuery) {
    const stratzGraphqlEndpoint = "https://api.stratz.com/graphql";
    const api_token = await getStratzGqlApiToken();

    const data = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api_token}`
        },
        body: JSON.stringify({query: graphqlQuery})
    }

    let response = await fetch(stratzGraphqlEndpoint, data);
    let value = await response.json();
    
    return value;
}

const heroesQuery = `
    query {
        constants {
            heroes {
                displayName
                abilities {
                    abilityId
                }
                roles {
                    roleId
                }
                language {
                    hype
                }
                talents {
                    abilityId
                }
                stats {
                    primaryAttribute
                    attackType
                    complexity
                }
            }
        }
    }
`;

const abilitiesQuery = `
    query {
        constants {
            abilities {
                id
                language {
                    displayName
                    description
                }
            }
        }
    }
`;
