import { RetryError } from '@posthog/plugin-scaffold'
import fetch from 'node-fetch'

/* Runs once every full hour */
export async function runEveryDay({config}) {
    const url = `https://api.github.com/users/${config.name}`
    try {
        const res = await fetch(url, { method: 'GET' })
        const response = await res.json()
        if (response.hasOwnProperty('message')) {
            throw new Error(`Configuration error: ${response.message}`)
        }
        posthog.capture('github_followers', { follower_count: response.followers, username: response.login })
        console.log('Updated GitHub followers')
    } catch (err) {
        console.error('Error getting followers: ', err)
    }
}
