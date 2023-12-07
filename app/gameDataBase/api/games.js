import fetch from 'node-fetch';

const clientId = process.env.IGDB_CLIENT_ID;
const clientSecret = process.env.IGDB_CLIENT_SECRET;


export default async function handler(req, res) {
    const client_id = clientId;
    const client_secret = clientSecret;
    const body = new URLSearchParams({
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': 'client_credentials'
    });

    // Fetching the OAuth token
    const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        body: body
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetching games data from IGDB
    const gamesResponse = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
            'Client-ID': client_id,
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'text/plain'
        },
        body: 'fields name; limit 10;' // IGDB API query
    });
    const gamesData = await gamesResponse.json();

    res.status(200).json(gamesData);
}
